import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, OnDestroy } from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingService } from '../shopping.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @ViewChild('amountInput') amountInput: ElementRef;
  // @ViewChild('nameInput') nameInput: ElementRef;
  //@Output() onAdd = new EventEmitter<Ingredient>();  

  @ViewChild('f') myForm: NgForm;
  sunscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  selectedIngredient: Ingredient;

  constructor(private shoppingService: ShoppingService) { }

  ngOnInit() {
    this.sunscription = this.shoppingService.startedEditing
      .subscribe(
        (index: number) =>{
          this.editMode = true;
          this.editedItemIndex = index;
          this.selectedIngredient = this.shoppingService.getIngredient(index);
          this.myForm.setValue({
            name: this.selectedIngredient.name,
            amount: this.selectedIngredient.amount
          })
        }
      );
  }

  ngOnDestroy(){
    this.sunscription.unsubscribe();
  }
  
  onClearUI() {
    console.log('test');
    this.myForm.reset();
  }
  
  onAddClicked() {
     const values = this.myForm.value;
     const newIngredient = new Ingredient( values.name, values.amount );
     if (this.editMode){
       this.shoppingService.updateIngredient(this.editedItemIndex, newIngredient);
     }
     else{
        this.shoppingService.addIngredient( newIngredient );   
     }
     this.editMode = false;
     this.myForm.reset();
  }



}
