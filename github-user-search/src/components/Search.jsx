import React, { useState } from 'react';
import { fetchUserData } from '../services/githubService'; // Import the API service

function Search() {
  const [username, setUsername] = useState('');        // Username state
  const [location, setLocation] = useState('');        // Location state
  const [minRepos, setMinRepos] = useState('');        // Minimum repos state
  const [userData, setUserData] = useState(null);      // Fetched user data state
  const [loading, setLoading] = useState(false);       // Loading state
  const [error, setError] = useState(null);            // Error state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setUserData(null);  // Clear previous results before new search

    try {
      const data = await fetchUserData(username, location, minRepos);  // Fetch advanced search data
      setUserData(data);  // Set the fetched data
    } catch (err) {
      setError('Looks like we can’t find the user');  // Error handling
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 p-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
      type="text"
      placeholder="Enter GitHub username"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      className="border p-2 rounded"
    />
    <input
      type="text"
      placeholder="Location"
      value={location}
      onChange={(e) => setLocation(e.target.value)}
      className="border p-2 rounded"
    />
    <input
      type="number"
      placeholder="Minimum Repositories"
      value={minRepos}
      onChange={(e) => setMinRepos(e.target.value)}
      className="border p-2 rounded"
    />
      <button
      type="submit"
      className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
    >
      Search
    </button>
  </form>

      {/* Loading, Error, and User Data rendering */}
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {userData && (
        <div>
          <img src={userData.avatar_url} alt={userData.login} width="100" />
          <p>Name: {userData.name ? userData.name : "N/A"}</p>
          <p>Username: {userData.login}</p>
          <p>Location: {userData.location}</p>
          <p>Repositories: {userData.public_repos}</p>
          <a href={userData.html_url} target="_blank" rel="noopener noreferrer">
            View GitHub Profile
          </a>
        </div>
      )}
    </div>
  );
}

export default Search;
