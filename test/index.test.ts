import { assert, test } from "vitest";
import { gradientToObject } from "../src";

test("It should parse linear-gradient", () => {
  const expected = {
    angle: 120,
    stops: [
      { color: "#a1c4fd", position: 10 },
      { color: "#c2e9fb", position: 80 },
    ],
    type: "linear-gradient",
  };

  assert.deepEqual(
    gradientToObject("linear-gradient(120deg, #a1c4fd 10%, #c2e9fb 80%)"),
    expected,
    "matches original"
  );
});


test("It should parse radial-gradient", () => {
  const expected = {
    type: 'radial-gradient',
    stops: [
      { color: 'rgba(63,94,251,1)', position: 20 },
      { color: 'rgba(252,70,107,1)', position: 90 }
    ],
    angle: 0
  }

  assert.deepEqual(
    gradientToObject("radial-gradient(circle, rgba(63,94,251,1) 20%, rgba(252,70,107,1) 90%)"),
    expected,
    "matches original"
  );
})