import React, { useState } from 'react';
import { Activity } from '../../app/layout/models/activity';
import apiAgent, { createTask } from './apiAgent';
import './styles/createTodo.css';

export default function CreateTask() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    // Validoni fushat e detyrueshme
    if (!title || !description || !date || !category) {
      setErrorMessage('Please fill in all fields.');
      return;
    }
  
    setErrorMessage(''); // Pastro mesazhin e gabimit në rastin kur formulari është dorëzuar me sukses
  
    const newTask: Activity = {
      title: title,
      description: description,
      due_date: new Date(date),
      category: parseInt(category),
    };
  
    try {
      const createdTask = await createTask(newTask);
      setSuccessMessage('Task created successfully!');
      // Perform any additional actions after successful task creation
    } catch (error: any) {
      console.error(error);
      if (error.error) {
        setErrorMessage(error.error);
      } else {
        setErrorMessage('An error occurred while creating the task.');
      }
    }
  };

  return (
    <div>
      <section className="section">
        <div className="card shadow">
          <div className="card-body">
            <div className="row">
              <div className="col-md-8 offset-md-2">
                <h6 className="text-center" style={{ fontSize: 20 }}>
                  Create Task
                </h6>
                <hr />
                <form onSubmit={handleSubmit}>
                  <div className="form-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Title Here"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div className="form-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Description Here"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <div className="form-group mb-3">
                    <input
                      type="date"
                      className="form-control"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
                  <div className="form-group mb-3">
                    <select
                      className="form-control"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="">Select Category</option>
                      <option value="1">Software</option>
                      <option value="2">DevOps</option>
                    </select>
                  </div>
                  <div className="form-group py-3 text-center">
                    <button type="submit" className="btn btn-primary shadow">
                      Submit
                    </button>
                  </div>
                  {errorMessage && (
                    <div className="alert alert-danger" role="alert">
                      {errorMessage}
                    </div>
                  )}
                  {successMessage && (
                    <div className="alert alert-success" role="alert">
                      {successMessage}
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
