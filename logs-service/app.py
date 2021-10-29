import gevent
from flask import Flask
from flask_sockets import Sockets
from  RedisListener import PubSubListener
from RedisListener import RedisChache
import requests
from decouple import config

pslistener = PubSubListener()
db = RedisChache()
app = Flask(__name__)
sockets = Sockets(app)
@sockets.route('/echo')
def echo_socket(ws):
    pslistener.register(ws)
    while not ws.closed:
        gevent.sleep(0.1)

SV_HISTORY_HOST = config('SV_HISTORY_HOST')
SV_HISTORY_PORT = config('SV_HISTORY_PORT_INT')
LOGS_SERVICE_PORT = config('LOGS_SERVICE_PORT')
NODE_SV_HISTORY = "http://"+SV_HISTORY_HOST+":"+SV_HISTORY_PORT

@app.route('/')
def hello():
    return 'Hello World!'


@app.route('/configs-history', methods=["GET"])
def conf_history():
    url = NODE_SV_HISTORY+'/configs'
    headers = {'Content-type': 'application/json', 'Accept': 'text/plain'}
    r = requests.get(url=url,headers=headers)
    return r

@app.route('/events-history', methods=["GET"])
def events_history():
    url = NODE_SV_HISTORY+'/events'
    headers = {'Content-type': 'application/json', 'Accept': 'text/plain'}
    r = requests.get(url=url,headers=headers)
    return r

if __name__ == "__main__":
    from gevent import pywsgi
    from geventwebsocket.handler import WebSocketHandler
    print("Started")
    server = pywsgi.WSGIServer(('0.0.0.0', LOGS_SERVICE_PORT), app, handler_class=WebSocketHandler)
    server.serve_forever()