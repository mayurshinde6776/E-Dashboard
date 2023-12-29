import React, { useEffect, useState } from 'react';
import {  useNavigate } from 'react-router-dom';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate= useNavigate()

    useEffect(()=>{
        const auth= localStorage.getItem('user');

        if(auth){
            navigate('/')
        }
    })

    const collectData = async () => {
        let result = await fetch('http://localhost:5000/register',
            {
                method: 'post',
                body: JSON.stringify({ name, email, password}),
                headers: {
                    'Content-Type': 'application/json'
                }

            });
        result = await result.json();
        localStorage.setItem('user', JSON.stringify(result));
        console.log(result);
    }



    return (

        <div className='register'>

            <input className='inputBox' type='text' value={name} onChange={(e) => { setName(e.target.value) }} placeholder='Enter Name' />
            <input className='inputBox' type='text' value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder='Enter email' />
            <input className='inputBox' type='password' value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder='Enter Password' />
            <button className='registerButton' type='submit' onClick={collectData} >SignUp</button>
        </div>

    )
}
export default Signup;