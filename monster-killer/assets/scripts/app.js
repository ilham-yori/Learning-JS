const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;

const MODE_ATTACK = 'ATTACK';
const MODE_STRONG_ATTACK = 'STRONG_ATTACK';
const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';
const LOG_EVENT_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_EVENT_GAME_OVER = 'GAME_OVER';

const userValue = prompt('Maximum life for you and the monster.', 100);
let chosenMaxLife = parseInt(userValue);
if (isNaN(chosenMaxLife) || chosenMaxLife <= 0){
    chosenMaxLife = 100;
}

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasbonusLife = true;
let battleLog = []

adjustHealthBars(chosenMaxLife);

function endRound(){
    const intialPlayerHealth = currentPlayerHealth;
    const hurt = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= hurt;
    writeLog(
        LOG_EVENT_MONSTER_ATTACK, 
        hurt, 
        currentMonsterHealth,
        currentPlayerHealth
    );

    if(currentPlayerHealth <= 0 && hasbonusLife){
        hasbonusLife = false;
        removeBonusLife();
        currentPlayerHealth = intialPlayerHealth;
        alert('You have been saved by bonus life!');
        setPlayerHealth(intialPlayerHealth);
    }

    if(currentMonsterHealth <= 0 && currentPlayerHealth > 0){
        alert('You Won!');
        writeLog(
            LOG_EVENT_MONSTER_ATTACK, 
            'PLAYER_WON', 
            currentMonsterHealth,
            currentPlayerHealth
        );
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0){
        alert('Monster Won!');
        writeLog(
            LOG_EVENT_MONSTER_ATTACK, 
            'MONSTER_WON', 
            currentMonsterHealth,
            currentPlayerHealth
        );
    } else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
        alert('Draw!');
        writeLog(
            LOG_EVENT_MONSTER_ATTACK, 
            'DRAW', 
            currentMonsterHealth,
            currentPlayerHealth
        );
    }

    if(currentMonsterHealth <= 0 || currentPlayerHealth <= 0){
        reset();
    }
}

function reset(){
    currentMonsterHealth = chosenMaxLife; 
    currentPlayerHealth = chosenMaxLife;
    resetGame(chosenMaxLife);
}

function attackMonster(playerAttackType){
    let maxDamage;
    let logging;

    if(playerAttackType === MODE_ATTACK){
        maxDamage = ATTACK_VALUE;
        logging = LOG_EVENT_PLAYER_ATTACK;
    }else if(playerAttackType === MODE_STRONG_ATTACK){
        maxDamage = STRONG_ATTACK_VALUE;
        logging = LOG_EVENT_PLAYER_STRONG_ATTACK;
    }

    const damage = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= damage;
    writeLog(
        logging, 
        damage, 
        currentMonsterHealth,
        currentPlayerHealth
    );

    endRound();
}

function onAttack(){
    attackMonster(MODE_ATTACK);
}

function onStrongAttack(){
    attackMonster(MODE_STRONG_ATTACK);
}

function writeLog(ev, val, monsterHealth, playerHealth){
    let logEntry = {
        event: ev,
        value: val,
        finalMonsterHealth: monsterHealth,
        finalPlayerHealth: playerHealth
    };

    if(ev === LOG_EVENT_PLAYER_ATTACK){
        logEntry.target = 'MONSTER';
    }else if (ev === LOG_EVENT_PLAYER_STRONG_ATTACK) {
        logEntry.target = 'MONSTER';
    } else if(ev === LOG_EVENT_PLAYER_HEAL){
        logEntry.target = 'PLAYER';
    }else if (ev === LOG_EVENT_GAME_OVER) {
        
    }

    battleLog.push(logEntry);
}

function logHistory(){
    for (const logEntry of battleLog) {
        console.log(logEntry)
    }
}

function onHeal(){
    let healValue;
    if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
        alert("You can't heal to more than your max intial health.");
        healValue = chosenMaxLife - currentPlayerHealth;
    } else {
        healValue = HEAL_VALUE;
    }
    increasePlayerHealth(healValue);
    currentPlayerHealth += healValue;
    writeLog(
        LOG_EVENT_PLAYER_HEAL, 
        healValue, 
        currentMonsterHealth,
        currentPlayerHealth
    );

    endRound();
}

attackBtn.addEventListener('click', onAttack);
strongAttackBtn.addEventListener('click', onStrongAttack);
healBtn.addEventListener('click', onHeal);
logBtn.addEventListener('click', logHistory)