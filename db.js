const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '1234',
  port: 5432,
});

async function getAllTasks() {
  try {
    const query = 'SELECT tasks.*, categories.name AS category_name FROM tasks LEFT JOIN categories ON tasks.category = categories.id';
    const result = await pool.query(query);
    const tasks = result.rows;
    return tasks;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getTaskById(taskId) {
  try {
    const query = 'SELECT tasks.*, categories.name AS category_name FROM tasks LEFT JOIN categories ON tasks.category = categories.id WHERE tasks.id = $1';
    const values = [taskId];
    const result = await pool.query(query, values);
    const task = result.rows[0];
    return task;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function createTask(title, category, description, dueDate) {
    try {
      // Kontrollojmë nëse kategoria ekziston
      const checkCategoryQuery = 'SELECT id FROM categories WHERE id = $1';
      const checkCategoryValues = [category];
      const categoryResult = await pool.query(checkCategoryQuery, checkCategoryValues);
      const categoryExists = categoryResult.rowCount > 0;
  
      if (!categoryExists) {
        throw new Error('Kategoria nuk ekziston');
      }
  
      const query = `
        INSERT INTO tasks (title, category, description, due_date)
        VALUES ($1, $2, $3, $4)
        RETURNING *
      `;
      const values = [title, category, description, dueDate];
  
      const result = await pool.query(query, values);
      const createdTask = result.rows[0];
      return createdTask;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
    

async function updateTask(taskId, title, category, description, dueDate) {
  try {
    const query = `
      UPDATE tasks
      SET title = $1, category = $2, description = $3, due_date = $4
      WHERE id = $5
      RETURNING *
    `;
    const values = [title, category, description, dueDate, taskId];

    const result = await pool.query(query, values);
    const updatedTask = result.rows[0];
    return updatedTask;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function deleteTask(taskId) {
    try {
      const query = 'DELETE FROM tasks WHERE id = $1';
      const values = [taskId];
  
      await pool.query(query, values);
      return true;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  
  module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
  };
  
