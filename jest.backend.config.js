module.exports = {
    testEnvironment: 'node',
    setupFilesAfterEnv: ['./jest.setup.js'],
    testMatch: [
      "**/?(*.)+(spec|test).[jt]s?(x)"
    ],
    testPathIgnorePatterns: [
      "/node_modules/",
      "/public/"
    ],
    testTimeout: 30000,
    clearMocks: true,
    restoreMocks: true,
    collectCoverage: true,
    coverageDirectory: "coverage",
    collectCoverageFrom: [
      "**/server/**/*.{js,jsx}",
      "!**/node_modules/**",
      "!**/vendor/**"
    ]
  };