import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
//meant to manage very small things that don't fit anywhere else
export class GeneralService {
  private _isLoading: boolean;

  constructor() { 
    this._isLoading = false;
  }

  public enableLoading(): void {
    this._isLoading = true;
  }

  public disableLoading(): void {
    this._isLoading = false;
  }

  public get isLoading(): boolean {
    return this._isLoading;
  }
}
