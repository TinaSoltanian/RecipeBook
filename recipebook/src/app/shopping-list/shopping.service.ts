import { Ingredient } from "../shared/ingredient.model";
import { EventEmitter } from '@angular/core';

export class ShoppingService{

  private ingredients: Ingredient[] = [
    new Ingredient('Apple', 5),
    new Ingredient('Tomato', 10),
  ];

    addIngredient(ingredient: Ingredient){
        this.ingredients.push(ingredient);
        this.ingredientChanged.emit(this.ingredients.slice());
    }

    addIngredients(ingredient_array: Ingredient[]) {
        //this.ingredients.push.apply(this.ingredients, ingredient_array);
        this.ingredients.push(...ingredient_array);
        console.log(this.ingredients);
        this.shoppingListChanged.emit(this.ingredients.slice());
    }

    getIngredients() {
        return this.ingredients.slice();
    }

    ingredientChanged = new EventEmitter<Ingredient[]>();
    shoppingListChanged = new EventEmitter<Ingredient[]>();
}