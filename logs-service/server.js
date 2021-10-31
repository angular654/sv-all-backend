
const server = require('http').Server();
const io = require('socket.io')(server, {cors: {
  origin: "*",
  methods: ["GET", "POST"]
}});
let Redis = require('ioredis');


const {REDIS_HOST} = process.env

let redis = new Redis({host:REDIS_HOST, port:6379, db:0});
redis.subscribe('logger');

const SOCKET_PORT = process.env.PORT || 5000 ;

redis.on('message', (channel, message) => {

  io.emit('info', JSON.parse(message))
})

server.listen(SOCKET_PORT);
console.log('logs-service running');