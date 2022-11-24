let numberEl = document.querySelector("#numbers-container");
let lottoTypeSelector = document.querySelector("#lotto-type-select");
let lottoTypeOptionGroup = document.querySelector("#lotto-types");
let lottoDescriptionCaption = document.querySelector("#lotto-description");
let defaultBallColor = "#FFFFFF";

const LottoTypes = [
  {
    lottoName: "Powerball",
    rulesAndOddsLink: "https://powerball.com/games/home",
    whiteBallsNumRange: {
      minVal: 1,
      maxVal: 69,
      mainBallColor: defaultBallColor,
    },
    coloredBallNumRange: { minVal: 1, maxVal: 26, bonusBallColor: "#ff2c2c" },
    count: 6,
  },
  {
    lottoName: "Mega Millions",
    rulesAndOddsLink: "https://www.megamillions.com/How-to-Play.aspx",
    whiteBallsNumRange: {
      minVal: 1,
      maxVal: 70,
      mainBallColor: defaultBallColor,
    },
    coloredBallNumRange: { minVal: 1, maxVal: 25, bonusBallColor: "#dfaf37" },
    count: 6,
  },
  {
    // California
    lottoName: "Super Lotto Plus",
    rulesAndOddsLink: "https://www.calottery.com/draw-games/superlotto-plus",
    whiteBallsNumRange: {
      minVal: 1,
      maxVal: 47,
      mainBallColor: defaultBallColor,
    },
    coloredBallNumRange: { minVal: 1, maxVal: 27, bonusBallColor: "#47b5ff" },
    count: 6,
  },
  {
    // Maine, New Hampshire, Vermont tri-state
    lottoName: "Megabucks Plus",
    rulesAndOddsLink: "https://www.mainelottery.com/games/megabucksplus.shtml",
    whiteBallsNumRange: {
      minVal: 1,
      maxVal: 41,
      mainBallColor: defaultBallColor,
    },
    coloredBallNumRange: { minVal: 1, maxVal: 6, bonusBallColor: "#9C254D" },
    count: 6,
  },
  {
    // 26 states total
    // green regular balls, golden bonus ball
    lottoName: "Lucky 4 Life",
    rulesAndOddsLink: "https://www.luckyforlife.us/odds-and-prizes/",
    whiteBallsNumRange: { minVal: 1, maxVal: 48, mainBallColor: "#469c56" },
    coloredBallNumRange: { minVal: 1, maxVal: 18, bonusBallColor: "#FAC213" },
    count: 6,
  },
  {
    // 13 states, mainly midwest
    // interestingly enough, this one uses red as the main ball color
    lottoName: "Lotto America",
    rulesAndOddsLink: "https://powerball.com/games/lotto-america",
    whiteBallsNumRange: { minVal: 1, maxVal: 52, mainBallColor: "#db2727" },
    coloredBallNumRange: { minVal: 1, maxVal: 10, bonusBallColor: "#002868" },
    count: 6,
  },
  {
    // East Coast mainly, but also includes Florida, Virginia, etc.
    lottoName: "Cash4Life",
    rulesAndOddsLink: "https://www.flalottery.com/cash4Life",
    whiteBallsNumRange: {
      minVal: 1,
      maxVal: 60,
      mainBallColor: defaultBallColor,
    },
    coloredBallNumRange: { minVal: 1, maxVal: 4, bonusBallColor: "#1746A2" },
    count: 6,
  },
];

let defaultLotto = "Lucky 4 Life";
let currentlySelectedLotto;

function setLotto(updatedLottoName) {
  currentlySelectedLotto = LottoTypes.find(
    ({ lottoName }) => lottoName === updatedLottoName
  );

  // additionally, add the color for the selected panel
  generateNumbers(currentlySelectedLotto);
}

function updateCaptionText(lottoLink, lottoName, accentColor) {
  let captionHtml = `
    <a href="${lottoLink}" target="_blank" class="lotto-description-link">Find more about your odds of winning and the rules of <span style="color: ${accentColor}">${lottoName}</span> here 👋</a>
  `;

  lottoDescriptionCaption.innerHTML = captionHtml;
}

function generateNumbers(lottoType) {
  let {
    lottoName,
    rulesAndOddsLink: lottoLink,
    whiteBallsNumRange: {
      minVal: whiteMinVal,
      maxVal: whiteMaxVal,
      mainBallColor,
    },
    coloredBallNumRange: {
      minVal: colorMinVal,
      maxVal: colorMaxVal,
      bonusBallColor,
    },
    count,
  } = lottoType;

  let lottoNumbers = [
    ...createNumberArr(whiteMinVal, whiteMaxVal, count - 1),
    ...createNumberArr(colorMinVal, colorMaxVal, 1),
  ];

  function createNumberArr(minNum, maxNum, arrLen) {
    // using Math.ceil as a quick, dirty way of preventing -1 in the event that both max and min randomize to 1
    let lottoNumbers = [];

    // not as clean as using Array().fill().map
    // but I needed to be able to check that the numbers hadn't already been used
    // and moving the numbers out of scope just to keep track
    // seemed unnececssary
    // note that dupes between white/bonus balls are legal
    while (lottoNumbers.length < arrLen) {
      let proposedNumber = Math.floor(
        Math.random() * (maxNum - minNum) + minNum
      );
      if (lottoNumbers.includes(proposedNumber)) {
        proposedNumber = Math.floor(Math.random() * (maxNum - minNum) + minNum);
      } else {
        lottoNumbers = [...lottoNumbers, proposedNumber];
      }
    }

    return lottoNumbers;
  }

  layoutNumbers(lottoNumbers, mainBallColor, bonusBallColor);
  updateCaptionText(lottoLink, lottoName, bonusBallColor);
}

function layoutNumbers(lottoNumbers, mainBallColor, bonusBallColor) {
  clearNumbers();
  // let dropTiming = {
  //   easing: "cubic-bezier(0.6, -0.28, 0.735, 0.045)",
  //   duration: 500,
  //   iterations: 1,
  //   delay: 0,
  // };

  // let dropAnimation = [{ transform: "translateY(40px)" }];

  for (let ballIndex = 0; ballIndex < lottoNumbers.length; ballIndex++) {
    let ballElement = document.createElement("div");
    ballElement.classList = "number-result";
    ballElement.style.background = `radial-gradient(circle at 25px 25px, ${mainBallColor}, #000)`;

    // quick way of changing the font color
    // based upon the ball color
    // without getting too into the weeds

    if (ballIndex < lottoNumbers.length - 1) {
      ballElement.style.color =
        mainBallColor === defaultBallColor ? "#222" : "#FFF";
    }

    let ballShadow = document.createElement("span");
    ballShadow.classList = "number-result-shadow";
    ballElement.insertAdjacentElement("afterend", ballShadow);

    numberEl.appendChild(ballElement);

    animateLottoBall(ballElement, ballIndex, lottoNumbers[ballIndex]);
  }

  colorizeBonusBall(bonusBallColor);
}

function animateLottoBall(ballElement, ballPosition, ballLabel) {
  let spinTiming = {
    easing: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    duration: 1000,
    iterations: 1,
  };

  let spinAnimation = [
    { opacity: 0, transform: "translateY(-240px) rotate(0deg)" },
    { opacity: 1, transform: "translate(0) rotate(-360deg)" },
  ];

  ballElement.animate(spinAnimation, {
    ...spinTiming,
    delay: ballPosition * 100,
  });

  ballElement.textContent = `${ballLabel}`;
}

function colorizeBonusBall(color) {
  let spans = Array.from(document.querySelectorAll(".number-result"));
  let bonusBall = spans[spans.length - 1];
  bonusBall.classList.add("bonus");

  spans[
    spans.length - 1
  ].style.background = `radial-gradient(circle at 25px 25px, ${color}, #000)`;
}

function clearNumbers() {
  numberEl.innerHTML = "";
}

function addLottoOptions() {
  for (const lotto of LottoTypes) {
    let { lottoName } = lotto;

    let optionElement = document.createElement("div");
    optionElement.className = `${
      currentlySelectedLotto.lottoName === lottoName
        ? "lotto-option selected"
        : "lotto-option"
    }`;

    optionElement.innerHTML = `
    <span>${lottoName}</span>
    `;

    addLottoListener(optionElement, lottoName);
    lottoTypeOptionGroup.appendChild(optionElement);
  }
}

function addLottoListener(element, lottoName) {
  element.addEventListener("click", (e) => {
    document.querySelectorAll(".lotto-option").forEach((option) => {
      option.classList.remove("selected");
    });

    setLotto(lottoName);
    deselectLotto();
    element.classList.add("selected");
    highlightSelectedLotto();
  });
}

function deselectLotto() {
  let elements = document.querySelectorAll(".lotto-option");

  elements.forEach((element) => {
    element.style.background = "transparent";
    element.style.color = `rgba(206, 206, 206, 0.5)`;
    element.style.boxShadow = `none`;
    element.style.border = `none`;
  });
}

function highlightSelectedLotto() {
  let element = document.querySelector(".lotto-option.selected");

  let {
    coloredBallNumRange: { bonusBallColor },
  } = currentlySelectedLotto;

  let darkenedBallColor = darkenColor(bonusBallColor, 40);
  element.style.background = darkenedBallColor;
  element.style.color = `white`;
}

function darkenColor(hexCode, darkenPercentage) {
  hexCode = hexCode.replace("#", "");
  let splitHexValues = [];
  let darkenFactor = darkenPercentage / 100;

  for (let i = 0; i < hexCode.length - 1; i += 2) {
    console.log("unconverted hex is", hexCode.substring(i, i + 2));
    splitHexValues.push(hexCode.substring(i, i + 2));
  }

  // this is just quick, easy code so I'm not controlling for errors when value is below 0
  splitHexValues = splitHexValues
    .map((hexValue) => Math.abs(Number.parseInt(hexValue, 16)))
    .map((rgbValue) => Math.abs(rgbValue - Math.round(rgbValue * darkenFactor)))
    .map((darkenedValue) => {
      let darkenedHex = darkenedValue.toString(16);

      return darkenedHex.length === 1 ? `0${darkenedHex}` : darkenedHex;
    });

  console.log("combined converted hex is", splitHexValues);

  return `#${splitHexValues.join("")}`;
}

// EVENT LISTENERS
lottoTypeSelector.addEventListener("change", (e) => {
  updatedLotto = e.target.value;
  setLotto(updatedLotto);
});

window.addEventListener("DOMContentLoaded", (e) => {
  setLotto(defaultLotto);
  addLottoOptions();
  highlightSelectedLotto();
});
