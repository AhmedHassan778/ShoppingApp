import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";

export class ShoppingListService {
  ingradientsChanged =new Subject<any>();
  startEditing=new Subject<number>();
  private ingredients: Ingredient[] =
    [
      new Ingredient('Apples', 6),
      new Ingredient('Tomatos', 10),
    ];

  getAllIngredients() {
    return this.ingredients.slice();
  }
  getIngredient(index:number) {
    return this.ingredients[index];
  }
  addIngradient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingradientsChanged.next(this.ingredients.slice());
  }
  updateIngradient(index:number,newIngredient: Ingredient) {
    this.ingredients[index]=newIngredient;
    this.ingradientsChanged.next(this.ingredients.slice());
  }
  addIngradients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingradientsChanged.next(this.ingredients.slice());
  }
  deleteIngredient(index:number){
    this.ingredients.splice(index,1);
    this.ingradientsChanged.next(this.ingredients.slice());
  }  
}
