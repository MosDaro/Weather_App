import os
import sys
import requests
from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS, cross_origin
from flask_restful import Resource, Api
from authentication import auth


load_dotenv()
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
weather_uri = os.getenv("WEATHER_URI")
MAX_INT = sys.maxsize


# get the lowest temp cities
def get_lowest_temp():
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
            weather_uri, {"q": city, "appid": os.getenv("APPID")}).json()["list"]

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
    min_city = lowest_temp["city"]
    min_temp_cities[min_city]["is_min"] = True

    return min_temp_cities


# add prefix to the restapi
api = Api(app, prefix="/api")


# check the authentication and get the data from the rest
class PrivateResource(Resource):
    @auth.login_required
    @cross_origin()
    def get(self):
        return get_lowest_temp()


# add the routh
api.add_resource(PrivateResource, '/get_lowest_temp')

if __name__ == "__main__":
    app.run()
