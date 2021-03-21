import * as Constant from '../Constants';

const FeaturedNewsService = {
  getFeaturedNews: async () => {
    try {
      let response = [];

      if (Constant.API_URL.includes('localhost')) {
        response = await fetch(`${Constant.API_URL}/featured-news`);
        return response.json();
      } else {
        // Workaround: The website where the APIs are hosted has a limit of 3 endpoints
        response = [
          {
            "id": 1,
            "title": "Games on Sale",
            "image": "games-on-sale"
          },
          {
            "id": 2,
            "title": "News #2",
            "image": ""
          },
          {
            "id": 3,
            "title": "News #3",
            "image": ""
          }
        ];
        return response;
      }
    } catch(error) {
      throw error;
    }
  }
};

export default FeaturedNewsService;
