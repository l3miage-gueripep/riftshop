import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(protected generalService: GeneralService, cartService: CartService) { }

}
