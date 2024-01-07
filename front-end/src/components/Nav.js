import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../CSS/Nav.css';

const Nav = () => {
  const auth = localStorage.getItem('user');
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light navbar-bgd">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img
            alt="logo"
            className="amazon-logo"
            src="https://images-na.ssl-images-amazon.com/images/G/01/gc/designs/livepreview/amazon_dkblue_noto_email_v2016_us-main._CB468775337_.png"
          />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse " id="navbarNav">
          {auth ? (
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link " to="/">
                  Products
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/add-product">
                  Add Products
                </Link>
              </li>
              {/* <li className="nav-item"><Link className="nav-link" to='/update:id'>Update Products</Link></li> */}
              <li className="nav-item">
                <Link className="nav-link" to="/profile">
                  Profile
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" onClick={logout} to="/login">
                  Logout ({JSON.parse(auth).name})
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav ml-auto ">
              <li className="nav-item">
                <Link className="nav-link" to="/signup">
                  Sign Up
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
