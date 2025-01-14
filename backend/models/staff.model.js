const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
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
  foto: {
    type: String,
    required: true
  },
  orden: {
    type: Number,
    default: 0  // Para mantener el orden de visualización
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Staff', staffSchema);