import React from 'react';
import moment from 'moment';

type Props = {
  id: string;
  title: string;
  description: string;
  date: Date;
  category: string;
  titleError?: string;
  descriptionError?: string;
  showEditForm: boolean;
  setShowEditForm: (show: boolean) => void;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  setDate: (date: Date) => void;
  setCategory: (category: string) => void;
  handleUpdate: () => void;
};

const TaskModal: React.FC<Props> = ({
  id,
  titleError,
  descriptionError,
  title,
  description,
  date,
  category,
  showEditForm,
  setShowEditForm,
  setTitle,
  setDescription,
  setDate,
  setCategory,
  handleUpdate,
}) => {
  const closeModal = () => {
    setShowEditForm(false);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || !description || !date || !category) {
      alert('Please fill in all fields.');
      return;
    }

    if (title.trim() !== '' && (title.length < 5 || title.length > 10)) {
      alert('Title must be between 5 and 10 characters long.');
      return;
    }

    if (description.trim() !== '' && (description.length < 5 || description.length > 10)) {
      alert('Description must be between 5 and 10 characters long.');
      return;
    }

    if (date !== null) {
      handleUpdate();
      closeModal();
    } else {
      alert('Invalid date.');
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate: Date = e.target.value ? new Date(e.target.value) : new Date();
    setDate(newDate);
  };

  const formatDate = (date: Date) => {
    return date ? moment(date).format('YYYY-MM-DD') : '';
  };

  return (
    <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Edit Todo
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={closeModal}
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleFormSubmit}>
              <div>
                <label>Title:</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                {titleError && <div className="error-message">{titleError}</div>} 
              </div>
              <div>
                <label>Description:</label>
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                {descriptionError && <div className="error-message">{descriptionError}</div>}
              </div>
              <div>
                <label>Date:</label>
                <input type="date" value={formatDate(date)} onChange={handleDateChange} />
              </div>
              <div>
                <label>Category:</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} disabled>
                  <option value="1">Software</option>
                  <option value="2">DevOps</option>
                </select>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="submit" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleUpdate}>
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
