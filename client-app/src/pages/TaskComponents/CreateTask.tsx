import React, { useState } from 'react';
import useStore from '../../store/useStore';
import '../../components/styles/createTodo.css';
import FormValidator from '../../errors/FormValidator';

export default function CreateTask() {
  const {
    title,
    description,
    date,
    setDate,
    category,
    setCategory,
    handleSubmit,
    errorMessage,
    successMessage,
    handleTitleChange,
    titleError,
    handleDescriptionChange,
    descriptionError,

  } = useStore();

  

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
                      onChange={handleTitleChange}
                    />
                    {titleError && (
                      <div className="alert alert-danger" role="alert">
                        {titleError}
                      </div>
                    )}
                  </div>
                  <div className="form-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Description Here"
                      value={description}
                      onChange={handleDescriptionChange}
                    />
                     {descriptionError && (
                    <div className="alert alert-danger" role="alert">
                      {descriptionError}
                    </div>
                    )}
                  </div>
                  <div className="form-group mb-3">
                    <input
                      type="date"
                      className="form-control"
                      value={date.toISOString().split('T')[0]}
                      onChange={(e) => setDate(new Date(e.target.value))}
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
