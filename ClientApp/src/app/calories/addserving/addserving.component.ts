import { Component, Input, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Aliment } from 'src/app/models/aliment';
import { Serving } from 'src/app/models/serving';
import { AlimentService } from 'src/app/services/aliment.service';
import { ServingService } from 'src/app/services/serving.service';
import { EditmealComponent } from '../editmeal/editmeal.component';



@Component({
  selector: 'app-addserving',
  templateUrl: './addserving.component.html',
  styleUrls: ['./addserving.component.css']
})
export class AddservingComponent implements OnInit {

  @Input() alimentName: string = "aliment";
  @Input() mealId: number = 0;

  constructor(private formbuilder: FormBuilder, private alimentService: AlimentService, private servingService: ServingService) { }

  public addServingForm = this.formbuilder.group({
    quantity: ['', Validators.required],
  });

  ngOnInit() {
    
  }

  getValues(){

  
    this.alimentService.getAlimentByName(this.alimentName).subscribe(result => {
      this.insertServing(result[0].id);
    },
    error => console.log(error));

  }

  insertServing(alimentId: number){
    var serving = new Serving();
    serving.alimentid = alimentId;
    serving.mealid = this.mealId;
    serving.quantity = this.addServingForm.value.quantity;

    console.log(serving);
    this.servingService.addServing(serving).subscribe(() => {
      console.log("Serving adaugat ", serving);
      window.location.reload();
    },
    error => console.log(error));
  }

}
