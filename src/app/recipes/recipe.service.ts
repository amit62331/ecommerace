import { Subject } from 'rxjs/Subject';
import { ShoppingListService } from './../shopping-list/shopping.service';
import { Ingredient } from './../shared/ingredient.model';
import { Recipe } from "./recipe.model";
import {  Injectable } from "@angular/core";

@Injectable()

export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();
    private recipes: Recipe[] = [
        new Recipe('A test Recipe', 
            'this is simply a test', 
            'https://www.sbs.com.au/food/sites/sbs.com.au.food/files/IMG_1105.jpg',
        [
            new Ingredient('Meat' ,1),
            new Ingredient('Freanch',20)
        ]),
        new Recipe(
            'A test Recipe', 
            'this is another a test', 
            'https://img.bestrecipes.com.au/RCK3slSo/h300-w400-cscale/br-api/asset/20771/super-easy-pizza-dough-recipe.jpg',
        [
            new Ingredient('buns',2),
            new Ingredient('Meat',1)
        ])
    ];

    constructor(private slService:ShoppingListService){}
    ngOnInit(){
        //console.log('ff',this.recipesChanged);
    }
    getRecipes(){ 
       // console.log(this.recipeSelected);
        return this.recipes.slice();
    }
    setRecipe(recipes:Recipe[]){
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }
    getRecipe(index:number){
        return this.recipes[index];
    }

    addRecipeItemToSl(ingredients:Ingredient[]){
        this.slService.addsItemToSL(ingredients);
    }
    addRecipe(recipe:Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index:number, newRecipe:Recipe){
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }
    
    deleteRecipe(index:number){
        this.recipes.splice(index ,1);
        this.recipesChanged.next(this.recipes.slice());
    }
}