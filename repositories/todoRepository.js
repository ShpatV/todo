const pool = require('../db');

class TodoRepository {
  static async getAllTasks() {
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

  static async getTaskById(taskId) {
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

  static async createTask(title, category, description, dueDate) {
    try {
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

  static async updateTask(taskId, title, category, description, dueDate) {
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

  static async deleteTask(taskId) {
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

  static async createCategory(name) {
    try {
      const query = `
        INSERT INTO categories (name)
        VALUES ($1)
        RETURNING *
      `;
      const values = [name];

      const result = await pool.query(query, values);
      const newCategory = result.rows[0];
      return newCategory;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

module.exports = TodoRepository;
