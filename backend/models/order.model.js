const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    archivo: {
        type: String,
        required: true
    },
    fechaSubida: {
        type: Date,
        default: Date.now
    },
    activo: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);