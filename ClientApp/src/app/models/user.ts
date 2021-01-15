import { Meal } from "./meal";
import { UserDailyData } from "./userdailydata";

export class User {

  id: number;
  username: string;
  email: string;
  password: string;
  token: string;
  userdailydata: UserDailyData[];
  meals: Meal[];
  firstName: string;
  lastName: string;

  constructor(input?: any) {
    Object.assign(this, input);

  }

}
