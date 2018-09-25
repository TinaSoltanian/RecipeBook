import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {  
  // @Output() onSelectedItem = new EventEmitter<Recipe>();

  constructor( private recipeService: RecipeService ) {}

  recipes: Recipe[] = [
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

  ngOnInit() {}

  itemSelected(recipe) {
    // this.onSelectedItem.emit(recipe);
  }
}
