# Gradient To Object

This packages takes css gradient string as an input and converts it to a JSON Object..

```ts
interface GradientObject {
  type: string;
  stops: { color: string; position: number }[];
  angle: number;
}
```

## Installation

```
pnpm i @scenify/gradient-to-object
```

## Usage

```ts
import { gradientToObject } from "@scenify/gradient-to-object";

const gradientString = "linear-gradient(120deg, #a1c4fd 10%, #c2e9fb 80%)";

const gradientObject = gradientToObject(gradientString);

console.log(gradientObject);
```
