[![CircleCI](https://circleci.com/gh/AndelaOSP/andela-societies-frontend/tree/develop.svg?style=svg)](https://circleci.com/gh/AndelaOSP/andela-societies-frontend/tree/develop)
[![Coverage Status](https://coveralls.io/repos/github/AndelaOSP/andela-societies-frontend/badge.svg)](https://coveralls.io/github/AndelaOSP/andela-societies-frontend)
# Andela Societies app (frontend)
Andela societies is an app that avails information about socities at Andela (Invictus, iStelle, Phoenix and Sparks) to everyone at Andela. The app also enables more interaction between Andelans through Societies.

#### Installation requirements
- [Node.js](https://nodejs.org/).
- `yarn`. Here is how to [install yarn](https://www.npmjs.com/package/yarn/tutorial).
- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).

**Important note:**
If you intend to contribute to this project, you need to install `eslint` and ensure linting is working in your editor. 

#### Installation
```
git clone https://github.com/AndelaOSP/andela-societies-frontend.git
cd andela-societies-frontend
yarn install
yarn start
```
#### Testing 
```
yarn test
```
To test the app in watch mode, Run `yarn test:dev`. This listens to changes in your files and runs the tests as soon as there's a change in the files.

#### Other commands
- `yarn build` builds the app for production.
- `yarn serve` starts the app in production mode.

#### Dev notice:
**Package installation:**
Use `yarn` to install packages. Do not install packages using `npm`. For more info, checkout this [issue](https://github.com/AndelaOSP/andela-societies-frontend/issues/61).
