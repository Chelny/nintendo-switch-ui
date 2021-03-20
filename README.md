# Nintendo Switch UI (Dark Theme)

![Nintendo Switch UI demonstration](./web/src/images/app-demo.gif?raw=true)

This project demonstrates the UI and some functionalities of the Nintendo Switch. The technologies used are HTML, Javascript (React), CSS (Sass) and Node.js.

## Run the app locally

### 1- Clone the project on your computer

Open 2 terminals in the root directory then...

### 2- Start server

> _**NOTE:** You may skip this step if you're using the online API. In `web/src/app/Constants.js`, the stub API URL can be uncommented if you want to use it instead. By default, the online API URL is being used._

Type `cd server` then, execute `npm run dev`.
Open [http://localhost:3001](http://localhost:3001) in the browser to see if the server has successfully started. "The server is running." should be displayed. 

Games, navigation and users data are retreived from server.

### 3- Run app

Type `cd web` then, execute `yarn start`. The app should run in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The app has been tested in Chrome, Firefox and Safari so, there should be no worries to use those browsers.

The app is optimized for desktop only.

## Copyright

Images such as Mii avatars, game covers, navigation buttons and any other Nintendo Switch icons are owned by [Nintendo Co., Ltd](https://www.nintendo.co.jp/).\
The font used is [FOT-Rodin NTLG Pro](https://archive.org/download/Fontworks/Fonts/).
