import React from 'react';
import useStore from '../../store/useStore';
import TaskCard from '../TaskComponents/TaskCard';
import ReactPaginate from 'react-paginate';
import '../../components/styles/tasks.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TaskModal from '../TaskComponents/TaskModal';

function Tasks() {
  const {
    id,
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
    handlePageChange,
    handleEdit,
    handleDelete,
    pageCount,
    getDisplayedActivities,        
  } = useStore();         


  return (
    <div className="container d-flex" style={{ marginTop: 100 }}>
      <div className="col-12">
        <div>
          <div className="card-body">
            <div className="custom-card">
              {getDisplayedActivities.map((task) => (
                <TaskCard
                  key={task.id}
                  activity={task}       
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
