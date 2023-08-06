import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
//meant to manage very small things that don't fit anywhere else
export class GeneralService {
  public isLoading: boolean;

  constructor() { 
    this.isLoading = false;
  }
}
