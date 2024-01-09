import { Component, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { CALC_CONFIG } from './calc-config'
import { Order } from './order';
import { ProductService } from 'src/app/services/product.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [
      CommonModule,
      ReactiveFormsModule
    ],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.scss'
})
export class OrderFormComponent{
  orderForm?: any;
  
  eta: any = null;
  price: any = null;
  userId: number = 0;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private authService: AuthService,
  ){ 
  }

  private round(x: number): number {
    return (Math.round(x*100) / 100);
  }

  ngOnInit(): void {
    this.orderForm = this.fb.group({
      amount: ['', Validators.required],
      pageCount: ['', Validators.required],
      coverType: ['', Validators.required],
      bookName: ['', Validators.required],
      bindingType: ['', Validators.required],
      format: ['', Validators.required],
    });
    
    this.authService.userId$.subscribe((id: number) => {
      this.userId = id;
    });
  }

  onSubmit(): void {
    let order = new Order(
      this.userId,
      this.orderForm.get("amount").value,
      this.orderForm.get("pageCount").value,
      this.orderForm.get("coverType").value,
      this.orderForm.get("bookName").value,
      this.orderForm.get("bindingType").value,
      this.orderForm.get("format").value,
      240,
      110,
      "Waiting",
    )

    this.price = (order.pageCount * CALC_CONFIG.pageCost * order.amount)
    * CALC_CONFIG.pageFormatMulti[order.format]
    + CALC_CONFIG.pageBindingPrice[order.bindingType]
    + CALC_CONFIG.coverTypePrice[order.coverType];

    this.price = this.round(this.price);

    this.eta = ((order.pageCount * CALC_CONFIG.pageTime * order.amount)
    * CALC_CONFIG.pageFormatMulti[order.format])/(60*60);

    this.eta = this.round(this.eta)

    this.productService.addNewOrder(order);
  }

}
