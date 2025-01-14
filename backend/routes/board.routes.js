const express = require('express');
const router = express.Router();
const boardController = require('../controllers/board.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Ruta pública para obtener contenido
router.get('/', boardController.getContent);

// Ruta protegida para actualizar contenido
router.put('/', authMiddleware, boardController.updateContent);

module.exports = router;