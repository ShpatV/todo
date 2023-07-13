import React from 'react';
import './styles/home.css';

function Home() {
  return (
    <div className="home-container">
      <div className="header">
        <h1>Welcome to To-Do Tasks</h1>
        <p>Stay organized and boost your productivity</p>
      </div>
      <div className="content">
        <div className="section">
          <h2>Manage Your Tasks</h2>
          <p>Keep track of your tasks, deadlines, and progress in one place.</p>
        </div>
        <div className="section">
          <h2>Set Priorities and Categories</h2>
          <p>Organize your tasks by setting priorities and assigning categories for better organization.</p>
        </div>
        <div className="section">
          <h2>Collaborate with Others</h2>
          <p>Share tasks and collaborate with your team members to achieve your goals together.</p>
        </div>
      </div>
      <div className="footer">
        <p>Start managing your tasks today!</p>
        <button className="get-started-btn">Get Started</button>
      </div>
    </div>
  );
}

export default Home;
