import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';

// MATCHING YOUR SIDEBAR: Folder is "Pages", Files are "SignUp", "SignIn", "Dashboard"
import SignUp from './Pages/SignUp';
import SignIn from './Pages/SignIn';
import Dashboard from './Pages/Dashboard';

import './App.css';

function App() { 
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <main className="app-main">
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />

            {/* Default redirects */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </AuthProvider>
    </Router>
  );
}

export default App;