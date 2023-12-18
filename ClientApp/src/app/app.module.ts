import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ProductListComponent } from './components/product-list/product-list.component';

import { HttpClientModule } from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms'
import { AuthGuard } from './guards/auth.guard';
import {FormsModule} from '@angular/forms'
import { ProductServiceModule } from './modules/product-service/product-service.module';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { MatDialogModule } from '@angular/material/dialog';
import { HomeComponent } from './components/home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProductListComponent,
    ProductFormComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ProductServiceModule,
    MatDialogModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
