const router = require('express').Router();
const { Task } = require('../../models');

/*
 * This route creates a new task.
 */
router.post('/', async (req, res) => {
    try {
        const newTask = await Task.create(req.body);
        res.status(200).json(newTask);
    } catch (error) {
        res.status(400).json(error);
    }
});

/*
 * This route gets all tasks.
 */
router.get('/', async (req, res) => {
    const tasks = await Task.find();
    res.status(200).json(tasks);
});

/*
 * This route gets a specific task by id.
 */
router.get('/:id', async (req, res) => {
    const task = await Task.findById(req.params.id);
    if (!task) {
        res.status(404).end();
    } else {
        res.status(200).json(task);
    }
});

/*
 * This route updates a specific task by id.
 */
router.put('/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            res.status(404).end();
        } else {
            task.update(req.body);
            await task.save();
            res.status(200).json(task);
        }
    } catch (error) {
        res.status(400).json(error);
    }
});

/*
 * This route deletes a specific task by id.
 */
router.delete('/:id', async (req, res) => {
    const task = await Task.findById(req.params.id);
    if (!task) {
        res.status(404).end();
    } else {
        await task.remove();
        res.status(200).end();
    }
});

module.exports = router;