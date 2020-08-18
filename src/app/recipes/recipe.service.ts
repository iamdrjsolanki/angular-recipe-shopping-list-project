import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {

    recipesChanged = new Subject<Recipe[]>();

    // private recipes: Recipe[] = [
    //     new Recipe('Pizza', 
    //                 'Margaritta', 
    //                 'https://c.pxhere.com/images/91/80/f7fa987d4a7d30d36edf24bf3710-1594093.jpg!d',
    //                 [new Ingredient('Pizza Base Bread', 1),
    //                     new Ingredient('Tomato', 1),
    //                     new Ingredient('Cheese', 1)]),
    //     new Recipe('Burger', 
    //                 'Hamburger', 
    //                 'https://c.pxhere.com/images/91/80/f7fa987d4a7d30d36edf24bf3710-1594093.jpg!d',
    //                 [new Ingredient('Buns', 2),
    //                     new Ingredient('Potato', 1),
    //                     new Ingredient('Cheese slice', 1)])
    //   ];

    private recipes: Recipe[] = [];

    constructor(private slService: ShoppingListService) {}

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(id: number) {
        return this.recipes[id];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }
      
}