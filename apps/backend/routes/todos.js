const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

// GET all todos
router.get('/', todoController.getTodos);

// POST create todo
router.post('/', todoController.createTodo);

// GET single todo
router.get('/:id', todoController.getTodoById);

// PUT update todo
router.put('/:id', todoController.updateTodo);

// DELETE todo
router.delete('/:id', todoController.deleteTodo);

module.exports = router;
