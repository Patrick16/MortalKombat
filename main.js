import {Game} from "./scripts/Game.js";
import {PlayerFactory} from "./scripts/PlayerFactory.js";

const game = new Game(new PlayerFactory());
game.start();