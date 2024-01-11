import { ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Order } from 'src/app/components/order-form/order';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-order-process-modal',
  templateUrl: './order-process-modal.component.html',
  styleUrl: './order-process-modal.component.scss'
})
export class OrderProcessModalComponent {

  productData!: Order[];
  notes!: string;
  userId!: number;
  total: any = 0;

  displayedColumns: string[] = ['bookName', 'pageCount', 'coverType', 'bindingType', 'sizeX', 'sizeY'];

  constructor(
    private productService: ProductService,
    private dialogRef : MatDialog,
    private router: Router,
    public authService: AuthService,
    public cdr: ChangeDetectorRef
  ) {

    this.authService.userId$.subscribe((id: number) => {
      this.userId = id;
    });

  }

  ngOnInit() {
    this.productService.getProducts(this.userId).subscribe((product: Order[]) => {
      if (product) {
        this.productData = product.filter(item => item.status == "Waiting");
        this.productService.processAllOrders().subscribe((response: any) => {
          this.productData.map((item: Order) => {
            let keys = Object.keys(response);
            keys.forEach((key: any) => {
              if (item.id == key) {
                item.sizeX = response[key].solution.toFixed(0);
                item.sizeY = response[key].pricePerBook.toFixed(2);
              }
            });
            this.total = this.total + item.sizeX*item.sizeY;
            console.log(this.total)
          });
          this.router.navigate(['/product-list']);
        });
      }
    });
  }
}
