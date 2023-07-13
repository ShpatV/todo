import React from 'react';
import Navbar from '../../components/pages/inc/Navbar';
import Home from '../../components/pages/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateTask from '../../components/pages/CreateTask';
import Tasks from '../../components/pages/Tasks';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<Tasks />} />
          <Route path="/contact" element={<CreateTask />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
