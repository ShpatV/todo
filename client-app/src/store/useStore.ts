import { useState, useEffect, useMemo } from 'react';
import TaskService from '../api/services/taskService';
import FormValidator from '../errors/FormValidator';
import ErrorManager from '../errors/ErrorManager';
import { Activity } from '../models/activity';

const useStore = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [id, setId] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<Date>(new Date());
  const [category, setCategory] = useState<string>('');
  const [showEditForm, setShowEditForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [titleError, setTitleError] = useState<string | undefined>();
  const [descriptionError, setDescriptionError] = useState<string | undefined>();
  const taskService = useMemo(() => new TaskService('http://localhost:5000'), []);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasks = await taskService.getAllTasks();
        setActivities(tasks);
      } catch (error) {
        ErrorManager.handleFrontendError('An error occurred while fetching tasks.');
      }
    };
    fetchTasks();
  }, [taskService]);

  const handleDelete = (id: string) => {
    taskService.deleteTask(id).then(() => {
      taskService.getAllTasks().then((tasks) => {
        setActivities(tasks);
      });
    });
  };

  const handleEdit = (activity: Activity) => {
    if (activity.id) {
      setId(activity.id.toString());
      setTitle(activity.title);
      setDescription(activity.description);
      setDate(activity.due_date);
      setCategory(activity.category_name || '');
      setShowEditForm(true);
    }
  };

  const handleUpdate = () => {
    const updatedActivity: Activity = {
      id: id,
      title: title,
      description: description,
      due_date: date,
      category_name: category,
      category: 1,
    };

    taskService.updateTask(updatedActivity).then(() => {
      taskService.getAllTasks().then((tasks) => {
        setActivities(tasks);
      
      });
    });
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTitle(value);
  
    // Validate title length
    if (value.trim() !== '' && (value.length < 5 || value.length > 10)) {
      setTitleError('Title must be between 5 and 10 characters long.');
    } else {
      setTitleError(undefined); // Fshij gabimin nëse titulli është i vlefshëm
    }
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDescription(value);
  
    // Validate description length
    if (value.trim() !== '' && (value.length < 5 || value.length > 10)) {
      setDescriptionError('Description must be between 5 and 10 characters long.');
    } else {
      setDescriptionError(undefined); // Fshij gabimin nëse përshkrimi është i vlefshëm
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate required fields
    if (!title || !category || !description) {
      ErrorManager.handleFrontendError('All fields must be filled.');
      return;
    }

    // Additional validation for title and description length
    if (title.trim() !== '' && (title.length < 5 || title.length > 10)) {
      ErrorManager.handleFrontendError('Title must be between 5 and 10 characters long.');
      return;
    }

    if (description.trim() !== '' && (description.length < 5 || description.length > 10)) {
      ErrorManager.handleFrontendError('Description must be between 5 and 10 characters long.');
      return;
    }

    setErrorMessage(''); // Clear the error message on successful form submission

    const newTask: Activity = {
      title: title,
      description: description,
      due_date: date,
      category: parseInt(category),
    };

    taskService.createTask(newTask).then(() => {
      setSuccessMessage('Task created successfully!');
      // Perform any additional actions after successful task creation
    }).catch(() => {
      ErrorManager.handleFrontendError('An error occurred while creating the task.');
    });
  };

  const pageCount = useMemo(() => Math.ceil(activities.length / 6), [activities]);

  const getDisplayedActivities = useMemo(() => {
    const startIndex = currentPage * 6;
    const endIndex = startIndex + 6;
    return activities.slice(startIndex, endIndex);
  }, [activities, currentPage]);

  const handlePageChange = (selectedPage: any) => {
    setCurrentPage(selectedPage.selected);
  };

  return {
    activities,
    id,
    title,
    setTitle,
    description,
    setDescription,
    date,
    setDate,
    category,
    setCategory,
    showEditForm,
    currentPage,
    handleSubmit,
    handleDelete,
    handleEdit,
    handleUpdate,
    pageCount,
    getDisplayedActivities,
    handlePageChange,
    errorMessage,
    successMessage,
    setShowEditForm,
    titleError,
    descriptionError,
    handleTitleChange,
    handleDescriptionChange,
  };
};

export default useStore;
