const Birthday = require('../models/birthday.model');

exports.getAll = async (req, res) => {
    try {
        const birthdays = await Birthday.find().sort('orden');
        res.json(birthdays);
    } catch (error) {
        res.status(500).json({ 
            message: 'Error al obtener cumpleaños',
            error: error.message 
        });
    }
};

exports.create = async (req, res) => {
    try {
        const { nombre, grado, fecha } = req.body;
        
        const foto = req.file 
            ? `http://localhost:3000/uploads/${req.file.filename}`
            : 'assets/images/default-user.jpg';

        const birthday = await Birthday.create({
            nombre,
            grado,
            fecha,
            foto,
            orden: await Birthday.countDocuments()
        });

        res.status(201).json(birthday);
    } catch (error) {
        res.status(500).json({ 
            message: 'Error al crear cumpleañero',
            error: error.message 
        });
    }
};

exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = {
            nombre: req.body.nombre,
            grado: req.body.grado,
            fecha: req.body.fecha
        };

        if (req.file) {
            updateData.foto = `http://localhost:3000/uploads/${req.file.filename}`;
        }

        const birthday = await Birthday.findByIdAndUpdate(
            id, 
            updateData,
            { new: true }
        );

        if (!birthday) {
            return res.status(404).json({ message: 'Cumpleañero no encontrado' });
        }

        res.json(birthday);
    } catch (error) {
        res.status(500).json({ 
            message: 'Error al actualizar cumpleañero',
            error: error.message 
        });
    }
};

exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        const birthday = await Birthday.findByIdAndDelete(id);

        if (!birthday) {
            return res.status(404).json({ message: 'Cumpleañero no encontrado' });
        }

        res.json({ message: 'Cumpleañero eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ 
            message: 'Error al eliminar cumpleañero',
            error: error.message 
        });
    }
};