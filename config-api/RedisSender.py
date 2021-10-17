import redis
from decouple import config

REDIS_HOST = config('REDIS_HOST')
REDIS_PORT = config('REDIS_PORT')
REDIS_DB = config('REDIS_DB')
class Redis:
    client = ''
    def __init__(self):
        redis_url = f'redis://{REDIS_HOST}:{REDIS_PORT}/{REDIS_DB}'
        self.client = redis.StrictRedis.from_url(redis_url, decode_responses=True)
    def send_data(self, data: str):
        self.client.set('stored_config', data, ex=6000)
        self.client.publish('logger',data)