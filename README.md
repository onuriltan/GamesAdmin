# Inventory Manager

Inventory Manager is an app that you can create-read-update-delete games as an inventory.


## Technical Details
App uses Express.js for the backend and MongoDB for the database.
 Also it uses JWT authentication to login.

In the front-end I have used Vue.js and Vuex

I have used bootstrap default theme

## How to Use
You need to create a .env file in the root folder of the app and you need to 
give parameters as;

##### Node Environment
* MONGO_URL= "your mongodb connection url"
* ADMIN_EMAIL="initial admin email"
* ADMIN_PASSWORD="initial admin password"
* JWT_SECRET="secret to parse jwt tokens"

Also you need to create .env.development and .env.production files in the client folder to justify backend url's on development and production, for example in .env.development;

##### Vue Development Environment
* VUE_APP_AUTH_URL=http://localhost:5000/api/auth 
* VUE_APP_GAMES_URL=http://localhost:5000/api/game 
* VUE_APP_CONSOLES_URL=http://localhost:5000/api/console 
* VUE_APP_PUBLISHERS_URL=http://localhost:5000/api/publisher 
* VUE_APP_USERS_URL=http://localhost:5000/api/user 
* VUE_APP_LOGS_URL=http://localhost:5000/api/log 

##### Vue Production Environment
"Your production API URL's like above"

### Development
1. To run Node.js server, go to root folder and run `npm run dev`
2. To run the Vue CLI client, go to client folder and run `npm run serve`

### Production
To run the Node.js server with public distribution folder, 
1. Go to client folder and run `npm run build` to create public folder. It will create a folder called public inside server folder
2. Go to root folder and run `npm run start` to serve the public folder as well as api's
