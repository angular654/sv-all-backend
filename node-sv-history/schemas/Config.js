const { Schema, model } = require('mongoose')
ObjectId = Schema.Types.ObjectId;
const ConfigSchema = new Schema({
    token: {
        type: String,
        required: true,
        maxlength: 100
    },
    objects: {
        type: Array,
        required: true
    },
    script_name: {
        type: String,
        required: true
    },
    config_name: {
        type: String,
        required: true
    },
    devices: {
        type: Array,
        required: true
    },
    time: {
        type: String,
        required: true
    }
})
module.exports = model('configs', ConfigSchema)