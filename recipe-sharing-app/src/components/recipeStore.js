// src/recipeStore.js
import create from 'zustand';

const useRecipeStore = create(set => ({
  recipes: [],
  searchTerm: '',
  filteredRecipes: [],
  favorites: [],
  addFavorite: (recipeId) => set(state => ({
    favorites: [...state.favorites, recipeId]
  })),
  removeFavorite: (recipeId) => set(state => ({
    favorites: state.favorites.filter(id => id !== recipeId)
  })),
  recommendations: [],
  generateRecommendations: () => set(state => {
    // Mock recommendation logic
    const recommended = state.recipes.filter(recipe =>
      state.favorites.includes(recipe.id) && Math.random() > 0.5
    );
    return { recommendations: recommended };
  }),
  
  setSearchTerm: (term) => set(state => {
    const lowercasedTerm = term.toLowerCase();
    return {
      searchTerm: term,
      filteredRecipes: state.recipes.filter(recipe =>
        recipe.title.toLowerCase().includes(lowercasedTerm)
      ),
    };
  }),

  addRecipe: (newRecipe) => set(state => ({
    recipes: [...state.recipes, newRecipe],
    filteredRecipes: [...state.filteredRecipes, newRecipe],
  })),

  setRecipes: (recipes) => set({ 
    recipes, 
    filteredRecipes: recipes
  }),

  deleteRecipe: (id) => set(state => ({
    recipes: state.recipes.filter(recipe => recipe.id !== id),
    filteredRecipes: state.filteredRecipes.filter(recipe => recipe.id !== id),
  })),

  updateRecipe: (updatedRecipe) => set(state => {
    const updatedRecipes = state.recipes.map(recipe =>
      recipe.id === updatedRecipe.id ? updatedRecipe : recipe
    );
    return {
      recipes: updatedRecipes,
      filteredRecipes: updatedRecipes.filter(recipe =>
        recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase())
      ),
    };
  }),
}));

export default useRecipeStore;
