const express = require('express');
const router = express.Router();
const birthdaysController = require('../controllers/birthdays.controller');
const authMiddleware = require('../middleware/auth.middleware');
const { uploadImage } = require('../middleware/upload.middleware');

// Rutas públicas
router.get('/', birthdaysController.getAll);

// Rutas protegidas
router.post('/', authMiddleware, uploadImage.single('foto'), birthdaysController.create);
router.put('/:id', authMiddleware, uploadImage.single('foto'), birthdaysController.update);
router.delete('/:id', authMiddleware, birthdaysController.delete);

module.exports = router;