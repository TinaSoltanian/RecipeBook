import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingService } from '../shopping.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  // @ViewChild('amountInput') amountInput: ElementRef;
  // @ViewChild('nameInput') nameInput: ElementRef;
  //@Output() onAdd = new EventEmitter<Ingredient>();  

  @ViewChild('f') myForm: NgForm;

  constructor(private shoppingService: ShoppingService) { }

  ngOnInit() {
  }

  onAddClicked() {
     const values = this.myForm.value;
//     console.log(values);
    if (values.name !== '' && values.amount !== ''){

        this.shoppingService.addIngredient( new Ingredient( values.name, 
          values.amount ) );


        // this.nameInput.nativeElement.value = '';
        // this.amountInput.nativeElement.value = '';
    }    
  }


}
