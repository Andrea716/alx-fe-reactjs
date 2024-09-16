import axios from 'axios';

// Create an instance of Axios with the base URL
const api = axios.create({
  baseURL: 'https://api.github.com/search/user?q',
});

// Function to fetch user data based on advanced search criteria
export const fetchUserData = async (username, location, minRepos) => {
  try {
    // Construct the query string with advanced search parameters
    const query = `user:${username} location:${location} repos:>${minRepos}`;
    const response = await api.get(`/search/users?q=${encodeURIComponent(query)}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching user data');
  }
};
