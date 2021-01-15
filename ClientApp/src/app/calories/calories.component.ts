import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Aliment } from '../models/aliment';
import { Meal } from '../models/meal';
import { Serving } from '../models/serving';
import { User } from '../models/user';
import { UserDailyData } from '../models/userdailydata';
import { MealService } from '../services/meal.service';
import { ServingService } from '../services/serving.service';
import { UserService } from '../services/user.service';
import { UserdailydataService } from '../services/userdailydata.service';
import { EditmealComponent } from './editmeal/editmeal.component';

@Component({
  selector: 'app-calories',
  templateUrl: './calories.component.html',
  styleUrls: ['./calories.component.css']
})
export class CaloriesComponent implements OnInit {
  public userMeals: Meal[];
  public today: Date =  new Date();
  public user: User;
  public userData: UserDailyData;

  //@ViewChild('editMeal', {static: false}) editMeal: EditmealComponent;



  constructor(private mealService: MealService,
     private router: Router, 
     private formbuilder: FormBuilder, 
     private servingService: ServingService,
     private userService: UserService,
     private userDataService: UserdailydataService) { }

  public dateForm = this.formbuilder.group({
    datepicker: ['', Validators.required]
  });

  public addMealForm = this.formbuilder.group({
    mealName: ['', Validators.required]
  });

  public dailyDataForm = this.formbuilder.group({
    weigth: ['0'],
    bpm: ['0']
  });

  ngOnInit() {

    this.dateForm.get('datepicker').setValue(this.today); 
    //this.user = JSON.parse(sessionStorage.getItem('user'));
    this.userService.currentUser.subscribe(x => this.user = x);
    //console.log("today date \n",this.today);
    if(this.user != null){
      this.user = new User(this.user);
      
      //this.getMeals(user.id);
      this.getMealsByDate(this.user.id, this.dateForm.get('datepicker').value);
      this.getDailyData(this.user.id, this.dateForm.get('datepicker').value);
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
      for(let meal of this.userMeals){
        this.calculateTotal(meal);
      }
      console.log(result);
      
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
      var dateform = this.dateForm.get('datepicker').value
      //console.log("today stergere", this.today);
      var date = dateform != null?dateform:this.today;
      //console.log("data stergere ",date);
      this.getMealsByDate(this.user.id, date);
      //window.location.reload();
    },
    error => console.log(error));
  }

  edit(meal: Meal){
    sessionStorage.setItem('editmeal', JSON.stringify(meal));
    //this.editMeal.mealid = meal.id;
    this.router.navigate(['../meals/' + meal.id], {queryParams : {mealid: meal.id} });
    console.log("edit");
    
  }

  addMeal(){
    var name = this.addMealForm.get('mealName').value;
    var newMeal: Meal = new Meal();
    newMeal.name = name;
    newMeal.userid = this.user.id;
    var newDate = this.dateForm.get('datepicker').value
    newMeal.date = newDate;
    console.log("newDate ", newDate)
    this.mealService.addMeal(newMeal).subscribe(() =>{
      //window.location.reload();
      this.getMealsByDate(this.user.id, newDate);
    },
    error => console.log(error));

  }

  changeDate(){
    var newDate = this.formToDate(); 
    //console.log("new date ", newDate);
    this.getMealsByDate(this.user.id, newDate);

  }

  formToDate(){
    var newDate = this.dateForm.get('datepicker').value;

    return newDate;
  }



  change_datepicker(){
    
    var date: Date = this.dateForm.get('datepicker').value;
    this.getMealsByDate(this.user.id, date);
    this.getDailyData(this.user.id, date);
  }

  deleteMeal(mealid: number){
    this.mealService.delete(mealid).subscribe(() => {
      var date: Date = this.dateForm.get('datepicker').value;
      this.getMealsByDate(this.user.id, date);
    },
    error => console.log(error));
  }

  getDailyData(id: number, data: Date){
    this.userDataService.getDatabyDate(id, data).subscribe(result => {
      if(result != null){
        this.userData = result;
        console.log(result);
      }
        
      else {
        this.userData = new UserDailyData({ weigth: 0, bpm: 0})
        console.log("Aici")
      }
      
      
    },
    error => console.log(error))
  }

  setDailyData(){
    var udd = new UserDailyData({
    weigth: this.dailyDataForm.get('weigth').value, 
    bpm: this.dailyDataForm.get('bpm').value,
    userid: this.user.id,
    day: this.dateForm.get('datepicker').value,
  });

  this.userDataService.add(udd).subscribe(() => {

    this.getDailyData(this.user.id, udd.day);
  },
  error => console.log(error));
  }


}
