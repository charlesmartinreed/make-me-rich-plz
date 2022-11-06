let numberEl = document.querySelector("#numbers-container");
let lottoTypeSelector = document.querySelector("#lotto-type-select");

const LottoTypes = {
  powerball: {
    whiteBallsNumRange: { minVal: 1, maxVal: 69 },
    coloredBallNumRange: { minVal: 1, maxVal: 26, ballColor: "red" },
    count: 6,
  },
  megamillions: {
    whiteBallsNumRange: { minVal: 1, maxVal: 70 },
    coloredBallNumRange: { minVal: 1, maxVal: 25, ballColor: "gold" },
    count: 6,
  },
};

let currentLottoType = "powerball";

function generateNumbers(lottoType) {
  clearNumbers();

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

  layoutNumbers(lottoNumbers);
}

function layoutNumbers(lottoNumbers) {
  for (const number of lottoNumbers) {
    numberEl.innerHTML += `<span class="number-result">${number}</span>`;
  }
}

function clearNumbers() {
  numberEl.innerHTML = "";
}

lottoTypeSelector.addEventListener("change", (e) => {
  currentLottoType = e.target.value;
  generateNumbers(LottoTypes[currentLottoType]);
});

window.addEventListener("DOMContentLoaded", (e) =>
  generateNumbers(LottoTypes[currentLottoType])
);
