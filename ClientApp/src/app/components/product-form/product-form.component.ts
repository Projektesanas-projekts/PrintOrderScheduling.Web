import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/product.service';
import { Order } from '../order-form/order';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent {
  product!: Order;
  notes!: string;

  constructor(
    private productService: ProductService,
    private dialogRef : MatDialog,
    private toastr: ToastrService
  ) {

  }

  ngOnInit() {
    this.productService.currentProduct$.subscribe(product => {
      if (product) {
        this.product = product;
      }
    });
  }

  submitForm(): void {
    this.productService.declineOrder(this.product.id, this.notes);
    this.toastr.info("Order has been successfully declined. The worker will receive a notification.");
    this.closeModal();
  }

  closeModal() {
    this.dialogRef.closeAll();
  }
}

