import { Component, OnInit} from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ShoppingService } from '../../shopping-list/shopping.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe : Recipe;
  constructor(private recipeService: RecipeService, 
    private shoppingService: ShoppingService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    const id = +this.route.snapshot.queryParams['id'];
    console.log(id);
    this.recipe = this.recipeService.getRecipe(id);
    console.log(this.recipe);

    this.route.params.subscribe( 
      (params: Params) => {
        this.recipe = this.recipeService.getRecipe(+params['id']);
      }
     );
  }

  onShoppingListClicked(){

    this.shoppingService.addIngredients(this.recipe.ingredients);
  }
}
