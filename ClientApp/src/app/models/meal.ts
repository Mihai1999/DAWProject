import { User } from "oidc-client/dist/oidc-client";
import { Serving } from "./serving";

export class Meal {

  id: number;
  date: Date;
  userid: number;
  user: User;
  servings: Serving[];
  total: number;
  name: string;
  mealCalories: number;

  constructor(input?: any) {
    Object.assign(this, input);

  }

}
