import { Injectable } from '@angular/core';
import { AlertComponent } from './alert.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private snackBar: MatSnackBar) { }

  showAlert(message: string, alertType: 'default' | 'error' | 'success', duration: number = 3000) {
    this.snackBar.openFromComponent(AlertComponent, {
      data: {
        message: message,
      },
      duration: duration,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: alertType
    })
  }

}
