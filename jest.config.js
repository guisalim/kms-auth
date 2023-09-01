/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    "^@swagger/(.*)$": "<rootDir>/build/$1",
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  setupFiles: ["dotenv/config"],
};