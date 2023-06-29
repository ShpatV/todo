const todoRepository = require("../repositories/todoRepository");

async function getAllTasks(req, res) {
  try {
    const tasks = await todoRepository.getAllTasks();
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getTaskById(req, res) {
  try {
    const { taskId } = req.params;
    const task = await todoRepository.getTaskById(taskId);

    if (!task) {
      res.status(404).json({ error: "Task not found" });
    } else {
      res.status(200).json(task);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function createTask(req, res) {
  try {
    const { title, category, description, dueDate } = req.body;

    // Perform data validation

    // Example validation: Checking if required fields are present
    if (!title || !category || !description) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    // Example validation: Checking if due date is in the future
    if (dueDate && new Date(dueDate) < new Date()) {
      res.status(400).json({ error: "Due date cannot be in the past" });
      return;
    }

    const createdTask = await todoRepository.createTask(title, category, description, dueDate);
    res.status(201).json(createdTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function updateTask(req, res) {
  try {
    const { taskId } = req.params;
    const { title, category, description, dueDate } = req.body;

    // Perform data validation

    // Example validation: Checking if required fields are present
    if (!title || !category || !description) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    // Example validation: Checking if due date is in the future
    if (dueDate && new Date(dueDate) < new Date()) {
      res.status(400).json({ error: "Due date cannot be in the past" });
      return;
    }

    const updatedTask = await todoRepository.updateTask(taskId, title, category, description, dueDate);

    if (!updatedTask) {
      res.status(404).json({ error: "Task not found" });
    } else {
      res.status(200).json(updatedTask);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function deleteTask(req, res) {
  try {
    const { taskId } = req.params;
    const deleted = await todoRepository.deleteTask(taskId);

    if (!deleted) {
      res.status(404).json({ error: "Task not found" });
    } else {
      res.status(200).json({ message: "Task was deleted" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};
