import type { JestConfigWithTsJest } from "ts-jest";

// To grab Jest Default Configuration
// import { defaults } from "jest-config";

// To grab the configuration that comes with 'ts-jest/presets/js-with-ts-esm',
// import { jsWithTsESM } from "ts-jest/presets";

const jestConfig: JestConfigWithTsJest = {
  preset: "ts-jest/presets/js-with-ts-esm",
  rootDir: "../../..",
  testMatch: ["**/*.test.ts?(x)", "**/__fixtures__/*.test.ts?(x)"],
  setupFilesAfterEnv: ["<rootDir>/config/tests/jest/test-env-setup.ts"],
  testEnvironment: "jsdom",
  globals: {
    EXAMPLE_ONE: "hello_world_one",
  },
};

export default jestConfig;
