const recipeRepository = require('./recipe.repository');

class RecipeService {
	getAllRecipes() {
		return recipeRepository.findAll();
	}

	getRecipeById(id) {
		return recipeRepository.findById(id);
	}

	addRecipe(recipe) {
		return recipeRepository.add(recipe);
	}

	updateRecipe(id, recipe) {
		console.log(recipe);
		return recipeRepository.update({ _id: id }, recipe);
	}

	deleteRecipe(id) {
		return recipeRepository.delete({ _id: id });
	}

	updateRecipeRating(id, recipe) {
		return recipeRepository.findOneAndUpdate({ _id: id }, {$set: {rating: recipe.rating}});
	}
}

module.exports = new RecipeService();