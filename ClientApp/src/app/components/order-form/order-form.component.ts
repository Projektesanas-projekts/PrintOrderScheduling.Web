import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.scss'
})
export class OrderFormComponent {
  orderFormReady: boolean = false;
  
  onSubmit(): void {
    this.orderFormReady = true;
  }
}
