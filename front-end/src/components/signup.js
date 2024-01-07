import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css'; // Import your custom stylesheet

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem('user');

    if (auth) {
      navigate('/');
    }
  }, [navigate]);

  const collectData = async () => {
    let result = await fetch('http://localhost:5000/register', {
      method: 'post',
      body: JSON.stringify({ name, email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    result = await result.json();
    localStorage.setItem('user', JSON.stringify(result));
    console.log(result);
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4">
            <h1 className="text-center mb-4">Sign Up</h1>
            <input
              className="form-control mb-3"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder="Enter Name"
            />
            <input
              className="form-control mb-3"
              type="text"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Enter Email"
            />
            <input
              className="form-control mb-3"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Enter Password"
            />
            <button
              className="btn  btn-block"
              style={{background:'skyblue', color:'#fff'}}
              
              type="submit"
              onClick={collectData}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
