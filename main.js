const $arenas = document.querySelector('.arenas');
const $button = document.querySelector('.button');

function createPlayer(name, hp, img, weapon, playerNumber) {
    return {
        player: playerNumber,
        name: name,
        hp: hp,
        img: img,
        weapon: weapon,
        attack: () => {
            console.log(name + 'Fight...');
        }
    }
}

function createElement(tag, className) {
    const $element = document.createElement(tag);
    if (className) {
        $element.classList.add(className);
    }
    return $element;
}

function createDOM(player) {
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
    return $player;
}

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

function getRandom() {
    return Math.ceil(Math.random() * 20);
}

function changeHP(player, name, value) {
    const $playerLife = document.querySelector('.player' + player.player + ' .life');
    player.hp -= value;
    if (player.hp <= 0) {
        $playerLife.style.width = 0 + '%';
        $arenas.appendChild(playerWins(name));
        return true;
    } else {
        $playerLife.style.width = player.hp + '%';
        return false;
    }
}

function playerWins(name) {
    const $winTitle = createElement('div', 'winTitle');
    $winTitle.innerText = name + ' wins';
    return $winTitle;
}

$button.addEventListener('click', function () {
    this.disabled =changeHP(player1, player2.name, getRandom()) ||
        changeHP(player2, player1.name, getRandom());
});


$arenas.appendChild(createDOM(player1));
$arenas.appendChild(createDOM(player2));