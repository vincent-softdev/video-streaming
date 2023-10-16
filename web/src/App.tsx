import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Homepage';
import UploadVideoPage from './pages/UploadVideoPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route index path="/" element={<HomePage />} />
        <Route path="/upload" element={<UploadVideoPage />} />
      </Routes>
    </Router>
  );
};

export default App;