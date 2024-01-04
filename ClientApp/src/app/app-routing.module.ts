import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path: '', component:ProductListComponent, pathMatch:'full', canActivate: [AuthGuard]},
  {path: 'home', component:HomeComponent},
  {path: 'login', component:LoginComponent},
  {path: 'products', component:ProductListComponent, canActivate: [AuthGuard]},
  // {path: 'order-form', component:OrderFormComponent, canActivate: [AuthGuard]},
  {
    path: 'service',
    loadChildren: () => import('./modules/product-service/product-service.module').then(m => m.ProductServiceModule),
    canLoad: [AuthGuard]
  },
  {path: '**', component:ProductListComponent, pathMatch:'full', canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
