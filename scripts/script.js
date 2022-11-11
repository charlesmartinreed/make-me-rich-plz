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

let defaultLotto = "Super Lotto Plus";
let currentlySelectedLotto;

function setLotto(updatedLottoName) {
  currentlySelectedLotto = LottoTypes.find(
    ({ lottoName }) => lottoName === updatedLottoName
  );
}

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
  for (const lotto of LottoTypes) {
    let { lottoName } = lotto;

    let optionElement = document.createElement("div");
    optionElement.className = "lotto-option";
    optionElement.innerHTML = `
    <header>${lottoName}</header>
    `;

    lottoTypeOptionGroup.appendChild(optionElement);
  }
}

// not using, but still keeping it because it's was a fun piece of code to write :(
// function addLottoOptions() {
//   let keys = Array.from(Object.keys(LottoTypes)).map((key) => {
//     return splitByCapitalLetters(key);
//   });

//   function splitByCapitalLetters(testStr) {
//     let result = [];

//     let indices = [...testStr]
//       .map((value, index) => {
//         if (value === value.toUpperCase()) {
//           return index;
//         }
//       })
//       .filter((value) => value !== undefined);

//     for (let i = 0; i < indices.length; i++) {
//       result = [...result, testStr.substring(indices[i], indices[i + 1])];
//     }

//     return result.join(" ");
//   }

//   for (const key of keys) {
//     let optionElement = document.createElement("option");
//     optionElement.innerHTML = `
//     <option value="" selected>${key}</option>
//     `;

//     lottoTypeOptionGroup.appendChild(optionElement);
//   }
// }

lottoTypeSelector.addEventListener("change", (e) => {
  updatedLotto = e.target.value;
  setLotto(updatedLotto);
  generateNumbers(currentlySelectedLotto);
});

window.addEventListener("DOMContentLoaded", (e) => {
  addLottoOptions();
  setLotto(defaultLotto);
  generateNumbers(currentlySelectedLotto);
});
