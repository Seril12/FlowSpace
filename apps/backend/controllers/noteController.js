const Note = require('../models/Note');

// Get all notes with pagination and search
exports.getNotes = async (req, res) => {
    try {
        const { page = 1, limit = 10, search = '', category, isFavorite } = req.query;

        let query = {};

        if (search) {
            query.$text = { $search: search };
        }

        if (category) {
            query.category = category;
        }

        if (isFavorite !== undefined) {
            query.isFavorite = isFavorite === 'true';
        }

        const notes = await Note.find(query)
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const count = await Note.countDocuments(query);

        res.json({
            notes,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            totalCount: count
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getNoteById = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.json(note);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createNote = async (req, res) => {
    try {
        const note = new Note(req.body);
        const newNote = await note.save();
        res.status(201).json(newNote);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateNote = async (req, res) => {
    try {
        const note = await Note.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.json(note);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteNote = async (req, res) => {
    try {
        const note = await Note.findByIdAndDelete(req.params.id);
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.json({ message: 'Note deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
