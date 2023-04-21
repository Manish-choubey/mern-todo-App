
// In this file, we define a `Todo` model using Sequelize. The model has three fields: `id`, `title`, `description`, and `status`. The `id` field is a UUID and serves as the primary key. The `title` and `description` fields are both strings and are required. The `status` field is an enum with four possible values: `done`, `pending`, `in progress`, and `completed`. It has a default value of `pending` and is required.


const express = require('express');
const { verifyToken } = require('../middleware/auth');
const Todo = require('../models/todo');

const router = express.Router();

router.post('/CreatTodo', verifyToken, async (req, res) => {
  try {
    const { title, description } = req.body;
    const todo = await Todo.create({ title, description });
    return res.status(201).json(todo);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal server error');
  }
});

router.get('/list', verifyToken, async (req, res) => {
  try {
    const todos = await Todo.findAll();
    return res.status(200).json(todos);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal server error');
  }
});

router.get('list/:id', verifyToken, async (req, res) => {
  try {
    const todo = await Todo.findOne({ where: { id: req.params.id } });
    if (!todo) {
      return res.status(404).send('Todo not found');
    }
    return res.status(200).json(todo);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal server error');
  }
});

router.put('edit/:id', verifyToken, async (req, res) => {
  try {
    const todo = await Todo.findOne({ where: { id: req.params.id } });
    if (!todo) {
      return res.status(404).send('Todo not found');
    }
    const { title, description, status } = req.body;
    todo.title = title || todo.title;
    todo.description = description || todo.description;
    todo.status = status || todo.status;
    await todo.save();
    return res.status(200).json(todo);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal server error');
  }
});

router.delete('delet/:id', verifyToken, async (req, res) => {
  try {
    const todo = await Todo.findOne({ where: { id: req.params.id } });
    if (!todo) {
      return res.status(404).send('Todo not found');
    }
    await todo.destroy();
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal server error');
  }
});

module.exports = router;
