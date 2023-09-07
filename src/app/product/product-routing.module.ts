import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductUpdateComponent } from './product-update/product-update.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'create', component: ProductCreateComponent }, // Ruta secundaria: /product/create
      { path: 'update/:id', component: ProductUpdateComponent }, // Ruta secundaria: /product/create
    ]
  },
  // Otras rutas de la aplicación principal aquí...
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
