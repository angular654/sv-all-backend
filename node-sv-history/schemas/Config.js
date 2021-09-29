const { Schema, model } = require('mongoose')
ObjectId = Schema.Types.ObjectId;
const ConfigSchema = new Schema({
    userToken: {
        type: String,
        required: true,
        maxlength: 100
    },
    objects: {
        type: Array,
        required: true
    },
    scriptName: {
        type: String,
        required: true
    },
    userConfigName: {
        type: String,
        required: true
    },
    devices: {
        type: Array,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})
module.exports = model('configs', ConfigSchema)