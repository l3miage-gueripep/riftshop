import { Component } from '@angular/core';
import { FirebaseLoginService } from 'src/app/services/firebase-login.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  constructor(protected firebaseLoginService: FirebaseLoginService) { }

}
