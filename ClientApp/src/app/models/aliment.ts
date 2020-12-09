import { Serving } from "./serving";

export class Aliment {

  id: number;
  name: string;
  photo: string;
  quantity: number;
  calories: number;
  fats: number;
  fibers: number;
  carbs: number;
  servings: Serving[];

  constructor(input?: any) {
    Object.assign(this, input);

  }

}
