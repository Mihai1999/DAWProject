import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Meal } from '../models/meal';
import { MealService } from '../services/meal.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls:['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit{


  constructor(private readonly mealService: MealService ){

  }
  
  public dataSource: MatTableDataSource<Meal>;

  @ViewChild('matPaginator', {static: false}) paginator: MatPaginator;

  displayedColumns =['name', 'data', 'total', 'firstname', 'lastname']

  ngOnInit(){
    this.mealService.getLeaderboards(10, new Date()).subscribe(result => {
      this.dataSource = result;
      console.log(this.dataSource);
      this.dataSource.paginator = this.paginator;
    });
  }

  ngAfterViewInit(){

  }
  

}
