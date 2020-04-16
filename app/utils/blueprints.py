from app import app, logger
from app.modules import root, index, login, chat


async def register_blueprints():
    logger.info("Loading modules...")
    app.register_blueprint(root.blueprint)
    app.register_blueprint(index.blueprint)
    app.register_blueprint(login.blueprint)
    app.register_blueprint(chat.blueprint)
    logger.info("Modules loaded")
