import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import { useSelector } from 'react-redux';
import LogoutPage from './pages/LogoutPage';

const App = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    <Router>
      <Routes>
        {isAuthenticated ? (
          <Route path="/" element={<LogoutPage />} />
        ) : (
          <>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
