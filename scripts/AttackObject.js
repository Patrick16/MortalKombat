import {getRandom, getRandomElement} from "./helpers_functions.js";

export class AttackObject {

    HIT = {
        head: 30,
        body: 25,
        foot: 20,
    }
    ATTACK = ['head', 'body', 'foot'];

    constructor(props) {
        if(props){
            this.value = props.value;
            this.hit = props.hit;
            this.defence = props.defence;
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
        return this;
    }

    enemyAttack = () => {
        this.hit = getRandomElement(this.ATTACK);
        this.defence = getRandomElement(this.ATTACK);
        this.value = getRandom(this.HIT[this.hit]);
    }
}