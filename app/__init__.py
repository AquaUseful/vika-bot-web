import quart
import quart.flask_patch
import flask_wtf
import hypercorn
import os
import logging
import aiohttp

logging.basicConfig(format="[%(asctime)s] (%(name)s) %(levelname)s: %(message)s",
                    level=logging.DEBUG)
logger = logging.getLogger(__name__)

app = quart.Quart(__name__)
app.config["SECRET_KEY"] = os.urandom(32)
#csrf = flask_wtf.CSRFProtect(app)

session = aiohttp.ClientSession()
