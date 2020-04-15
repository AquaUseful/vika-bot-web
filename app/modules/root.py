import quart

blueprint = quart.Blueprint("root", __name__)


@blueprint.route("/")
async def root():
    return quart.redirect("/index")
