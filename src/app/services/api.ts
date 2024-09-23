import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 10000,
});

export const fetchPlayers = async () => {
  try {
    const response = await api.get('/players');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar jogadores:', error);
    throw error;
  }
};

export const fetchTeams = async () => {
  try {
    const response = await api.get('/teams');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar times:', error);
    throw error;
  }
};

export default api;
