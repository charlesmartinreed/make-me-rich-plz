export function darkenColor(hexCode, darkenPercentage) {
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