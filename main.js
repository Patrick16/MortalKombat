import {Game} from "./scripts/Game.js";
import {PlayerClient} from "./scripts/PlayerClient.js";

const game = new Game(new PlayerClient());
await game.start();