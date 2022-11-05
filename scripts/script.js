let numberEl = document.querySelector("#numbers-container");

const LottoTypes = {
  powerball: { minVal: 1, maxVal: 69, count: 6 },
};

function generateNumbers(lottoType) {
  let { minVal, maxVal, count } = lottoType;

  let lottoNumbers = Array(count)
    .fill(0, 0)
    .map(
      (oldValue) =>
        (oldValue = Math.floor(Math.random() * (maxVal - minVal) - minVal))
    );

  console.log(lottoNumbers);

  for (const number of lottoNumbers) {
    numberEl.innerHTML += `<span class="number-result">${number}</span>`;
  }
}

generateNumbers(LottoTypes.powerball);
