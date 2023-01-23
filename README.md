# RiceBook (Social Media Web App)

## Table of Contents

-   [Getting Started](#getting-started)
-   [Prerequisites](#prerequisites)
-   [Run App](#run-app)
-   [Information](#information)

### Getting Started

To get a local copy up and running follow these simple steps. Below images are the screenshots from the web app.
![main page](/screenshots/main.png)
![login page](/screenshots/login.png)
![signup page](/screenshots/signup.png)
![profile page](/screenshots/profile.png)
![post page](/screenshots/post.png)

### Prerequisites

1. Install [Node.js](https://nodejs.org/en/download/).
2. Install [npm](https://www.npmjs.com/get-npm).
3. Install depenencies for frontend and backend respectively.

    For frontend:

    ```bash
    cd frontend/; npm install
    ```

    For frontend:

    ```bash
    cd backend/; npm install
    ```

4. Change the .env.default file to .env file and update values in [backend](/backend/) folder respectively.

### Run App

1. Run the backend server (will start on port 3000 by default):

```bash
npm start
```

2. Run the frontend server (will start on port 4000 by default):

```bash
npm dev
```

## Information

To ensure proper functionality, this application requires cookies to be enabled. If you are using Safari, please make sure to turn off the "Prevent cross-site tracking" setting.

```
frontend: https://ricebook-client.surge.sh/
backend: https://ricebook-backend-final.herokuapp.com/
```
