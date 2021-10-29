import json
import socket
from pydantic import BaseModel
from datetime import datetime
import requests
from RedisSender import Redis
class RequestData(BaseModel):
    user_token: str
    objects: list
    script_name: str
    user_config_name: str
    devices: list


class Controller:
    message_ctrl = Redis()
    def __init__(self):
        pass
    def service_info(self):
        return f"Service running at {socket.gethostbyname(socket.gethostname())}"

    def upload_info(self, req:RequestData):
        if req:
            data = {
                "type": "script-creation",
                "devices": req.devices,
                "time": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                "config_name": req.user_config_name,
                "script_name": req.script_name,
                "token": req.user_token
            }

            self.message_ctrl.send_data(json.dumps(data))
            return {"time": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                    "upload_status":"Script was successfully uploaded"}