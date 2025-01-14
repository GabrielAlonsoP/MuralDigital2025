const mongoose = require('mongoose');

const birthdaySchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    grado: {
        type: String,
        required: true,
        trim: true
    },
    fecha: {
        type: String,
        required: true
    },
    foto: {
        type: String,
        required: true,
        default: 0
    },
    orden: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Birthday', birthdaySchema);