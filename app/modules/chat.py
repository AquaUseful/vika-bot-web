import quart
import copy
import os
from app import session, logger
from app.utils import decorators, utils
try:
    from app import config
except ImportError:
    pass


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
    bot_uri = await utils.get_bot_uri()
    url = await utils.join_uri((bot_uri, "api", "chats", "info"))
    json = {"token": token}
    async with session.post(url, json=json) as resp:
        json_resp = await resp.json()
        return json_resp


async def get_chat_users(token, chat_info=None):
    if chat_info is None:
        chat_info = await get_chat_info(token)
    users = chat_info["members"]
    bot_uri = await utils.get_bot_uri()
    url = await utils.join_uri((bot_uri, "api", "users", "info"))
    json = {"ids": users}
    return await utils.make_post_req_json(url, json)


@blueprint.route("/chat/dashboard")
@decorators.need_token
async def dashboard():
    nav_items = copy.deepcopy(navbar_templ)
    nav_items[0]["active"] = True
    chat = await get_chat_info(quart.session["token"])
    return await quart.render_template("chat_dashboard.html", title="Dashboard", nav_items=nav_items, chat=chat)


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
    # Add some fields for tem[plate rendering
    for n, user in enumerate(users):
        users[n] = await utils.select_items_by_keys(user, keys)
        users[n]["is_admin"] = user["id"] in admins
        users[n]["is_banned"] = user["id"] in banned
    logger.debug("%s", users)
    bot_uri = await utils.get_bot_uri()
    api_uri = await utils.join_uri((bot_uri, "api", "users"))
    return await quart.render_template("chat_users.html", title="Users",
                                       nav_items=nav_items, users=users, api_uri=api_uri)


@blueprint.route("/chat/users/ban", methods=["POST"])
@decorators.need_token
@decorators.req_fields({"user_id": int})
async def ban_user():
    req_json = await quart.request.json
    bot_uri = await utils.get_bot_uri()
    url = await utils.join_uri((bot_uri, "api", "bans", "ban"))
    json = {"token": quart.session["token"], "user_id": req_json["user_id"]}
    resp = await utils.make_post_req_json(url, json)
    return quart.jsonify(resp)


@blueprint.route("/chat/users/kick", methods=["POST"])
@decorators.need_token
@decorators.req_fields({"user_id": int})
async def kick_user():
    req_json = await quart.request.json
    bot_uri = await utils.get_bot_uri()
    url = await utils.join_uri((bot_uri, "api", "kicks", "kick"))
    json = {"token": quart.session["token"], "user_id": req_json["user_id"]}
    resp = await utils.make_post_req_json(url, json)
    return quart.jsonify(resp)


@blueprint.route("/chat/users/unban", methods=["POST"])
@decorators.need_token
@decorators.req_fields({"user_id": int})
async def unban_user():
    req_json = await quart.request.json
    bot_uri = await utils.get_bot_uri()
    url = await utils.join_uri((bot_uri, "api", "bans", "unban"))
    json = {"token": quart.session["token"], "user_id": req_json["user_id"]}
    resp = await utils.make_post_req_json(url, json)
    return quart.jsonify(resp)


@blueprint.route("/chat/users/promote", methods=["POST"])
@decorators.need_token
@decorators.req_fields({"user_id": int})
async def promote_user():
    req_json = await quart.request.json
    bot_uri = await utils.get_bot_uri()
    url = await utils.join_uri((bot_uri, "api", "promotions", "promote"))
    json = {"token": quart.session["token"], "user_id": req_json["user_id"]}
    resp = await utils.make_post_req_json(url, json)
    return quart.jsonify(resp)


@blueprint.route("/chat/users/demote", methods=["POST"])
@decorators.need_token
@decorators.req_fields({"user_id": int})
async def demote_user():
    req_json = await quart.request.json
    bot_uri = await utils.get_bot_uri()
    url = await utils.join_uri((bot_uri, "api", "promotions", "demote"))
    json = {"token": quart.session["token"], "user_id": req_json["user_id"]}
    resp = await utils.make_post_req_json(url, json)
    return quart.jsonify(resp)


@blueprint.route("/chat/photo")
@decorators.need_token
async def photo():
    bot_uri = await utils.get_bot_uri()
    url = await utils.join_uri((bot_uri, "api", "chats", "photo"))
    json = {"token": quart.session["token"]}
    photo = await utils.make_post_req_bin(url, json)
    resp = await quart.make_response(photo)
    resp.headers.set("Content-Type", "image/jpeg")
    resp.headers.set("Content-Disposition", "attachment",
                     filename="chat_profile_photo.jpeg")
    return resp
