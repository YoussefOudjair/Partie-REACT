import React, { useState, useEffect } from 'react';
import { addProduct, updateProduct, getProducts} from '../services/api';
import { TextField, Button } from '@mui/material';

const ProductForm = ({ product, setIsEditing, setProducts }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'phone',
    price: 0,
    rating: 0,
    warranty_years: 1,
    available: true,
  });

  // Si un produit est passé en prop, pré-remplir les données du formulaire pour modification
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        type: product.type,
        price: product.price,
        rating: product.rating,
        warranty_years: product.warranty_years,
        available: product.available,
      });
    }
  }, [product]);

  // Gérer les changements dans le formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Soumettre le formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (product) {
        // Mise à jour du produit existant
        await updateProduct(product._id, formData);
      } else {
        // Ajout d'un nouveau produit
        await addProduct(formData);
      }

      // Rafraîchir la liste des produits
      const updatedProducts = await getProducts();
      setProducts(updatedProducts);
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>{product ? 'Modifier le produit' : 'Ajouter un produit'}</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          type="text"
          name="name"
          placeholder="Nom du produit"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <TextField
          type="number"
          name="price"
          placeholder="Prix"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <TextField
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        ></TextField>
        <Button type="submit">
          {product ? 'Mettre à jour' : 'Ajouter'}
        </Button>
      </form>
      <Button onClick={() => setIsEditing(false)}>Annuler</Button>
    </div>
  );
};

export default ProductForm;
