import { getAngle } from "./angle";
import { getGradientStops } from "./color-stops";
import { getGradientOptions, getGradientType, removeItemAtIndex } from "./util";

export const gradientToObject = (gradient: string) => {
  const gradientOptions = getGradientOptions(gradient);
  const gradientType = getGradientType(gradient);
  const gradientAngle = gradientOptions[0];
  const gradientColors = removeItemAtIndex(gradientOptions, 0);

  const gradientStops = getGradientStops(gradientColors, gradientType);
  const angle = getAngle(gradientAngle, gradientType);

  const gradientObject = {
    type: gradientType,
    stops: gradientStops,
    angle: angle,
  };
  return gradientObject;
};
