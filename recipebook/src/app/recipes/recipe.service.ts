import { Recipe } from "./recipe.model";

export class RecipeService {
    currentRecipe: Recipe;

    setCurrentRecipe(recipe: Recipe){
        this.currentRecipe = recipe;
    }
}