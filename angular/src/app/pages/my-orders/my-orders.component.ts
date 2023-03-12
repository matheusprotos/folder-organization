import { Component } from '@angular/core';
import OrdersService from 'src/app/services/orders.service';

@Component({
  selector: 'my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss'],
})
export class MyOrdersComponent {
  orders: any[] = this.ordersService.listar();

  constructor(private ordersService: OrdersService) {}
}
