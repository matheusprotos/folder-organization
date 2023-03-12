import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersListModule } from 'src/app/components/orders-list/orders-list.module';
import { MyOrdersService } from 'src/app/services/my-orders.service';
import OrdersService from 'src/app/services/orders.service';

import { MyOrdersComponent } from './my-orders.component';

const routes: Routes = [{ path: '', component: MyOrdersComponent }];

@NgModule({
  declarations: [MyOrdersComponent],
  imports: [RouterModule.forChild(routes), CommonModule, OrdersListModule],
  providers: [
    {
      provide: OrdersService,
      useClass: MyOrdersService,
    },
  ],
  bootstrap: [MyOrdersComponent],
})
export class MyOrdersModule {}
