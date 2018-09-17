import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('amountInput') amountInput: ElementRef;
  @ViewChild('nameInput') nameInput: ElementRef;
  @Output() onAdd = new EventEmitter<Ingredient>();  

  constructor() { }

  ngOnInit() {
  }

  onAddClicked() {
    if (this.amountInput.nativeElement.value !== '' && this.nameInput.nativeElement.value !== ''){

        this.onAdd.emit( new Ingredient( this.nameInput.nativeElement.value, 
        this.amountInput.nativeElement.value ) );

        this.nameInput.nativeElement.value = '';
        this.amountInput.nativeElement.value = '';
    }    
  }
}
