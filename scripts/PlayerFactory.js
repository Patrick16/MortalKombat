import {Player} from "./Player.js";
import {getRandomElement} from "./helpers_functions.js";

export class PlayerFactory {
    characters = [];

    extendPlayer = (player, playerNumber, rootSelector = 'arenas') => {
        return new Player({
            ...player,
            player: playerNumber,
            rootSelector
        });
    }

    getPlayer1 = () => {
        return this.extendPlayer(
            getRandomElement(this.characters),
            1
        );
    }

    getPlayer2 = () => {
        return this.extendPlayer(
            getRandomElement(this.characters),
            2
        );
    }

    getPlayersAsync = async () => {
        this.characters =
            await fetch('https://reactmarathon-api.herokuapp.com/api/mk/players')
                .then(res => res.json());
    }

    getRandomPlayerFromServerAsync = async (player) => {
        return this.extendPlayer(
            await fetch('https://reactmarathon-api.herokuapp.com/api/mk/player/choose')
                .then(res => res.json()),
            player);
    }

    attackAsync = async ({hit, defence}) => {
        const response = await fetch('http://reactmarathon-api.herokuapp.com/api/mk/player/fight', {
            method: 'POST',
            body: JSON.stringify({
                hit,
                defence,
            })
        }).then(res => res.json());
        console.log(response);
        return response;
    }
}