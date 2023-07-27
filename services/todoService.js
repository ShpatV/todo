/* eslint-disable @typescript-eslint/no-var-requires */
const todoRepository = require('../repositories/todoRepository');
const Todo = require('../models/todo');
const ErrorManager = require('../error/errorManager');
const NodeCache = require('node-cache');
const cache = new NodeCache();
const cacheTTL = 3 * 60; // 3 minuta në sekonda

class TodoService {
  constructor() {
    this.todoRepository = todoRepository;
  }

  // Metodë për të marrë të gjitha task-et
  async getAllTasksFromAPIOrCache() {
    const cacheKey = 'tasks';
    const cachedData = cache.get(cacheKey);

    if (cachedData) {
      console.log('Te dhënat u gjetën në cache');
      return cachedData;
    }  

    // Nëse të dhënat nuk gjenden në cache, merrni ato nga API-ja
    const tasks = await this.getAllTasks(); // Thirrja është ndryshuar këtu, që të mos krijojë cikël të pafund në thirrje

    // Ruajeni të dhënat në cache me një çelës dhe kohë jetese (TTL)
    cache.set(cacheKey, tasks, cacheTTL);

    return tasks;
  }

  async getAllTasks() {
    try {
      return await this.todoRepository.getAllTasks();
    } catch (error) {
      console.error('Gabim gjatë marrjes së të gjitha task-eve:', error);
      throw new ErrorManager.handleInternalServerError('Ka ndodhur një gabim në marrjen e të gjitha task-eve.');
    }
  }

  // Metodë për të marrë një task me ID të dhënë
  async getTaskById(taskId) {
    try {
      return await this.todoRepository.getTaskById(taskId);
    } catch (error) {
      console.error('Gabim gjatë marrjes së task-ut me ID të dhënë:', error);
      throw new ErrorManager.handleInternalServerError('Ka ndodhur një gabim në marrjen e task-it me ID të dhënë.');
    }
  }

  async validTask(taskId) {
    try {
      const task = await this.todoRepository.getTaskById(taskId);
      return !!task; // Kthe true nëse task ekziston, false nëse nuk ekziston
    } catch (error) {
      console.error(error);
      throw new ErrorManager.handleBadRequest('Gabim gjatë verifikimit të task-ut.');
    }
  }

  // Funksion për të verifikuar nëse një kategori ekziston në databazë
  async validCategory(categoryId) {
    try {
      // Implementoni kodin për të kontrolluar nëse kategoria ekziston në databazë
      const category = await this.todoRepository.getCategoryById(categoryId);
      return !!category; // Kthe true nëse kategoria ekziston, false nëse nuk ekziston
    } catch (error) {
      console.error('Gabim gjatë verifikimit të kategorisë:', error);
      throw new ErrorManager.handleInternalServerError('Gabim gjatë verifikimit të kategorisë.');
    }
  }

  // Metodë për të shtuar një task të ri
  async createTask(title, category, description, due_date) {
    // Validoni të gjitha parametrat
    if (!title || !category || !description || !due_date) {
      throw new ErrorManager.handleBadRequest('Të gjitha fushat duhet të plotësohen.');
    }
  
    // Validoni se due_date është e vlefshme
    if (new Date(due_date) < new Date()) {
      throw new ErrorManager.handleBadRequest('Data e percaktuar është në të kaluarën.');
    }
  
    // Performoni këtë vetëm nëse doni të kontrolloni nëse kategoria ekziston në databazë
    // Validoni kategorinë nëse është e nevojshme
    if (!(await this.validCategory(category))) {
      throw new ErrorManager.handleNotFound('Kategoria e caktuar nuk ekziston.');
    }
  
    // Krijo objektin Todo me të dhënat valide
    const newTask = new Todo(null, title, category, description, due_date);
  
    // Krijoni taskun në bazën e të dhënave
    try {
      const createdTask = await this.todoRepository.createTask(
        newTask.title,
        newTask.categoryId,
        newTask.description,
        newTask.due_date
      );
  
      // Rifresko cache-n pasi është krijuar një task
      const updatedTasks = await this.getAllTasks();
      cache.set('tasks', updatedTasks, cacheTTL);
  
      return createdTask;
    } catch (error) {
      console.error('Gabim gjatë krijimit të task-ut të ri:', error);
      throw new ErrorManager.handleInternalServerError('Ka ndodhur një gabim në krijimin e task-ut të ri.');
    }
  }
  

  async updateTask(taskId, title, category, description, due_date) {
    // Validoni të gjitha parametrat
    if (!taskId || !title || !category || !description || !due_date) {
      throw new ErrorManager.handleBadRequest('Të gjitha fushat duhet të plotësohen.');
    }
  
    // Validoni se due_date është e vlefshme
    if (new Date(due_date) < new Date()) {
      throw new ErrorManager.handleBadRequest('Data e percaktuar është në të kaluarën.');
    }
  
    // Validoni taskun nëse është e nevojshme
    if (!(await this.validTask(taskId))) {
      throw new ErrorManager.handleNotFound('Tasku me ID të dhënë nuk ekziston.');
    }
  
    // Validoni kategorinë nëse është e nevojshme
    if (!(await this.validCategory(category))) {
      throw new ErrorManager.handleNotFound('Kategoria e caktuar nuk ekziston.');
    }
  
    // Përditëso taskun në bazën e të dhënave
    try {
      const updatedTasksCache = await this.todoRepository.updateTask(
        taskId,
        title,
        category,
        description,
        due_date
      );
  
      // Rifresko cache-n pasi është përditësuar një task
      const updatedTasks = await this.getAllTasks();
      cache.set('tasks', updatedTasks, cacheTTL);
      return updatedTasksCache;
  
    } catch (error) {
      console.error('Gabim gjatë përditësimit të task-ut:', error);
      throw new ErrorManager.handleInternalServerError('Ka ndodhur një gabim në përditësimin e task-ut.');
    }
  }

  // Metodë për të fshirë një task
  async deleteTask(taskId) {
    // Validoni të gjitha parametrat
    if (!taskId) {
      throw new ErrorManager.handleBadRequest('ID e task-ut duhet të jepet për të fshirë task-un.');
    }
  
    // Validoni taskun nëse është e nevojshme
    if (!(await this.validTask(taskId))) {
      throw new ErrorManager.handleNotFound('Tasku me ID të dhënë nuk ekziston.');
    }
  
    // Fshij taskun në bazën e të dhënave
    try {
      await this.todoRepository.deleteTask(taskId);
  
      // Rifresko cache-n pasi është fshirë një task
      const updatedTasks = await this.getAllTasks();
      cache.set('tasks', updatedTasks, cacheTTL);
      return true;
    } catch (error) {
      console.error('Gabim gjatë fshirjes së task-ut:', error);
      throw new ErrorManager.handleBadRequest('Ka ndodhur një gabim në fshirjen e task-ut.');
    }
  }
}

module.exports = new TodoService();
