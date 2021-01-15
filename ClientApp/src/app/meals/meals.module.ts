import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaloriesComponent } from '../calories/calories.component';
import { EditmealComponent } from '../calories/editmeal/editmeal.component';
import { AddservingComponent } from '../calories/addserving/addserving.component';
import { Router, RouterModule, Routes } from '@angular/router';
import { MealsComponent } from './meals.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule, MatFormFieldModule, MatInputModule, MatLabel, MatNativeDateModule, MatTabLabel } from '@angular/material';
import { AuthGuard } from '../guards/auth.guard';

const components = [CaloriesComponent, EditmealComponent, AddservingComponent, MealsComponent]

const MealRoutes: Routes = [
  {
    path: 'meals', component: MealsComponent,
    children: 
    [
      {path: 'dashboard', component: CaloriesComponent, canActivate: [AuthGuard]},
      {path: ':id', component: EditmealComponent, canActivate: [AuthGuard]},
    ]
  }
]

@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forChild(MealRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    
  ]
})
export class MealsModule { }
