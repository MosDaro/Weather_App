import os
import sys
import requests
from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS, cross_origin

load_dotenv()

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

url = "http://api.openweathermap.org/data/2.5/forecast"

MAX_INT = sys.maxsize

# TODO add auth


@cross_origin()
@app.route("/get_lowest_temp")
def get_lowest_temp():
    # the lowest temp city
    lowest_temp = {"city": "", "temp_min": MAX_INT}

    # the data to send
    min_temp_cities = {
        "Tel-aviv": {
            "main": {"temp_min": MAX_INT},
            "is_min": False
        },
        "Berlin": {
            "main": {"temp_min": MAX_INT},
            "is_min": False
        },
        "Budapest": {
            "main": {"temp_min": MAX_INT},
            "is_min": False
        }
    }

    # loop through the given cities and update the lowest temperature
    for city in min_temp_cities:
        # parameters: city and api key
        params = {
            "q": city,
            "appid": os.getenv("APPID")
        }

        # list of current city forecast(5 days, every 3 hours)
        list_res = requests.get(url, params).json()["list"]

        # find the lowest temperature and set the main object
        for forecast in list_res:

            # current minimum temperature
            curr_temp_min = forecast["main"]["temp_min"]

            # set the lowest temperature object
            if curr_temp_min < min_temp_cities[city]["main"]["temp_min"]:
                min_temp_cities[city]["main"] = forecast["main"]
                if min_temp_cities[city]["main"]["temp_min"] < lowest_temp["temp_min"]:
                    lowest_temp["temp_min"] = min_temp_cities[city]["main"]["temp_min"]
                    lowest_temp["city"] = city

    # set the minimum temp city
    set_min_temp_city(min_temp_cities, lowest_temp)

    return min_temp_cities


def set_min_temp_city(min_temp_cities, lowest_temp):
    city = lowest_temp["city"]
    min_temp_cities[city]["is_min"] = True


if __name__ == "__main__":
    app.run()
