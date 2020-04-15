import quart

blueprint = quart.Blueprint("index", __name__)


@blueprint.route("/index")
async def index():
    if "token" in quart.session:
        return quart.redirect("/chat/dashboard")
    else:
        return quart.redirect("/login")
