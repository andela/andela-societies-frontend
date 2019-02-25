module.exports = {
  setupTestFrameworkScriptFile: "./src/setupTests.js",
  collectCoverageFrom: [
    "src/app/**/*.{js,jsx}",
    "!**/node_modules/**",
    "!src/app/Home/operations/reducers.js",
    "!src/app/Home/components/HomeComponent.js",
    "!src/app/Home/operations/index.js",
    "!src/app/Home/index.js"
  ]
}
