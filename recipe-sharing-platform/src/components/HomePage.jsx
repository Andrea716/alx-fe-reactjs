import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // Fetching recipe data from the mock JSON file
    fetch('/src/data.json')
      .then((response) => response.json())
      .then((data) => setRecipes(data))
      .catch((error) => console.error('Error fetching recipes:', error));
  }, []);

  return (
    <div>
      <h1>Welcome to the Recipe Sharing Platform</h1>
      <Link to="/add-recipe" className="bg-green-500 text-white py-2 px-4 rounded-lg">
        Add a New Recipe
      </Link>
    </div>
    
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Recipe List</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-48 object-cover"
            />

            <div className="p-4">
              <h2 className="text-2xl font-bold mb-2">{recipe.title}</h2>
              <p className="text-gray-600">{recipe.summary}</p>

              {/* Use Link to navigate to RecipeDetail */}
              <Link
                to={`/recipe/${recipe.id}`}
                className="text-blue-500 hover:text-blue-700 mt-4 inline-block"
              >
                View Details
              </Link>
            </div>
          </div>
         
        ))}
      </div>
    </div>
  );
};

export default HomePage;
