import { configureStore } from '@reduxjs/toolkit';
import productReducer from './features/productSlice';

// Créez le store Redux
const store = configureStore({
  reducer: {
    product: productReducer, // Ajouter le reducer des produits
  },
});

export default store;
