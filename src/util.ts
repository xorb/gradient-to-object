import {
  GRADIENT_TYPES_REGEX,
  SPLIT_ELEMENTS_REGEX,
  WEB_COLOR_REGEX,
} from "./regexs";

export const radianToDegree = (radians: number) => {
  return radians * (180 / Math.PI);
};

export const turnToDegree = (turn: number) => {
  return turn * 360;
};

export const gradToDegree = (grads: number) => {
  return (grads / 400) * 360;
};

export const valueToDegree = (value: string) => {
  if (value.match(/rad/)) {
    return radianToDegree(parseFloat(value));
  } else if (value.match(/turn/)) {
    return turnToDegree(parseFloat(value));
  } else if (value.match(/grad/)) {
    return gradToDegree(parseFloat(value));
  } else {
    return value;
  }
};

export const getGradientOptions = (gradient: string) => {
  const valueInsideGradient = /.*gradient\s*\(((?:\([^)]*\)|[^)(]*)*)\)/;
  let allValuesInGradient = valueInsideGradient.exec(gradient) || [];
  const gradientValuesString = allValuesInGradient[1];
  const gradientOptions =
    gradientValuesString.match(SPLIT_ELEMENTS_REGEX) || [];
  const fixedGradientOptions = gradientOptions.map((option) =>
    option.toLocaleLowerCase().trim()
  );
  return fixedGradientOptions;
};

export const getGradientType = (gradient: string) => {
  const gradientType = gradient.match(GRADIENT_TYPES_REGEX);
  return gradientType ? gradientType[0] : "solid";
};

export const isColor = (value: string) => {
  const webColorRegex = new RegExp(WEB_COLOR_REGEX.source, "g");
  return value.match(webColorRegex);
};

export const removeItemAtIndex = <T>(arr: T[], index: number): T[] => {
  if (index < 0 || index >= arr.length) {
    throw new Error("Invalid index. Index out of bounds.");
  }

  const newArr = [...arr];
  newArr.splice(index, 1);
  return newArr;
};
