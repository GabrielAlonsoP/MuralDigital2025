const Board = require('../models/board.model');

exports.getContent = async (req, res) => {
    try {
        const board = await Board.findOne().sort({ updatedAt: -1 });
        res.json({ content: board ? board.contenido : '' });
    } catch (error) {
        res.status(500).json({ 
            message: 'Error al obtener contenido de la pizarra',
            error: error.message 
        });
    }
};

exports.updateContent = async (req, res) => {
    try {
        const { contenido } = req.body;
        
        let board = await Board.findOne();
        if (board) {
            board.contenido = contenido;
            await board.save();
        } else {
            board = await Board.create({ contenido });
        }

        res.json({ 
            message: 'Contenido actualizado correctamente',
            content: board.contenido 
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'Error al actualizar contenido',
            error: error.message 
        });
    }
};