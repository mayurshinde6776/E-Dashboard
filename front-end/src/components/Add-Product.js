import React, { useState } from 'react';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [company, setCompany] = useState('');
  const [error, setError] = useState({
    name: false,
    price: false,
    category: false,
    company: false,
  });

  const collectProduct = async () => {
    // Reset error state
    setError({
      name: false,
      price: false,
      category: false,
      company: false,
    });

    if (!name || !price || !category || !company) {
      // Update the error state for each field
      setError({
        name: !name,
        price: !price,
        category: !category,
        company: !company,
      });
      return;
    }

    const userId = JSON.parse(localStorage.getItem('user'))._id;
    console.log('user id ', userId);

    let result = await fetch('http://localhost:5000/add-product', {
      method: 'post',
      body: JSON.stringify({ name, price, category, company, userId }),
      headers: {
        'Content-Type': 'application/json',
          authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
        
      },
    });
    result = await result.json();
    console.log(result);
  };

  return (
    <div className='container my-5'>
      <div className='card p-4'>
        <h1 className='text-center mb-4'>Add Product</h1>
        <div className='form-group mb-2'>
          <input
            className={`form-control ${error.name ? 'is-invalid' : ''}`}
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Enter a Name'
          />
          {error.name && <div className='invalid-feedback'>Enter a valid Name</div>}
        </div>
  
        <div className='form-group mb-2'>
          <input
            className={`form-control ${error.price ? 'is-invalid' : ''}`}
            type='text'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder='Enter a Price'
          />
          {error.price && <div className='invalid-feedback'>Enter a valid Price</div>}
        </div>
  
        <div className='form-group mb-2'>
          <input
            className={`form-control ${error.category ? 'is-invalid' : ''}`}
            type='text'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder='Enter a Category'
          />
          {error.category && <div className='invalid-feedback'>Enter a valid Category</div>}
        </div>
  
        <div className='form-group mb-2'>
          <input
            className={`form-control ${error.company ? 'is-invalid' : ''}`}
            type='text'
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder='Enter a Company'
          />
          {error.company && <div className='invalid-feedback'>Enter a valid Company</div>}
        </div>
  
        <button className='btn btn-primary btn-block' style={{backgroundColor:'skyblue', border:'none'}} type='submit' onClick={collectProduct}>
          Add Product
        </button>
      </div>
    </div>
  );
  
};

export default AddProduct;
