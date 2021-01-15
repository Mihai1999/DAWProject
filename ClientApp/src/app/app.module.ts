import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthGuard } from './guards/auth.guard';
import { CacheInterceptor } from './interceptors/cache-interceptor';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { ErrorInterceptor } from './interceptors/error-interceptor';
import { AuthComponent } from './auth/auth.component';
import { AuthModule } from './auth/auth.module';
import { MealsComponent } from './meals/meals.component';
import { MealsModule } from './meals/meals.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatBadgeModule, MatButtonModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule, MatPaginatorModule, MatSliderModule, MatTableModule } from '@angular/material';
import 'hammerjs'
import { AlimentsComponent } from './aliments/aliments.component';
import { AlimentService } from './services/aliment.service';
import { HoverDirective } from './directive/hover.directive';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    AlimentsComponent,
    HoverDirective,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    AuthModule,
    MealsModule,
    //DirectivesModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'aliments', component: AlimentsComponent, canActivate: [AuthGuard]},

      {
        path: '',
        component: AuthComponent,
        children: [
          {
            path: '',
            loadChildren:
            () => import('./auth/auth.module').then(m => m.AuthModule)
          }
        ]
      },
      {
        path: '',
        component: MealsComponent,
        children: [
          {
            path: '',
            loadChildren:
            () => import('./meals/meals.module').then(m => m.MealsModule)
          }
        ]
      },
      { path: '**', component: HomeComponent},
    ]),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    
 
    
  ],
  providers: [
    AuthGuard,
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
