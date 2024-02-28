var gameGraphic = document.querySelector(".game__graphic");
var container = document.querySelector(".container");
var gameHero = document.querySelector(".game__hero ");
var restart = document.querySelector(".game__restart");
var gameScene = document.querySelector(".game__scene");
var play = document.querySelector(".game__start");
var gameStartPage = document.querySelector(".game__start-page");
var gameScore = document.querySelector(".game__score");
play.addEventListener('click', function () {
    gameStartPage.classList.add("hidden");
    gameScore.classList.remove("hidden");
});
document.addEventListener("click", function (e) {
    play.classList.remove("hidden");
});
var platforms = [];
var spacePlatforms = [];
var getTagPlatforms = [];
var flagPlatforms = 0;
var createPlatform = (function (randomSizePlatform, randomSizeWood) {
    var platform = document.createElement("div");
    platform.classList.add("game__platform");
    platform.style.width = "".concat(randomSizePlatform, "px");
    platform.style.marginLeft = "".concat(randomSizeWood, "px");
    var wood = document.createElement("div");
    wood.classList.add("game__wood");
    platform.appendChild(wood);
    getTagPlatforms.push(platform);
    gameGraphic.appendChild(platform);
});
createPlatform(50, 0);
var generateRandomNumbers = (function (number) {
    if (number === void 0) { number = 5; }
    var currentNumber = 100;
    for (var i = 0; i < number; i++) {
        var randomOffset = Math.floor(Math.random() * 80) + 1;
        var randomSizePlatform = Math.floor(Math.random() * (90 - 30) + 30);
        var randomSizeWood = Math.floor(Math.random() * (200 - 20) + 20);
        currentNumber += 100 + randomOffset;
        platforms.push(randomSizePlatform);
        spacePlatforms.push(randomSizeWood);
        createPlatform(randomSizePlatform, randomSizeWood);
    }
});
generateRandomNumbers();
var valueClickMouse = 0;
var interval = null;
var spacePlatformNumber = 0;
var sumSpacePlatform = [];
var py3 = 0;
var scoreNumber = 0;
var clickDown = (function () {
    interval = setInterval(function () {
        getTagPlatforms[flagPlatforms].children[0].style.height = "".concat(valueClickMouse++, "px");
    }, 0);
});
var clickUp = (function () {
    clearInterval(interval);
    getTagPlatforms[flagPlatforms].children[0].style.transition = "0.3s";
    getTagPlatforms[flagPlatforms].children[0].style.transform = "rotate(90deg)";
    spacePlatforms.forEach(function (e, i) {
        spacePlatformNumber = spacePlatformNumber + e + platforms[i];
        sumSpacePlatform.push(spacePlatformNumber);
        if ((valueClickMouse + py3) > (sumSpacePlatform[i] - platforms[i]) && (valueClickMouse + py3) < sumSpacePlatform[i]) {
            scoreNumber = scoreNumber + 1;
            gameScore.innerHTML = scoreNumber + '';
            flagPlatforms = i + 1;
            py3 = sumSpacePlatform[i];
            valueClickMouse = 0;
            setTimeout(function () {
                gameHero.style.transition = "0.5s";
                gameHero.style.left = "".concat(py3 + 5, "px");
            }, 500);
            setTimeout(function () {
                gameGraphic.style.right = "".concat(py3, "px");
            }, 900);
            generateRandomNumbers(2);
        }
        else if (spacePlatforms.length === i + 1) {
            setTimeout(function () {
                gameHero.style.transition = "0.5s";
                gameHero.style.left = "".concat((valueClickMouse + py3), "px");
            }, 500);
            setTimeout(function () {
                getTagPlatforms[flagPlatforms].children[0].style.transform = "rotate(180deg)";
                gameHero.style.transition = "2.3s";
                gameHero.style.bottom = "-50%";
            }, 900);
            gameScene.style.pointerEvents = "none";
            setTimeout(function () {
                restart.style.display = 'block';
            }, 1500);
        }
    });
    spacePlatformNumber = 0;
    sumSpacePlatform.length = 0;
});
var createWood = (function () {
    flagPlatforms = 0;
    py3 = 0;
    valueClickMouse = 0;
    gameHero.style.bottom = "".concat(35, "%");
    gameScene.addEventListener("mousedown", clickDown);
    gameScene.addEventListener("mouseup", clickUp);
    gameScene.addEventListener("touchstart", clickDown);
    gameScene.addEventListener("touchend", clickUp);
});
createWood();
restart.addEventListener('click', function () {
    changeBg();
    scoreNumber = 0;
    gameScore.innerHTML = scoreNumber + '';
    restart.style.display = 'none';
    getTagPlatforms.forEach(function (e, i) {
        e.remove();
    });
    gameHero.style.transition = "0s";
    gameHero.style.left = "".concat(5, "px");
    gameGraphic.style.right = "".concat(0, "px");
    getTagPlatforms.length = 0;
    platforms.length = 0;
    spacePlatforms.length = 0;
    createPlatform(50, 0);
    generateRandomNumbers();
    gameScene.style.pointerEvents = null;
    createWood();
});
var back = [
    "url('assets/back/bg_1.png')",
    "url('assets/back/bg_2.png')",
    "url('assets/back/bg_3.jpg')",
];
var num = null;
function changeBg() {
    var currentBg;
    do {
        currentBg = parseInt('' + Math.random() * back.length);
    } while (currentBg === num);
    num = currentBg;
    container.style.backgroundImage = back[num];
}
changeBg();
