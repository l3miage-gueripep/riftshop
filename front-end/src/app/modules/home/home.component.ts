import { Component } from '@angular/core';
import { FirebaseDataService } from 'src/app/services/firebase-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private firebaseDataService: FirebaseDataService) { }
}
