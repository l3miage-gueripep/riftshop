import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseLoginService } from 'src/app/services/firebase-login.service';
import { GeneralService } from 'src/app/services/general.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  protected registerForm: FormGroup;
  protected loginForm: FormGroup;
  constructor(protected firebaseLoginService: FirebaseLoginService, private generalService: GeneralService) { 
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      //password
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      //confirmPassword
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
    });

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
    
  }

  public test(){
    console.log(this.loginForm.valid);
    return this.loginForm.valid
  }

  public register(){
    const { email, password } = this.registerForm.value;
    this.firebaseLoginService.register(email, password);
  }

  public async login(){
    const { email, password } = this.loginForm.value;
    this.generalService.isLoading = true;
    await this.firebaseLoginService.login(email, password);
    this.generalService.isLoading = false;
    
  }

}

