import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent {
  constructor(
    private dialogRef : MatDialog
  ){}

  closeForm(): void {
    this.dialogRef.closeAll();
  }
}
