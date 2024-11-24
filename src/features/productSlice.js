import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


// Action asynchrone pour récupérer les produits
export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (_, { rejectWithValue }) => {
      console.log('Fetching products');
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        console.log('Received response from fetch products:', response.data);
        return response.data;
      } catch (error) {
        console.error('Error in fetchProducts:', error.response ? error.response.data : error.message);
        return rejectWithValue(error.response ? error.response.data : error.message);
      }
    }
  );

// Action asynchrone pour ajouter un produit
export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (productData, thunkAPI ) => {
    console.log('Sending data to add product:', productData);
    try {
      const response = await axios.post('http://localhost:5000/api/products', productData);
      console.log('Received response from add product:', response.data);
      thunkAPI.dispatch(fetchProducts());  // Rafraîchir la liste après l'ajout réussi
      return response.data;  // Retourne le produit ajouté à la base de données
    } catch (error) {
      console.error('Error in addProduct:', error.response ? error.response.data : error.message);
      return thunkAPI.rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

  
const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],  // Liste des produits
    loading: false,  // Indicateur de chargement
    error: null,  // Message d'erreur
  },
  reducers: {
    // Les reducers synchrones pourraient être ajoutés ici si nécessaire
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);  // Ajoute le nouveau produit à la liste
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.error = action.payload || 'Erreur lors de l\'ajout du produit';
      });
  },
});

export default productSlice.reducer;

