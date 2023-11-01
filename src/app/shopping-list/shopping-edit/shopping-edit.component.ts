import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy{
  @ViewChild('f',{static:false}) sLForm:NgForm | undefined;
  subsription:Subscription|undefined;
  editMode=false;
  editedItemIndex:number | undefined;
  editedItem:Ingredient | undefined;
  constructor(private sLService: ShoppingListService) {
  }
  ngOnInit(): void {
    this.subsription=this.sLService.startEditing.subscribe((index)=>{
      this.editMode=true;
      this.editedItemIndex=index;
      this.editedItem=this.sLService.getIngredient(this.editedItemIndex);
      this.sLForm?.setValue({
        name:this.editedItem.name,
        amount:this.editedItem.amount
      });
    }); 
 }
  ngOnDestroy(): void {
    this.subsription?.unsubscribe();
    }
  onAddItem(form:NgForm) {
    const value=form.value;
    if(this.editMode)
    this.sLService.updateIngradient(this.editedItemIndex!,new Ingredient(value.name,
      value.amount));
      else
    this.sLService.addIngradient(new Ingredient(value.name,
      value.amount));
      this.editMode=false;
      form.reset();
    }
  onUpdateItem(index:number,newIngredient:Ingredient) {
    this.sLService.updateIngradient(index,newIngredient);
  }
  onClear(){
    this.sLForm?.reset();
    this.editMode=false;
  }
 onDelete(){
  this.sLService.deleteIngredient(this.editedItemIndex!);
  this.onClear();
 }
}
