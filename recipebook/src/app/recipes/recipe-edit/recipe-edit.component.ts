import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

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
    // const newRecipe = new Recipe(
    //   this.recipeForm.value["name"],
    //   this.recipeForm.value["description"],
    //   this.recipeForm.value["imagePath"],
    //   this.recipeForm.value["ingredients"]
    // );
    console.log(this.recipeForm.value);
    if (this.allowEdit){
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    }
    else{
      this.recipeService.addRecipe(this.recipeForm.value);
    }
  }

  onAddIngredientClick() {
    (<FormArray>this.recipeForm.get("ingredients")).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, 
          [Validators.required, 
            Validators.pattern(/^[1-9]+[0-9]*$/)])
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
      recipeName = recipe.name;
      description = recipe.description;
      imagePath = recipe.imagePath;
      if(recipe['Ingredients']){
        for(let ingredient of recipe.ingredients){
          recipeIngredients.push(
            new FormGroup({
                'name' : new FormControl(ingredient.name, Validators.required),
                'amount': new FormControl(ingredient.amount, 
                     [Validators.required, 
                     Validators.pattern(/^[1-9]+[0-9]*$/)] )
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'description': new FormControl(description , Validators.required),
      'imagePath': new FormControl(imagePath, Validators.required),
      'ingredients' : recipeIngredients,
    });
  }

  getControls(){
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

}
