import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import FeaturesPage from './pages/Features';
import Notification from './pages/Notification';
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<LandingPage/>}></Route>
          <Route exact path="/login" element={<Login/>}></Route>
          <Route exact path="/signup" element={<Signup/>}></Route>
          <Route exact path="/dashboard" element={<Dashboard/>}></Route>
          <Route exact path="/features" element={<FeaturesPage/>}></Route>
          <Route exact path="/notifications" element={<Notification/>}></Route>
          
        </Routes>
      </Router>
    </div>

  );
}

export default App;
