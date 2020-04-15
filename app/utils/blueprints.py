from app import app, logger
from app.modules import root, index, login, chats


async def register_blueprints():
    logger.info("Loading modules...")
    app.register_blueprint(root.blueprint)
    app.register_blueprint(index.blueprint)
    app.register_blueprint(login.blueprint)
    app.register_blueprint(chats.blueprint)
    logger.info("Modules loaded")
