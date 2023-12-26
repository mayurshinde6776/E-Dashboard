import React, { useState } from 'react';

 const Signup=()=>{
    const [name , setName]= useState('');
    const [email, setEmail]= useState('');
    const [password, setPassword]= useState('');

    function collectData(){
console.log(name , email ,password);
    }
    return(
      
       <div className='register'>
        
        <input className='inputBox' type='text' value={name} onChange={(e)=>{setName(e.target.value)}} placeholder='Enter Name' />
        <input className='inputBox' type='text' value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder='Enter email' />
        <input className='inputBox' type='password' value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder='Enter Password' />
        <button className='registerButton' type='submit' onClick={collectData} >SignUp</button>
        </div> 
        
    )
}
export default Signup;