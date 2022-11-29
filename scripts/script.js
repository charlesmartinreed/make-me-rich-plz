let numberEl = document.querySelector("#numbers-container");
let lottoTypeSelector = document.querySelector("#lotto-type-select");
let lottoTypeOptionGroup = document.querySelector("#lotto-types");
let lottoDescriptionCaption = document.querySelector("#lotto-description");

import { LottoTypes, defaultBallColor, defaultLotto } from "./data.js";

let currentlySelectedLotto;

async function setLotto(updatedLottoName) {
  currentlySelectedLotto = LottoTypes.find(
    ({ lottoName }) => lottoName === updatedLottoName
  );

  let {
    lottoLink,
    lottoName,
    coloredBallNumRange: { bonusBallColor },
  } = currentlySelectedLotto;

  // additionally, add the color for the selected panel
  generateNumbers(currentlySelectedLotto);
  await updateCaptionText(lottoLink, lottoName, bonusBallColor);
}

async function updateCaptionText(lottoLink, lottoName, accentColor) {
  let captionHtml = `
    <a href="${lottoLink}" target="_blank" class="lotto-description-link">Find more the rules of <span style="color: ${accentColor}">${lottoName}</span> and your odds of winning</a>
  `;

  lottoDescriptionCaption.innerHTML = captionHtml;

  // call the function to layout the powerball numbers here
  // let currentJackPot = await getCurrentJackpotAmount();
  // console.log("current jackpot is", currentJackPot);
}

async function getCurrentJackpotAmount() {
  let { lottoJackpotURL } = currentlySelectedLotto;

  // what sucks is that each one of these will require drastically
  // different code for the fetch logic
  // might try to abstract this away from this file soon
  try {
    let pageRes = await fetch(lottoJackpotURL);
    let pageHTML = await pageRes.text();

    let parser = new DOMParser();
    let parsedDoc = parser.parseFromString(pageHTML, "text/html");

    let selectorStr = `div.lg-card-row.lg-jackpot-info div.lg-sum`;
    let jackpotElement = parsedDoc.querySelector(selectorStr).textContent;
    console.log(jackpotElement);

    return jackpotElement;

    // div.lg-card-row lg-jackpot-info -> div.lg-sum
    // document.querySelector('div.lg-card-row.lg-jackpot-info div.lg-sum').textContent
    // switch (currentlySelectedLotto.lottoName) {
    //   case "Super Lotto Plus":
    //     jackpotElement = parsedDoc
    //       .querySelector(jackpotValueDOMSelector)
    //       .textContent.split("\n")[1]
    //       .replace("!*", "");
    //     break;
    //   default:
    //     jackpotElement = parsedDoc.querySelector(
    //       jackpotValueDOMSelector
    //     ).textContent;
    //     break;
    // }

    // return jackpotElement;
  } catch (e) {
    console.error(e);
  }
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
}

function layoutNumbers(lottoNumbers, mainBallColor, bonusBallColor) {
  clearNumbers();

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

function clearNumbers() {
  numberEl.innerHTML = "";
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

function deselectLotto() {
  let elements = document.querySelectorAll(".lotto-option");

  elements.forEach((element) => {
    element.style.background = "transparent";
    element.style.color = `rgba(206, 206, 206, 0.5)`;
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
  return `#${splitHexValues.join("")}`;
}

// EVENT LISTENERS
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

lottoTypeSelector.addEventListener("change", (e) => {
  updatedLotto = e.target.value;
  setLotto(updatedLotto);
});

window.addEventListener("DOMContentLoaded", (e) => {
  setLotto(defaultLotto);
  addLottoOptions();
  highlightSelectedLotto();
});
