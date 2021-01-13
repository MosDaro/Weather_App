import os
from dotenv import load_dotenv
from flask_httpauth import HTTPBasicAuth


auth = HTTPBasicAuth()

"""
Best practice will be to store the auth hased in db and 
provide to the frontend a token
"""
USER_DATA = {os.getenv("API_USER"): os.getenv("API_PASSWORD")}


# verify the basic auth of the get call
@auth.verify_password
def verify(username, password):
    if not (username and password):
        return False
    return USER_DATA.get(username) == password
