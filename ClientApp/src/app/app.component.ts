import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './models/user';

import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';

}
