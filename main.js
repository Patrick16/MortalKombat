const $arenas = document.querySelector('.arenas');
const $button = document.querySelector('.button');
const $form = document.querySelector('.control');
const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}
const ATTACK = ['head', 'body', 'foot'];

function createPlayer(name, hp, img, weapon, playerNumber) {
    const player = {
        player: playerNumber,
        name: name,
        hp: hp,
        img: img,
        weapon: weapon,
        attackObject: {},
        attack: function (enemyAttack) {
            if (enemyAttack.hit != this.attackObject.defence) {
                return this.changeHP(enemyAttack.value);
            }
            return false;
        },
        changeHP,
        elHP,
        renderHP
    }
    return player;
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

function getRandom(value) {
    return Math.ceil(Math.random() * value);
}

function elHP() {
    return document.querySelector('.player' + this.player + ' .life');
}

function renderHP() {
    const $playerLife = this.elHP();
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

function createAttackObject(value, hit, defence) {
    return {
        value,
        hit,
        defence
    }
}

function enemyAttack() {
    const hit = ATTACK[getRandom(3) - 1];
    const defence = ATTACK[getRandom(3) - 1];
    const value = getRandom(HIT[hit]);
    return createAttackObject(value, hit, defence);
}

function playerAttack() {
    let playerHit;
    let playerValue;
    let playerDefence;
    for (let item of $form) {
        if (item.checked && item.name === 'hit') {
            playerValue = getRandom(HIT[item.value]);
            playerHit = item.value;
        }
        if (item.checked && item.name === 'defence') {
            playerDefence = item.value;
        }
        item.checked = false;
    }
    return createAttackObject(playerValue, playerHit, playerDefence);
}

$form.addEventListener('submit', function (event) {
    event.preventDefault();
    player1.attackObject = playerAttack();
    player2.attackObject = enemyAttack();
    $button.disabled =
        player1.attack(player2.attackObject) ||
        player2.attack(player1.attackObject);

    player1.renderHP();
    player2.renderHP();
    if ($button.disabled) {
        $arenas.appendChild(getWinTitle(player1, player2));
        $arenas.appendChild(createReloadButton());
    }
})

$arenas.appendChild(createDOM(player1));
$arenas.appendChild(createDOM(player2));