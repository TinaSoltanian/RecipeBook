import { Component, OnInit, Input} from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ShoppingService } from '../../shopping-list/shopping.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe : Recipe;
  constructor(private recipeService: RecipeService, private shoppingService: ShoppingService) { }

  ngOnInit() {
  }

  onShoppingListClicked(){

    this.shoppingService.addIngredients(this.recipe.Ingredients);
  }
}
