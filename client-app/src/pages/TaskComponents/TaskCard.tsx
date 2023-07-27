import React from 'react';
import { Activity } from '../../models/activity';

type Props = {
  activity: Activity;
  handleEdit: (activity: Activity) => void;
  handleDelete: (id: string) => void;
};

const TaskCard: React.FC<Props> = ({ activity, handleEdit, handleDelete }) => {
  const formatDate = (date: Date | null) => {
    if (date) {
      const formattedDate = new Date(date);
      return formattedDate.toISOString().split('T')[0];
    } else {
      return "";
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{activity.title}</h5>
        <p className="card-text">{activity.description}</p>
        <p className="card-date">{activity.due_date ? formatDate(activity.due_date) : ''}</p> 
        <p className="card-category">{activity.category_name}</p>
        <div style={{ padding: 20, marginLeft: 160 }}>
          <button
            style={{ marginRight: 4 }}
            type='button'
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            className="btn btn-primary"
            onClick={() => {
              handleEdit(activity);
            }}
          >
            Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={() => handleDelete(activity.id!)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;