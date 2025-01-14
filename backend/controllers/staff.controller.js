const Staff = require('../models/staff.model');

exports.getAll = async (req, res) => {
    try {
        const staff = await Staff.find().sort('orden');
        res.json(staff);
    } catch (error) {
        res.status(500).json({ 
            message: 'Error al obtener personal destacado',
            error: error.message 
        });
    }
};

exports.create = async (req, res) => {
    try {
        const { nombre, grado } = req.body;
        
        const foto = req.file 
            ? `http://localhost:3000/uploads/${req.file.filename}`
            : 'assets/images/default-user.jpg';

        const staff = await Staff.create({
            nombre,
            grado,
            foto,
            orden: await Staff.countDocuments()
        });

        res.status(201).json(staff);
    } catch (error) {
        res.status(500).json({ 
            message: 'Error al crear personal destacado',
            error: error.message 
        });
    }
};

exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = {
            nombre: req.body.nombre,
            grado: req.body.grado
        };

        if (req.file) {
            updateData.foto = `http://localhost:3000/uploads/${req.file.filename}`;
        }

        const staff = await Staff.findByIdAndUpdate(
            id, 
            updateData,
            { new: true }
        );

        if (!staff) {
            return res.status(404).json({ message: 'Personal no encontrado' });
        }

        res.json(staff);
    } catch (error) {
        res.status(500).json({ 
            message: 'Error al actualizar personal',
            error: error.message 
        });
    }
};

exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        const staff = await Staff.findByIdAndDelete(id);

        if (!staff) {
            return res.status(404).json({ message: 'Personal no encontrado' });
        }

        res.json({ message: 'Personal eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ 
            message: 'Error al eliminar personal',
            error: error.message 
        });
    }
};