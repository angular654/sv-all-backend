from pymongo import MongoClient
class MongoSender:
    def __init__(self):
        self._connect()
    def _connect(self):
        return MongoClient('mongodb://localhost:27017/sv-history')
    def send(self,data):
        conn = self._connect()
        db = conn["sv-history"]
        res = db['events'].insert_one(data)
        # print(res)