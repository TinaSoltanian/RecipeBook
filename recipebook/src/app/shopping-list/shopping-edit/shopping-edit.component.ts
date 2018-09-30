import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingService } from '../shopping.service';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('amountInput') amountInput: ElementRef;
  @ViewChild('nameInput') nameInput: ElementRef;
  //@Output() onAdd = new EventEmitter<Ingredient>();  

  constructor(private shoppingService: ShoppingService) { }

  ngOnInit() {
  }

  onAddClicked() {
    if (this.amountInput.nativeElement.value !== '' && this.nameInput.nativeElement.value !== ''){

        this.shoppingService.addIngredients( new Ingredient( this.nameInput.nativeElement.value, 
        this.amountInput.nativeElement.value ) );


        this.nameInput.nativeElement.value = '';
        this.amountInput.nativeElement.value = '';
    }    
  }
}
