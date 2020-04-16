import quart
from app.utils import decorators

blueprint = quart.Blueprint("chats", __name__)

navbar_templ = (
    {"text": "Dashboard",
     "href": "#",
     "active": False},
    {"text": "Admin",
     "href": "#",
     "active": False},
    {"text": "Info",
     "href": "#",
     "active": False}
)


@blueprint.route("/chat/dashboard")
@decorators.need_token
async def dashboard():
    nav_items = navbar_templ
    nav_items[0]["active"] = True
    return await quart.render_template("chat_dashboard.html", title="Dashboard", nav_items=nav_items)
