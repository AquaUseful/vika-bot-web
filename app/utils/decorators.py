import quart
import functools


def need_token(func):
    @functools.wraps(func)
    async def wrapper(*args, **kwargs):
        if "token" in quart.session:
            return await func(*args, **kwargs)
        else:
            return quart.abort(403)
    return wrapper