import { User } from "./user";

export class UserDailyData {

  id: number;
  day: Date;
  weigth: number;
  bpm: number;
  userid: number;
  user: User;

  constructor(input?: any) {
    Object.assign(this, input);

  }

}
