/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    "^@swagger/(.*)$": "<rootDir>/build/$1",
    "^@src/(.*)$": "<rootDir>/src/$1"
  },
  modulePathIgnorePatterns: ["<rootDir>/dist/"],
  setupFiles: ["dotenv/config"],
};