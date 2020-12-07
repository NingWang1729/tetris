This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `cd backend; npm run dev`

Runs the backend server in development mode.
Backend server runs on [http://localhost:5000](http://localhost:5000)

### How to download and run locally:

Visit https://gwabbitz-gaming-arcade.netlify.app/ instead. The site is already live.

Or, run the following command:

git clone https://github.com/NingWang1729/tetris.git

Make sure node package manager is installed. https://nodejs.org/en/download/package-manager/
Install the respective node packages inside package.json (e.g. react, react-router-dom, dateformat).
Use the command 'npm install *insert_dependency_name_here*' for each dependency.
This would install the node modules for the frontend react app.
To run the frontend, use 'npm start'.

Next, run the command 'cd backend' in your terminal to change directory to the backend app.
Install the respective dependencies inside package.json (e.g. body-parser, cors, express, mysql, nodemon).
Use the command 'npm install *insert_dependency_name_here*' for each dependency.
To run the backend, make sure your current directory is ~/backend and use 'npm run dev'.

To run your own backend, you will need a mysql server. Download mySQL and create the appropriate databases and configurations based on server.js.
This involves setting up the tables inside the database, the details of which can be found in the comments of setup.js. Create the tables according
to the settings according to the comments inside setup.js in ~/backend. This requires knowledge of SQL and databases, so avoid running the site locally.
The site is live at https://gwabbitz-gaming-arcade.netlify.app/

You will also need an ngrok.io port, which is connected through BACKEND_PORT in app.js. Download ngrok.io here: https://ngrok.com/download
Use './ngrok http 5000' in a separate terminal to start up the backend port. This is necessary to use https GET and POST requests on browsers.

### Backend Server

This project backend server uses an ngrok.io port and mySQL server managed by Ning Wang.
If the server is down, please contact ningwang1729@ucla.edu

### Contributing

If you would like to contribute to the project, clone the git repo and make a push request. Please contact Ning Wang at ningwang1729@ucla.edu for more information.
