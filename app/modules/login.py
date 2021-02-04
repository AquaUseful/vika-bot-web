import quart
import quart.flask_patch
import aiohttp
from app import session, logger
from app.utils import utils
from app.data import login_form
try:
    from app import config
except ImportError:
    pass


blueprint = quart.Blueprint("login", __name__)


async def verify_token(token: str):
    bot_uri = await utils.get_bot_uri()
    url = await utils.join_uri((bot_uri, "api", "tokens", "verify"))
    json = {"token": token}
    async with session.post(url, json=json) as resp:
        json_resp = await resp.json()
        return json_resp["result"]


@blueprint.route("/login", methods=("GET", "POST"))
async def login():
    form = login_form.LoginForm()
    if form.validate_on_submit():
        token = form.token.data
        bot_uri = await utils.get_bot_uri()
        url = await utils.join_uri((bot_uri, "api", "tokens", "verify"))
        json = {"token": token}
        logger.debug("%s", token)
        logger.debug("%s", url)
        try:
            if await verify_token(token):
                quart.session["token"] = token
                return quart.redirect("/chat/dashboard")
            else:
                return await quart.render_template("login.html", title="Login",
                                                   form=form, message="Invalid token!")
        except aiohttp.ClientConnectorError as exc:
            logger.fatal("Connection to bot failed! (%s)", repr(exc))
            return await quart.render_template("login.html", title="Login", form=form,
                                               message="Connection to bot failed!")

    else:
        return await quart.render_template("login.html", title="Login", form=form)
