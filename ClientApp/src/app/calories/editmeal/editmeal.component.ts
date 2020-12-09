import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Aliment } from 'src/app/models/aliment';
import { Meal } from 'src/app/models/meal';
import { Serving } from 'src/app/models/serving';
import { MealService } from 'src/app/services/meal.service';
import { Identifier } from 'typescript';

@Component({
  selector: 'app-editmeal',
  templateUrl: './editmeal.component.html',
  styleUrls: ['./editmeal.component.css'],
  
})
export class EditmealComponent implements OnInit {

  public userMeal: Meal;

  constructor(private mealService: MealService, private formbuilder: FormBuilder, private route: ActivatedRoute) { }

  public searchForm = this.formbuilder.group({
    searchbar: ['Cauta'],
  });

  ngOnInit() {
    console.log("aici");
    // this.route.queryParams
    // .subscribe(result => {
    //   this.getMeal(result.mealid);
    //   setTimeout(function(){}, 10000);
      
    // })

    this.getStorageItem();

    console.log("userMeal",this.userMeal);

  }

  getMeal(id:number){
    this.mealService.getMeal(id).subscribe(result => {
      this.userMeal = result;
      console.log("userMeal2",this.userMeal);
      
    },
    error => console.log(error));
  }

  mysearch(){
    console.log();
    var input = this.searchForm.get('searchbar').value;
    
    
  }

  getStorageItem(){
    let meal = JSON.parse(sessionStorage.getItem('editmeal'))

    if(meal != null)
      this.userMeal = new Meal(meal);

  }


}
