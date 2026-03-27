import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse user from localStorage:', error);
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  const signup = (userData) => {
    // Check if user already exists
    const allUsers = JSON.parse(localStorage.getItem('allUsers') || '[]');
    const userExists = allUsers.some(u => u.email === userData.email);
    
    if (userExists) {
      throw new Error('User with this email already exists');
    }

    // Add new user to the list
    allUsers.push(userData);
    localStorage.setItem('allUsers', JSON.stringify(allUsers));
    
    // Set current user
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const signin = (email, password) => {
    const allUsers = JSON.parse(localStorage.getItem('allUsers') || '[]');
    const foundUser = allUsers.find(u => u.email === email && u.password === password);
    
    if (!foundUser) {
      throw new Error('Invalid email or password');
    }

    setUser(foundUser);
    localStorage.setItem('user', JSON.stringify(foundUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    isLoading,
    signup,
    signin,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
