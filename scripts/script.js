let numberEl = document.querySelector("#numbers-container");
let lottoTypeSelector = document.querySelector("#lotto-type-select");
let lottoTypeOptionGroup = document.querySelector("#lotto-types");

const LottoTypes = {
  Powerball: {
    lottoName: "Powerball",
    whiteBallsNumRange: { minVal: 1, maxVal: 69 },
    coloredBallNumRange: { minVal: 1, maxVal: 26, ballColor: "#ff2c2c" },
    count: 6,
  },
  MegaMillions: {
    lottoName: "Mega Millions",
    whiteBallsNumRange: { minVal: 1, maxVal: 70 },
    coloredBallNumRange: { minVal: 1, maxVal: 25, ballColor: "#dfaf37" },
    count: 6,
  },
  SuperLottoPlus: {
    lottoName: "Super Lotto Plus",
    whiteBallsNumRange: { minVal: 1, maxVal: 47 },
    coloredBallNumRange: { minVal: 1, maxVal: 27, ballColor: "#47b5ff" },
    count: 6,
  },
};

let currentLottoType = "powerball";

function generateNumbers(lottoType) {
  clearNumbers();

  console.log(lottoType);
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
    return Array(arrLen)
      .fill(0, 0)
      .map(
        (emptyVal) =>
          (emptyVal = Math.ceil(Math.random() * (maxNum - minNum) - minNum))
      );
  }

  layoutNumbers(lottoNumbers, ballColor);
}

function layoutNumbers(lottoNumbers, bonusBallColor) {
  for (const number of lottoNumbers) {
    numberEl.innerHTML += `<span class="number-result">${number}</span>`;
  }

  colorizeBonusBall(bonusBallColor);
}

function colorizeBonusBall(color) {
  let spans = Array.from(document.querySelectorAll(".number-result"));
  spans[spans.length - 1].style.backgroundColor = `${color}`;
}

function clearNumbers() {
  numberEl.innerHTML = "";
}

function addLottoOptions() {
  let keys = Array.from(Object.keys(LottoTypes)).map((key) => {
    return splitByCapitalLetters(key);
  });

  function splitByCapitalLetters(testStr) {
    let result = [];

    let indices = [...testStr]
      .map((value, index) => {
        if (value === value.toUpperCase()) {
          return index;
        }
      })
      .filter((value) => value !== undefined);

    for (let i = 0; i < indices.length; i++) {
      result = [...result, testStr.substring(indices[i], indices[i + 1])];
    }

    return result.join(" ");
  }

  for (const key of keys) {
    let optionElement = document.createElement("option");
    optionElement.innerHTML = `
    <option value="" selected>${key}</option>
    `;

    lottoTypeOptionGroup.appendChild(optionElement);
  }

  // for (const lottoKey of Object.keys(LottoTypes)) {

  // }

  // for (const lotto of Object.values(LottoTypes)) {
  //   let optionElement = document.createElement("option");
  //   optionElement.innerHTML = `
  //   <option value="${lotto.lottoName}" selected>${lotto.lottoName}</option>
  //   `;

  //   lottoTypeOptionGroup.appendChild(optionElement);
  // }
}

lottoTypeSelector.addEventListener("change", (e) => {
  currentLottoType = e.target.value;
  console.log(
    "current lotto type is",
    currentLottoType,
    LottoTypes[currentLottoType]
  );
  // generateNumbers(LottoTypes[currentLottoType]);
});

window.addEventListener("DOMContentLoaded", (e) => {
  addLottoOptions();

  // generateNumbers(LottoTypes[currentLottoType]);
});
