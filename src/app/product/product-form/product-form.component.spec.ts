import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { DebugElement } from '@angular/core';
import { ProductFormComponent } from './product-form.component';
import { ProductProvider } from 'src/app/providers/product.provider';
import { of, throwError } from 'rxjs';

describe('ProductFormComponent', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;
  let productProviderSpy: jasmine.SpyObj<ProductProvider>;
  let formBuilder: FormBuilder;

  beforeEach(() => {
    productProviderSpy = jasmine.createSpyObj('ProductProvider', ['getProduct']);
    formBuilder = new FormBuilder();

    TestBed.configureTestingModule({
      declarations: [ProductFormComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientModule,
      ],
      providers: [
        { provide: FormBuilder, useValue: formBuilder },
        { provide: ProductProvider, useValue: productProviderSpy },
        DatePipe,
      ],
    });

    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
  

  describe('ngOnInit', () => {

    it('should initialize the form with product data when in edit mode', () => {
      component.isEdit = true;
      component.product = {
        id: '1',
        name: 'Product 1',
        description: 'Description 1',
        logo: 'Logo 1',
        date_release: '2022-01-01',
        date_revision: '2023-01-01',
      };
      component.ngOnInit();
      component.productForm.get('id')?.enable()
      console.log(component.productForm.value, component.product);
      
      expect(component.productForm.value).toEqual(component.product);
    });
    

    it('should disable the "id" field in edit mode', () => {
      // Configura el componente en modo de edición
      component.isEdit = true;
    
      // Simula la llamada a ngOnInit
      component.ngOnInit();
    
      // Verifica que el campo "id" esté deshabilitado
      const idControl = component.productForm.get('id');
      expect(idControl?.disabled).toBeTrue();
    });

   
  })

  describe('Form Initialization', () => {
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

      // Test form control validations here
    });

    it('should disable id field in edit mode', () => {
      component.isEdit = true;
      component.ngOnInit();
      fixture.detectChanges();
      const idControl = component.productForm.get('id');
      expect(idControl?.disabled).toBeTrue();
    });
  });

  describe('Form Submission', () => {
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
  
    it('should emit formSubmit event when form is valid', () => {
      const formSubmitSpy = spyOn(component.formSubmit, 'emit');
      component.productForm.setValue({
        id: 'validId',
        name: 'Valid Name',
        description: 'Valid Description',
        logo: 'Valid Logo',
        date_release: '2023-09-15',
        date_revision: '2024-09-15',
      });
  
      component.onSubmit();
  
      expect(formSubmitSpy).toHaveBeenCalledWith(component.productForm.value);
    });
  
    it('should not emit formSubmit event when form is invalid', () => {
      const formSubmitSpy = spyOn(component.formSubmit, 'emit');
  
      component.onSubmit();
  
      expect(formSubmitSpy).not.toHaveBeenCalled();
    });
  
    it('should enable id field when form is submitted', () => {
      const formSubmitSpy = spyOn(component.formSubmit, 'emit');
      component.productForm.setValue({
        id: 'validId',
        name: 'Valid Name',
        description: 'Valid Description',
        logo: 'Valid Logo',
        date_release: '2023-09-15',
        date_revision: '2024-09-15',
      });
  
      component.onSubmit();
  
      const idControl = component.productForm.get('id');
      expect(idControl?.enabled).toBe(true);
    });
  
    it('should log a message when form is invalid', () => {
      spyOn(console, 'log'); 
  
      // Llama a onSubmit
      component.onSubmit();
  
      expect(console.log).toHaveBeenCalledWith('Formulario Invalidao');
    });
  });

  describe('Form Reset', () => {
    it('should reset the form when resetForm is called', () => {
      const validFormData = {
        id: 'validId',
        name: 'Valid Name',
        description: 'Valid Description',
        logo: 'Valid Logo',
        date_release: '2023-09-15',
        date_revision: '2024-09-15',
      };

      component.productForm.setValue(validFormData);
      component.resetForm();

      const initialFormValue = {
        id: null,
        name: null,
        description: null,
        logo: null,
        date_release: null,
        date_revision: null,
      };

      expect(component.productForm.value).toEqual(initialFormValue);
    });
  });

  describe('Form Value Changes', () => {
    it('should handle form value changes', () => {
      const idControl:any = component.productForm.get('id');
      idControl.setValue('test-id');

      // Simulate a value change event
      idControl.markAsDirty();
      idControl.setValue('changed-id');

      // Add expectations here to verify the behavior when a value changes
    });
  });

  describe('Test Validators', () => {
    it('should create minDateValidator', () => {
      const control = {
        value: '2023-09-16',
      };
      const validator = component.minDateValidator(false);
  
      const result = validator(control);
  
      expect(result).toBeNull();
    });
  
    it('should return minDate error for minDateValidator', () => {
      const control = {
        value: '2023-09-14',
      };
      component.productForm.get('date_release')?.setValue('2024-09-14')
      const validator = component.minDateValidator(false); 
    
      const result = validator(control);
      expect(result).toEqual({ minDate: true }); 
    });
  
    it('should create isValidId', () => {
      component.isValid = true;
      const control = {
        value: 'validId',
      };
      const validator = component.isValidId();
  
      const result = validator(control);
  
      expect(result).toBeNull(); // Debe ser válido
    });
  
    it('should return isInvalid error for isValidId', () => {
      component.isValid = false;
      const control = {
        value: 'invalidId',
      };
      const validator = component.isValidId();
  
      const result = validator(control);
  
      expect(result).toEqual({ isInvalid: true }); 
    });
  
    it('should return true for isFieldInvalid when field is touched and invalid', () => {
      component.productForm.get('name')?.markAsTouched();
      component.productForm.get('name')?.setErrors({ 'required': true }); // Establece un error requerido
    
      const fieldName = 'name';
      const result = component.isFieldInvalid(fieldName);
    
      expect(result).toBeTrue(); // Debe devolver true
    });
  
    it('should return false for isFieldInvalid', () => {
      const fieldName = 'name';
      component.productForm.get(fieldName)?.setValue('Valid Name');
  
      const result = component.isFieldInvalid(fieldName);
  
      expect(result).toBeFalse();
    });
  
    it('should call getProduct and update isValid on success', () => {
      productProviderSpy.getProduct.and.returnValue(of(false));
      component.productForm.get('id')?.setValue('validId');
  
      component.getProduct();
  
      expect(productProviderSpy.getProduct).toHaveBeenCalledWith('validId');
      expect(component.isValid).toBeTrue();
    });
  
    it('should handle getProduct error and show alert', () => {
      const errorMessage = 'Error occurred while fetching product';
      productProviderSpy.getProduct.and.returnValue(throwError(errorMessage));
      const alertSpy = spyOn(window, 'alert');
  
      component.getProduct();
  
      expect(productProviderSpy.getProduct).toHaveBeenCalled();
      expect(alertSpy).toHaveBeenCalledWith(errorMessage);
    });
  })
})