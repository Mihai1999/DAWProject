import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Aliment } from '../models/aliment';
import { Meal } from '../models/meal';
import { Serving } from '../models/serving';
import { User } from '../models/user';
import { MealService } from '../services/meal.service';

@Component({
  selector: 'app-calories',
  templateUrl: './calories.component.html',
  styleUrls: ['./calories.component.css']
})
export class CaloriesComponent implements OnInit {
  public userMeals: Meal[];

  constructor(private mealService: MealService, private router: Router) { }

  ngOnInit() {

    let user = JSON.parse(sessionStorage.getItem('user'));
    if(user != null){
      user = new User(user);
  
      this.getMeals(user.id);
    }

  }

  getMeals(id: number){
    this.mealService.getUserMeals(id).subscribe(result => {
      this.userMeals = result;
      console.log(this.userMeals);
      for(let meal of this.userMeals){
        this.calculateTotal(meal);
      }
    },
    error => console.log(error));
  }

  calculateTotal(meal: Meal){
    let sum = 0;
    for(let serving of meal.servings){
      serving.calories = (serving.quantity/serving.aliment.quantity) * serving.aliment.calories
      sum += serving.calories;
    }
    meal.total = sum;

  }

  deleteItem(id: number){
    this.mealService.delete(id).subscribe(() => {

    },
    error => console.log(error));
  }

  edit(meal: Meal){
    sessionStorage.setItem('editmeal', JSON.stringify(meal));
    this.router.navigate(['/meals/{meal.id}']);
    console.log("edit");
    
  }



}
