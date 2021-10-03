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
        query = { config_name: msg.config_name, script_name: msg.script_name }
        options = { upsert: true, new: true, setDefaultsOnInsert: true };
        await configs.findOneAndUpdate(query, msg, options)
    }
    else if(msg.type === 'camera_events') {
        await events.create(msg)
    }
}); 
subscriber.subscribe("logger");