import * as Constant from '../Constants';

const JoyconThemeService = {
  getJoyconThemes: async () => {
    try {
      const response = await fetch(`${Constant.API_URL}/joycon-themes`);
      return response.json();
    } catch(error) {
      throw error;
    }
  }
};

export default JoyconThemeService;
