const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig');

module.exports = {
  clearMocks: true,
  collectCoverageFrom:[
    "src/services/**/*.ts"
  ],
  coverageDirectory: "coverage",
  coverageReporters: [
    "json",
    "lcov",
  ],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: "<rootDir>/src/" }),
  testMatch:[
    "<rootDir>/**/*.spec.ts"
  ],
  transform:{
    '^.+\\.ts$': 'ts-jest'
  },
  preset: '@shelf/jest-mongodb',
  testEnvironment: 'node',
};