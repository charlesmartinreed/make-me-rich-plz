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
  element.style.boxShadow = `0px 16px 16px ${darkenedBallColor}`;
  // element.style.border = `2px solid ${darkenedBallColor}`;
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
