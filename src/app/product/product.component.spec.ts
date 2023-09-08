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
import { HttpClientModule } from '@angular/common/http';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';

import { of } from 'rxjs';

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
        { provide: ProductProvider, useValue: productProviderSpy },
        ProductFilterPipe
      ],
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

    const mockProducts = [
      { id: '1', name: 'Product 1', description: 'Description 1', logo: '', date_release: '', date_revision: '' },
      { id: '2', name: 'Product 2', description: 'Description 2', logo: '', date_release: '', date_revision: '' },
    ];

    productProviderSpy.getProducts.and.returnValue(of(mockProducts));

    component.ngOnInit();

    expect(productProviderSpy.getProducts).toHaveBeenCalled();

    expect(component.products).toEqual(mockProducts);
  });

  it('should call getProducts and update products on calling getProducts', fakeAsync(() => {

    const mockProducts = [
      { id: '1', name: 'Product 1', description: 'Description 1', logo: '', date_release: '', date_revision: '' },
      { id: '2', name: 'Product 2', description: 'Description 2', logo: '', date_release: '', date_revision: '' },
    ];

    productProviderSpy.getProducts.and.returnValue(of(mockProducts));

    component.getProducts();
    tick()

    expect(productProviderSpy.getProducts).toHaveBeenCalled();

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

    productProviderSpy.deleteProducts.and.returnValue(of({}));
  
    spyOn(window, 'alert');

    component.deleteProduct('productIdToDelete');
  
    expect(productProviderSpy.deleteProducts).toHaveBeenCalledWith('productIdToDelete');
  
    expect(window.alert).toHaveBeenCalledWith('Producto Borrado Correctamente');
  });

  describe('Test Paginator', () => {
    it('should initialize currentPage to 1', () => {
      expect(component.currentPage).toBe(1);
    });
  
    it('should calculate totalPages correctly', () => {
      component.products = [
        { id: '1', name: 'Product 1', description: 'Description 1', logo: '', date_release: '', date_revision: '' },
        { id: '2', name: 'Product 2', description: 'Description 2', logo: '', date_release: '', date_revision: '' },
        { id: '3', name: 'Product 1', description: 'Description 1', logo: '', date_release: '', date_revision: '' },
        { id: '4', name: 'Product 2', description: 'Description 2', logo: '', date_release: '', date_revision: '' },
        { id: '5', name: 'Product 1', description: 'Description 1', logo: '', date_release: '', date_revision: '' },
        { id: '6', name: 'Product 2', description: 'Description 2', logo: '', date_release: '', date_revision: '' },
        { id: '7', name: 'Product 1', description: 'Description 1', logo: '', date_release: '', date_revision: '' },
        { id: '8', name: 'Product 2', description: 'Description 2', logo: '', date_release: '', date_revision: '' },
        { id: '9', name: 'Product 1', description: 'Description 1', logo: '', date_release: '', date_revision: '' },
        { id: '10', name: 'Product 2', description: 'Description 2', logo: '', date_release: '', date_revision: '' },
      ];
      component.selectedLimit = 5;
      component.updateDisplayedProducts();
      expect(component.totalPages).toBe(2);
    });
  
    it('should updateDisplayedProducts correctly', () => {
      component.products = [
        { id: '1', name: 'Product 1', description: 'Description 1', logo: '', date_release: '', date_revision: '' },
        { id: '2', name: 'Product 2', description: 'Description 2', logo: '', date_release: '', date_revision: '' },
        { id: '3', name: 'Product 1', description: 'Description 1', logo: '', date_release: '', date_revision: '' },
        { id: '4', name: 'Product 2', description: 'Description 2', logo: '', date_release: '', date_revision: '' },
        { id: '5', name: 'Product 1', description: 'Description 1', logo: '', date_release: '', date_revision: '' },
        { id: '6', name: 'Product 2', description: 'Description 2', logo: '', date_release: '', date_revision: '' },
        { id: '7', name: 'Product 1', description: 'Description 1', logo: '', date_release: '', date_revision: '' },
        { id: '8', name: 'Product 2', description: 'Description 2', logo: '', date_release: '', date_revision: '' },
        { id: '9', name: 'Product 1', description: 'Description 1', logo: '', date_release: '', date_revision: '' },
        { id: '10', name: 'Product 2', description: 'Description 2', logo: '', date_release: '', date_revision: '' },
      ];
      component.selectedLimit = 5;
  
      component.currentPage = 2;
      component.updateDisplayedProducts();
      expect(component.displayedProducts).toEqual([{ id: '6', name: 'Product 2', description: 'Description 2', logo: '', date_release: '', date_revision: '' },
      { id: '7', name: 'Product 1', description: 'Description 1', logo: '', date_release: '', date_revision: '' },
      { id: '8', name: 'Product 2', description: 'Description 2', logo: '', date_release: '', date_revision: '' },
      { id: '9', name: 'Product 1', description: 'Description 1', logo: '', date_release: '', date_revision: '' },
      { id: '10', name: 'Product 2', description: 'Description 2', logo: '', date_release: '', date_revision: '' }]);
    });
  
    it('should navigate to the previous page', () => {
      component.currentPage = 2;
      component.previousPage();
      expect(component.currentPage).toBe(1);
    });
  
    it('should navigate to the next page', () => {
      
      component.currentPage = 1;
      component.totalPages = 2;
      component.nextPage();
      expect(component.currentPage).toBe(2);
    });
  
    it('should filter and updateDisplayedProducts on search text change', () => {
      
      component.products = [
        { id: '1', name: 'Product 1', description: 'Description 1', logo: '', date_release: '', date_revision: '' },
        { id: '2', name: 'Product 2', description: 'Description 2', logo: '', date_release: '', date_revision: '' },
        { id: '3', name: 'test 1', description: 'Description 1', logo: '', date_release: '', date_revision: '' },
        { id: '4', name: 'test 2', description: 'Description 2', logo: '', date_release: '', date_revision: '' },
        { id: '5', name: 'test 3', description: 'Description 1', logo: '', date_release: '', date_revision: '' },
      ];
      component.searchText = 'Product';
      component.onSearchTextChange();
      expect(component.filteredProducts).toEqual([
        { id: '1', name: 'Product 1', description: 'Description 1', logo: '', date_release: '', date_revision: '' },
        { id: '2', name: 'Product 2', description: 'Description 2', logo: '', date_release: '', date_revision: '' },
      ]);
      expect(component.currentPage).toBe(1);
      expect(component.displayedProducts).toEqual([
        { id: '1', name: 'Product 1', description: 'Description 1', logo: '', date_release: '', date_revision: '' },
        { id: '2', name: 'Product 2', description: 'Description 2', logo: '', date_release: '', date_revision: '' },
      ]);
    });
  })
 
});
