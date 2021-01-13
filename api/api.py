import os
import sys
import requests
from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS, cross_origin
from flask_restful import Resource, Api
from flask_httpauth import HTTPBasicAuth

load_dotenv()
app = Flask(__name__)
api = Api(app, prefix="/api")
auth = HTTPBasicAuth()


USER_DATA = {os.getenv("API_USER"): os.getenv("API_PASSWORD")}


@auth.verify_password
def verify(username, password):
    if not (username and password):
        return False
    return USER_DATA.get(username) == password


class PrivateResource(Resource):
    @auth.login_required
    @cross_origin()
    def get(self):

        # the lowest temp city
        lowest_temp = {"city": "", "temp_min": MAX_INT}

        # the data to send
        min_temp_cities = {
            "Tel-aviv": {
                "main": {"temp_min": MAX_INT},
                "is_min": False,
                "weather_icon": ""
            },
            "Berlin": {
                "main": {"temp_min": MAX_INT},
                "is_min": False,
                "weather_icon": ""
            },
            "Budapest": {
                "main": {"temp_min": MAX_INT},
                "is_min": False,
                "weather_icon": ""
            }
        }

        # loop through the given cities and update the lowest temperature
        for city in min_temp_cities:

            # list of current city forecast(5 days, every 3 hours)
            list_res = requests.get(
                url, {"q": city, "appid": os.getenv("APPID")}).json()["list"]
            #

            # min_temp_cities[city]["weather"]

            # find the lowest temperature and set the main object
            for forecast in list_res:

                # current minimum temperature
                curr_temp_min = forecast["main"]["temp_min"]

                # set the lowest temperature object
                if curr_temp_min < min_temp_cities[city]["main"]["temp_min"]:
                    min_temp_cities[city]["main"] = forecast["main"]
                    min_temp_cities[city]["weather_icon"] = forecast["weather"][0]["icon"]

                    if min_temp_cities[city]["main"]["temp_min"] < lowest_temp["temp_min"]:
                        lowest_temp["temp_min"] = min_temp_cities[city]["main"]["temp_min"]
                        lowest_temp["city"] = city

        # set the minimum temp city
        set_min_temp_city(min_temp_cities, lowest_temp)

        return min_temp_cities


api.add_resource(PrivateResource, '/get_lowest_temp')

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

url = "http://api.openweathermap.org/data/2.5/forecast"

MAX_INT = sys.maxsize


def set_min_temp_city(min_temp_cities, lowest_temp):
    city = lowest_temp["city"]
    min_temp_cities[city]["is_min"] = True


if __name__ == "__main__":
    app.run()
