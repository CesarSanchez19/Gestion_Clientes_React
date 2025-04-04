import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Home from './components/Home';
import { useAuth } from './context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

function App() {
  const { currentUser } = useAuth();
  
  return (
    <Routes>
      <Route path="/login" element={ <Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/home" element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      } />
      <Route path="/" element={<Navigate to={currentUser ? "/home" : "/login"} />} />
    </Routes>
  );
}

export default App;
