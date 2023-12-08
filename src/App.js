import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import UploadPage from './components/UploadPage';
import SamplesPage from './components/SamplesPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/samples" element={<SamplesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
