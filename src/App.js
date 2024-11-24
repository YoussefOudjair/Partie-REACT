import React, { useEffect, useState } from 'react';
import { Button, TextField, Container, Typography, List, ListItem, ListItemText } from '@mui/material';
import socket from './socket'; // Importer le fichier socket.js

function App() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState('');

useEffect(() => {
  socket.on('productUpdated', update => {
    // Mise à jour de l'état ici
  });
}, []);

  // Charger les produits existants au démarrage
  useEffect(() => {
    fetch('http://localhost:3000/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  // Écouter les événements WebSocket
  useEffect(() => {
    socket.on('productAdded', (product) => {
      setProducts((prev) => [...prev, product]);
    });

    socket.on('productUpdated', ({ id, update }) => {
      setProducts((prev) =>
        prev.map((p) => (p._id === id ? { ...p, ...update } : p))
      );
    });

    socket.on('productDeleted', (id) => {
      setProducts((prev) => prev.filter((p) => p._id !== id));
    });

    return () => {
      socket.off('productAdded');
      socket.off('productUpdated');
      socket.off('productDeleted');
    };
  }, []);

  const handleAddProduct = () => {
    fetch('http://localhost:3000/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newProduct, type: 'misc', price: 0, rating: 0, warranty_years: 0, available: true }),
    }).then(() => setNewProduct(''));
  };


  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Liste des Produits
      </Typography>
      <TextField
        label="Nom du produit"
        variant="outlined"
        fullWidth
        margin="normal"
        value={newProduct}
        onChange={(e) => setNewProduct(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleAddProduct}>
        Ajouter un produit
      </Button>
      <List>
        {products.map((product) => (
          <ListItem key={product._id}>
            <ListItemText primary={product.name} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default App;
