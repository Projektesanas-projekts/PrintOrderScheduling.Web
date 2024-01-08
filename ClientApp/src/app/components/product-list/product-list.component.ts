import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/product.service';
import { ProductFormComponent } from '../product-form/product-form.component';
import { Order } from '../order-form/order';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})

export class ProductListComponent {
  constructor(
    private productService : ProductService,
    private dialogRef : MatDialog,
    private authService: AuthService) { }

  displayedColumns: string[] = ['bookName', 'pageCount', 'coverType', 'bindingType'];
  
  productData : any;
  isProductSelected: boolean = false;
  isLoading: boolean = true;
  userId: number = 0;

  ngOnInit(): void {
    this.authService.userId$.subscribe((id: number) => {
      this.userId = id;
    });

    this.productService.getProducts(this.userId).subscribe((data: Order[]) => {
      this.productData = data.filter(item => item.userId == this.userId);
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
