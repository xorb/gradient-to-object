import { STOP_VALUE_REGEX, WEB_COLOR_REGEX } from "./regexs";
import { valueToDegree } from "./util";

const getCleanStops = (options: string[]) => {
  const cleanStops: string[] = [];
  const stopValue = new RegExp(
    `(${WEB_COLOR_REGEX.source})|${STOP_VALUE_REGEX.source}`,
    "g"
  );
  options.map((option) => {
    const stopElement = option.match(stopValue)!;
    if (stopElement.length === 3) {
      cleanStops.push(`${stopElement[0]} ${stopElement[1]}`);
      cleanStops.push(`${stopElement[0]} ${stopElement[2]}`);
    } else {
      cleanStops.push(option);
    }
  });
  return cleanStops;
};

const getStops = (cleanStops: string[], gradientType: string) => {
  const isDeg = gradientType.includes("conic");
  const stopPostfix = isDeg ? "deg" : "%";
  const minValue = `0${stopPostfix}`;
  const maxValue = isDeg ? "360deg" : "100%";

  const stopValue = new RegExp(
    `(${WEB_COLOR_REGEX.source})|${STOP_VALUE_REGEX.source}`,
    "g"
  );
  const stops: (string | null)[][] = [];

  cleanStops.forEach((cleanStop, i) => {
    const stopElements = cleanStop.match(stopValue)!;
    const color = stopElements[0];
    const stop = stopElements[1];
    const value = stop
      ? [color, isDeg ? `${valueToDegree(stop)}deg` : stop]
      : [
          color,
          i === 0 ? minValue : i === cleanStops.length - 1 ? maxValue : null,
        ];
    stops.push(value);
  });
  return stops;
};

export const getGradientStops = (options: string[], gradientType: string) => {
  const isDeg = gradientType.includes("conic");
  const stopPostfix = isDeg ? "deg" : "%";

  const cleanStops = getCleanStops(options);
  let stops = getStops(cleanStops, gradientType);
  // Get a list of consecutive missing tab stops,
  // e.g. `[[1,1],[3,5]]` from this gradient:
  // `linear-gradient(red 0%, blue, red 20%, blue, blue, blue, red 100%)`
  // where stops 1, 3, 4 and 5 are missing.
  const missingStops = [];
  let found = false;
  for (let i = 0; i < stops.length; i++) {
    const isMissing = !stops[i][1];
    if (isMissing && !found) {
      missingStops.push([i]);
      found = true;
    }
    if (!isMissing && found) {
      missingStops[missingStops.length - 1].push(i - 1);
      found = false;
    }
  }

  // Generate values with proper postfix for missing stops
  for (let i = 0; i < missingStops.length; i++) {
    const start = missingStops[i][0];
    const end = missingStops[i][1];
    const preValue = parseFloat(stops[start - 1][1]!);
    const postValue = parseFloat(stops[end + 1][1]!);
    const length = end - start + 2;
    const increment = (postValue - preValue) / length;
    let value = preValue;
    for (let j = 0; j < length; j++) {
      value += increment;
      const printValue = +value.toFixed(2); // the `+` is necessary, converts back to number
      stops[start + j][1] = `${printValue}${stopPostfix}`;
    }
  }
  const colorStop = stops.map((stop) => {
    const [color, position] = stop;
    return {
      color,
      position: parseInt(position!),
    };
  });

  return colorStop;
};
