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

Make sure node package manager is installed.
Install the respective node packages inside package.json (i.e. react, react-router-dom).
Use the command 'npm install *insert_dependency_name_here*' for each dependency.
This would install the node modules for the frontend react app.

Next, run the command 'cd backend' in your terminal to change directory to the backend app.
Install the respective dependencies inside package.json (i.e. body-parser, cors, express, mysql, nodemon).
Use the command 'npm install *insert_dependency_name_here*' for each dependency.

To run your own backend, you will need a mysql server. Download mySQL and create the appropriate databases and configurations based on server.js.
This requires knowledge of SQL and databases, so avoid running the site locally, because it is live at https://gwabbitz-gaming-arcade.netlify.app/ Instead, you can simply update the port according to the current port on this repository and listen to that backend port accordingly.

### Backend Server

This project backend server uses an ngrok.io port and mySQL server managed by Ning Wang.
If the server is down, please contact ningwang1729@ucla.edu

### Contributing

If you would like to contribute to the project, clone the git repo and make a push request. Please contact Ning Wang at ningwang1729@ucla.edu for more information.
