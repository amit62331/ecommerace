import { ShoppingListService } from './shopping.service';
import { Ingredient } from './../shared/ingredient.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit ,OnDestroy {
  ingredients:Ingredient[] ;
  private subscribtion:Subscription;

  constructor(public slService:ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.slService.getIngredients();
    this.subscribtion = this.slService.ingredientChanged
    .subscribe((ingredient:Ingredient[])=>{
      this.ingredients = ingredient;
    });
  }

  onEditItem(index : number){
    this.slService.startedEditing.next(index);
  }
  ngOnDestroy(){
    this.subscribtion.unsubscribe();
  }
 
}
