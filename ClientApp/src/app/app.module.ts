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
import { AddservingComponent } from './calories/addserving/addserving.component';
import { AuthGuard } from './guards/auth.guard';
import { CacheInterceptor } from './interceptors/cache-interceptor';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { ErrorInterceptor } from './interceptors/error-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    RegisteruserComponent,
    LoginComponent,
    CaloriesComponent,
    EditmealComponent,
    AddservingComponent,
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
      { path: 'meals', component: CaloriesComponent, canActivate: [AuthGuard]},
      { path: 'meals/:id', component: EditmealComponent, canActivate: [AuthGuard]},
      { path: 'meals/edit', component: EditmealComponent, canActivate: [AuthGuard]},
      { path: '**', component: HomeComponent},
    ]),
    ReactiveFormsModule
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CacheInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
