module.exports = {
  clearMocks: true,
  collectCoverageFrom:[
    "src/services/**/*.ts"
  ],
  coverageDirectory: "__tests__coverage",
  coverageReporters: [
    "json",
    "lcov",
  ],
  testMatch:[
    "<rootDir>__tests__/**/*.spec.ts"
  ],
  transform:{
    '^.+\\.ts$': 'ts-jest'
  },
  preset: '@shelf/jest-mongodb',
  testEnvironment: 'node',
};