const redis = require("redis");
const configs = require('./schemas/Config');
const events  = require('./schemas/Event');
const mongoose = require("mongoose");
function connectDB() {
    mongoose.connect('mongodb://localhost:27017/sv-history');
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