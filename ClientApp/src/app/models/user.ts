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

  constructor(input?: any) {
    Object.assign(this, input);

  }

}
