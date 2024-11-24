const API_URL = 'http://localhost:3000/api/products';
  // URL de API

// liste des produits
export const getProducts = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des produits');
  }
  return response.json();
};

// ajouter un produit
export const addProduct = async (product) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });
  if (!response.ok) {
    throw new Error('Erreur lors de l\'ajout du produit');
  }
  return response.json();
};

// modifier un produit
export const updateProduct = async (id, product) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });
  if (!response.ok) {
    throw new Error('Erreur lors de la modification du produit');
  }
  return response.json();
};

// supprimer un produit
export const deleteProduct = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Erreur lors de la suppression du produit');
  }
  return response.json();
};
