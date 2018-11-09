import { Ingredient } from './../shared/ingredient.model';
import { Subject } from 'rxjs/Subject';
export class ShoppingListService{
    ingredientChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();

    public ingredients:Ingredient[] =[
        new Ingredient('Apple' , 5),
        new Ingredient('Tomatoes',10)
    ];

    getIngredients(){
        return this.ingredients.slice();
    }
    getIngredient(index:number){
        return this.ingredients[index];
    }
    addIngredient(ingredient:Ingredient){
        this.ingredients.push(ingredient);
        this.ingredientChanged.next(this.ingredients.slice());
    }

    addsItemToSL(ingredients:Ingredient[]){
        this.ingredients.push(...ingredients);
        this.ingredientChanged.next(this.ingredients.slice());
    }
    upDateIngredients(index:number , newIngredients:Ingredient){
        this.ingredients[index] = newIngredients;
        this.ingredientChanged.next(this.ingredients.slice());
    }
    DeleteIngredients(index:number){
        this.ingredients.splice(index,1);
        this.ingredientChanged.next(this.ingredients.slice());
    }
}