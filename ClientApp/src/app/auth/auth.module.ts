import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RegisteruserComponent } from '../registeruser/registeruser.component';
import { LoginComponent } from '../login/login.component';
import { AuthComponent } from './auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material';

const components = [RegisteruserComponent, LoginComponent, AuthComponent]
const AuthRoutes = [
  {
    path: 'auth', component: AuthComponent,
    children:
    [
      { path: 'registeruser', component: RegisteruserComponent },
      { path: 'login', component: LoginComponent},
    ]
  }
]

@NgModule({
  declarations: [components],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatDatepickerModule,
    RouterModule.forChild(AuthRoutes)],
  exports: components
})
export class AuthModule { }
