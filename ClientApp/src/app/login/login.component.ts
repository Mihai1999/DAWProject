import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Userlogin } from '../models/userlogin';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public userLogin: Userlogin;
  public succes: boolean;


  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) {}

  ngOnInit() {
    //console.log("loginForm", this.loginForm);
  }

  public loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['']
  });

  onSubmit(){
    this.userLogin = this.loginForm.value;
    this.userService.login(this.userLogin).subscribe(result => {
      console.log(result);
      sessionStorage.setItem('user', JSON.stringify(result));
      console.log("login storage", sessionStorage.getItem('user'));
      this.succes = true;
    },
    error => {
      console.log(error);
      console.log(this.userLogin);
      this.succes = false;
    });

  }

  afisare(){
    this.succes = true;
    console.log(this.loginForm.value);
  }

  resetForm(){
    this.loginForm.reset();
  }

  navigateToHome(){

    this.router.navigate(['/meals']);

  }


}
