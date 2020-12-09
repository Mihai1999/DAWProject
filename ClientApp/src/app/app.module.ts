import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegisteruserComponent } from './registeruser/registeruser.component';
import { LoginComponent } from './login/login.component';
import { CaloriesComponent } from './calories/calories.component';
import { EditmealComponent } from './calories/editmeal/editmeal.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    RegisteruserComponent,
    LoginComponent,
    CaloriesComponent,
    EditmealComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    //DirectivesModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'registeruser', component: RegisteruserComponent },
      { path: 'login', component: LoginComponent},
      { path: 'meals', component: CaloriesComponent},
      { path: 'meals/:id', component: EditmealComponent},
      { path: 'meals/edit', component: EditmealComponent},
      { path: '**', component: HomeComponent},
    ]),
    ReactiveFormsModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
