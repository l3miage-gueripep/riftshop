import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  protected registerForm: FormGroup;
  protected loginForm: FormGroup;
  constructor(protected firebaseService: FirebaseService) { 
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
      //confirmPassword
    });

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
    
  }

  public register(){
    const { email, password } = this.registerForm.value;
    this.firebaseService.register(email, password);
  }

  public login(){
    const { email, password } = this.loginForm.value;
    this.firebaseService.login(email, password);
  }

  public checkConnected(){
    console.log(this.firebaseService.user$.value);
  }

}
