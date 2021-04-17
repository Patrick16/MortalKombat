const $arenas = document.querySelector('.arenas');
const $button = document.querySelector('.button');
const $form = document.querySelector('.control');
const $chat = document.querySelector('.chat');
const logs = {
    start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
    end: [
        'Результат удара [playerWins]: [playerLose] - труп',
        '[playerLose] погиб от удара бойца [playerWins]',
        'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
    ],
    hit: [
        '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
        '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
        '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
        '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
        '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
        '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
        '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
        '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
        '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
        '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
        '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
        '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
        '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
        '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
        '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
        '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
        '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
        '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
    ],
    defence: [
        '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
        '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
        '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
        '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
        '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
        '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
    ],
    draw: 'Ничья - это тоже победа!'
};
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
        attack: function (enemy) {
            if (enemy.attackObject.hit !== this.attackObject.defence) {
                let result = this.changeHP(enemy.attackObject.value);
                renderLog(generateLogs('hit', enemy, this));
                return result;
            }
            enemy.attackObject.value = 0;
            renderLog(generateLogs('defence', enemy, this));
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

function chooseWinner(player1, player2) {
    if (player1.hp > player2.hp) {
        return 1;
    } else if (player2.hp > player1.hp) {
        return 2;
    }
    return 0;

}

function getWinTitle(winnerName) {
    const $winTitle = createElement('div', 'winTitle');
    let result = 'Draw';
    if (winnerName)
        result = `${winnerName} wins`;
    $winTitle.innerText = result;
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

function getTime() {
    const date = new Date();
    return `${date.getHours()}:${date.getMinutes()}`;
}

function generateLogs(type, player1, player2) {
    switch (type) {
        case 'start':
            return logs.start
                .replace('[time]', getTime())
                .replace('[player1]', player1.name)
                .replace('[player2]', player2.name);
        case 'end': {
            return getRandomLog(logs[type])
                .replace('[playerWins]', player1.name)
                .replace('[playerLose]', player2.name);
        }
        case 'hit':
        case 'defence': {
            let log = getRandomLog(logs[type])
                .replace('[playerKick]', player1.name)
                .replace('[playerDefence]', player2.name);
            // in case of hit/defence the player1 is always enemy, the player2 is always current player.
            return `${getTime()} - ${log} -${player1.attackObject.value} ${player2.name}:[${player2.hp}/100]`;
        }
        case 'draw': {
            return logs.draw;
        }
        default:
            return 'Танцы с бубном...';
    }
}

function getRandomLog(logsTyped) {
    return logsTyped[getRandom(logsTyped.length - 1)];
}

function renderLog(log) {
    const $p = `<p>${log}</p>`;
    $chat.insertAdjacentHTML('afterbegin', $p);
}

function renderResult() {
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

$form.addEventListener('submit', function (event) {
    event.preventDefault();
    player1.attackObject = playerAttack();
    player2.attackObject = enemyAttack();

    $button.disabled =
        player1.attack(player2) ||
        player2.attack(player1);

    player1.renderHP();
    player2.renderHP();

    renderResult();
})

renderLog(generateLogs('start', player1, player2));

$arenas.appendChild(createDOM(player1));
$arenas.appendChild(createDOM(player2));