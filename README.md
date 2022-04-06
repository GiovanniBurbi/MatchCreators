# MatchCreators
> Human Computer Interaction Project using Vuejs, Nodejs, Vuex, Vuetify, JSON-server and Figma.

## Prerequisites
In the development of this project has been used these tools and related versions:
* axios: 0.25.0,
* core-js: 3.6.5,
* date-fns: 2.28.0,
* json-server: 0.17.0,
* vue: 2.6.11,
* vue-router: 3.2.0,
* vuetify: 2.4.0,
* vuex: 3.4.0,
* @fortawesome/fontawesome-free: 6.0.0,
* node: 16.13.1,

## Brief introduction
The project **MatchCreators** is a prototype of a **responsive web application** developed after a process of needfinding to find and understand the features that this application must have. This app is developed with **Vuejs** using **Nodejs** as the package manager. The UI framework used is **Vuetify**, a Vue UI Library with components following the material design guide lines. In this application has been used a centralized store for all components: **Vuex**, a state management pattern and library for Vue.js applications, it ensures that the state of the application can only be mutated in a predictable fashion.

The goal of this project is apply the methodologies learned in the course of HCI, design and develop a prototype of an application based on the needs of the users with **usability** as the main focus. This project represent only the **first cycle of development** that includes the phases of needfinding, create personas, define the requirements of the app, create the graphic and interaction design (Wireframing and Mockup) using tools like **Figma**, develop a prototype and, at last, doing usability testing to have a feedback from the final user and restart the cycle fixing and improving all the aspects of the application.

The backend is not the focus of this project, so has been used **JSON-server**, a full fake REST API with CRUD operations, and using some timeouts to fake backend delays. To make HTTP requests has been used **Axios**, a promise based HTTP client for the browser and node.js.

For more details on the development process of the project and the tools used see the [Final Report]().
## Getting started
### Using IDE
* **Clone this repository** in your IDE, **Visual Studio Code** has been used for this project.
* Open the folder on VScode and in the terminal **install all the dependencies** using *nodejs* running this command:
  ```
  npm install
  ```
* Then **run the application** with:
  ```
  npm run serve
  ```
  This will start also json-server on *localhost:3000*
* After a bit, it will be created an URL with the running application.
* **Click on the URL** to open the page of the application
* **Register** a new profile (the new account info will be created in the local json file in *backend/db.json*) *or* **Login** using an already made account (in *backend/db.json* you can find some profiles you can use to access).

### Using CLI
* **Clone this repository**
* Open a terminal and navigate inside the root directory of the project
* **Install all dependencies** using *nodejs* with this command:
  ```
  npm install
  ```
* Then **run the application** with:
  ```
  npm run serve
  ```
  This will start also json-server on *localhost:3000*
* After a bit, it will be created an URL with the running application.
* **Click on the URL** to open the page of the application
* **Register** a new profile (the new account info will be created in the local json file in *backend/db.json*) *or* **Login** using an already made account (in *backend/db.json* you can find some profiles you can use to access).
       
### Mobile
To run and use this responsive web application on a **mobile device** you need to use the **Network URL** generated after the command *npm run serve*.
**This will not be enough** to use the application. In fact, JSON server for now runs on the localhost, so you can access it only from the computer where you compile the code.
So to **use the app on mobile** you need to **change few things**:

* From the root folder of this project go to: *src/services* and you will find the files *UserService.js* and *MatchService.js*
* Inside these two files you need to **change the baseURL** with the **IPV4 address of your computer** (you can get it from the *Network URL* after run the command *npm run serve*). There is a comment in the javascript files with the instructions to follow to allow running JSON-server with your IP Address and **not** with localhost.
* Then go to the root folder of the app and **open package.json**
* At the top of the file in *"scripts"* **replace** the line
  ```
  "serve": "npx json-server --watch backend/db.json & vue-cli-service serve",
  ```
  with:
  ```
  "serve": "npx json-server --watch backend/db.json --host 192.168.x.x & vue-cli-service serve"
  ```
In the IP address in the line above **replace the two 'x' with the values of your IPV4 of your computer**.

Now you can use the application from your mobile device:
* **Clone this repository** from your computer
* Open a terminal and navigate inside the root directory of the project
* **Install all dependencies** using *nodejs* with this command:
  ```
  npm install
  ```
* Then **run the application** with:
  ```
  npm run serve
  ```
  This will start also json-server on '< *your IPV4 Address* >:3000'
* **From a mobile device** connect to the same network of your computer and start a browser. At last, **use the Network URL generated in the above step**.


Some icons and images are taken from internet for educational purposes.
