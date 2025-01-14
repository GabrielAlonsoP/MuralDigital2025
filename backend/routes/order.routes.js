const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const authMiddleware = require('../middleware/auth.middleware');
const { uploadPdf } = require('../middleware/upload.middleware');

// Ruta pública
router.get('/current', orderController.getCurrent);

// Rutas protegidas
router.post('/upload', authMiddleware, uploadPdf.single('pdf'), orderController.upload);
router.delete('/:id', authMiddleware, orderController.delete);

module.exports = router;