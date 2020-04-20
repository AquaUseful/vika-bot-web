import quart
import functools
from app import logger


def need_token(func):
    @functools.wraps(func)
    async def wrapper(*args, **kwargs):
        if "token" in quart.session:
            return await func(*args, **kwargs)
        else:
            return quart.abort(401)
    return wrapper


def req_fields(fields: dict):
    def decorator(func):
        @functools.wraps(func)
        async def wrapper(*args, **kwargs):
            logger.debug("Testing reqest for required fields...")
            req_json = await quart.request.json
            if fields.keys() == req_json.keys() and \
                    all(map(lambda item: isinstance(item[1], fields[item[0]]), req_json.items())):
                logger.debug("Request successfully tested")
                return await func(*args, **kwargs)
            else:
                logger.debug("Failed to test request")
                await quart.abort(400, "Request missing required fields")
        return wrapper
    return decorator
