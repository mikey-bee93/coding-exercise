module.exports = {
   verbose: true,
   moduleFileExtensions: ["js"],
   collectCoverageFrom: ["src/**/*.js", "!**/node_modules/**", "!src/index.js"],
   testMatch: ["**/src/**/*.test.js"],
   testEnvironment: "node"
};