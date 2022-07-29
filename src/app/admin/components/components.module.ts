import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerModule } from './customer/customer.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { OrderModule } from './order/order.module';
import { ProductsModule } from './products/products.module';
import { NgxSpinnerModule } from 'ngx-spinner';



@NgModule({
  declarations: [
   
  ],
  imports: [
   CommonModule,
 CustomerModule,
 DashboardModule,
 OrderModule,
 ProductsModule,
 NgxSpinnerModule

  
  ],exports:[

  ]
})
export class ComponentsModule { }
