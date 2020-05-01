import quart
from app.utils import decorators

blueprint = quart.Blueprint("logout", __name__)


@blueprint.route("/logout")
@decorators.need_token
async def logout():
    del quart.session["token"]
    return quart.redirect("/login")
