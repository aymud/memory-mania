<h1 align="center">Memory Mania</h1>
<h2 align="center"><a href="https://memorymania.netlify.app//">View Live</a></h2>
<h2 align="center">A Memory Testing Game with React</h2>

<div align="center">

[Overview](#overview) |
[Folder Structure](#folder-structure) |
[How to Run Locally](#running-the-application-locally) |
[Prerequisites](#prerequisites)
</div>

---

## Overview
A single page application created using React.
It generates random names and faces.
The objective of the game is to memorize the names and then test your memory by entering the correct names for the displayed images.
It's a fun and challenging way to improve your memory skills!

## Folder Structure
This React project was bootstrapped using [Vite](https://vitejs.dev/guide/).  
This folder structure separates the client and server parts of the application:

```
├── client/
├──── public/ - Contains the HTML template and any static assets
├──── src/ - Contains the source code for the React application
│     └── components/ - Stores React components used in the application
│     ├── pages/ - Different routes for the application
│     │   ├── login.jsx  
│     ├── utils/ - Helper functions and classes
│     ├── App.tsx - Core component that manages the game's logic and user interface
│     ├── App.css
│     ├── index.html - Template file which is served up when script is run
│     ├── main.tsx - Entry point for rendering the React app into the HTML template
│     ├── index.css - Global styles for the entire application
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
**Because the project includes a client side and a server side, you need to install & run each separately.**

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
   The `npm run dev` command starts the development server provided by Vite. It automatically compiles and serves the React application.
5. Once the development server starts,
   it will display the actual URL in the terminal. You can access the application by navigating to the URL shown in your terminal.  
   There will be a separate URL for the server that is running.

## Prerequisites
- Node.js: Make sure you have Node.js installed.
  Node.js includes npm (Node Package Manager) by default.  
  To confirm that Node.js is installed correctly, open your terminal or command prompt and run the following commands:
  - `node -v`: Displays the current version of Node.js.
  - `npm -v`: Displays the current version of npm.
- An Integrated Development Environment (IDE)
  - WebStorm
  - Visual Studio Code

## Why React?
To enhance my proficiency in React.  
This project primarily serves as a practice exercise for developing skills in React, 
a popular JavaScript library for building user interfaces. 
React provides a structured and efficient way to create interactive 
and dynamic web applications.

Hakuna Matata! 😊
