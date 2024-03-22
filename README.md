<div align="center">
    <h1>🧠 Memory Mania 🎮</h1>
    <a href="https://memorymania.netlify.app/"><img src="https://img.shields.io/badge/Play-Game-green.svg"></a>
    <h2>A Memory Recall Game with React</h2>
</div>

---

## Contents

- [Overview](#1-overview)
- [Folder Structure](#2-folder-structure)
- [Running the Application Locally](#3--running-the-application-locally)
- [Prerequisites](#4-prerequisites)
- [Technologies and Concepts Used](#5--technologies-and-concepts-used)
- [Contributing](#6--contributing)

## `1` 🎯 Overview

Memory Mania is a single-page React Application designed to test memory skills
in a fun and challenging way!
It generates random names and faces, providing a practical solution for training memory to remember people.
Players memorize names and then test their recall by matching names with displayed images.

## `2` Folder Structure
This React project was bootstrapped using [Vite](https://vitejs.dev/guide/).  
This folder structure separates the client and server parts of the application.

```
├── client/
├──── cypress/              - Integration and E2E tests
├──── public/               - Contains the HTML template and any static assets
├──── src/                  - Contains the source code for the React application
│     └── components/       - Stores React components and their tests used in the application
│     ├── contexts/         - Contains context providers for global state management
│     ├── hooks/            - Custom hooks used across application
│     ├── routes/           - Different routes for the application
│     │   ├── login.jsx  
│     ├── utils/            - Helper functions and classes
│     ├── App.tsx           - Core component that manages the game's logic and user interface
│     ├── main.tsx          - Entry point for rendering the React app into the HTML template
│     ├── themes.ts         - Application themes that defines the colours
├──── index.html            - Template file which is served up when script is run
├──── .eslintrc.cjs         - ESLint configuration for linting code
├──── .prettierrc           - Prettier configuration for code formatting rules
├──── tsconfig.json         - TypeScript configuration for compiler and linting options
├──── package.json          - Configuration file for npm packages and project settings
├── server/
├──── server.js             - Server-side JavaScript file that serves as the backend for the application
├──── package.json          - Configuration file for npm packages and project settings
└── README.md
```

## `3` 🚀 Running the Application Locally
Before you begin, ensure you have met the prerequisites, and then
follow these steps to run the application locally.
> [!IMPORTANT]
>
> Because the project includes a client side and a server side, you need to install & run each separately.

<details><summary><b>Show instructions</b></summary>

1. **Clone the repository**: Start by cloning the repository to your local machine.
2. **Navigate to the client/server directory**: Go to each folder within the project's root directory.
3. **Install dependencies**: Install the project dependencies using npm.
   ```shell
    npm install
    ```
   Running npm install will ensure that your project has access to the required packages and libraries defined in the package.json file.
4. Start the development server:
    ```shell
    npm run dev
    ```
   The `npm run dev` command is defined in "scripts" in `package.json` and starts the development server provided by
   Vite. It automatically compiles and serves the React application.
5. Once the development server starts,
   it will display the actual URL in the terminal. You can access the application by navigating to the URL shown in your terminal.  
   There will be a separate URL for the server that is running.

</details>

## `4` Prerequisites
- Node.js: Make sure you have Node.js installed.
  Node.js includes npm (Node Package Manager) by default.  
  To confirm that Node.js is installed correctly, open your terminal or command prompt and run the following commands:
  - `node -v`: Displays the current version of Node.js.
  - `npm -v`: Displays the current version of npm.
- An Integrated Development Environment (IDE)
  - WebStorm
  - Visual Studio Code

> [!TIP]
>
> This project utilizes TypeScript for type checking, ESLint for
> linting code, and Prettier for code formatting. This is to
> enforce coding standards, maintain code consistency, and catch potential issues
> early in the development process.
> You can configure your code editor to automatically format code using the ESLint and Prettier config files.

## `5`  ✨ Technologies and Concepts Used

### Why React?

To enhance my proficiency in React.  
This project primarily serves as a practice exercise for developing skills in React,
a popular JavaScript library for building user interfaces.
React provides a structured and efficient way to create interactive
and dynamic web applications.

### React Ecosystem

The React ecosystem comprises a set of libraries and tools built around React.js
to streamline the development of web applications.
This project utilizes various aspects of the React ecosystem, including:

- React Router: For handling routing and navigation within the application.
- Styled Components: A CSS-in-JS library used for styling React components.
- Chakra UI: Chakra UI is used in this project for building user interface components with consistent styles and
  accessibility features.
- React Context API: Used for managing global state and passing data through the component tree without having to pass
  props manually at every level.
- React Hooks: Built in and custom hooks for managing state and side effects within functional components.
- React Testing Library / Jest: For writing unit tests for React components and ensuring their behavior as expected.
- Authentication: Simulated authentication using mock data and local storage for storing user credentials.
- API Requests: Utilizing Fetch API for making HTTP requests to fetch data from external APIs.
- Draggable Components: Incorporates draggable components from the React dnd kit package,
  enhancing user interaction and interface design.

### Continuous Integration (CI) and Continuous Deployment (CD)

The project employs GitHub Actions workflows:

1. **CI Workflow**: Runs tests and checks code formatting on every push to the repository, ensuring the codebase remains
   robust and well-formatted.
2. **CD Workflow**: Deploys the front-end application to Netlify automatically after a successful push to the main
   branch, keeping
   the live version up-to-date with the latest changes.

### Testing & Code Coverage

This project uses Jest & Cypress for testing. Unit tests are written in Jest and test individual components.
To enhance product quality and ensure it's free from bugs, end-to-end testing is done with Cypress.
Code coverage is generated after running each tests and is used to ensure tests are comprehensive
and cover as much of the code as possible.

## `6` 🤝🏻 Contributing

Changes and improvements are appreciated! Feel free to fork and open a pull request.
Make your changes in a specific branch and request to pull into `main`.
If you can, add some tests and make sure the app fully works before sending the PR to speed up the process.

Hakuna Matata! 😊