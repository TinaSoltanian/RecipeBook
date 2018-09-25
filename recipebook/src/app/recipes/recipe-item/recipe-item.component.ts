import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  currentRecipe: Recipe;
  //@Output() onSelectedItem = new EventEmitter<void>();
  
  constructor( private recipeService: RecipeService ) {}

  ngOnInit() {
  }

  onItemClicked(selectedItem) {
    this.currentRecipe = selectedItem;
    this.recipeService.setCurrentRecipe(selectedItem);
  }
}
