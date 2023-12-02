console.log('hello there! ~Obi-Wan Kenobi')

const heroes = [
  {
    name: 'Stella Stallone',
    type: 'barbarian',
    damage: 15,
    health: 69,
    level: 1,
    gold: 0
  },
  {
    name: 'Sugar',
    type: 'rogue',
    damage: 20,
    health: 40,
    level: 1,
    gold: 0
  },
  {
    name: 'Billy the Kid',
    type: 'fighter',
    damage: 10,
    health: 80,
    level: 1,
    gold: 0
  },
  {
    name: 'Indigo',
    type: 'monk',
    damage: 25,
    health: 30,
    level: 1,
    gold: 0
  }
]

const bigBoss = {
  name: 'Lyra',
  health: 100,
  maxHealth: 100,
  damage: 5,
  level: 1,
  value: 10
}

// const bigBads = [
// {
// name: 'Opulent Soldier',
// health: 30,
// maxHealth: 30,
// damage: 5,
// level: 1
// },
// {
// name: 'Lyra 💖',
// health: 69,
// maxHealth: 69,
// damage: 10,
// level: 1
// },
// {
// name: 'Mother',
// health: 100,
// maxHealth: 100,
// damage: 15,
// level: 1
// },
// {
// name: 'Lord Regis',
// health: 200,
// maxHealth: 200,
// damage: 25,
// level: 1
// },
// ]

/**NOTE - Functions Needed
* Attack Boss "attackBoss" --DONE
* -onclick boss should loose health based on parties damage
* Get attacked "bossAttacks"
* -currently selected boss attacks on a 5 second interval
* Update Stats -> boss and heroes "updateParty"&"updateBoss"
* -constant draw man
* -keep hero/boss/money stats updated
* Boss Defeat/Level Up "bossDeath"&"heroDeath"&"partyWipe"/"bossLvlUp"&"partyLvlUp"
* -when boss hp = 0 lvl it up, lvl up party then rotate to next boss in array
* -when anyone lvl up, boost stats. max lvl is 20.
* -hero death tracks individual hero, prevents dead heroes from fighting
* -party wipe checks if all heroes are dead. if true, game over
* Reward "getPaid"
* -on boss death, earn cash money. cash money relative to boss lvl
* Healing "healHero"
* -use money to purchase healing for heroes.
*/

function attackBoss() {
  console.log('ow')
  heroes.forEach(hero => {
    if (hero.health > 0) {
      bigBoss.health -= hero.damage
    }
  });
  checkBoss()
  updateBoss()
}

function updateParty() {
  heroes.forEach(hero => {
    let heroElm = document.getElementById(hero.name)
    console.log('⚔️', heroElm)
    let statsElm = heroElm.querySelector('.stats')
    console.log('❤️', statsElm)
    statsElm.innerText = `${hero.type}|⚔️${hero.damage}|❤️${hero.health}|LvL${hero.level}|🪙${hero.gold}`
  });
}

function updateBoss() {
  let bossElm = document.getElementById(bigBoss.name)
  console.log('💀', bossElm)
  let statsElm = bossElm.querySelector('.stats')
  console.log('🖤', statsElm)
  statsElm.innerText = `${bigBoss.damage}|${bigBoss.health}|${bigBoss.maxHealth}|${bigBoss.level}`
}

function checkBoss() {
  if (bigBoss.health <= 0) { lvlUp() getGold() }
} function getGold() {
  heroes.forEach(hero => {
    hero.gold += bigBoss.value
  });
  updateParty()
}

function lvlUp() {
  bigBoss.maxHealth += 50;
  bigBoss.damage += 10;
  bigBoss.level += 1;
  bigBoss.value += 1;
  bigBoss.health = bigBoss.maxHealth;
}

setInterval(bossAttack, 5000)

function bossAttack() {
  heroes.forEach(hero => {
    hero.health -= bigBoss.damage
    if (hero.health <= 0) hero.health = 0
  }); updateParty() checkGameOver()
} function healthPack(clickedHero) {
  let
  foundHero = heroes.find(hero => hero.name == clickedHero)
  if (foundHero.gold >= 20) {
    foundHero.gold -= 20
    foundHero.health += 50
    updateParty()
  } else { window.alert("you're broke!") }
}

function checkGameOver() {
  let deadHero = heroes.filter(hero => hero.health == 0)
  if (heroes.length == deadHero.length) {
    if (window.alert('rocks fall, everyone dies, you LOSE.')) { } else window.location.reload();
  }
}

updateParty()
updateBoss()