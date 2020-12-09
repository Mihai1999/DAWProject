import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Meal } from '../models/meal';

@Injectable({
  providedIn: 'root'
})
export class MealService {

  private readonly url = 'meal/';

  constructor(private api: ApiService) { }

  getMeal(id: number) {
    return this.api.get(this.url + id.toString());
  }

  getMeals(){
    return this.api.get(this.url);
  }

  addMeal(meal: Meal) {
    return this.api.post(this.url, meal);
  }

  delete(id: number) {
    return this.api.delete(this.url + id.toString());
  }

  update(meal: Meal) {
    return this.api.put(this.url + meal.id.toString(), meal);
  }

  getUserMeals(id: number){
    return this.api.get('user/' + id.toString() + '/usermeals');
  }

}
