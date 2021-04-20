import {$form, generateAndRenderLogs} from "./elements.js";
import {getRandom, getRandomElement} from "./helpers.js";

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}
const ATTACK = ['head', 'body', 'foot'];

function playerAttack() {
    let playerHit;
    let playerValue;
    let playerDefence;
    for (let item of $form) {
        if (item.checked && item.name === 'hit') {
            playerValue = getRandom(HIT[item.value]);
            playerHit = item.value;
        }
        if (item.checked && item.name === 'defence') {
            playerDefence = item.value;
        }
        item.checked = false;
    }
    return createAttackObject(playerValue, playerHit, playerDefence);
}


function createAttackObject(value, hit, defence) {
    return {
        value,
        hit,
        defence
    }
}

function enemyAttack() {
    const hit = getRandomElement(ATTACK);
    const defence = getRandomElement(ATTACK);
    const value = getRandom(HIT[hit]);
    return createAttackObject(value, hit, defence);
}

function renderHP() {
    const $playerLife = this.elHP();
    $playerLife.style.width = this.hp + '%';
}

function elHP() {
    return document.querySelector('.player' + this.player + ' .life');
}

function changeHP(value) {
    this.hp -= value;
    if (this.hp <= 0) {
        this.hp = 0;
        return true;
    } else {
        return false;
    }
}

export function chooseWinner(player1, player2) {
    if (player1.hp > player2.hp) {
        return 1;
    } else if (player2.hp > player1.hp) {
        return 2;
    }
    return 0;
}

export function createPlayer(name, hp, img, weapon, playerNumber) {
    return {
        player: playerNumber,
        name: name,
        hp: hp,
        img: img,
        weapon: weapon,
        attackObject: {},
        makeMove: function () {
            this.player === 1
                ? this.attackObject = playerAttack()
                : this.attackObject = enemyAttack()
        },
        attack: function (enemy) {
            const {hit, value} = enemy.attackObject;
            const {defence} = this.attackObject;
            if (hit !== defence) {
                let result = this.changeHP(value);
                generateAndRenderLogs('hit', enemy, this);
                this.renderHP()
                return result;
            }
            enemy.attackObject.value = 0;
            generateAndRenderLogs('defence', enemy, this);
            this.renderHP()
            return false;
        },
        changeHP,
        elHP,
        renderHP
    };
}

