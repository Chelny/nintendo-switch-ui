import * as Constant from '../Constants';

const GameService = {
  getGames: async () => {
    try {
      const response = await fetch(`${Constant.API_URL}/games`);
      return response.json();
    } catch(error) {
      throw error;
    }
  }
};

export default GameService;
