import axios from 'axios';

const GITHUB_API_URL = 'https://api.github.com';

export const searchUsers = async (username) => {
  const response = await axios.get(`${GITHUB_API_URL}/search/users?q=${username}`);
  return response.data;
};
