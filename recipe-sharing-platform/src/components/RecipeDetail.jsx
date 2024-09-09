import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const RecipeDetail = () => {
  const { id } = useParams();  // Get recipe ID from URL params
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    // Fetch recipe data based on the ID
    fetch('/src/data.json')
      .then((response) => response.json())
      .then((data) => {
        const foundRecipe = data.find((item) => item.id === parseInt(id));
        setRecipe(foundRecipe);
      })
      .catch((error) => console.error('Error fetching recipe:', error));
  }, [id]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{recipe.title}</h1>
      <img
        src={recipe.image}
        alt={recipe.title}
        className="rounded-lg mb-8 w-full h-64 object-cover"
      />
      <p className="text-gray-700 mb-4">{recipe.summary}</p>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
        <ul className="list-disc pl-5">
          {recipe.ingredients?.map((ingredient, index) => (
            <li key={index} className="mb-2">
              {ingredient}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
        <ol className="list-decimal pl-5">
          {recipe.instructions?.map((step, index) => (
            <li key={index} className="mb-2">
              {step}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default RecipeDetail;
