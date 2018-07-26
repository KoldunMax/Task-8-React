import api from '../adapter';

export default {
    fetchAllRecipes: () => {
        return api.makeRequest(`/api/recipes`, api.requestType.GET);
    },
    addRecipe: recipe => {
        return api.makeRequest(`/api/recipes`, api.requestType.POST, recipe);
    },
    updateRecipe: recipe => {
        console.log(recipe);
        return api.makeRequest(`/api/recipes/${recipe._id}`, api.requestType.PUT, recipe);
    },
    deleteRecipe: id => {
        return api.makeRequest(`/api/recipes/${id}`, api.requestType.DELETE);
    },
    fetchRecipe: id => {
        return api.makeRequest(`/api/recipes/${id}`, api.requestType.GET);
    },
    updateRecipeRating: (recipe) => {
        console.log(recipe);
        return api.makeRequest(`/api/recipes/setRating/${recipe.id}`, api.requestType.PUT, recipe);
    }
};