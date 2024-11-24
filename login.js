import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';

function Login() {
  
  const [username, setUsername] = useState(''); // Stocke le nom d'utilisateur
  const [password, setPassword] = useState(''); // Stocke le mot de passe
  const [error, setError] = useState(''); // Stocke un message d'erreur

  // Fonction pour gérer la soumission du formulaire
  const handleLogin = async () => {
    try {
      // Envoi des données à l'API
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }), // Convertit les données en JSON
      });

      const data = await response.json();

      if (!response.ok) {
        // Si la réponse n'est pas OK, on affiche une erreur
        throw new Error(data.message || 'Erreur lors de la connexion');
      }

      // Stocker le token dans localStorage
      localStorage.setItem('token', data.token);

      // Redirection vers la page des produits
      window.location.href = '/products';
    } catch (err) {
      // Affiche un message d'erreur
      setError(err.message);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Connexion
      </Typography>

      {/* Afficher une erreur si nécessaire */}
      {error && <Typography color="error">{error}</Typography>}

      {/* Champ pour le nom d'utilisateur */}
      <TextField
        label="Nom d'utilisateur"
        variant="outlined"
        fullWidth
        margin="normal"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      {/* Champ pour le mot de passe */}
      <TextField
        label="Mot de passe"
        variant="outlined"
        type="password"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* Bouton pour soumettre */}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleLogin}
        style={{ marginTop: '16px' }}
      >
        Se connecter
      </Button>
    </Container>
  );
}

export default Login;
