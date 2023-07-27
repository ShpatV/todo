import { Activity } from '../models/activity';

class TaskRepository {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    return response.json();
  }

  async getAllTasks(): Promise<Activity[]> {
    const response = await fetch(`${this.baseUrl}/api/tasks`);
    return this.handleResponse<Activity[]>(response);
  }

  async createTask(task: Activity): Promise<Activity> {
    const response = await fetch(`${this.baseUrl}/api/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    return this.handleResponse<Activity>(response);
  }

  async updateTask(task: Activity): Promise<Activity> {
    const response = await fetch(`${this.baseUrl}/api/tasks/${task.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    return this.handleResponse<Activity>(response);
  }

  async deleteTask(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/api/tasks/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
  }
}

export default TaskRepository;
