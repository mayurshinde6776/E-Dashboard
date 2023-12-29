import React, { useState } from 'react';

const AddProduct=()=>{
const [name, setName]= useState('');
const [price, setPrice]= useState('');
const [category, setCategory]= useState('');
const [company, setCompany]= useState('');
const [error , setError]= useState(false);


const collectProduct= async ()=>{
   
    if( !name || !price || !category || !company)  // if anything return false then 
{
    setError(true)
    return false;
}

    const userId= JSON.parse( localStorage.getItem('user'))._id
console.log('user id ' ,userId);
    let result = await fetch('http://localhost:5000/add-product',
    {
        method:'post',
        body: JSON.stringify({name, price,category, company, userId}),
        headers:{
            'Content-Type': 'application/json'

        }
    });
    result= await result.json();
    console.log(result);
}
    return(

      <div className='register'>
        <h1 >Add Product</h1>
        <input className='inputBox' type='text' value={name} onChange={(e)=>{setName(e.target.value)}} placeholder='Enter a Name '  />
      { error && !name && <span>Enter Valid Name</span>}
        
        <input className='inputBox' type='text' value={price} onChange={(e)=>{setPrice(e.target.value)}} placeholder='Enter a Price ' />
        { error && !price && <span>Enter Valid Price</span>}
        
        <input  className='inputBox' type='text' value={category} onChange={(e)=>{setCategory(e.target.value)}} placeholder='Enter a Category '/>
        { error && !category && <span>Enter Valid Category</span>}

        <input   className='inputBox' type='text' value={company} onChange={(e)=>{setCompany(e.target.value)}} placeholder='Enter a Company '/>
        { error && !company && <span>Enter Valid Company</span>}
        
        <button type='submit' onClick={collectProduct} className='registerButton'>Add Product</button>
      </div>
    )
}

export default AddProduct;