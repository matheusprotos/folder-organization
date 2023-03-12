import OrdersService from './orders.service';

export class MyOrdersService extends OrdersService {
  public listar() {
    return [
      {
        id: 1,
        name: 'Soap',
      },
      {
        id: 2,
        name: 'Chocolate',
      },
      {
        id: 3,
        name: 'Shampoo',
      },
    ];
  }
}
