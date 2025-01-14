const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staff.controller');
const authMiddleware = require('../middleware/auth.middleware');
const { uploadImage } = require('../middleware/upload.middleware');  // Asegúrate de que la importación sea así

// Rutas públicas
router.get('/', staffController.getAll);

// Rutas protegidas
router.post('/', 
    authMiddleware, 
    uploadImage.single('foto'), 
    staffController.create
);

router.put('/:id', 
    authMiddleware, 
    uploadImage.single('foto'), 
    staffController.update
);

router.delete('/:id', 
    authMiddleware, 
    staffController.delete
);

module.exports = router;

