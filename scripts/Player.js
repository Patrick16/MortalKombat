import {createDOMElement} from "./helpers_functions.js";

export class Player {
    constructor(props) {
        this.player = props.player;
        this.name = props.name;
        this.hp = props.hp;
        this.img = props.img;
        this.weapon = props.weapon;
        this.attackObject = {};
        this.rootSelector = props.rootSelector;
    }

    attackEnemy = (enemy, logs) => {
        const {hit, value} = enemy.attackObject;
        const {defence} = this.attackObject;
        if (hit !== defence) {
            let result = this.changeHP(value);
            logs.generateAndRenderLogs('hit', enemy, this);
            this.renderHP();
            return result;
        }
        enemy.attackObject.value = 0;
        logs.generateAndRenderLogs('defence', enemy, this);
        this.renderHP();
        return false;
    }

    changeHP = (value) => {
        this.hp -= value;
        if (this.hp <= 0) {
            this.hp = 0;
            return true;
        } else {
            return false;
        }
    }
    elHP = () => document.querySelector(`.player${this.player} .life`);

    renderHP = () => {
        const $playerLife = this.elHP();
        $playerLife.style.width = `${this.hp}%`;
    }

    initialize = () => {
        const $root = document.querySelector(`.${this.rootSelector}`);
        const $player = createDOMElement('div', `player${this.player}`);
        const $progressbar = createDOMElement('div', 'progressbar');
        const $character = createDOMElement('div', 'character');
        const $life = createDOMElement('div', 'life');
        const $name = createDOMElement('div', 'name');
        const $img = createDOMElement('img');
        $player.appendChild($progressbar);
        $player.appendChild($character);
        $progressbar.appendChild($life);
        $progressbar.appendChild($name);
        $character.appendChild($img);
        $img.src = this.img;
        $name.innerText = this.name;
        $life.style.width = `${this.hp}%`;
        $root.appendChild($player);

        return $player;
    }
}