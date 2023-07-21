import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  declaration: true,
  entries: ["src/index"],
  rollup: {
    emitCJS: true,
    inlineDependencies: true,
    esbuild: {
      minify: true,
    },
  },
});
