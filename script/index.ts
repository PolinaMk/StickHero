const gameGraphic = document.querySelector(".game__graphic") as HTMLElement
const container = document.querySelector(".container") as HTMLElement
const gameHero = document.querySelector(".game__hero ") as HTMLElement
const restart = document.querySelector(".game__restart") as HTMLElement
const gameScene = document.querySelector(".game__scene") as HTMLElement
const play = document.querySelector(".game__start") as HTMLElement
const gameStartPage = document.querySelector(".game__start-page") as HTMLElement
const gameScore = document.querySelector(".game__score") as HTMLElement

play.addEventListener('click', () => {
    gameStartPage.classList.add("hidden")
    gameScore.classList.remove("hidden")
})

document.addEventListener("click", (e) => {
    play.classList.remove("hidden");
});


const platforms: number[] = []
const spacePlatforms: number[] = []
const getTagPlatforms: any = []
let flagPlatforms = 0


const createPlatform = ((randomSizePlatform, randomSizeWood) => {
    let platform = document.createElement("div")
    platform.classList.add("game__platform")
    platform.style.width = `${randomSizePlatform}px`
    platform.style.marginLeft = `${randomSizeWood}px`

    let wood = document.createElement("div")
    wood.classList.add("game__wood")

    platform.appendChild(wood)
    getTagPlatforms.push(platform)
    gameGraphic.appendChild(platform)
})
createPlatform(50, 0)

const generateRandomNumbers = ((number = 5) => {
    let currentNumber = 100
    for (let i = 0; i < number; i++) {
        const randomOffset = Math.floor(Math.random() * 80) + 1
        const randomSizePlatform = Math.floor(Math.random() * (90 - 30) + 30)
        const randomSizeWood = Math.floor(Math.random() * (200 - 20) + 20)
        currentNumber += 100 + randomOffset
        platforms.push(randomSizePlatform)
        spacePlatforms.push(randomSizeWood)
        createPlatform(randomSizePlatform, randomSizeWood)
    }
})
generateRandomNumbers();

let valueClickMouse = 0
let interval: number | null = null
let spacePlatformNumber = 0
const sumSpacePlatform: number[] = []
let py3 = 0
let scoreNumber = 0

const clickDown = (() => {
    interval = setInterval(() => {
        getTagPlatforms[flagPlatforms].children[0].style.height = `${valueClickMouse++}px`
    }, 0);
})

const clickUp = (() => {
    clearInterval(interval!)
    getTagPlatforms[flagPlatforms].children[0].style.transition = "0.3s"
    getTagPlatforms[flagPlatforms].children[0].style.transform = "rotate(90deg)"

    spacePlatforms.forEach((e, i) => {
        spacePlatformNumber = spacePlatformNumber + e + platforms[i]
        sumSpacePlatform.push(spacePlatformNumber)
        if ((valueClickMouse + py3) > (sumSpacePlatform[i] - platforms[i]) && (valueClickMouse + py3) < sumSpacePlatform[i]) {
            scoreNumber = scoreNumber + 1
            gameScore.innerHTML = scoreNumber + ''

            flagPlatforms = i + 1
            py3 = sumSpacePlatform[i]
            valueClickMouse = 0
            setTimeout(() => {
                gameHero.style.transition = "0.5s"
                gameHero.style.left = `${py3 + 5}px`
            }, 500);
            setTimeout(() => {
                gameGraphic.style.right = `${py3}px`
            }, 900);
            generateRandomNumbers(2)
        }
        else if (spacePlatforms.length === i + 1) {
            setTimeout(() => {
                gameHero.style.transition = "0.5s"
                gameHero.style.left = `${(valueClickMouse + py3)}px`
            }, 500);
            setTimeout(() => {
                getTagPlatforms[flagPlatforms].children[0].style.transform = "rotate(180deg)"
                gameHero.style.transition = "2.3s"
                gameHero.style.bottom = `-50%`
            }, 900);
            gameScene.style.pointerEvents = "none"
            setTimeout(() => {
                restart.style.display = 'block'
            }, 1500);
        }
    })
    spacePlatformNumber = 0
    sumSpacePlatform.length = 0
})
const createWood = (() => {
    flagPlatforms = 0
    py3 = 0
    valueClickMouse = 0
    gameHero.style.bottom = `${35}%`
    gameScene.addEventListener("mousedown", clickDown)
    gameScene.addEventListener("mouseup", clickUp)

    gameScene.addEventListener("touchstart", clickDown)
    gameScene.addEventListener("touchend", clickUp)
})
createWood()

restart.addEventListener('click', () => {
    changeBg()
    scoreNumber = 0
    gameScore.innerHTML = scoreNumber + ''
    restart.style.display = 'none'
    getTagPlatforms.forEach((e, i) => {
        e.remove()
    })
    gameHero.style.transition = "0s"
    gameHero.style.left = `${5}px`

    gameGraphic.style.right = `${0}px`
    getTagPlatforms.length = 0
    platforms.length = 0
    spacePlatforms.length = 0
    createPlatform(50, 0)
    generateRandomNumbers()
    gameScene.style.pointerEvents = null
    createWood()
})

const back: any = [
    "url('assets/back/bg_1.png')",
    "url('assets/back/bg_2.png')",
    "url('assets/back/bg_3.jpg')",
]

let num: number | null = null;
function changeBg() {
    let currentBg: number | null;
    do {
        currentBg = parseInt('' + Math.random() * back.length);
    } while (currentBg === num);
    num = currentBg;
    container.style.backgroundImage = back[num]
}
changeBg()
