export const getAngle = (data: string, gradientType: string) => {
  let angle = 0;
  const degTurn = /(deg|turn|rad|grad)/g;
  const toDirection =
    /(to (left( top| bottom)|right( top| bottom)|top( right| left)?|bottom( right| left)?)?)/g;
  if (!gradientType.match(/(repeating-)?linear-gradient/)) {
    return angle;
  }

  const haveAngle = function () {
    return !!data.match(degTurn);
  };

  const getDirection = function () {
    const dir = data.match(toDirection);
    return dir && dir[0];
  };

  if (haveAngle()) {
    angle = parseInt(data, 10);
  } else {
    switch (getDirection()) {
      case "to top":
        angle = 0;
        break;
      case "to bottom":
        angle = 180;
        break;
      case "to left":
        angle = 270;
        break;
      case "to right":
        angle = 90;
        break;
      case "to right top":
      case "to top right":
        angle = 45;
        break;
      case "to left top":
      case "to top left":
        angle = 315;
        break;
      case "to right bottom":
      case "to bottom right":
        angle = 135;
        break;
      case "to left bottom":
      case "to bottom left":
        angle = 225;
        break;
      default:
        angle = 0;
    }
  }
  return angle;
};
