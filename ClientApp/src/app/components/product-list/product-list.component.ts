import { ChangeDetectorRef, Component } from '@angular/core';
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
    private authService: AuthService,
    private cdr: ChangeDetectorRef) { 
    }

  displayedAdminColumns: string[] = ['delete', 'bookName', 'pageCount', 'coverType', 'bindingType', 'status', 'proceed', 'decline'];
  displayedUserColumns: string[] = ['delete', 'bookName', 'pageCount', 'coverType', 'bindingType', 'status', 'notes',];
  
  productData!: Order[];
  isProductSelected: boolean = false;
  isLoading: boolean = true;
  userId: number = 0;
  isAdmin: boolean = false;



  ngOnInit(): void {
    this.authService.userId$.subscribe((id: number) => {
      this.userId = id;
      this.userId == 252 ? this.isAdmin = true : this.isAdmin = false;
    });

    this.productService.getProducts(this.userId).subscribe((data: Order[]) => {
      this.userId != 252 ? this.productData = data.filter(item => item.userId == this.userId) : this.productData = data;
        // setTimeout(()=> {
          this.isLoading = false;
        // }, 3000);
      }
    );
  }

  openModal() {
    this.dialogRef.open(ProductFormComponent, {
      width: '700px',
      height: '400px'
    });
  }

  selectProduct(order: any) {
    this.productService.selectProduct(order);
    this.openModal()
  }

  onDecline(order: Order): void {
    this.selectProduct(order);
    this.productData.map(item => {
      if(item.id == order.id) {
        setTimeout(()=> {
          item.status = "Declined";
          this.cdr.detectChanges();
        }, 500);
      }
    });
  }

  onDelete(order: Order): void {
    this.productService.deleteOrder(order.id);
    this.productData.map(item => {
        this.productData = this.productData.filter(item => item.id != order.id);
        // Trigger change detection
        this.cdr.detectChanges();
    });
  }

}
