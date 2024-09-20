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

export const createPlayer = async (player: Omit<Player, 'id' | 'createdAt' | 'updatedAt'>) => {
  try {
    const response = await api.post('/players', player);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar jogador:', error);
    throw error;
  }
};

export const editPlayer = async (id: number, updatedPlayer: Partial<Omit<Player, 'id' | 'createdAt' | 'updatedAt'>>) => {
  try {
    const response = await api.put(`/players/${id}`, updatedPlayer);
    return response.data;
  } catch (error) {
    console.error('Erro ao editar jogador:', error);
    throw error;
  }
};

export const deletePlayer = async (id: number) => {
  try {
    const response = await api.delete(`/players/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao excluir jogador:', error);
    throw error;
  }
};


export const createTeam = async (team: Team) => {
  try {
    const formData = new FormData();
    formData.append("name", team.name);
    formData.append("image", team.image);
    formData.append("id", team.id.toString());
    formData.append("createdAt", team.createdAt);
    formData.append("updatedAt", team.updatedAt);

    const response = await api.post('/teams', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao criar time:', error);
    throw error;
  }
};




export const editTeam = async (id: number, updatedTeam: Partial<Omit<Team, 'id' | 'createdAt' | 'updatedAt'>>) => {
  try {
    const response = await api.put(`/teams/${id}`, updatedTeam);
    return response.data;
  } catch (error) {
    console.error('Erro ao editar time:', error);
    throw error;
  }
};

export const deleteTeam = async (id: number) => {
  try {
    const response = await api.delete(`/teams/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao excluir time:', error);
    throw error;
  }
};

export default api;
