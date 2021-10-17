const redis = require("redis");
const configs = require('./schemas/Config');
const events  = require('./schemas/Event');
const mongoose = require("mongoose");

require('dotenv').config({path: '../.env'})
const {MONGO_HOST, MONGO_PORT, MONGO_DB} = process.env

function connectDB() {
    mongoose.connect(`mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`);
}
connectDB()
const subscriber = redis.createClient();
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