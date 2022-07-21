const knightElem = document.getElementById('knight')
const bossLevelElem = document.getElementById("level")
const bossHPElem = document.getElementById("boss-health")
const heroHPElem = document.getElementById("hero-health")
const gold = document.getElementById("gold")
const monsterGif = document.getElementById("monster-gif")
const toast = new bootstrap.Toast(document.getElementById('danger-toast'))

const wolfTurnsElem = document.getElementById('wolf-turns')
const wizardTurnsElem = document.getElementById('wizard-turns')
const unicornTurnsElem = document.getElementById('unicorn-turns')

// #region Starter Code
let fighting = false
function debounce(func, timeout = 950) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => { func.apply(this, args) }, timeout)
  }
}

function reset() {
  fighting = false
  knightElem.src = "assets/knight.webp"
}

const delayReset = debounce(reset)
function animateAttack() {
  if (!fighting) {
    fighting = true
    knightElem.src = "assets/attack.webp"
  }
  delayReset()
}

const hero = {
  hp: 100,
  gold: 0
}

const boss = {
  hp: 100,
  lvl: 1
}

function update() {
  bossHPElem.innerText = boss.hp
  heroHPElem.innerText = hero.hp
  bossLevelElem.innerText = boss.lvl
  gold.innerHTML = hero.gold

  wolfTurnsElem.innerText = companions.wolf.remainingTurns
  wizardTurnsElem.innerText = companions.wizard.remainingTurns
  unicornTurnsElem.innerText = companions.unicorn.remainingTurns
}


function attack() {
  if (hero.hp <= 0) {
    return
  }
  boss.hp -= 5
  if (boss.hp < 0) {
    bossLevelUp()
  }
  animateAttack()
  update()
}

function bossLevelUp() {
  boss.lvl++
  boss.hp = boss.lvl * 100
  hero.gold += boss.lvl * 100
  monsterGif.style.transform = `scale(${(10 + boss.lvl) * .1})`
  toast.show()
}

function bossAttack() {
  hero.hp -= boss.lvl
  if (hero.hp <= 0) {
    hero.hp = 0
    heroDeath()
  }
  update()
}

function heroDeath() {
  knightElem.src = "assets/death.webp"
  document.body.style.backgroundImage = "url(assets/died.jpg)"
  document.body.classList.add('dead')
}


setInterval(bossAttack, 2000)

// #endregion


const companions = {
  wolf: {
    type: 'dmg',
    cost: 100,
    purchasableTurns: 10,
    remainingTurns: 0,
    value: 1
  },
  wizard: {
    type: 'dmg',
    cost: 300,
    purchasableTurns: 15,
    remainingTurns: 0,
    value: 5
  },
  unicorn: {
    type: 'heal',
    cost: 500,
    purchasableTurns: 20,
    remainingTurns: 0,
    value: 5
  }
}


function damageBoss(val) {
  boss.hp -= val
  update()
}

function healHero(val) {
  hero.hp += val
  update()
}



function companionsActions() {
  for (let name in companions) {
    const companion = companions[name]
    if (companion.remainingTurns) {
      companion.remainingTurns--
      if (companion.type == "dmg") {
        damageBoss(companion.value)
      } else if (companion.type == "heal") {
        healHero(companion.value)
      }
    }
  }
}

setInterval(companionsActions, 1000)

// function wolfAttack() {
//   if (companions.wolf.remainingTurns) {
//     companions.wolf.remainingTurns--
//     damageBoss(companions.wolf.value)
//   }
// }

// setInterval(wolfAttack, 1000)



function buy(name) {
  const companion = companions[name]
  // do you have the money
  if (hero.gold >= companion.cost) {
    // set wolf remaining turns += wolf purchasableTurns
    hero.gold -= companion.cost
    companion.remainingTurns += companion.purchasableTurns
  }
  update()
}

// function buyWolf() {
//   // do you have the money
//   if (hero.gold >= 100) {
//     // set wolf remaining turns += wolf purchasableTurns
//     hero.gold -= 100
//     companions.wolf.remainingTurns += companions.wolf.purchasableTurns
//   }
//   update()
// }

// function buyWizard() {
//   // do you have the money
//   if (hero.gold >= 200) {
//     // set wolf remaining turns += wolf purchasableTurns
//     hero.gold -= 200
//     companions.wizard.remainingTurns += companions.wizard.purchasableTurns
//   }
//   update()
// }