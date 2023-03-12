import OrdersService from './orders.service';

export class UserOrdersService extends OrdersService {
  public listar() {
    return [
      {
        id: 1,
        name: 'Tissue',
      },
      {
        id: 2,
        name: 'Bottle of water',
      },
      {
        id: 3,
        name: 'Meat',
      },
    ];
  }
}
