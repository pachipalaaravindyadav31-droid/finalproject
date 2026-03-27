import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Navbar.css';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/signin');
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/dashboard" className="navbar-logo">
          <span className="logo-icon">📊</span>
          Analytics Dashboard
        </Link>

        <button 
          className="hamburger" 
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`nav-menu ${menuOpen ? 'active' : ''}`}>
          {isAuthenticated ? (
            <>
              <li className="nav-item">
                <Link 
                  to="/dashboard" 
                  className="nav-link"
                  onClick={() => setMenuOpen(false)}
                >
                  Dashboard
                </Link>
              </li>
              <li className="nav-item user-info">
                <span className="user-avatar">👤</span>
                <span className="user-name">{user?.firstName}</span>
              </li>
              <li className="nav-item">
                <button 
                  className="logout-btn"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link 
                  to="/signin" 
                  className="nav-link"
                  onClick={() => setMenuOpen(false)}
                >
                  Sign In
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  to="/signup" 
                  className="nav-link signup-link"
                  onClick={() => setMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
