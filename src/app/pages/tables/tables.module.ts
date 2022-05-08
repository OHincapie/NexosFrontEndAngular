import { NgModule } from '@angular/core';
import { NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThemeModule } from '../../@theme/theme.module';
import { TablesRoutingModule, routedComponents } from './tables-routing.module';

import { UserTableComponent } from './user-table/user-table.component';
import { ProductsByUserComponent } from './products-by-user/products-by-user.component';
import { NbSelectModule } from '@nebular/theme';
import { AllProductsComponent } from './all-products/all-products.component';
@NgModule({
  imports: [
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    TablesRoutingModule,
    Ng2SmartTableModule,
    FormsModule,
    ReactiveFormsModule,
    NbSelectModule
  ],
  declarations: [
    ...routedComponents,
    UserTableComponent,
    ProductsByUserComponent,
    AllProductsComponent,
  ],
})
export class TablesModule { }
