import {createPlayer} from "./scripts/player.js";
import {
    $button,
    $form,
    generateAndRenderLogs,
    renderPlayers,
    renderResult} from "./scripts/elements.js";


const player1 = createPlayer(
    'Sonya',
    100,
    'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
    ['gun'],
    1);

const player2 = createPlayer(
    'Scorpion',
    100,
    'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    ['kinai'],
    2);

$form.addEventListener('submit', function (event) {
    event.preventDefault();
    player1.makeMove();
    player2.makeMove();
    $button.disabled =
        player1.attack(player2) ||
        player2.attack(player1);

    renderResult(player1,player2);
})

generateAndRenderLogs('start', player1, player2);
renderPlayers(player1,player2);