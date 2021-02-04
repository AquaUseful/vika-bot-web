import asyncio
import hypercorn
import os
from app.utils import blueprints
from app import app, session
try:
    from app import config
except ImportError:
    pass


@app.after_serving
async def shutdown():
    await session.close()

blueprints.register_blueprints(app)

hypercorn_cfg = hypercorn.Config()
try:
    hypercorn_cfg.bind = [f"{config.HOST}:{config.PORT}",
                          f"[{config.HOST_IPV6}]:{config.PORT}"]
except NameError:
    hypercorn_cfg.bind = [f"{os.environ['HOST']}:{os.environ['PORT']}",
                          f"[{os.environ['HOST_IPV6']}]:{os.environ['PORT']}"]

loop = asyncio.get_event_loop()

loop.run_until_complete(hypercorn.asyncio.serve(app, hypercorn_cfg))
