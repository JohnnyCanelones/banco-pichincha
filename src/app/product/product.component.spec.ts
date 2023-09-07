import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ProductComponent } from './product.component';
import { ProductProvider } from '../providers/product.provider';
import { Product } from '../models/product.model';
import { PageLimitPipe } from '../pipes/page-limit.pipe';
import { ProductFilterPipe } from '../pipes/product-filter.pipe';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductUpdateComponent } from './product-update/product-update.component';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from './product-routing.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';

import { DatePipe } from '@angular/common';
import { of, throwError } from 'rxjs';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let productProviderSpy: jasmine.SpyObj<ProductProvider>;

  beforeEach(() => {
    productProviderSpy = jasmine.createSpyObj('ProductProvider', ['getProducts', 'deleteProducts']);
    TestBed.configureTestingModule({
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
      // providers: [
      //   ProductProvider,
      //   DatePipe
      // ]
      providers: [{ provide: ProductProvider, useValue: productProviderSpy }],
    });


    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    productProviderSpy = TestBed.inject(ProductProvider) as jasmine.SpyObj<
      ProductProvider
    >;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getProducts on ngOnInit', () => {
    // Simular productos de ejemplo para la prueba
    const mockProducts = [
      { id: '1', name: 'Product 1', description: 'Description 1', logo: '', date_release: '', date_revision: '' },
      { id: '2', name: 'Product 2', description: 'Description 2', logo: '', date_release: '', date_revision: '' },
    ];

    // Configurar el espía para que devuelva los productos de ejemplo
    productProviderSpy.getProducts.and.returnValue(of(mockProducts));

    // Llamar a ngOnInit
    component.ngOnInit();

    // Verificar que se haya llamado a getProducts del servicio
    expect(productProviderSpy.getProducts).toHaveBeenCalled();

    // Verificar que los productos se hayan asignado correctamente en el componente
    expect(component.products).toEqual(mockProducts);
  });

  it('should call getProducts and update products on calling getProducts', fakeAsync(() => {
    // Simular productos de ejemplo para la prueba
    const mockProducts = [
      { id: '1', name: 'Product 1', description: 'Description 1', logo: '', date_release: '', date_revision: '' },
      { id: '2', name: 'Product 2', description: 'Description 2', logo: '', date_release: '', date_revision: '' },
    ];

    // Configurar el espía para que devuelva los productos de ejemplo
    productProviderSpy.getProducts.and.returnValue(of(mockProducts));

    // Llamar a getProducts
    component.getProducts();
    tick(); // Avanza el reloj virtual para completar la suscripción

    // Verificar que se haya llamado a getProducts del servicio
    expect(productProviderSpy.getProducts).toHaveBeenCalled();

    // Verificar que los productos se hayan asignado correctamente en el componente
    expect(component.products).toEqual(mockProducts);
  }));

  it('should handle product update', () => {
    const mockProduct: Product = { id: '1', name: 'Product 1', description: 'Description 1' , logo: '  ', date_release: '2021-01-01', date_revision: '2022-01-01'};


    component.editProduct(mockProduct);

    expect(component.product).toEqual(mockProduct);
    expect(component.updateProduct).toBe(true);
  });

  it('should handle product update completion', () => {
    spyOn(component, 'getProducts');

    component.productUpdated();

    expect(component.getProducts).toHaveBeenCalled();
    expect(component.updateProduct).toBe(false);
  });

  it('should update products list and reset updateProduct flag on productUpdated', () => {
    const getProductsSpy = spyOn(component, 'getProducts');
    component.productUpdated();
    expect(getProductsSpy).toHaveBeenCalled();
    expect(component.updateProduct).toBeFalse();
  });

  it('should call deleteProduct and show alert on deleting a product', () => {
    // Configura el objeto espía para que el método deleteProducts devuelva un Observable válido
    productProviderSpy.deleteProducts.and.returnValue(of({}));
  
    // Espía la función 'alert' para que puedas verificar si se llama
    spyOn(window, 'alert');
  
    // Llama a la función que debería invocar deleteProduct
    component.deleteProduct('productIdToDelete');
  
    // Deberías esperar que deleteProducts se haya llamado
    expect(productProviderSpy.deleteProducts).toHaveBeenCalledWith('productIdToDelete');
  
    // Deberías verificar que se haya mostrado una alerta
    expect(window.alert).toHaveBeenCalledWith('Producto Borrado Correctamente');
  });
 
});
