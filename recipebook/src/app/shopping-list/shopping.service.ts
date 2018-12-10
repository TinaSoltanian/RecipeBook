import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs/Subject";

export class ShoppingService {
  startedEditing = new Subject<number>();

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

  getIngredient(index: number){
    return this.ingredients[index];
  }

  private mergeIngredients() {
    let tempIng: Ingredient[] = [];

    this.ingredients.forEach(ingredient => {
      if (tempIng.length > 0) {

        const index = tempIng.map(e => e.name).indexOf(ingredient.name);

        if (index > -1) {
          tempIng[index].amount = Number(tempIng[index].amount) + Number(ingredient.amount);
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
