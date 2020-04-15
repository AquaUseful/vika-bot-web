import quart
from app.utils import decorators

blueprint = quart.Blueprint("chats", __name__)


@blueprint.route("/chat/dashboard")
@decorators.need_token
async def dashboard():
    return await quart.render_template("chat_dashboard.html", title="Dashboard")
