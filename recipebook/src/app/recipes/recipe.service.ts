import { Recipe } from "./recipe.model";
import { EventEmitter } from '@angular/core';

export class RecipeService {

    currentRecipe: Recipe;

    private recipes: Recipe[] = [
        new Recipe(
          'Test recipe 1',
          'This is description 1',
          'https://media.self.com/photos/57dff8aa7160f6ee33314fdf/8:3/w_1280,c_limit/sub-channel-food_recipes.jpg'
        ),
        new Recipe(
          'Test recipe 2',
          'This is description 2',
          'https://media.self.com/photos/57dff8aa7160f6ee33314fdf/8:3/w_1280,c_limit/sub-channel-food_recipes.jpg'
        ),
        new Recipe(
          'Test recipe 3',
          'This is description 3',
          'https://media.self.com/photos/57dff8aa7160f6ee33314fdf/8:3/w_1280,c_limit/sub-channel-food_recipes.jpg'
        )
      ];    
    
      getAllRecipes(){
          return this.recipes.slice();
      }

      recipeSelected = new EventEmitter<Recipe>();
}