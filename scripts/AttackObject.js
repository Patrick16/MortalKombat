import {getRandom, getRandomElement} from "./helpers_functions.js";

export class AttackObject {

    HIT = {
        head: 30,
        body: 25,
        foot: 20,
    }
    ATTACK = ['head', 'body', 'foot'];

    constructor($form) {
        if ($form) {
            this.playerAttack($form);
        } else {
            this.enemyAttack();
        }
    }

    playerAttack($form) {
        for (let item of $form) {
            if (item.checked && item.name === 'hit') {
                this.value = getRandom(this.HIT[item.value]);
                this.hit = item.value;
            }
            if (item.checked && item.name === 'defence') {
                this.defence = item.value;
            }
            item.checked = false;
        }
    }

    enemyAttack = () => {
        this.hit = getRandomElement(this.ATTACK);
        this.defence = getRandomElement(this.ATTACK);
        this.value = getRandom(this.HIT[this.hit]);
    }
}