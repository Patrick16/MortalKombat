import {Player} from "./Player.js";
import {getRandomElement} from "./helpers_functions.js";

export class PlayerFactory {

    getSonya = (player) => () => new Player({
        name: 'Sonya',
        hp: 100,
        img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
        weapon: ['Gun'],
        player: player
    })
    getScorpion = (player) => () => new Player({
        name: 'Scorpion',
        hp: 100,
        img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
        weapon: ['Kunai'],
        player: player
    })
    getKitana = (player) => () => new Player({
        name: 'Kitana',
        hp: 100,
        img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
        weapon: ['Battle fan'],
        player: player
    })
    getLiuKang = (player) => () => new Player({
        name: 'LiuKang',
        hp: 100,
        img: 'http://reactmarathon-api.herokuapp.com/assets/liukang.gif',
        weapon: ['Fire ball'],
        player: player
    })
    getSubzero = (player) => () => new Player({
        name: 'Subzero',
        hp: 100,
        img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
        weapon: ['Freeze'],
        player: player
    })

    characters = [
        this.getSonya(),
        this.getScorpion(),
        this.getKitana(),
        this.getLiuKang(),
        this.getSubzero(),
    ];

    getPlayer1 = () => {
        const player = getRandomElement(this.characters)();
        player.player = 1;
        return player;
    }
    getPlayer2 = () => {
        const player = getRandomElement(this.characters)();
        player.player = 2;
        return player;
    }
}