async def join_uri(uri_parts):
    uri = "/".join(uri_parts)
    return uri


async def select_items_by_keys(dictionary: dict, keys):
    filtered = {item[0]: item[1] for item in dictionary.items()
                if item[0] in keys}
    return filtered
