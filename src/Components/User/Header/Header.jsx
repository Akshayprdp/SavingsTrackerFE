import React, { useEffect, useState } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { faUser, faUserPlus, faCreditCard, faChartBar } from '@fortawesome/free-solid-svg-icons';

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    const storedUsername = localStorage.getItem('username');

    if (token) {
      try {
        setUsername(storedUsername);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Invalid token");
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('username'); 
    localStorage.removeItem('Emailaddress'); 
    localStorage.removeItem('Phonenumber');
    localStorage.removeItem('userId'); 
    setIsLoggedIn(false);
    setUsername('');

    navigate('/login');
    
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-dark-tertiary">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  <h1 className="navbar-brand mx-auto">Personal Finance Tracker</h1>
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/" >
                  <FontAwesomeIcon icon={faChartBar} />
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/expenses" >
                  <FontAwesomeIcon icon={faCreditCard} />
                  Expenses
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <FontAwesomeIcon icon={faUser} />
                  {isLoggedIn ? username : 'Profile'}
                </a>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                  {isLoggedIn ? (
                    <>
                      <li>
                        <Link className="dropdown-item" to="/profile">
                          <FontAwesomeIcon icon={faUser} /> Profile
                        </Link>
                      </li>
                      <li>
                        <button className="dropdown-item" onClick={handleLogout}>
                          <FontAwesomeIcon icon={faUser} /> Logout
                        </button>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <Link className="dropdown-item" to="/login">
                          <FontAwesomeIcon icon={faUser} /> Login
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/signup">
                          <FontAwesomeIcon icon={faUserPlus} /> Signup
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
