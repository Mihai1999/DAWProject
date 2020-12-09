import { Aliment } from "./aliment";
import { Meal } from "./meal";

export class Serving {

  id: number;
  quantity: number;
  calories: number;
  alimentid: number;
  aliment: Aliment;
  mealid: number;
  meal: Meal;

  constructor(input?: any) {
    Object.assign(this, input);

  }

}
