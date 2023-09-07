import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ProductCreateComponent } from './product-create.component';
import { ProductProvider } from 'src/app/providers/product.provider';
import { of, throwError } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Product } from 'src/app/models/product.model';
import { HttpClientModule } from '@angular/common/http';
import { ProductFormComponent } from '../product-form/product-form.component';
import { DatePipe } from '@angular/common';

describe('ProductCreateComponent', () => {
  let component: ProductCreateComponent;
  let fixture: ComponentFixture<ProductCreateComponent>;
  let router: Router;
  let productProvider: ProductProvider;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductCreateComponent, ProductFormComponent ],
      imports: [
        FormsModule, RouterTestingModule, HttpClientModule,
        FormsModule,
        ReactiveFormsModule, // Agrega ReactiveFormsModule
        RouterTestingModule,
      ],
      providers: [ProductProvider, DatePipe],
    });

    fixture = TestBed.createComponent(ProductCreateComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    productProvider = TestBed.inject(ProductProvider);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });



  it('should handle form submission successfully', () => {
    const formData: Product = {
      id: '1',
      name: 'Product 1',
      description: 'Description 1',
      logo: 'logo.jpg',
      date_release: new Date(),
      date_revision: new Date(),
    };

    const createProductsSpy = spyOn(productProvider, 'createProducts').and.returnValue(of({}));
  
    component.handleFormSubmit(formData);
  
    expect(createProductsSpy).toHaveBeenCalledWith(formData);
  });

  it('should handle form submission error', () => {
    const errorResponse = { error: 'Error message' };
    spyOn(productProvider, 'createProducts').and.returnValue(throwError(errorResponse));

    spyOn(console, 'log');

    component.handleFormSubmit({} as Product); // Simulate an error by passing empty data

    expect(productProvider.createProducts).toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledWith(errorResponse);
  });
});
