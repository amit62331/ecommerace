import { AuthService } from './../auth/auth.service';
import { Recipe } from './../recipes/recipe.model';
import { RecipeService } from './../recipes/recipe.service';
import { Injectable } from "@angular/core";
import { Http,Response} from '@angular/http';

@Injectable()
export class DataStoreService{
    constructor(private http:Http, private recipeService:RecipeService,private authService:AuthService){}

    storeRecipe(){
        const token = this.authService.getToken();
        return this.http.put('https://ng-recipe-book-ad666.firebaseio.com/recipe.json?auth=' + token ,this.recipeService.getRecipes());
    }
    getRecipe(){
        const token = this.authService.getToken();
        return this.http.get('https://ng-recipe-book-ad666.firebaseio.com/recipe.json?auth=' + token)
        .map(
            (recipes:Response)=>{
                const data:Recipe[]=recipes.json();
                for(let recipe of data){
                    if(!recipe['ingredients'])
                    recipe['ingredients']=[];
                }
                return data;
            }
        ).subscribe(
            (recipes:Recipe[])=>{
                this.recipeService.setRecipe(recipes);
            }
        )
    }
}