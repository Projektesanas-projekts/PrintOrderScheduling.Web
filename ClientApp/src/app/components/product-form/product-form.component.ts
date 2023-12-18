import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent {

  productForm: FormGroup;
  product: any

  constructor(
    private productService: ProductService,
    private dialogRef : MatDialog,
    private formBuilder: FormBuilder
  ) {

    this.productForm = this.formBuilder.group({
      title: [''],  // Use FormBuilder to create form controls
      description: [''],
      price: [''],
      rating: ['']
    });
  }

  ngOnInit() {
    this.productService.currentProduct$.subscribe(product => {
      if (product) {
        this.productForm.patchValue(product);
        console.log(product)
      }
    });
  }

  closeModal() {
    this.dialogRef.closeAll();
  }
}

