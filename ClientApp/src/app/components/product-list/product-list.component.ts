import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/product.service';
import { ProductFormComponent } from '../product-form/product-form.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent {
  constructor(
    private productService : ProductService,
    private dialogRef : MatDialog
    ){}

  productData : any;
  isProductSelected: boolean = false;
  isLoading: boolean = true;

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (data: any[]) => {
        this.productData = data;
        setTimeout(()=> {
          this.isLoading = false;
        }, 3000);
      }
    );
  }

  openModal() {
    this.dialogRef.open(ProductFormComponent, {
      width: '1000px',
    });
  }

  selectProduct(product: any) {
    this.productService.selectProduct(product);
    this.openModal()
  }

}
