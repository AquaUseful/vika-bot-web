import asyncio
import hypercorn
import signal
import sys
from app import app, session, config
from app.utils import blueprints


shutdown_event = asyncio.Event()


@app.after_serving
async def shutdown():
    await session.close()


def signal_handler():
    shutdown_event.set()


asyncio.ensure_future(blueprints.register_blueprints())

hypercorn_cfg = hypercorn.Config()
hypercorn_cfg.bind = [f"{config.HOST}:{config.PORT}",
                      f"[{config.HOST_IPV6}]:{config.PORT}"]

loop = asyncio.get_event_loop()
loop.add_signal_handler(signal.SIGINT, signal_handler)
loop.run_until_complete(hypercorn.asyncio.serve(app, hypercorn_cfg,
                                                shutdown_trigger=shutdown_event.wait))
