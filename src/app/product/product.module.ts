import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from './product-routing.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';

import { PageLimitPipe } from '../pipes/page-limit.pipe';
import { ProductFilterPipe } from '../pipes/product-filter.pipe';
import { DatePipe } from '@angular/common';

import { ProductComponent } from './product.component';
import { ProductProvider } from '../providers/product.provider';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductUpdateComponent } from './product-update/product-update.component';



@NgModule({
  declarations: [
    ProductComponent,
    PageLimitPipe,
    ProductFilterPipe,
    ProductFormComponent,
    ProductCreateComponent,
    ProductUpdateComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ProductRoutingModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatMenuModule,
    MatButtonModule
  ],
  providers: [
    ProductProvider,
    DatePipe
  ]
})
export class ProductModule { }
