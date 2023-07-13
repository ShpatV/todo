import axios, { AxiosInstance } from 'axios';
import { Activity } from '../../app/layout/models/activity';

const baseURL = 'http://localhost:5000/api';

const apiAgent: AxiosInstance = axios.create({
  baseURL: baseURL,
});

export const getAllTasks = async () => {
  try {
    const response = await apiAgent.get<Activity[]>('/tasks');
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while fetching tasks.');
  }
};

export const getTaskById = async (taskId: string) => {
  try {
    const response = await apiAgent.get<Activity>(`/tasks/${taskId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while fetching the task.');
  }
};

export const createTask = async (newTask: Activity) => {
  try {
    const response = await apiAgent.post<Activity>('/tasks', newTask);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while creating the task.');
  }
};

export const updateTask = async (taskId: string, updatedTask: Activity) => {
  try {
    const response = await apiAgent.put<Activity>(`/tasks/${taskId}`, updatedTask);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while updating the task.');
  }
};

export const deleteTask = async (taskId: string) => {
  try {
    const response = await apiAgent.delete(`/tasks/${taskId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while deleting the task.');
  }
};

export default apiAgent;
