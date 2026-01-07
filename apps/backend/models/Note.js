const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true
    },
    category: {
        type: String,
        default: 'general'
    },
    tags: [String],
    isFavorite: {
        type: Boolean,
        default: false
    },
    workspaceId: {
        type: String,
        default: 'default'
    }
}, {
    timestamps: true
});

// Add text index for search
noteSchema.index({ title: 'text', content: 'text' });

module.exports = mongoose.model('Note', noteSchema);
