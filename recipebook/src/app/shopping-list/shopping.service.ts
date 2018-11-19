import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs/Subject";

export class ShoppingService {
  private ingredients: Ingredient[] = [
    new Ingredient("Apple", 5),
    new Ingredient("Tomato", 10)
  ];

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.mergeIngredients();
    this.ingredientChanged.next(this.ingredients.slice());
  }

  // private tempIng: Ingredient[];
  // private i : number;

  private mergeIngredients() {
    let tempIng: Ingredient[] = [];

    this.ingredients.forEach(ingredient => {
      if (tempIng.length > 0) {

        const index = tempIng.map(e => e.name).indexOf(ingredient.name);

        if (index > -1) {
          tempIng[index].amont = Number(tempIng[index].amont) + Number(ingredient.amont);
        } else {
          tempIng.push(ingredient);
        }
      } else {
        tempIng.push(ingredient);
      }
    });

    this.ingredients = tempIng.slice();
  }

  addIngredients(ingredient_array: Ingredient[]) {
    //this.ingredients.push.apply(this.ingredients, ingredient_array);
    this.ingredients.push(...ingredient_array);
    this.mergeIngredients();
    this.shoppingListChanged.next(this.ingredients.slice());
  }

  getIngredients() {
    return this.ingredients.slice();
  }

  ingredientChanged = new Subject<Ingredient[]>();
  shoppingListChanged = new Subject<Ingredient[]>();
}
