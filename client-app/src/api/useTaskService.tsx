import { useMemo } from 'react';
import TaskService from '../api/services/taskService';

function useTaskService() {
  const taskService = useMemo(() => new TaskService('http://localhost:5000'), []);

  return taskService;
}

export default useTaskService;