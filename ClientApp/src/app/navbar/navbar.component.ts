import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  currentUser: User;

  constructor(private router: Router,
    private userService: UserService) {
      this.userService.currentUser.subscribe(x => this.currentUser = x);
    }

  ngOnInit() {
  }

  isExpanded = false;

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }


  Logout(){
    this.userService.logout();
  }

  ngOnDestroy(){
    this.Logout();
  }

}
