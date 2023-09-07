import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ProductFormComponent } from './product-form.component';
import { ProductProvider } from 'src/app/providers/product.provider';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';

describe('ProductFormComponent', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;
  let productProviderSpy: jasmine.SpyObj<ProductProvider>;

  beforeEach(() => {
    productProviderSpy = jasmine.createSpyObj('ProductProvider', ['getProduct']);

    TestBed.configureTestingModule({
      declarations: [ProductFormComponent],
      imports: [
        FormsModule, RouterTestingModule, HttpClientModule,
        FormsModule,
        ReactiveFormsModule, // Agrega ReactiveFormsModule
        RouterTestingModule,
      ],
      providers: [
        FormBuilder,
        { provide: ProductProvider, useValue: productProviderSpy }, DatePipe

      ],
    });

    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize productForm with correct validators', () => {
    const form = component.productForm;

    expect(form).toBeDefined();
    expect(form instanceof FormGroup).toBeTrue();
    expect(form.get('id')).toBeTruthy();
    expect(form.get('name')).toBeTruthy();
    expect(form.get('description')).toBeTruthy();
    expect(form.get('logo')).toBeTruthy();
    expect(form.get('date_release')).toBeTruthy();
    expect(form.get('date_revision')).toBeTruthy();

    const idControl:any = form.get('id');
    idControl.setValue('abc');
    expect(idControl.valid).toBeTrue(); // Should be valid due to minLength

    idControl.setValue('1234567890');
    expect(idControl.valid).toBeTrue(); // Should be valid due to maxLength

    idControl.setValue('');
    expect(idControl.valid).toBeFalse(); // Should be invalid due to required

    // Repeat similar checks for other form controls and validators
  });

  it('should disable id field in edit mode', () => {
    component.isEdit = true;
    component.ngOnInit()
    fixture.detectChanges();
    const idControl = component.productForm.get('id');
    expect(idControl?.disabled).toBeTrue();
  });

  it('should emit formSubmit event when onSubmit is called with valid form', () => {
    const formSubmitSpy = spyOn(component.formSubmit, 'emit');
    const validFormData = {
      id: 'validId',
      name: 'Valid Name',
      description: 'Valid Description',
      logo: 'Valid Logo',
      date_release: '2023-09-15',
      date_revision: '2024-09-15',
    };

    component.productForm.setValue(validFormData);
    component.onSubmit();

    expect(formSubmitSpy).toHaveBeenCalledWith(validFormData);
  });

});
