import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../CSS/ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch('http://localhost:5000/products');
    result = await result.json();
    setProducts(result);
  };

  const deleteProduct = async (id) => {
    let result = await fetch(`http://localhost:5000/product/${id}`, {
      method: 'Delete',
    });
    result = await result.json();
    if (result) {
      getProducts();
    }
  };

  const searchHandle = async (event) => {
    let key = await event.target.value;

    if (key) {
      let result = await fetch(`http://localhost:5000/search/${key}`);
      result = await result.json();
      if (result) {
        setProducts(result);
      }
    } else {
      getProducts();
    }
  };

  return (
    <div className="container product-list mt-3">
      <h2>Products List</h2>
      <input
  onChange={searchHandle}
  className="form-control mb-3"
  type="text"
  placeholder="Search Product"
  style={{ maxWidth: '300px', margin: '0 auto' , border:'1px solid skyblue' }}
/>

      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Sr.No</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Category</th>
            <th scope="col">Company</th>
            <th scope="col">Operations</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>$ {item.price}</td>
                <td>{item.category}</td>
                <td>{item.company}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm mr-2"
                    onClick={() => deleteProduct(item._id)}
                  >
                    Delete
                  </button>
                  <Link to={`/update/${item._id}`} className="btn btn-primary btn-sm m-2">
                    Update
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">Result Not Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
