import redis
import json
from decouple import config

REDIS_HOST = config('REDIS_HOST')
REDIS_PORT = config('REDIS_PORT')
REDIS_DB = config('REDIS_DB')
class Redis:
    client = ''
    def __init__(self):
        self.client = redis.StrictRedis(host=REDIS_HOST, port=REDIS_PORT, db=REDIS_DB)
    def send_data(self, data: str):
        self.client.publish('logger',data)
    def read_configs(self):
        stored_config = self.client.get('stored_config')
        if stored_config:
            return json.loads(stored_config.decode('utf-8'))