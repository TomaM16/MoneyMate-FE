import './App.css';
import Home from './pages/home/Home';
import Transactions from './pages/transactions/Transactions';
import Reports from './pages/reports/Reports';
import Navigation from './components/navigation/Navigation';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Terms from './pages/terms/Terms';
import Privacy from './pages/privacy/Privacy';
import CreateAccount from './pages/createAccount/CreateAccount';
import Login from './pages/login/Login';
import React, { useState, useEffect } from 'react';
import AuthService from './services/auth/auth.service';
import Logout from './pages/logout/Logout';

function App() {

  // var currentUser = AuthService.getCurrentUser();
  const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(null);
  };

  return (
    <Router>
      <main className="content">
        <Routes>
          {currentUser ? (
            <>
              <Route path="/home" element={
                <>
                  <Navigation />
                  <Home />
                </>
              } />
              <Route path="/transactions" element={
                <>
                  <Navigation />
                  <Transactions />
                </>
              } />
              <Route path="/reports" element={
                <>
                  <Navigation />
                  <Reports />
                </>
              } />
              <Route path="/logout" element={<Logout onLogout={logOut} />} />

              <Route path="/*" element={<Navigate to="/home" />} />
            </>
          ) : (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<CreateAccount />} />

              <Route path="/*" element={<Navigate to="/login" />} />
            </>
          )}

          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />

        </Routes>
      </main>
    </Router>
  );
}

export default App;
