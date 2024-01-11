import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderProcessModalComponent } from './order-process-modal.component';

describe('OrderProcessModalComponent', () => {
  let component: OrderProcessModalComponent;
  let fixture: ComponentFixture<OrderProcessModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderProcessModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrderProcessModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
