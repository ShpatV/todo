// TaskService.ts
import TaskRepository from '../../repository/TaskRepository';
import { Activity } from '../../models/activity';

class TaskService {
    taskRepository: TaskRepository;

    constructor(baseUrl: string) {
        this.taskRepository = new TaskRepository(baseUrl);
    }

    async getAllTasks(): Promise<Activity[]> {
        return this.taskRepository.getAllTasks();
    }

    async createTask(task: Activity): Promise<Activity> {
        return this.taskRepository.createTask(task);
    }

    async updateTask(task: Activity): Promise<Activity> {
        return this.taskRepository.updateTask(task);
    }

    async deleteTask(id: string): Promise<void> {
        return this.taskRepository.deleteTask(id);
    }
}

export default TaskService;
