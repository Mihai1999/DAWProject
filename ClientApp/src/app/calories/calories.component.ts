import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Aliment } from '../models/aliment';
import { Meal } from '../models/meal';
import { Serving } from '../models/serving';
import { User } from '../models/user';
import { MealService } from '../services/meal.service';
import { ServingService } from '../services/serving.service';

@Component({
  selector: 'app-calories',
  templateUrl: './calories.component.html',
  styleUrls: ['./calories.component.css']
})
export class CaloriesComponent implements OnInit {
  public userMeals: Meal[];
  public today: Date =  new Date();
  public user: User;

  constructor(private mealService: MealService, private router: Router, private formbuilder: FormBuilder, private servingService: ServingService) { }

  public dateForm = this.formbuilder.group({
    day: [ this.today.getUTCDate(), Validators.required],
    month: [this.today.getMonth() + 1, Validators.required],
    year: [this.today.getFullYear(), Validators.required]
  });

  public addMealForm = this.formbuilder.group({
    mealName: ['', Validators.required]
  });

  ngOnInit() {

    this.user = JSON.parse(sessionStorage.getItem('user'));
    if(this.user != null){
      this.user = new User(this.user);
      console.log("data",this.today);
      console.log(this.dateForm.value);
      //this.getMeals(user.id);
      this.getMealsByDate(this.user.id, this.today);
    }
    

  }

  getMeals(id: number){
    this.mealService.getUserMeals(id).subscribe(result => {
      this.userMeals = result;
      for(let meal of this.userMeals){
        this.calculateTotal(meal);
      }
    },
    error => console.log(error));
  }

  getMealsByDate(id: number, d: Date){
    this.mealService.getMealsByDate(id, d).subscribe(result => {
      this.userMeals = result;
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
    this.servingService.delete(id).subscribe(() => {
      window.location.reload();
    },
    error => console.log(error));
  }

  edit(meal: Meal){
    sessionStorage.setItem('editmeal', JSON.stringify(meal));
    this.router.navigate(['/meals/' + meal.id], {queryParams : {mealid: meal.id} });
    console.log("edit");
    
  }

  addMeal(){
    var name = this.addMealForm.get('mealName').value;
    var newMeal: Meal = new Meal();
    newMeal.name = name;
    newMeal.userid = this.user.id;
    var newDate = this.formToDate();
    newMeal.date = this.formToDate();

    this.mealService.addMeal(newMeal).subscribe(() =>{
      //window.location.reload();
      this.getMealsByDate(this.user.id, newDate);
    },
    error => console.log(error));

  }

  changeDate(){


    var newDate = this.formToDate(); 
    console.log("newDate", newDate);

    this.mealService.getMealsByDate(this.user.id, newDate).subscribe(result => {
      this.userMeals = result;
      console.log("newMeals", result);
    },
    error => console.log(error));

  }

  formToDate(){
    var newDate = new Date();
    newDate.setUTCDate(this.dateForm.get('day').value);
    newDate.setUTCMonth(this.dateForm.get('month').value - 1);
    newDate.setUTCFullYear(this.dateForm.get('year').value);

    return newDate;
  }


}
