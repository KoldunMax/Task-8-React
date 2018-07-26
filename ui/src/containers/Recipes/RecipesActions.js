import * as constants from './RecipesConstants';

export const fetchAllRecipes = () => ({
    type: constants.FETCH_ALL_RECIPES
});

export const fetchRecipe = id => ({
    type: constants.FETCH_RECIPE,
    payload: {
        id
    }
});

export const addRecipe = recipe => ({
    type: constants.ADD_RECIPE,
    payload: recipe
});

export const updateRecipe = recipe => ({
    type: constants.UPDATE_RECIPE,
    payload: recipe
});

export const updateRecipeRating = (recipe) => ({
    type: constants.UPDATE_RATING,
    payload: {
        id: recipe._id,
        rating: recipe.rating
        }
});

export const deleteRecipe = id => ({
    type: constants.DELETE_RECIPE,
    payload: {
        id
    }
});

export const setActiveRecipe = id => ({
    type: constants.SET_ACTIVE_RECIPE,
    payload: {
        id
    }
});