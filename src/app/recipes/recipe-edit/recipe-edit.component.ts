
import { RecipeService } from './../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id:number;
  editMode = false;
  recipeForm:any;

  constructor(
    private route: ActivatedRoute,
    private fb:FormBuilder,
    private recipeService:RecipeService,
    private router:Router) { }

  ngOnInit() {
    this.route.params
    .subscribe((params:Params)=>{ 
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      //console.log(this.editMode);
     // console.log(params['id'] != null);
     this.InitForm();
    });
  }

  onSubmit(){
    //console.log(this.recipeForm);
    if(this.editMode){
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    }  else
    this.recipeService.addRecipe(this.recipeForm.value);
    this.onCancel();
  }

  onAddIngredients(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      this.fb.group({
        name:['',Validators.required],
        amount:['',[Validators.required ,Validators.pattern(/^[1-9]+[0-9]*$/)]]
      })
    )
  }

  onDeleteIngredient(index:number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo:this.route});
  }

  private InitForm(){
    let recipeName = '';
    let recipeImagePath ='';
    let recipeDescription ='';
    let recipeIngredients = new FormArray([]);
    if(this.editMode){
      const recipe = this.recipeService.getRecipe(this.id); //console.log(recipe.ingredients);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if(recipe['ingredients']){
        for(let ingredient of recipe.ingredients)
        recipeIngredients.push(
          this.fb.group({
            name:[ingredient.name, Validators.required],
            amount:[ingredient.amount,[Validators.required ,Validators.pattern(/^[1-9]+[0-9]*$/)]]
          })
        );

      }
    }
    this.recipeForm = this.fb.group({
      name:[recipeName,Validators.required],
      imagePath:[recipeImagePath, Validators.required],
      description:[recipeDescription, Validators.required],
      ingredients:recipeIngredients
    });
  }

}
