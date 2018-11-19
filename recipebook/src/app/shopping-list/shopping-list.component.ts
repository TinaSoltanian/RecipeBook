import { Component, OnInit, OnDestroy } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from './shopping.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients = [];
  private shoppingSubscribtion: Subscription;
  private ingredSubscribtion: Subscription;

  constructor(private shoppingService: ShoppingService) { }

  ngOnInit() {  
    this.ingredients = this.shoppingService.getIngredients();

    this.ingredSubscribtion = this.shoppingService.ingredientChanged
    .subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      });


      this.shoppingSubscribtion = this.shoppingService.shoppingListChanged
      .subscribe(
        (ingredients: Ingredient[]) => {
          this.ingredients = ingredients;
        });
  }

  ngOnDestroy(){
    this.shoppingSubscribtion.unsubscribe();
    this.ingredSubscribtion.unsubscribe();
  }
}
