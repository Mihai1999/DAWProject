import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Serving } from '../models/serving';

@Injectable({
  providedIn: 'root'
})
export class ServingService {

  private readonly url = 'serving/';

  constructor(private readonly api: ApiService) { }

  addServing(serving: Serving) {
    return this.api.post(this.url, serving);
  }

  getServing(id: number) {
    return this.api.get(this.url + id.toString());
  }

  delete(id: number) {
    return this.api.delete(this.url + id.toString());
  }

  update(serving: Serving) {
    return this.api.put(this.url + serving.id.toString(), serving);
  }

}
