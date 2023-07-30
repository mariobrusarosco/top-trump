import type { JestConfigWithTsJest } from "ts-jest";

// To grab Jest Default Configuration
// import { defaults } from "jest-config";

// To grab the configuration that comes with 'ts-jest/presets/js-with-ts-esm',
// import { jsWithTsESM } from "ts-jest/presets";

const jestConfig: JestConfigWithTsJest = {
  preset: "ts-jest/presets/js-with-ts-esm",
  rootDir: "../../../src",
  testMatch: ["**/*.test.ts?(x)", "**/__fixtures__/*.test.ts?(x)"],
};

export default jestConfig;
