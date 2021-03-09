import * as Constant from '../Constants';

const FeaturedNewsService = {
  getFeaturedNews: async () => {
    try {
      const response = await fetch(`${Constant.API_URL}/featured-news`);
      return response.json();
    } catch(error) {
      throw error;
    }
  }
};

export default FeaturedNewsService;
