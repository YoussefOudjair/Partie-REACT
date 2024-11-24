import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import ProductList from './ProductList';
import Login from './Login';

<Router>
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/products" element={<PrivateRoute><ProductList /></PrivateRoute>} />
  </Routes>
</Router>
