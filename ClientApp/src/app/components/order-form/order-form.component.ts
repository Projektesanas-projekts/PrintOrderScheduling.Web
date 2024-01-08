import { Component, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { CALC_CONFIG } from './calc-config'
import { Order } from './order';

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

  constructor(
    private fb: FormBuilder
  ){}

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
    console.log(this.orderForm.valid);
  }

  onSubmit(): void {

    let order: Order = {
      amount: this.orderForm.get("amount").value,
      pageCount: this.orderForm.get("pageCount").value,
      coverType: this.orderForm.get("coverType").value,
      bookName: this.orderForm.get("bookName").value,
      bindingType: this.orderForm.get("bindingType").value,
      format: this.orderForm.get("format").value,
      sizeX: 240,
      sizeY: 110
    }

    this.price = (order.pageCount * CALC_CONFIG.pageCost * order.amount)
    * CALC_CONFIG.pageFormatMulti[order.format]
    + CALC_CONFIG.pageBindingPrice[order.bindingType]
    + CALC_CONFIG.coverTypePrice[order.coverType];

    this.price = this.round(this.price);

    this.eta = ((order.pageCount * CALC_CONFIG.pageTime * order.amount)
    * CALC_CONFIG.pageFormatMulti[order.format])/(60*60);

    this.eta = this.round(this.eta)



    //TODO: Send order to Backend
  }

}
