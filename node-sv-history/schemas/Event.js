const { Schema, model } = require('mongoose')
ObjectId = Schema.Types.ObjectId;
const EventSchema = new Schema({
    type: {
        type: String,
        default : 'camera_events'
    },
    event: {
        type: String,
        required: true
    },
    gestures: {
        type: Array,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})
module.exports = model('events', EventSchema)