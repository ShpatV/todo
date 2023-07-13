import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Activity } from '../../app/layout/models/activity';
import './styles/tasks.css';
import ReactPaginate from 'react-paginate';

import TaskCard from './TaskCard';
import TaskModal from './TaskModal';

function Tasks() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [id, setId] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<Date>(new Date());
  const [category, setCategory] = useState<string>('');
  const [showEditForm, setShowEditForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5000/api/tasks').then((response) => {
      console.log(response);
      setActivities(response.data);
    });
  }, []);

  const formatDate = (date: Date) => {
    return moment(date).format('MM/DD/YYYY');
  };

  const handleDelete = (id: string) => {
    axios.delete(`http://localhost:5000/api/tasks/${id}`).then((response) => {
      console.log(response);
      axios.get<Activity[]>('http://localhost:5000/api/tasks').then((response) => {
        setActivities(response.data);
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

    axios.put(`http://localhost:5000/api/tasks/${id}`, updatedActivity).then((response) => {
      console.log(response);
      axios.get<Activity[]>('http://localhost:5000/api/tasks').then((response) => {
        setActivities(response.data);
      });
    });
  };

  const pageCount = Math.ceil(activities.length / 6);

  const getDisplayedActivities = () => {
    const startIndex = currentPage * 6;
    const endIndex = startIndex + 6;
    return activities.slice(startIndex, endIndex);
  };

  const handlePageChange = (selectedPage: any) => {
    setCurrentPage(selectedPage.selected);
  };

  return (
    <div className="container d-flex" style={{ marginTop: 100 }}>
      <div className="col-12">
        <div>
          <div className="card-body">
            <div className="custom-card">
              {getDisplayedActivities().map((activity) => (
                <TaskCard
                  key={activity.id}
                  activity={activity}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />
              ))}
              <div className="card" style={{ visibility: 'hidden' }}></div>
              <div className="card" style={{ visibility: 'hidden' }}></div>
            </div>
            <ReactPaginate
              previousLabel={'Previous'}
              nextLabel={'Next'}
              breakLabel={'...'}
              breakClassName={'break-me'}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageChange}
              containerClassName={'pagination'}
              activeClassName={'active'}
            />
          </div>
        </div>
        <TaskModal
          id={id}
          title={title}
          description={description}
          date={date}
          category={category}
          showEditForm={showEditForm}
          setShowEditForm={setShowEditForm}
          setTitle={setTitle}
          setDescription={setDescription}
          setDate={setDate}
          setCategory={setCategory}
          handleUpdate={handleUpdate}
        />
      </div>
    </div>
  );
}

export default Tasks;