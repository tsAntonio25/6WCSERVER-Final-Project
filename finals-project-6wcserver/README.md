# finals-project-6wcserver

Main folder of the repository

# Frameworks/Modules Used:

## Frontend
  - Vue.js
  - Tailwind
  - Vue Router
  - Axios
  - JWT Decode
  - Vue-chart JS

## Backend
  - Node.js
  - Express.js
  - Cors
  - Mongoose
  - Body Parser
  - Express-Async-Handler
  - Bcrypt
  - JWT (Json Web Token)


# Project Setup For Frontend
## Change Directory to Frontend Folder
```sh
cd finals-project-6wcserver/frontend
```

## Setting up Frontend .env file
1. In the frontend directory, create an .env file if it doesn’t already exist
2. For local development, add the following:
```sh
 VITE_API_URL=http://localhost:3000
```
3. For production, set the link to your production API URL


## Install Dependencies
```sh
npm i tailwindcss @tailwindcss/vite vue-router axios jwt-decode vue-chartjs chart.js
```

## Run the project
```sh
npm run dev
```

# Project Setup for Backend

## Change Directory to Backend Folder
```sh
cd finals-project-6wcserver/backend
```

## Setting up Backend .env file
1. In the backend directory, create an .env file if it doesn’t already exist.
2. Go to MongoDB Atlas and sign in (or create an account)
3. Once logged in, click “Build a Cluster” and follow the prompts to set up your cluster.
4. After the cluster is set up, go to the “Clusters” section in the dashboard
5. Click on the “Connect” button.
6. Select “Connect your application”.
7. Copy the MongoDB connection string URL that appears.Replace the <username> and <password> placeholders with your own credentials.
8. In the .env file and add the following: 
```sh
MONGODB_URI=<Your MongoDB Connection String URL>
```
Replace the placeholder with the copied link
9. In the same .env file, add a SECRET_KEY for handling JWT tokens
```sh
SECRET_KEY=<Generated Secret Key>
```
We recommend using this website to generate secret key: https://jwtsecrets.com/
Or, You can generate a random string using your preferred random key generator or online tool.

## Install Dependencies
```sh
npm i express cors mongoose body-parser express-async-handler bcrypt jsonwebtoken
```

## Run the server
```sh
node server.js
```
