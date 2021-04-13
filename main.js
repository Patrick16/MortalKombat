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
        },
        changeHP: changeHP,
        elHP: elHP,
        renderHP: renderHP,
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
    $life.style.width = player.hp + '%';
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

function elHP() {
    return document.querySelector('.player' + this.player + ' .life');
}

function renderHP($playerLife) {
    $playerLife.style.width = this.hp + '%';
}

function changeHP(value) {
    this.hp -= value;
    if (this.hp <= 0) {
        this.hp = 0;
        return true;
    } else {
        return false;
    }
}

function getWinTitle(player1, player2) {
    const $winTitle = createElement('div', 'winTitle');
    let resultText = 'Draw';
    if (player1.hp > player2.hp) {
        resultText = player1.name + ' wins';
    } else if (player2.hp > player1.hp) {
        resultText = player2.name + ' wins';
    }
    $winTitle.innerText = resultText;
    return $winTitle;
}

function createReloadButton() {
    const $reload = createElement('div', 'reloadWrap');
    const $button = createElement('button', 'button');
    $button.innerText = 'Restart';
    $button.addEventListener('click', function () {
        window.location.reload();
    })
    $reload.appendChild($button);
    return $reload;
}

$button.addEventListener('click', function () {
    this.disabled =
        player1.changeHP(getRandom(20)) ||
        player2.changeHP(getRandom(20));
    player1.renderHP(player1.elHP());
    player2.renderHP(player2.elHP());
    if (this.disabled) {
        $arenas.appendChild(getWinTitle(player1, player2));
        $arenas.appendChild(createReloadButton());
    }
});

$arenas.appendChild(createDOM(player1));
$arenas.appendChild(createDOM(player2));