const player1Style='player1';
const player2Style='player2';

function createPlayer(name, hp, img, weapon) {
    return {
        name: name,
        hp: hp,
        img: img,
        weapon: weapon,
        attack: () => {
            console.log(name + 'Fight...');
        }
    }
}

function createDivWithClass(className) {
    const $element = document.createElement('div');
    $element.classList.add(className);
    return $element;
}

function createDOM(style, player) {
    const $player = createDivWithClass(style);
    const $progressbar = createDivWithClass('progressbar');
    const $character = createDivWithClass('character');
    const $life = createDivWithClass('life');
    const $name = createDivWithClass('name');
    const $img = document.createElement('img');
    $player.appendChild($progressbar);
    $player.appendChild($character);
    $progressbar.appendChild($life);
    $progressbar.appendChild($name);
    $character.appendChild($img);
    $img.src = player.img;
    $name.innerText = player.name;
    const $arenas = document.querySelector('.arenas');
    $arenas.appendChild($player);
}

const sonya = createPlayer(
    'Sonya',
    100,
    'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
    ['gun']);

const scorpion = createPlayer(
    'Scorpion',
    100,
    'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    ['kinai']);

createDOM(player1Style,sonya);
createDOM(player2Style,scorpion);