import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  //meant to manage very small things that don't fit anywhere else
  public isLoading: boolean;

  constructor() { 
    this.isLoading = false;
  }
}
