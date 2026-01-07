const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    phone: {
        type: String,
        trim: true
    },
    company: {
        type: String,
        trim: true
    },
    position: {
        type: String,
        trim: true
    },
    notes: {
        type: String
    },
    tags: [String],
    workspaceId: {
        type: String,
        default: 'default'
    }
}, {
    timestamps: true
});

// Add text index for search
contactSchema.index({ name: 'text', email: 'text', company: 'text' });

module.exports = mongoose.model('Contact', contactSchema);
