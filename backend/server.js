const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();

// Importar rutas - Verifica que las rutas estén correctamente exportadas
const authRoutes = require('./routes/auth.routes');
const boardRoutes = require('./routes/board.routes');
const staffRoutes = require('./routes/staff.routes');
const birthdaysRoutes = require('./routes/birthdays.routes');
const orderRoutes = require('./routes/order.routes');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Carpeta uploads
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// Servir archivos estáticos
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Importante: Servir los archivos del frontend
app.use(express.static(path.join(__dirname, '../dist/diario-mural2/browser')));

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mural-digital')
    .then(() => console.log('MongoDB conectado exitosamente'))
    .catch(err => {
        console.error('Error al conectar MongoDB:', err);
        process.exit(1);
    });

// Configurar rutas de la API
app.use('/api/auth', authRoutes);
app.use('/api/board', boardRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/birthdays', birthdaysRoutes);
app.use('/api/orders', orderRoutes);

// Ruta catch-all para el frontend
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/diario-mural2/browser/index.csr.html'));
});

// Puerto y servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});