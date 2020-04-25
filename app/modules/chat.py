import quart
import copy
from app import session, config, logger
from app.utils import decorators, utils

blueprint = quart.Blueprint("chats", __name__)

navbar_templ = (
    {"text": "Dashboard",
     "href": "/chat/dashboard",
     "active": False},
    {"text": "Users",
     "href": "/chat/users",
     "active": False}
)


async def get_chat_info(token):
    url = await utils.join_uri((config.BOT_URI, "api", "chats", "info"))
    json = {"token": token}
    async with session.post(url, json=json) as resp:
        json_resp = await resp.json()
        return json_resp


async def get_chat_users(token, chat_info=None):
    if chat_info is None:
        chat_info = await get_chat_info(token)
    users = chat_info["members"]
    url = await utils.join_uri((config.BOT_URI, "api", "users", "info"))
    json = {"ids": users}
    async with session.post(url, json=json) as resp:
        json_resp = await resp.json()
        return json_resp


@blueprint.route("/chat/dashboard")
@decorators.need_token
async def dashboard():
    nav_items = copy.deepcopy(navbar_templ)
    nav_items[0]["active"] = True
    return await quart.render_template("chat_dashboard.html", title="Dashboard", nav_items=nav_items)


@blueprint.route("/chat/users")
@decorators.need_token
async def users():
    nav_items = copy.deepcopy(navbar_templ)
    nav_items[1]["active"] = True
    token = quart.session["token"]
    chat_info = await get_chat_info(token)
    admins = chat_info["admins"]
    banned = chat_info["banned"]
    users = list((await get_chat_users(token, chat_info)).values())
    keys = ("first_name", "last_name", "username", "id", "bot")
    for n, user in enumerate(users):
        users[n] = await utils.select_items_by_keys(user, keys)
        users[n]["is_admin"] = user["id"] in admins
        users[n]["is_banned"] = user["id"] in banned
    logger.debug("%s", users)
    api_uri = await utils.join_uri((config.BOT_URI, "api", "users"))
    return await quart.render_template("chat_users.html", title="Users",
                                       nav_items=nav_items, users=users, api_uri=api_uri)


@blueprint.route("/chat/users/ban", methods=["POST"])
@decorators.need_token
@decorators.req_fields({"user_id": int})
async def ban_user():
    req_json = await quart.request.json
    url = await utils.join_uri((config.BOT_URI, "api", "bans", "ban"))
    json = {"token": quart.session["token"], "user_id": req_json["user_id"]}
    async with session.post(url, json=json) as resp:
        json_resp = await resp.json()
        return quart.jsonify(json_resp)


@blueprint.route("/chat/users/kick", methods=["POST"])
@decorators.need_token
@decorators.req_fields({"user_id": int})
async def kick_user():
    req_json = await quart.request.json
    url = await utils.join_uri((config.BOT_URI, "api", "kicks", "kick"))
    json = {"token": quart.session["token"], "user_id": req_json["user_id"]}
    logger.debug(url)
    async with session.post(url, json=json) as resp:
        logger.debug(await resp.read())
        json_resp = await resp.json()
        return quart.jsonify(json_resp)

@blueprint.route("/caht")