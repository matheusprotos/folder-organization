import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersListModule } from 'src/app/components/orders-list/orders-list.module';
import OrdersService from 'src/app/services/orders.service';
import { UserOrdersService } from 'src/app/services/user-orders.service';

import { UserOrdersComponent } from './user-orders.component';

const routes: Routes = [{ path: '', component: UserOrdersComponent }];

@NgModule({
  declarations: [UserOrdersComponent],
  imports: [RouterModule.forChild(routes), CommonModule, OrdersListModule],
  providers: [
    {
      provide: OrdersService,
      useClass: UserOrdersService,
    },
  ],
  bootstrap: [UserOrdersComponent],
})
export class UserOrdersModule {}
