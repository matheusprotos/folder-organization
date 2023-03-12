import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'orders',
    loadChildren: () =>
      import('./pages/my-orders/my-orders.module').then(
        (m) => m.MyOrdersModule
      ),
  },
  {
    path: 'user/orders',
    loadChildren: () =>
      import('./pages/user-orders/user-orders.module').then(
        (m) => m.UserOrdersModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
