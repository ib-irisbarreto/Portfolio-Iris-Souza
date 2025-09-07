import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';

import Navbar from './major_components/Navbar';

import HomePage from './pages/HomePage';
import CvPage from './pages/CvPage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetails from './pages/ProjectDetailsPage';


function App() {
  return (
    <div className="portfolio-root">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cv" element={<CvPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
