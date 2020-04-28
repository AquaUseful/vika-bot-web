import aiohttp
from app import session


async def join_uri(uri_parts):
    uri = "/".join(uri_parts)
    return uri


async def select_items_by_keys(dictionary: dict, keys):
    filtered = {item[0]: item[1] for item in dictionary.items()
                if item[0] in keys}
    return filtered


async def make_post_req_json(url, json):
    async with session.post(url, json=json) as resp:
        json_resp = await resp.json()
        return json_resp


async def make_post_req_bin(url, json):
    async with session.post(url, json=json) as resp:
        bytes = await resp.content.read()
        return bytes
