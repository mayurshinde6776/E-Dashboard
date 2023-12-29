import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css';
import Nav from './components/Nav';
import Footer from './components/Footer'
import Signup from './components/signup';
import PrivateComponent from './components/PrivateComponent';
import Login from './components/login';
import AddProduct from './components/Add-Product';
import ProductList from './components/ProductList'
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>

          <Route element={<PrivateComponent />}>
            <Route path='/' element={<ProductList/>} />
            <Route path='/add-product' element={<AddProduct/>} />
            <Route path='/update' element={<h1> Update Products</h1>} />
            <Route path='/logout' element={<h1>L Products</h1>} />
            <Route path='/profile' element={<h1> profile Products</h1>} />
          </Route>

          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
