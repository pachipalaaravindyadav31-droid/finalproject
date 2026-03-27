import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Auth.css';

const SignIn = () => {
  const navigate = useNavigate();
  const { signin, isAuthenticated } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [storedCredentials, setStoredCredentials] = useState([]);
  const [showCredentials, setShowCredentials] = useState(false);

  // Load stored credentials on mount
  useEffect(() => {
    const allUsers = JSON.parse(localStorage.getItem('allUsers') || '[]');
    setStoredCredentials(allUsers);
  }, []);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      signin(formData.email, formData.password);
      navigate('/dashboard');
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const fillCredentials = (email, password) => {
    setFormData({
      email,
      password,
    });
    setShowCredentials(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-card signin-card">
        <div className="auth-header">
          <h1 className="auth-title">Sign In</h1>
          <p className="auth-subtitle">Access your analytics dashboard</p>
        </div>

        {errors.submit && (
          <div className="error-message">
            {errors.submit}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`form-input ${errors.email ? 'input-error' : ''}`}
              placeholder="your@email.com"
              disabled={isLoading}
            />
            {errors.email && (
              <span className="error-text">{errors.email}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`form-input ${errors.password ? 'input-error' : ''}`}
              placeholder="••••••••"
              disabled={isLoading}
            />
            {errors.password && (
              <span className="error-text">{errors.password}</span>
            )}
          </div>

          <button 
            type="submit" 
            className="submit-btn"
            disabled={isLoading}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        {storedCredentials.length > 0 && (
          <div className="credentials-section">
            <button
              type="button"
              className="toggle-credentials"
              onClick={() => setShowCredentials(!showCredentials)}
            >
              {showCredentials ? '➖ Hide Demo Credentials' : '➕ Show Demo Credentials'}
            </button>

            {showCredentials && (
              <div className="credentials-list">
                <p className="credentials-label">📌 Available Demo Accounts:</p>
                {storedCredentials.map((cred, index) => (
                  <div key={index} className="credential-item">
                    <div className="credential-info">
                      <span className="credential-name">
                        👤 {cred.firstName}
                      </span>
                      <span className="credential-email">{cred.email}</span>
                      <small className="credential-hint">Click to fill form</small>
                    </div>
                    <button
                      type="button"
                      className="use-credential-btn"
                      onClick={() => fillCredentials(cred.email, cred.password)}
                      disabled={isLoading}
                    >
                      Use →
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="auth-footer">
          <p>Don't have an account? <Link to="/signup" className="auth-link">Sign Up</Link></p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
