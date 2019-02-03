import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
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

  onAddIngredientClick() {
    (<FormArray>this.recipeForm.get("ingredients")).push(
      new FormGroup({
        'name': new FormControl(),
        'amount': new FormControl()
      })
    );
  }

  private initForm(){
    let recipeName = '';
    let description = '';
    let imagePath = '';
    let recipeIngredients = new FormArray([]);

    if (this.allowEdit){
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.Name;
      description = recipe.Description;
      imagePath = recipe.ImagePath;
      if(recipe['Ingredients']){
        for(let ingredient of recipe.Ingredients){
          recipeIngredients.push(
            new FormGroup({
                'name' : new FormControl(ingredient.name),
                'amount': new FormControl(ingredient.amount)
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName),
      'description': new FormControl(description),
      'imagePath': new FormControl(imagePath),
      'ingredients' : recipeIngredients,
    });
  }

  getControls(){
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

}
