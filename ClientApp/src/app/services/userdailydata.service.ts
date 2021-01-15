import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { UserDailyData } from '../models/userdailydata';

@Injectable({
  providedIn: 'root'
})
export class UserdailydataService {

  private readonly url = 'userdailydata/';

  constructor(private readonly api: ApiService) { }

  add(userdailydata: UserDailyData) {
    return this.api.post(this.url, userdailydata);
  }

  getData(id: number) {
    return this.api.get(this.url + id.toString());
  }

  delete(id: number) {
    return this.api.delete(this.url + id.toString());
  }

  update(userdailydata: UserDailyData) {
    return this.api.put(this.url + userdailydata.id.toString(), userdailydata);
  }

  getDatabyDate(id: number, data: Date){
    console.log(id, data);
    return this.api.post(this.url + id.toString(), data);
    
  }

}
