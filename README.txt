Weather App
Description:
    The Weather App presents the coldest weather in Tel-Aviv, Berlin, and Budapest for the next five days and markup which is the coldest.
Instalation (internet connection required)
    1. Download and install Node.js v14 https://nodejs.org/en/
    2. Navigate into the project directory weather-app/
    3. Open cmd/terminal and type "npm install" (it should install all the node dependencies)
    4. Download and install python3 https://www.python.org/downloads/
    5. Navigate into the api directory that is in the project (weather-app/api/)
    6. If you want to install the python dependencies in virtual environment follow this section otherwise skip to 6.
    1. in cmd/terminal type "pip3 install virtualenv" press enter (it will install virtual environment).
    2. in windows type "python -m virtualenv ." in unix/linux "virtualenv venv".
    3. activate virtual environment by typing in windows ".\scripts\activate" in unix/linux "source venv/bin/activate".
    7. type "pip3 install -r requirements.txt (its should install all the python dependencies).
    8. You're all set, now navigate back to the project directory (weather-app/)
Run
    9. if you installed python dependecies in virtual eviroment run in windows "npm run-script start-api-venv-win" in unix/linux "npm run-script start-api-venv-x",
        otherwise run in windows "npm run-script start-api-win" unix/linux "npm run-script start-api-x" it will start the restApi. 
    10. Open new cmd/terminal in the project directory and type "npm start" it will open your default browser with the app.
    11. The server will run on port 5000 and the UI will run on port 3000 (server get request require user and password admin:IBM).
    12. Have Fun :)