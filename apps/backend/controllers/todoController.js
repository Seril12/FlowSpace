const Todo = require('../models/Todo');

// Get all todos with pagination, search, and filter
exports.getTodos = async (req, res) => {
    try {
        const { page = 1, limit = 10, search = '', status, priority } = req.query;

        // Build query
        let query = {};

        // Search
        if (search) {
            query.$text = { $search: search };
        }

        // Filter by status
        if (status) {
            query.status = status;
        }

        // Filter by priority
        if (priority) {
            query.priority = priority;
        }

        const todos = await Todo.find(query)
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const count = await Todo.countDocuments(query);

        res.json({
            todos,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            totalCount: count
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get single todo
exports.getTodoById = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.json(todo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create todo
exports.createTodo = async (req, res) => {
    try {
        const todo = new Todo(req.body);
        const newTodo = await todo.save();
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update todo
exports.updateTodo = async (req, res) => {
    try {
        const todo = await Todo.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.json(todo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete todo
exports.deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.json({ message: 'Todo deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
