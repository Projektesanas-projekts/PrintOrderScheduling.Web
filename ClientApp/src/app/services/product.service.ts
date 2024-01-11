import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Order } from '../components/order-form/order';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8080/';
  private authSecretKey = 'Bearer Token';

  private currentProduct = new BehaviorSubject<any>(null);
  currentProduct$ = this.currentProduct.asObservable();

  private orderSubmitionSuccess = new BehaviorSubject<boolean>(false);
  orderSubmitionSuccess$ = this.orderSubmitionSuccess.asObservable();

  private orderDeletionSuccess = new BehaviorSubject<boolean>(false);
  orderDeletionSuccess$ = this.orderDeletionSuccess.asObservable();

  constructor(
    private http: HttpClient,
    private toastr: ToastrService) {
  }

  getProducts(userId: number): Observable<Order[]> {
    // Create HTTP parameters
    const params = new HttpParams().set('id', userId.toString());

    // Make the GET request with the parameters
    return this.http.get<Order[]>("http://localhost:8080/api/order/all", { params });
}

  addNewOrder(orderForm: Order): void {
    //TODO: Change to form data
    // let orderForm = new Order(
    //   152,
    //   4,
    //   100,
    //   "Weak",
    //   "TestBook2",
    //   "QAEf",
    //   "Format",
    //   240,
    //   110
    // )

    console.log(orderForm);

    this.http.post("http://localhost:8080/api/order/create", orderForm).subscribe((response) => {
      if(response) {
        this.orderSubmitionSuccess.next(true);
      }
    });
  }

  deleteOrder(id: number): void {
    let formData = new FormData();
    formData.append('id', id.toString());
    this.http.post("http://localhost:8080/api/order/delete", formData).subscribe((response: any) => {
      if(response) {
        this.toastr.info("Order was successfully deleted");
      }
    });
  }

  declineOrder(id: number, notes:string = ""): void {
    console.log(notes)
    let formData = new FormData();
    formData.append('id', id.toString());
    formData.append('status', "Declined");
    formData.append('notes', notes);
    this.http.post("http://localhost:8080/api/order/change/status", formData).subscribe((response: any) => {
      if(response) {
        console.log(response)
      }
    });
  }

  processAllOrders(): void {
    this.http.post("http://localhost:8080/api/order/process", null).subscribe((response: any) => {
      if(response) {
        console.log(response);
      }
    })
  }

  selectProduct(product: any) {
    this.currentProduct.next(product);
  }
}