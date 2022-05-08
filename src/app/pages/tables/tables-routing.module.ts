import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TablesComponent } from './tables.component';
import { UserTableComponent } from './user-table/user-table.component';
import { ProductsByUserComponent } from './products-by-user/products-by-user.component';
import { AllProductsComponent } from './all-products/all-products.component';

const routes: Routes = [{
  path: '',
  component: TablesComponent,
  children: [

    {
      path: 'users',
      component: UserTableComponent,
    },
    {
      path: 'productsByUser',
      component: ProductsByUserComponent
    },
    {
      path: 'allProducts',
      component: AllProductsComponent
    },
    {
      path: '',
      redirectTo: 'users',
      pathMatch: 'full',
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablesRoutingModule { }

export const routedComponents = [
  TablesComponent,

];
