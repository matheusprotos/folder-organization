import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { OrdersListComponent } from './orders-list.component';

@NgModule({
  imports: [CommonModule],
  declarations: [OrdersListComponent],
  exports: [OrdersListComponent],
})
export class OrdersListModule {}
