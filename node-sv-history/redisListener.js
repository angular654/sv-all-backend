const redis = require("redis");
const configs = require('./schemas/Config');
const events  = require('./schemas/Event');
const mongoose = require("mongoose");

require('dotenv').config({path: '../.env'})
const {MONGO_HOST, MONGO_PORT, MONGO_DB, REDIS_HOST, REDIS_PORT} = process.env

function connectDB() {
    mongoose.connect(`mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`);
}
connectDB()
const subscriber = redis.createClient({host:REDIS_HOST, port:REDIS_PORT, db:0});
subscriber.on("message", async function(channel, message) {
    let msg = JSON.parse(message)
    if(msg.type === 'script-creation') {
        await configs.create(msg)
    }
    else if(msg.type === 'camera_events') {
        await events.create(msg)
    }
}); 
subscriber.subscribe("logger");