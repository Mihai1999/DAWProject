import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Aliment } from '../models/aliment';
import { AlimentService } from '../services/aliment.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-aliments',
  templateUrl: './aliments.component.html',
  styleUrls: ['./aliments.component.css']
})
export class AlimentsComponent implements OnInit, AfterViewInit {

  aliments: Aliment[] = [];
  displayedColumns = ['name', 'quantity', 'calories', 'fibers', 'fats', 'carbs', 'delete']
  

  constructor(private readonly alimentService: AlimentService,
    private formBuilder: FormBuilder) { }

  public dataSource: MatTableDataSource<Aliment>;
/* 
  @ViewChild(MatPaginator, {static: false}) set paginator(value: MatPaginator){
    if(this.dataSource){
      this.dataSource.paginator = value;
    }
  }*/

  @ViewChild('alimentPaginator', {static: false}) paginator: MatPaginator;

  ngAfterViewInit() {
    
  }

  public addAlimentForm = this.formBuilder.group({
    name: ['', Validators.required],
    quantity: ['', Validators.required],
    calories: ['', Validators.required],
    fibers: ['', Validators.required],
    carbs: ['', Validators.required],
    fats: ['', Validators.required]
  });

  ngOnInit() {
    this.getAliments();
    
  }

  getAliments(){
    this.alimentService.getAliments().subscribe(data => {
      this.aliments = data;
      this.dataSource = new MatTableDataSource<Aliment>(this.aliments);
      this.dataSource.paginator = this.paginator;
      console.log(this.aliments);
    },
    error => console.log(error));
  }

  addAliment(){
    var aliment = new Aliment(this.addAlimentForm.value);
    this.alimentService.addAliment(aliment).subscribe(() => {
      this.getAliments();
    },
    error => console.log(error))

  }

  deleteAliment(id: number){
    this.alimentService.delete(id).subscribe(() => {
      this.getAliments();
    },
    error => console.log(error))
  }

}
