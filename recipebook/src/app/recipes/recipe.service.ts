import { Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from '../shopping-list/shopping.service';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class RecipeService {

  recipeChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(1,
      'Tasty Schnitzel',
      'A super-tasty Schnitzel - just awesome!',
      'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)
      ]),
    new Recipe(2, 'Big Fat Burger',
      'What else you need to say?',
      'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Meat', 1)
      ]),
      new Recipe(3, 'Big Fat Burger 2',
      'What else you need to say?',
      'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Meat', 1)
      ])
  ];

  constructor(private slService: ShoppingService) {}

  getAllRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  getRecipe(id : number){
    const recipe = this.recipes.find(
      (r) => {
        return r.id === id;
      }
    )

    return recipe;
  }

  getNextID(){
    let recipes = this.getAllRecipes();

    let max = Math.max.apply(
      Math, 
      recipes.map( function(recipe) 
        { return recipe.id; 
        }
        )
    );

    return max + 1;
  }

  getMinId(){
    let recipes = this.getAllRecipes();

    let min = Math.min.apply(
      Math, 
      recipes.map( function(recipe) 
        { return recipe.id; 
        }
        )
    );

    return min;
  }

  getMaxId(){
    let recipes = this.getAllRecipes();

    let max = Math.max.apply(
      Math, 
      recipes.map( function(recipe) 
        { return recipe.id; 
        }
        )
    );

    return max;
  }



  deleteRecipe(id: number){
    let index = 0;
    index = this.recipes.findIndex(x => x.id === id);

    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());    

    console.log(index);
    console.log(this.recipes);
  }

  addRecipe(recipe: Recipe){

    recipe.id = this.getNextID();
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe){
    newRecipe.id = index;
    this.recipes[index - 1] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }
}
