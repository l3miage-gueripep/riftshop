import { Component } from '@angular/core';
import { FirebaseLoginService } from 'src/app/services/firebase-login.service';
import { faBox, faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  protected boxIcon = faBox;
  protected screwdriverWrenchIcon = faScrewdriverWrench;
  constructor(protected firebaseLoginService: FirebaseLoginService) { }
}
