import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { SlowBuffer } from 'buffer';
import { User } from '../models/user';
import { ApiService } from '../services/api.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-registeruser',
  templateUrl: './registeruser.component.html',
  styleUrls: ['./registeruser.component.css']
})
export class RegisteruserComponent implements OnInit {

  public user: User;
  public succes: boolean;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private api: ApiService) { }
  

  ngOnInit() {
    this.userService.getUser(1).subscribe(result =>{
      this.user = result;
      console.log(this.user);
    },
    error => console.log(error)
    );

    this.userService.getAllUsers().subscribe(result =>{
      console.log(result);
    },
    error => console.log(error)
    );

    
  }
  public registeruserForm = this.formBuilder.group({
    email: ['', Validators.required],
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    password: [''],
  });

  onSubmit() {

    this.user = this.registeruserForm.value;

    this.userService.addNewUser(this.user).subscribe(() => {
      this.succes = true;
      console.log("succes");
    }, error => {
      console.log(error);
      console.log(this.user);
      this.succes = false;
    });

  }

  resetForm(){
    this.registeruserForm.reset();
  }


}
