import * as Constant from '../Constants';

const NavigationService = {
  getNavigation: async () => {
    try {
      const response = await fetch(`${Constant.API_URL}/navigation`);
      return response.json();
    } catch(error) {
      throw error;
    }
  }
};

export default NavigationService;
