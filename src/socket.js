import { io } from 'socket.io-client';

const token = localStorage.getItem('token'); // Stockez le token après connexion
const socket = io('http://localhost:3000', {
  auth: {
    token: `Bearer ${token}`,
  },
});

export default socket;
