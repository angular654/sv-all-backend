import redis
import json
class Redis:
    client = ''
    def __init__(self):
        self.client = redis.StrictRedis(host='localhost', port=6379, db=0)
    def send_data(self, data: str):
        self.client.publish('logger',data)
    def read_configs(self):
        return json.loads(self.client.get('stored_config').decode('utf-8'))