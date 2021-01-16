const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_PLAYER_VALUE = 20;

const enteredNumber = prompt('maximum life for you and the monster', '100');

const MODE_ATTACK = 'ATTACK';
const MODE_STRONG_ATTACK = 'STRONG_ATTACK';
const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_EVENT_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_EVENT_GAME_OVER = 'GAVE_OVER';

let chosenMaxLife = +enteredNumber;
let battleLog = [];

if (isNaN(enteredNumber) || enteredNumber <= 0) {
   chosenMaxLife = 100;
}

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);

function writeToLog(event, value, monsterHealth, playerHealth) {
   let logEntry = {
      target: 'MONSTER',
      event: event,
      value: value,
      finalMonsterHealth: monsterHealth,
      finalPlayerHealth: playerHealth,
   };
   if (event === LOG_EVENT_PLAYER_ATTACK) {
      logEntry.target = 'MONSTER';
   } else if (event === LOG_ENTRY_PLAYER_STRONG_ATTACK) {
      logEntry.target = 'MONSTER';
   } else if (event === LOG_ENTRY_MONSTER_ATTACK) {
      logEntry.target = 'PLAYER';
   } else if (event === LOG_EVENT_PLAYER_HEAL) {
      logEntry.target = 'PLAYER';

   } else if (event === LOG_EVENT_GAME_OVER) {
      logEntry = {
         event: event,
         value: value,
         finalMonsterHealth: monsterHealth,
         finalPlayerHealth: playerHealth,
      };
   }
   battleLog.push(logEntry);
}
function reset() {
   currentMonsterHealth = chosenMaxLife;
   currentPlayerHealth = chosenMaxLife;
   resetGame(chosenMaxLife);
}

function endRound() {
   const initialPlayerHealth = currentPlayerHealth;
   const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
   currentPlayerHealth -= playerDamage;

   if (currentPlayerHealth <= 0 && hasBonusLife) {
      hasBonusLife = false;
      removeBonusLife();
      currentPlayerHealth = initialPlayerHealth;
      setPlayerHealth(initialPlayerHealth);
      alert('you would have died but the bonus life saved you');
   }

   if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
      alert('you won! ');
   } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
      alert('you lost!');
   } else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
      alert('you have a draw!!');
   }
   if (currentPlayerHealth <= 0 || currentMonsterHealth <= 0) {
      reset();
   }
}

function attackMonster(mode) {
   let maxDamage;
   if (mode === MODE_ATTACK) {
      maxDamage = ATTACK_VALUE;
   } else if (mode === MODE_STRONG_ATTACK) {
      maxDamage = STRONG_ATTACK_VALUE;
   }
   const damage = dealMonsterDamage(maxDamage);
   currentMonsterHealth -= damage;
   endRound();
}
function attackHandler() {
   attackMonster(MODE_ATTACK);
}
function strongAttackHandler() {
   attackMonster(MODE_STRONG_ATTACK);
}
function healPlayerHandler() {
   let healValue;
   if (currentPlayerHealth >= chosenMaxLife - HEAL_PLAYER_VALUE) {
      alert("you can't heal higher than max health");
      healValue = chosenMaxLife - currentPlayerHealth;
   } else {
      healValue = HEAL_PLAYER_VALUE;
   }
   increasePlayerHealth(HEAL_PLAYER_VALUE);
   currentPlayerHealth += healValue;
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);
