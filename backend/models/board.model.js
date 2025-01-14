const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
    contenido: {
        type: String,
        required: true,
        default: ''
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Board', boardSchema);