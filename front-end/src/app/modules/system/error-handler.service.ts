import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { NotFoundException } from 'src/app/models/errors/not-found-exception';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService implements ErrorHandler {
  constructor(private injector: Injector) {}

  handleError(error: any): void {
    const router = this.injector.get(Router);

    // Check for specific error types and handle accordingly
    if (error instanceof NotFoundException) {
      router.navigate(['/404']);
    } else {
      // Log the error or handle other types of errors
      console.error('An unexpected error occurred:', error);
    }
  }
}
