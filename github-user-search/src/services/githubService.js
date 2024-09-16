import axios from 'axios';

export const fetchUserData = async (username, location, minRepos) => {
  const baseURL = `https://api.github.com/search/users`;

  let query = `q=${username}`;

  // Add optional search filters if they are provided
  if (location) {
    query += `+location:${location}`;
  }
  if (minRepos) {
    query += `+repos:>${minRepos}`;
  }

  try {
    const response = await axios.get(`${baseURL}?${query}`);
    // Return the first user from the list of search results
    if (response.data.items.length > 0) {
      return response.data.items[0];  // Return only the first result
    } else {
      throw new Error('No user found');
    }
  } catch (error) {
    throw error;
  }
};
