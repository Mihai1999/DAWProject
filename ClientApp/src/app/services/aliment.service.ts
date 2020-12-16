import { Injectable } from '@angular/core';
import { Aliment } from '../models/aliment';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AlimentService {

  private readonly url = 'aliment/';
  constructor(private api: ApiService) { }

  addAliment(aliment: Aliment) {
    return this.api.post(this.url, aliment);
  }

  getAliment(id: number) {
    return this.api.get(this.url + id.toString());
  }

  getAlimentByName(words: string) {
    return this.api.get(this.url + 'name/' + words);
  }

  getAliments() {
    return this.api.get(this.url);
  }

  delete(id: number) {
    return this.api.delete(this.url + id.toString());
  }

  update(aliment: Aliment) {
    return this.api.put(this.url + aliment.id.toString(), aliment);
  }



}
