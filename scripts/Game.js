import {AttackObject} from "./AttackObject.js";
import {Logs} from "./Logs.js";
import {createDOMElement} from "./helpers_functions.js";

export class Game {
    $button = document.querySelector('.button');
    $arenas = document.querySelector('.arenas');
    $form = document.querySelector('.control');

    constructor(factory) {
        this.factory = factory;
        this.logs = new Logs();
    }

    start = async () => {
        await this.factory.getPlayersAsync();
        this.player1 = this.factory.getPlayer1();
        this.player2 = this.factory.getPlayer2();

        this.logs.generateAndRenderLogs('start', this.player1, this.player2);

        this.player1.initialize();
        this.player2.initialize();

        this.$form.addEventListener('submit', async (event) => {
            event.preventDefault();
            console.log('push');
            const result = await this.factory.attackAsync(new AttackObject(this.$form));
            this.player1.attackObject = new AttackObject(undefined, result.player1);
            this.player2.attackObject = new AttackObject(undefined, result.player2);

            this.$button.disabled =
                this.player1.attackEnemy(this.player2, this.logs) ||
                this.player2.attackEnemy(this.player1, this.logs);

            this.renderResult();
        });
    }

    chooseWinner = () => {
        if (this.player1.hp > this.player2.hp) {
            return 1;
        } else if (this.player2.hp > this.player1.hp) {
            return 2;
        }
        return 0;
    }
    renderResult = () => {
        if (this.$button.disabled) {
            let $winTitle;
            let log;
            switch (this.chooseWinner()) {
                case 1: {
                    $winTitle = this.getWinTitle(this.player1.name);
                    log = this.logs.generateLogs('end', this.player1, this.player2);
                    break;
                }
                case 2: {
                    $winTitle = this.getWinTitle(this.player2.name);
                    log = this.logs.generateLogs('end', this.player2, this.player1);
                    break;
                }
                case 0: {
                    $winTitle = this.getWinTitle();
                    log = this.logs.generateLogs('draw');
                    break;
                }
            }
            this.logs.renderLog(log);
            this.$arenas.appendChild($winTitle);
            this.$arenas.appendChild(this.createReloadButton());
        }
    }
    createReloadButton = () => {
        const $reload = createDOMElement('div', 'reloadWrap');
        const $button = createDOMElement('button', 'button');
        $button.innerText = 'Restart';
        $button.addEventListener('click', function () {
            window.location.reload();
        })
        $reload.appendChild($button);
        return $reload;
    }
    getWinTitle = (winnerName) => {
        const $winTitle = createDOMElement('div', 'winTitle');
        let result = 'Draw';
        if (winnerName)
            result = `${winnerName} wins`;
        $winTitle.innerText = result;
        return $winTitle;
    }
}