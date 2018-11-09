import { Ingredient } from './../../shared/ingredient.model';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ShoppingListService } from '../shopping.service';
import { Subscription } from 'rxjs/Subscription';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit , OnDestroy {
  subscription:Subscription;
  editMode=false;
  editeditemIndex:number;
  editItem:Ingredient;
  @ViewChild('f') slForm:NgForm;

  constructor(private slService:ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.slService.startedEditing
    .subscribe((index:number)=>{
      this.editeditemIndex=index;
      this.editMode=true;
      this.editItem = this.slService.getIngredient(index);
      //console.log(this.editItem);
      this.slForm.setValue({
        name: this.editItem.name,
        amount: this.editItem.amount
      });
    });
  }
  
  onSubmit(form){
    const value = form.value;
    const newIgredient = new Ingredient(value.name,value.amount);
    if(this.editMode){
      this.slService.upDateIngredients(this.editeditemIndex , newIgredient);
    } else{
      this.slService.addIngredient(newIgredient);
    }
    this.editMode = false;
    form.reset();
  }

  onClear(){
    this.slForm.reset();
    this.editMode=false;
  }

  onDelete(){
    this.slService.DeleteIngredients(this.editeditemIndex);
    this.onClear();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
