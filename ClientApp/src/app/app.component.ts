import { Component, OnDestroy } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { ProductService } from './services/product.service';
import { OrderProcessModalComponent } from './helpers/order-process-modal/order-process-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {    
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;

  constructor(
    private authService: AuthService, 
    private router : Router,
    private productService: ProductService,
    private dialogRef: MatDialog) {
    localStorage.clear()
  }

  ngOnInit(): void {
    this.authService.logInState$.subscribe((val: boolean) => {
      this.isLoggedIn = val;
    })
    this.authService.userId$.subscribe((id: number) => {
      id == 252 ? this.isAdmin = true : this.isAdmin = false;
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  proceedAllOrders(): void {
    this.productService.processAllOrders();
  }

  openModal() {
    this.dialogRef.open(OrderProcessModalComponent, {
      width: '900px',
      height: '600px'
    });
  }
}
