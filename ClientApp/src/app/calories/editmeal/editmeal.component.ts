import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Aliment } from 'src/app/models/aliment';
import { Meal } from 'src/app/models/meal';
import { Serving } from 'src/app/models/serving';
import { AlimentService } from 'src/app/services/aliment.service';
import { MealService } from 'src/app/services/meal.service';
import { ServingService } from 'src/app/services/serving.service';
import { Identifier } from 'typescript';

@Component({
  selector: 'app-editmeal',
  templateUrl: './editmeal.component.html',
  styleUrls: ['./editmeal.component.css'],
  
})
export class EditmealComponent implements OnInit {

  public userMeal: Meal;
  public aliment = '';

  constructor(private mealService: MealService, private formbuilder: FormBuilder, private route: ActivatedRoute,
     private alimentService: AlimentService, private servingService: ServingService) { }

  public searchForm = this.formbuilder.group({
    searchbar: [''],
  });

  

  ngOnInit() {
    console.log("aici");
    this.route.queryParams
    .subscribe(result => {
      console.log("result", result.mealid);
      this.getMeal(result.mealid);
    })

    //this.getStorageItem();

    console.log("userMeal",this.userMeal);

  }


  getMeal(id:number){
    console.log("getMeal", id);
    this.mealService.getMeal(id).subscribe(result => {
      this.userMeal = result;
      console.log("userMeal2",this.userMeal);
      
    },
    error => console.log(error));
  }

  mysearch(){
    console.log();
    var input = this.searchForm.get('searchbar').value;

    
    var x = document.getElementById("afisare");

    this.alimentService.getAlimentByName(input).subscribe(result => {
      var array: Aliment[] = result;
      x.innerText = '';

      for(let aliment of array){
        var par = document.createElement('p')
        par.innerText = aliment.name;
        par.className = "pcontent";


        x.appendChild(par);
      }
    },
    error => console.log(error));

    
  }


  getStorageItem(){
    let meal = JSON.parse(sessionStorage.getItem('editmeal'))

    if(meal != null)
      this.userMeal = new Meal(meal);

  }

  function(ev: Event){

  var x = ev.target as Element;
  this.aliment = x.innerHTML;
    console.log(x.innerHTML); 
  }


  deleteServing(servingid: number){
    this.servingService.delete(servingid).subscribe(() => {
      this.getMeal(this.userMeal.id);
    },
    error => console.log(error));
  }

}
