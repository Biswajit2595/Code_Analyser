# Code Analyzer

Welcome to the Code Analyzer application! This web-based platform is designed to assist developers in converting code between programming languages, debugging their code, and evaluating code quality. Leveraging the capabilities of OpenAI's GPT, this application aims to streamline the coding process, making it easier and more efficient.

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
- [Application Structure](#application-structure)
- [Frontend](#frontend)
- [Backend](#backend)
- [GPT Integration](#gpt-integration)
- [Installation](#installation)
- [Contributing](#contributing)
- [License](#license)

## Introduction

The primary goal of this application is to provide a set of essential features to assist developers:

- **Code Converter:** Easily convert your code from one language to another. It includes an editor for inputting code, a selection of the conversion language, and displays the converted code.

- **Code Debugging:** Debug your code with ease. The user can input code, request debugging, and the application will highlight issues and provide corrected code using GPT.

- **Code Quality Check:** Assess the quality of your code. Input your code, request a quality check, and the application will evaluate the code based on given parameters using GPT.

## Getting Started

To get started with the application, follow the instructions in the [Installation](#installation) section below.

## Usage

1. **Code Converter:**

    - Open the application.
    - Input your code in the editor.
    - Select the target language for code conversion from the dropdown menu.
    - Click the "Convert" button.
    - The converted code will be displayed for you.

2. **Code Debugging:**

    - Open the application.
    - Input your code in the editor.
    - Click the "Debug" button.
    - The application will highlight issues and provide corrected code or suggestions.

3. **Code Quality Check:**

    - Open the application.
    - Input your code in the editor.
    - Click the "Check Quality" button.
    - The application will evaluate the code based on given parameters and provide feedback on style, organization, and potential improvements.

## Application Structure

The application is structured into three main components:

### Frontend

- The user interface is built using React.js, HTML, and Chakra UI.
- An editor Monaco is implemented for users to input their code.
- Dropdown menus allow users to select the target language for code conversion.
- The application displays the output in a readable format.
- For debugging and quality check features, it highlights issues and provides suggestions.

### Backend

- The backend is implemented using Node.js.
- It handles three main services:
  1. **Code Conversion Service:** This service converts code from one language to another by interacting with the GPT model.
  2. **Code Debugging Service:** Debugging requests are processed by passing code to the GPT model and returning debugging output.
  3. **Code Quality Check Service:** Quality checks involve communicating with the GPT model and returning assessments of the code's quality.

### GPT Integration

- GPT integration is achieved using OpenAI's API.
- Prompts are structured appropriately for code conversion, debugging, and quality check tasks.
- The model's output is processed and presented to the user.

## Installation

To install and run the application, follow these steps:

1. Clone the repository to your local machine.

2. Install the necessary dependencies for the frontend and backend:

    ```bash
    cd frontend
    npm install

    cd ../backend
    npm install
    ```

3. Configure the GPT integration by providing the required API keys and credentials. Refer to the GPT documentation for more details.

4. Start the frontend and backend servers:

    - For the frontend, run:

    ```bash
    cd frontend
    npm run dev
    ```

    - For the backend, run:

    ```bash
    cd backend
    npm run server
    ```

5. Access the application in your web browser at `http://localhost:3000`.

## Contributing

We welcome contributions to enhance and expand the functionality of this application. If you'd like to contribute, please follow our [Contribution Guidelines](CONTRIBUTING.md).

Happy coding!
