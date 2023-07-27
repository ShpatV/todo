/* eslint-disable @typescript-eslint/no-var-requires */
const ErrorManager = require('../error/errorManager');
const todoService = require('../services/todoService');

async function getAllTasks(req, res) {
  try {
    const tasks = await todoService.getAllTasksFromAPIOrCache();
    res.status(200).json(tasks);
  } catch (error) {
    ErrorManager.handleInternalServerError(res, error);
  }
}


async function getTaskById(req, res) {
  try {
    const { taskId } = req.params;
    const task = await todoService.getTaskById(taskId);

    if (!task) {
      ErrorManager.handleNotFound(res, 'Task not found');
    } else {
      res.status(200).json(task);
    }
  } catch (error) {
    ErrorManager.handleInternalServerError(res, error);
  }
}

async function createTask(req, res, next) {
  try {
    const { title, category, description, due_date } = req.body;

    // Perform data validation

    // Example validation: Checking if required fields are present
    if (!title || !category || !description) {
      ErrorManager.handleBadRequest(res, 'Missing required fields');
      return;
      
    }

    // Example validation: Checking if due date is in the future
    if (due_date && new Date(due_date) < new Date()) {
      ErrorManager.handleBadRequest(res, 'Due date cannot be in the past');
      return;
    }

    if (!(await todoService.validCategory(category))) {
      ErrorManager.handleNotFound(res, 'Kategoria e caktuar nuk ekziston.');
      return;
    }

    if (!title || !category || !description) {
      ErrorManager.handleBadRequest(res, 'All fields must be filled.');
      return;
    }

    if ((title.length < 5 || title.length > 10) || (description.length < 5 || description.length > 10)) {
      ErrorManager.handleBadRequest(res, 'Title and description must be between 5 and 10 characters long.');
      return;
    }

    const createdTask = await todoService.createTask(title, category, description, due_date);
    res.status(201).json(createdTask);
  } catch (error) {
    // Kapni gabimet e lëshuara nga metoda "createTask" në klasën TodoService
    // dhe trajtoni ato siç është e nevojshme
    next(error);
  }
}

async function updateTask(req, res, next) {
  try {
    const { taskId } = req.params;
    const { title, category, description, due_date } = req.body;

    // Perform data validation

    // Example validation: Checking if required fields are present
    if (!title || !category || !description) {
      ErrorManager.handleBadRequest(res, 'Missing required fields');
      return;
    }

    // Example validation: Checking if due date is in the future
    if (due_date && new Date(due_date) < new Date()) {
      ErrorManager.handleBadRequest(res, 'Due date cannot be in the past');
      return;
    }
    if (!(await todoService.validCategory(category))) {
      ErrorManager.handleNotFound(res, 'Kategoria e caktuar nuk ekziston.');
      return;}

    const updatedTask = await todoService.updateTask(taskId, title, category, description, due_date);

    if (!updatedTask) {
      ErrorManager.handleNotFound(res, 'Task not found');
    } else {
      res.status(200).json(updatedTask);
    }
  } catch (error) {
    next(error);
  }
}



async function deleteTask(req, res) {
  try {
    const { taskId } = req.params;
    const deleted = await todoService.deleteTask(taskId);

    if (!deleted) {
      ErrorManager.handleNotFound(res, 'Task not found');
    } else {
      res.status(200).json({ message: 'Task was deleted' });
    }
  } catch (error) {
    ErrorManager.handleInternalServerError(res, error);
  }
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};
