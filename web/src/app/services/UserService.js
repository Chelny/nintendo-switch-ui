import * as Constant from '../Constants';

const UserService = {
  getUsers: async () => {
    try {
      const response = await fetch(`${Constant.API_URL}/users`);
      return response.json();
    } catch(error) {
      throw error;
    }
  }
};

export default UserService;
