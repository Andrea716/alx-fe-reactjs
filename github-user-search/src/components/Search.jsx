import React, { useState } from 'react';
import { fetchUserData } from '../services/githubService';  // Import the API service

function Search() {
  const [username, setUsername] = useState('');  // To hold the input username
  const [userData, setUserData] = useState(null);  // To store fetched user data
  const [loading, setLoading] = useState(false);  // To handle the loading state
  const [error, setError] = useState(null);  // To store the error message

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setUserData(null);  // Clear previous results before new search

    try {
      const data = await fetchUserData(username);  // Fetch user data from the GitHub API
      setUserData(data);  // Set the fetched data into the state
    } catch (err) {
      setError('Looks like we can’t find the user');  // Display this error if the user is not found
    } finally {
      setLoading(false);  // Stop loading once the API call is done
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}  // Update username in state
        />
        <button type="submit">Search</button>
      </form>

      {/* Conditional rendering based on state */}
      {loading && <p>Loading...</p>}  {/* Show while data is being fetched */}
      {error && <p>{error}</p>}  {/* Display error message if user not found */}
      {userData && (
        <div>
          <img src={userData.avatar_url} alt={userData.login} width="100" />  {/* Display avatar */}
          <p>Name: {userData.name ? userData.name : "N/A"}</p>  {/* Display name if available */}
          <p>Username: {userData.login}</p>  {/* Display GitHub username */}
          <a href={userData.html_url} target="_blank" rel="noopener noreferrer">
            View GitHub Profile
          </a>  {/* Link to GitHub profile */}
        </div>
      )}
    </div>
  );
}

export default Search;
