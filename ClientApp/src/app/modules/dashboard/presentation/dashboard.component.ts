import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrderFormComponent } from './order-form/order-form.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  isNewForm: boolean = false;

  constructor(
    private dialogRef : MatDialog
  ) {}

  openForm(): void {
  this.dialogRef.open(OrderFormComponent, {
    width: '800px',
    height: '600px'})
  }

}


