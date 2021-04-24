import {generateLogs} from "./logs.js";
import {chooseWinner} from "./player.js";

export const $arenas = document.querySelector('.arenas');
export const $button = document.querySelector('.button');
export const $form = document.querySelector('.control');
export const $chat = document.querySelector('.chat');

const createElement = (tag, className) => {
    const $element = document.createElement(tag);
    if (className) {
        $element.classList.add(className);
    }
    return $element;
}

const createDOM = (player) => {
    const $player = createElement('div', 'player' + player.player);
    const $progressbar = createElement('div', 'progressbar');
    const $character = createElement('div', 'character');
    const $life = createElement('div', 'life');
    const $name = createElement('div', 'name');
    const $img = createElement('img');
    $player.appendChild($progressbar);
    $player.appendChild($character);
    $progressbar.appendChild($life);
    $progressbar.appendChild($name);
    $character.appendChild($img);
    $img.src = player.img;
    $name.innerText = player.name;
    $life.style.width = player.hp + '%';
    return $player;
}

const getWinTitle = (winnerName) => {
    const $winTitle = createElement('div', 'winTitle');
    let result = 'Draw';
    if (winnerName)
        result = `${winnerName} wins`;
    $winTitle.innerText = result;
    return $winTitle;
}

const createReloadButton = () => {
    const $reload = createElement('div', 'reloadWrap');
    const $button = createElement('button', 'button');
    $button.innerText = 'Restart';
    $button.addEventListener('click', function () {
        window.location.reload();
    })
    $reload.appendChild($button);
    return $reload;
}


const renderLog = (log) => {
    const $p = `<p>${log}</p>`;
    $chat.insertAdjacentHTML('afterbegin', $p);
}

export const generateAndRenderLogs = (type, player1, player2) => {
    renderLog(generateLogs(type, player1, player2));
}

export const renderResult = (player1, player2) => {
    if ($button.disabled) {
        let $winTitle;
        let log;
        switch (chooseWinner(player1, player2)) {
            case 1: {
                $winTitle = getWinTitle(player1.name);
                log = generateLogs('end', player1, player2);
                break;
            }
            case 2: {
                $winTitle = getWinTitle(player2.name);
                log = generateLogs('end', player2, player1);
                break;
            }
            case 0: {
                $winTitle = getWinTitle();
                log = generateLogs('draw');
                break;
            }
        }
        renderLog(log);
        $arenas.appendChild($winTitle);
        $arenas.appendChild(createReloadButton());
    }
}

export const renderPlayers = (player1, player2) => {
    $arenas.appendChild(createDOM(player1));
    $arenas.appendChild(createDOM(player2));
}