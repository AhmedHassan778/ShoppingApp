import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients: Ingredient[] | undefined;
  constructor(private sLService: ShoppingListService) {
  }
  ngOnInit(): void {
    this.ingredients = this.sLService.getAllIngredients();
    this.sLService.ingradientsChanged.subscribe(ings => this.ingredients = ings);
  }
  onEditItem(index:number){
    this.sLService.startEditing.next(index);
  }
}
