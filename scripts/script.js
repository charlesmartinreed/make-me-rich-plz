let numberEl = document.querySelector("#numbers-container");
let lottoTypeSelector = document.querySelector("#lotto-type-select");
let lottoTypeOptionGroup = document.querySelector("#lotto-types");

const LottoTypes = [
  {
    lottoName: "Powerball",
    whiteBallsNumRange: { minVal: 1, maxVal: 69 },
    coloredBallNumRange: { minVal: 1, maxVal: 26, ballColor: "#ff2c2c" },
    count: 6,
  },
  {
    lottoName: "Mega Millions",
    whiteBallsNumRange: { minVal: 1, maxVal: 70 },
    coloredBallNumRange: { minVal: 1, maxVal: 25, ballColor: "#dfaf37" },
    count: 6,
  },
  {
    lottoName: "Super Lotto Plus",
    whiteBallsNumRange: { minVal: 1, maxVal: 47 },
    coloredBallNumRange: { minVal: 1, maxVal: 27, ballColor: "#47b5ff" },
    count: 6,
  },
];

let defaultLotto = "Powerball";
let currentlySelectedLotto;

function setLotto(updatedLottoName) {
  currentlySelectedLotto = LottoTypes.find(
    ({ lottoName }) => lottoName === updatedLottoName
  );

  // additionally, add the color for the selected panel
  generateNumbers(currentlySelectedLotto);
}

function generateNumbers(lottoType) {
  let {
    whiteBallsNumRange: { minVal: whiteMinVal, maxVal: whiteMaxVal },
    coloredBallNumRange: {
      minVal: colorMinVal,
      maxVal: colorMaxVal,
      ballColor,
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
      let proposedNumber = Math.ceil(
        Math.random() * (maxNum - minNum) - minNum
      );
      if (lottoNumbers.includes(proposedNumber)) {
        proposedNumber = Math.ceil(Math.random() * (maxNum - minNum) - minNum);
      } else {
        lottoNumbers = [...lottoNumbers, proposedNumber];
      }
    }

    return lottoNumbers;
  }
  layoutNumbers(lottoNumbers, ballColor);
}

function layoutNumbers(lottoNumbers, bonusBallColor) {
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

    let ballShadow = document.createElement("span");
    ballShadow.classList = "numberShadow";
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
    { transform: "translate(0) rotate(-360deg)" },
    { opacity: 1 },
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
    element.style.color = `initial`;
    element.style.boxShadow = `none`;
    element.style.border = `none`;
  });
}

function highlightSelectedLotto() {
  let element = document.querySelector(".lotto-option.selected");

  let {
    coloredBallNumRange: { ballColor },
  } = currentlySelectedLotto;

  let darkenedBallColor = darkenColor(ballColor, 20);
  element.style.background = ballColor;
  element.style.color = `white`;
  element.style.boxShadow = `0px 10px 16px ${darkenedBallColor}, 4px -2px 8px ${darkenedBallColor}, -4px -2px 8px ${darkenedBallColor}`;
}

lottoTypeSelector.addEventListener("change", (e) => {
  updatedLotto = e.target.value;
  setLotto(updatedLotto);
});

window.addEventListener("DOMContentLoaded", (e) => {
  setLotto(defaultLotto);
  addLottoOptions();
  highlightSelectedLotto();
});

function darkenColor(hexCode, darkenPercentage) {
  hexCode = hexCode.replace("#", "");
  let splitHexValues = [];
  let darkenFactor = darkenPercentage / 100;

  for (let i = 0; i < hexCode.length - 1; i += 2) {
    splitHexValues.push(hexCode.substring(i, i + 2));
  }

  // this is just quick, easy code so I'm not controlling for errors when value is below 0
  splitHexValues = splitHexValues.map((value) => {
    return Math.abs(
      Number(parseInt(value, 16)) -
        Math.round(Number(parseInt(value, 16)) * darkenFactor)
    ).toString(16);
  });

  return `#${splitHexValues.join("")}`;
}
