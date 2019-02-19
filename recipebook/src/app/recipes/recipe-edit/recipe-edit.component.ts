import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
  isDelete: boolean = false;
  
  constructor(private route: ActivatedRoute,
                private recipeService: RecipeService,
                private router: Router) { }

  ngOnInit() {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.isDelete = this.router.url.indexOf('delete') !== -1;
        this.allowEdit = (this.id !== null) && !(isNaN(this.id)) && this.isDelete === false;      
        this.initForm();
      }
    );
  }

  onDeleteClick(){
    this.recipeService.deleteRecipe(this.id);
    this.navigateAway(this.recipeService.getMinId());
  }

  navigateAway(id: number){    
      this.router.navigateByUrl("/recipes/" + id);
  }

  onCancelClick(){
    if (this.allowEdit){
      this.navigateAway(this.id);
    }
    else
    {
      this.navigateAway(this.recipeService.getMinId());
    }
  }

  onDeleteIngredient(index: number){
    (<FormArray>this.recipeForm.get("ingredients")).removeAt(index);
  }

  onSubmit(){
    // const newRecipe = new Recipe(
    //   this.recipeForm.value["name"],
    //   this.recipeForm.value["description"],
    //   this.recipeForm.value["imagePath"],
    //   this.recipeForm.value["ingredients"]
    // );
    if (this.allowEdit){
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
      this.navigateAway(this.id);
    }
    else{
      this.recipeService.addRecipe(this.recipeForm.value);
      this.navigateAway(this.recipeService.getMaxId());
    }
  }

  onAddIngredientClick() {
    console.log(this.recipeForm);
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
    let ingredients = new FormArray([]);

    if (this.allowEdit || this.isDelete){
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      description = recipe.description;
      imagePath = recipe.imagePath;
      if(recipe['ingredients']){
        for(let ingredient of recipe.ingredients){
          ingredients.push(
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
      'ingredients' : ingredients,
    });
  }

  getControls(){
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

}
