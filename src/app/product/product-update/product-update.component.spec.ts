import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventEmitter } from '@angular/core';
import { ProductUpdateComponent } from './product-update.component';
import { ProductProvider } from '../../providers/product.provider';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { of, throwError } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductFormComponent } from '../product-form/product-form.component';
import { DatePipe } from '@angular/common';

describe('ProductUpdateComponent', () => {
  let component: ProductUpdateComponent;
  let fixture: ComponentFixture<ProductUpdateComponent>;
  let productProviderSpy: jasmine.SpyObj<ProductProvider>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    productProviderSpy = jasmine.createSpyObj('ProductProvider', ['updatesProducts']);

    TestBed.configureTestingModule({
      declarations: [ProductUpdateComponent, ProductFormComponent],
      providers: [
        {provide: DatePipe },
        { provide: ProductProvider, useValue: productProviderSpy },
        { provide: Router, useValue: routerSpy },
      ],
      imports: [
        FormsModule, RouterTestingModule, HttpClientModule,
        ReactiveFormsModule, // Agrega ReactiveFormsModule
        RouterTestingModule,
        HttpClientTestingModule
      ],
    });

    fixture = TestBed.createComponent(ProductUpdateComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should handle form submission successfully', () => {
    const mockProduct: Product = {
      id: '1',
      name: 'Updated Product',
      description: 'Updated Description',
      logo: 'Updated Logo',
      date_release: '2023-09-15',
      date_revision: '2024-09-15',
    };

    productProviderSpy.updatesProducts.and.returnValue(of(mockProduct)); // Configura el espía para que devuelva un valor de prueba
    
    component.handleFormSubmit(mockProduct);

    expect(productProviderSpy.updatesProducts).toHaveBeenCalledWith(mockProduct); // Verifica si se llamó al método updatesProducts con los argumentos correctos
  });

  it('should log error on form submission error', () => {
    const formData: Product = {
      id: '1',
      name: 'Updated Product',
      description: 'Updated Description',
      logo: 'Updated Logo',
      date_release: '2023-09-15',
      date_revision: '2024-09-15',
    };
  
    const errorMessage = 'Error occurred while updating product';
  
    // Configura el espía para devolver un Observable que emite un error
    productProviderSpy.updatesProducts.and.returnValue(throwError(errorMessage));
  
    const consoleSpy = spyOn(console, 'log');
  
    component.handleFormSubmit(formData);
  
    expect(productProviderSpy.updatesProducts).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledWith(errorMessage);
  });

 
});
