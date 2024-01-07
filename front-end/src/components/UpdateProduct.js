import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [company, setCompany] = useState('');
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = async () => {
    let result = await fetch(`http://localhost:5000/product/${params.id}`, {
      method: 'get',
    });
    result = await result.json();
    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    setCompany(result.company);
  };

  const updateProductUsingId = async () => {
    let result = await fetch(`http://localhost:5000/product/${params.id}`, {
      method: 'put',
      body: JSON.stringify({ name, price, category, company }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    result = await result.json();
    navigate('/');
  };

  return (
    <div className='container mt-5'>
      <div className='row justify-content-center'>
        <div className='col-md-8'>
          <div className='card p-4'>
            <h1 className='text-center mb-4'>Update Product</h1>

            <div className='row mb-3'>
              <div className='col-md-3'>
                <label htmlFor='name' className='form-label'>
                  Name:
                </label>
              </div>
              <div className='col-md-9'>
                <input
                  className='form-control'
                  type='text'
                  id='name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder='Enter a Name'
                />
              </div>
            </div>

            <div className='row mb-3'>
              <div className='col-md-3'>
                <label htmlFor='price' className='form-label'>
                  Price:
                </label>
              </div>
              <div className='col-md-9'>
                <input
                  className='form-control'
                  type='text'
                  id='price'
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder='Enter a Price'
                />
              </div>
            </div>

            <div className='row mb-3'>
              <div className='col-md-3'>
                <label htmlFor='category' className='form-label'>
                  Category:
                </label>
              </div>
              <div className='col-md-9'>
                <input
                  className='form-control'
                  type='text'
                  id='category'
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder='Enter a Category'
                />
              </div>
            </div>

            <div className='row mb-3'>
              <div className='col-md-3'>
                <label htmlFor='company' className='form-label'>
                  Company:
                </label>
              </div>
              <div className='col-md-9'>
                <input
                  className='form-control'
                  type='text'
                  id='company'
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder='Enter a Company'
                />
              </div>
            </div>

            <button
              className='btn  btn-block'
              style={{backgroundColor:'skyblue', color:'#fff'}}
              type='submit'
              onClick={updateProductUsingId}
            >
              Update Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
