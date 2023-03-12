import { Component } from '@angular/core';
import OrdersService from 'src/app/services/orders.service';

@Component({
  selector: 'user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.scss'],
})
export class UserOrdersComponent {
  orders: any[] = this.ordersService.listar();

  constructor(private ordersService: OrdersService) {}
}
