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
