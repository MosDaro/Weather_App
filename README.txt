Weather App
    Description:
        The Weather App present the coldest weather in Tel-Aviv, Berlin, and Budapest for the next five days and markup which is the coldest.
    instalation
        1. Download and install Node.js v14 https://nodejs.org/en/
        2. Navigate into the project directory weather-app/
        3. Open cmd/terminal and type "npm install" (it should install all the node dependencies)
        4. Download and install python3 https://www.python.org/downloads/
        5. Navigate into the api directory that in the project (weather-app/api/)
        6. If you want to install the python dependencies in virtual environment follow this section otherwise skip to 6.
        1. in cmd/terminal type "pip3 install virtualenv" press enter (it will install virtual environment).
        2. type "virtualenv venv" press enter (it will create a virtual environment directory called venv).
        3. activate virtual environment by typing "source venv/bin/activate" press enter.
        7. type "pip3 install -r requirements.txt (its should install all the python dependencies).
        8. You all set, now navigate back to the project directory (weather-app/)
    Run
        9. if you install python dependecies in virtual eviroment run "npm run-script start-api-venv"
         otherwise run "npm run-script start-api" it will start the restApi. 
        10. Open new cmd/terminal and type "npm start" it will open your default browser with the app.
        11. The server will run on port 5000 and the UI will run on port 3000
        12. Have Fun :smiley:
