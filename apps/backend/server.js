const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/database');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'FlowSpace API running' });
});

// Routes
app.use('/api/todos', require('./routes/todos'));
app.use('/api/notes', require('./routes/notes'));
app.use('/api/contacts', require('./routes/contacts'));

app.listen(PORT, () => {
    console.log(`🚀 FlowSpace API running on port ${PORT}`);
});
