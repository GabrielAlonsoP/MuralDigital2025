const Order = require('../models/order.model');

exports.getCurrent = async (req, res) => {
    try {
        const order = await Order.findOne({ activo: true }).sort('-createdAt');
        res.json(order);
    } catch (error) {
        res.status(500).json({ 
            message: 'Error al obtener la orden',
            error: error.message 
        });
    }
};

exports.upload = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Se requiere un archivo PDF' });
        }

        // Desactivar órdenes anteriores
        await Order.updateMany({}, { activo: false });

        const order = await Order.create({
            archivo: `http://localhost:3000/uploads/${req.file.filename}`,
            activo: true
        });

        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ 
            message: 'Error al subir la orden',
            error: error.message 
        });
    }
};

exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findByIdAndDelete(id);

        if (!order) {
            return res.status(404).json({ message: 'Orden no encontrada' });
        }

        res.json({ message: 'Orden eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ 
            message: 'Error al eliminar la orden',
            error: error.message 
        });
    }
};