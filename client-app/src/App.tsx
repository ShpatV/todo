import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateTask from './pages/TaskComponents/CreateTask';
import Tasks from './pages/Tasks/Tasks';

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
