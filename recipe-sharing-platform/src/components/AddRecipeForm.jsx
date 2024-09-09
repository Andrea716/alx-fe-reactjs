import React, { useState } from 'react';

const AddRecipeForm = () => {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState('');
  const [errors, setErrors] = useState({});

  // Validation function
  const validate = () => {
    let tempErrors = {};
    if (!title.trim()) tempErrors.title = 'Recipe title is required';
    if (!ingredients.trim()) tempErrors.ingredients = 'Ingredients are required';
    else if (ingredients.split(',').length < 2) tempErrors.ingredients = 'Please enter at least two ingredients';
    if (!steps.trim()) tempErrors.steps = 'Preparation steps are required';
    
    return tempErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate fields
    const tempErrors = validate();
    setErrors(tempErrors);

    // Check if there are no errors
    if (Object.keys(tempErrors).length === 0) {
      // Handle successful form submission (you can send data to your server here)
      console.log({
        title,
        ingredients: ingredients.split(','),
        steps,
      });

      // Clear the form after submission
      setTitle('');
      setIngredients('');
      setSteps('');
      setErrors({});
    }
  };

  return (
    <div className="max-w-lg mx-auto my-10 p-8 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Add a New Recipe</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Recipe Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter recipe title"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700 mb-2">
            Ingredients (comma-separated)
          </label>
          <textarea
            id="ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter ingredients"
          />
          {errors.ingredients && <p className="text-red-500 text-sm">{errors.ingredients}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="steps" className="block text-sm font-medium text-gray-700 mb-2">
            Preparation Steps
          </label>
          <textarea
            id="steps"
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter preparation steps"
          />
          {errors.steps && <p className="text-red-500 text-sm">{errors.steps}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Submit Recipe
        </button>
      </form>
    </div>
  );
};

export default AddRecipeForm;
