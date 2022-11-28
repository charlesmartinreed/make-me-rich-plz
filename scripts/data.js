export const defaultBallColor = "#FFFFFF";
export const defaultLotto = "Powerball";

export const LottoTypes = [
  {
    lottoName: "Powerball",
    lottoJackpotURL:
      "https://lotteryguru.com/united-states-lottery-results/us-powerball",
    rulesAndOddsLink: "https://powerball.com/#powerball-prizes-and-odds",
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
    lottoJackpotURL:
      "https://lotteryguru.com/united-states-lottery-results/us-mega-millions",
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
    lottoJackpotURL:
      "https://lotteryguru.com/united-states-lottery-results/us-superlotto-plus",
    rulesAndOddsLink:
      "https://www.calottery.com/draw-games/superlotto-plus#section-content-4-3",
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
    lottoJackpotURL:
      "https://lotteryguru.com/united-states-lottery-results/us-megabucks-plus-2",
    rulesAndOddsLink: "https://vtlottery.com/games/megabucks",
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
    lottoJackpotURL:
      "https://lotteryguru.com/united-states-lottery-results/us-lucky-for-life-me",
    rulesAndOddsLink: "https://www.luckyforlife.us/odds-and-prizes/",
    whiteBallsNumRange: { minVal: 1, maxVal: 48, mainBallColor: "#469c56" },
    coloredBallNumRange: { minVal: 1, maxVal: 18, bonusBallColor: "#FAC213" },
    count: 6,
  },
  {
    // 13 states, mainly midwest
    // interestingly enough, this one uses red as the main ball color
    lottoName: "Lotto America",
    lottoJackpotURL:
      "https://lotteryguru.com/united-states-lottery-results/us-lotto-america-me",
    rulesAndOddsLink: "https://powerball.com/games/lotto-america",
    whiteBallsNumRange: { minVal: 1, maxVal: 52, mainBallColor: "#db2727" },
    coloredBallNumRange: { minVal: 1, maxVal: 10, bonusBallColor: "#002868" },
    count: 6,
  },
  {
    // East Coast mainly, but also includes Florida, Virginia, etc.
    lottoName: "Cash4Life",
    lottoJackpotURL:
      "https://lotteryguru.com/united-states-lottery-results/us-cash4life-fl",
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
