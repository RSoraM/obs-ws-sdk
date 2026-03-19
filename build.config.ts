import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  entries: ["src/index"],
  clean: true,
  declaration: true,
  rollup: {
    emitCJS: true,
    inlineDependencies: false,
  },
  externals: ["obs-websocket-js", "zod"],
});
