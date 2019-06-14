[![CircleCI](https://circleci.com/gh/andela/andela-societies-frontend.svg?style=svg)](https://circleci.com/gh/andela/andela-societies-frontend)
[![Coverage Status](https://coveralls.io/repos/github/andela/andela-societies-frontend/badge.svg)](https://coveralls.io/github/andela/andela-societies-frontend)
# Andela Societies app (frontend)
Andela societies is an app that avails information about socities at Andela (Invictus, iStelle, Phoenix and Sparks) to everyone at Andela. The app also enables more interaction between Andelans through Societies.

<br />
<br />

<img width="1440" alt="Andela-Societies-Frontend-screenshot" src="https://res.cloudinary.com/dwuqrezjj/image/upload/v1539618394/homepage.png">
<br />

# Table of Contents

- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Testing](#testing)
- [FAQ](#faqs)

## Technology Stack

- React
- SCSS
- Redux
- NodeJS
- Webpack
- Jest
- Enzyme

## Installation
1. Install [`Node JS`](https://nodejs.org/en/).
2. To clone, run `git clone https://github.com/AndelaOSP/andela-societies-frontend.git`.
3. `cd` into the root of the **project directory**.
4. Install [`yarn`](https://yarnpkg.com/en/docs/install#mac-stable).
5. Run `yarn install` on the terminal to install dependecies.
6. Setup local development server.

- In your terminal, execute the following command:
  ```bash
    sudo nano /etc/hosts
  ```

- or if you are using vim, execute the following command:
  ```bash
    sudo vim /etc/hosts
  ```
  Otherwise, you can open your hosts file in your editor of choice.
- Add the following line to your `hosts` file:

  ```bash
    127.0.0.1 soc-dev.andela.com
  ```
- Save changes and quit the editor.

7. To start the application run `yarn start`

**Important note:**
If you intend to contribute to this project, you need to install `eslint` and ensure linting is working in your editor.

## Testing

**Unit tests** - Run `yarn test` on the terminal while within the **project root directory**. Unit testing is achieved through the use of `jest` package. `jest` is used to test javascript code in React applications.

To test the app in watch mode, Run `yarn test:dev`. This listens to changes in your files and runs the tests as soon as there's a change in the files.

#### Other commands
- `yarn build` builds the app for production.
- `yarn serve` starts the app in production mode.

### Support or Contribution

For any suggestions or contributions please do not hesistate to contact the owners of this repository.

Contributions to this project are welcomed by all, If you need to contribute, follow the steps below

- **Fork** the repository
- Follow [Installation and Setup](#installation) as explained earlier
- Create a branch off `develop` for the feature you wish to add
- Make neccessary changes, commit and raise a pull request against develop, conventions can be found on the [wiki page](https://github.com/AndelaOSP/andela-societies-frontend/wiki).
  **Note** when making contributions, please endevour to follow the [Airbnb](https://github.com/airbnb/javascript) javascript style guide. Also make sure to follow the [Engineering playbook](https://github.com/andela/engineering-playbook/tree/master/5.%20Developing/Conventions) for conventions.


## FAQ

See the andela-societies-frontend [wiki](https://github.com/AndelaOSP/andela-societies-frontend/wiki)

## Dev notice:
**Package installation:**
Use `yarn` to install packages. Do not install packages using `npm`. For more info, checkout this [issue](https://github.com/AndelaOSP/andela-societies-frontend/issues/61).

#### Running the sandbox
Follow the instructions on this [link](docker/dev/sandbox.md) to run it.

In case of any errors ask the DevOps Engineer in the team
