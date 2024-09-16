import React, { useState } from 'react';
import { fetchUserData } from '../services/githubService';  // Import the API service

function Search() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setUserData(null);  // Clear previous results

    try {
      const data = await fetchUserData(username);  // Fetch GitHub user data
      setUserData(data);  // Store user data in state
    } catch (err) {
      setError('Looks like we can’t find the user');  // Set error if the user is not found
    } finally {
      setLoading(false);  // Stop loading when the request is complete
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {userData && (
        <div>
          <img src={userData.avatar_url} alt={userData.login} width="100" />
          <p>Name: {userData.name ? userData.name : "N/A"}</p>
          <p>Username: {userData.login}</p>
          <a href={userData.html_url} target="_blank" rel="noopener noreferrer">
            View GitHub Profile
          </a>
        </div>
      )}
    </div>
  );
}

export default Search;
