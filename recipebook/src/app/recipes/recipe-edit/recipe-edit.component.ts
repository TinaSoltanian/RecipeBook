import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  allowEdit: boolean = false;
  recipeForm: FormGroup;
  
  constructor(private route: ActivatedRoute,
                private recipeService: RecipeService) { }

  ngOnInit() {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.allowEdit = this.id != null;        
        this.initForm();
      }
    );
  }

  onSubmit(){
    console.log(this.recipeForm);
  }

  private initForm(){
    let recipeName = '';
    let description = '';
    let imagePath = '';

    if (this.allowEdit){
      recipeName = this.recipeService.getRecipe(this.id).Name;
      description = this.recipeService.getRecipe(this.id).Description;
      imagePath = this.recipeService.getRecipe(this.id).ImagePath;
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName),
      'description': new FormControl(description),
      'imagePath': new FormControl(imagePath),
    });
  }

}
