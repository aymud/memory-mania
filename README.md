<h1 align="center">🧠 Memory Mania 🎮</h1>
<h2 align="center"><a href="https://memorymania.netlify.app//">View Live</a></h2>
<h2 align="center">A Memory Testing Game with React</h2>

---

## Contents

- [Overview](#overview)
- [Folder Structure](#folder-structure)
- [Running the Application Locally](#running-the-application-locally)
- [Prerequisites](#prerequisites)
- [Technologies and Concepts Used](#technologies-and-concepts-used)
- [Why React?](#why-react)
- [Contributing](#contributing)

## Overview

Memory Mania is a single-page React Application designed to test memory skills
in a fun and challenging way!
It generates random names and faces.
The objective of the game is to memorize the names and then test your memory by entering the correct names for the displayed images.

## Folder Structure
This React project was bootstrapped using [Vite](https://vitejs.dev/guide/).  
This folder structure separates the client and server parts of the application:

```
├── client/
├──── public/ - Contains the HTML template and any static assets
├──── src/ - Contains the source code for the React application
│     └── components/ - Stores React components and their tests used in the application
│     ├── contexts/ - Contains context providers for global state management
│     ├── hooks/ - Custom hooks used across application
│     ├── routes/ - Different routes for the application
│     │   ├── login.jsx  
│     ├── utils/ - Helper functions and classes
│     ├── App.tsx - Core component that manages the game's logic and user interface
│     ├── App.css
│     ├── index.html - Template file which is served up when script is run
│     ├── main.tsx - Entry point for rendering the React app into the HTML template
│     ├── themes.ts - Application themes that defines the colours
├──── .eslintrc.cjs - ESLint configuration for linting code
├──── .prettierrc - Prettier configuration for code formatting rules
├──── tsconfig.json - TypeScript configuration for compiler and linting options
├──── package.json - Configuration file for npm packages and project settings
├── server/
├──── server.js -  Server-side JavaScript file that serves as the backend for the application
├──── package.json - Configuration file for npm packages and project settings
└── README.md
```

## Running the Application Locally
Before you begin, ensure you have met the prerequisites, and then
follow these steps to run the application locally.
> **Because the project includes a client side and a server side, you need to install & run each separately.**
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

## Prerequisites
- Node.js: Make sure you have Node.js installed.
  Node.js includes npm (Node Package Manager) by default.  
  To confirm that Node.js is installed correctly, open your terminal or command prompt and run the following commands:
  - `node -v`: Displays the current version of Node.js.
  - `npm -v`: Displays the current version of npm.
- An Integrated Development Environment (IDE)
  - WebStorm
  - Visual Studio Code

> This project utilizes TypeScript for type checking, ESLint for
linting code, and Prettier for code formatting. This is to
enforce coding standards, maintain code consistency, and catch potential issues
> early in the development process.
> You can configure your code editor to automatically format code using the ESLint and Prettier config files.

## Technologies and Concepts Used

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

### Continuous Integration (CI) and Continuous Deployment (CD)

The project employs GitHub Actions workflows:

1. **CI Workflow**: Runs tests and checks code formatting on every push to the repository, ensuring the codebase remains
   robust and well-formatted.
2. **CD Workflow**: Deploys the front-end application to Netlify automatically after a successful push to the main
   branch, keeping
   the live version up-to-date with the latest changes.

## Contributing

Contributions are welcome and appreciated! If you'd like to contribute to this project, please follow these guidelines.

1. Fork the repository: Start by forking the repository to your GitHub account.
2. Clone the repository: Clone the forked repository to your local machine using git clone.
3. Create a new branch: Create a new branch for your changes using git checkout -b feature/my-feature or git checkout -b
   fix/my-fix depending on the type of contribution.
4. Make your changes: Make your desired changes to the codebase. Ensure that your changes adhere to the project's coding
   standards and conventions.
5. Test your changes: Test your changes thoroughly to ensure that they work as expected and do not introduce any
   regressions.
6. Commit your changes: Once you are satisfied with your changes, commit them to your forked repository with descriptive
   commit messages.
7. Push your changes: Push your changes to your forked repository on GitHub using git push.
8. Create a pull request: Finally, create a pull request from your forked repository to the original repository. Provide
   a detailed description of your changes in the pull request, and reference any related issues if applicable.
9. Review & Merge: Someone will review and provide feedback or comments if needed, once resolved your changed will be
   merged.

Hakuna Matata! 😊