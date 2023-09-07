import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../models/product.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductProvider } from 'src/app/providers/product.provider';
import { debounceTime } from 'rxjs';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})

export class ProductFormComponent implements OnInit {
  @Input() product!: Product;
  @Input() isEdit: boolean= false;
  @Output() formSubmit: EventEmitter<Product> = new EventEmitter<Product>();

  productForm!: FormGroup;
  public isValid = true;

  constructor(
    private fb: FormBuilder,
    private productProvider: ProductProvider,
    private datePipe: DatePipe
    ) { 
    this.productForm = this.fb.group({
      id: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(10), this.isValidId()]],
      name: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      description: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      logo: [null, Validators.required],
      date_release: [null, [Validators.required, this.minDateValidator()]],
      date_revision: [null, [Validators.required, this.minDateValidator(true)]]
    });
   }

  ngOnInit() {
    if (this.product && this.isEdit) {
      this.product.date_release = this.datePipe.transform(this.product.date_release, 'yyyy-MM-dd', 'UTC');;
      this.product.date_revision = this.datePipe.transform((this.product.date_revision), 'yyyy-MM-dd', 'UTC');
      this.productForm.setValue(this.product)
    }
    this.productForm.get('id')?.valueChanges
      .pipe(debounceTime(300))
      .subscribe((newValue) => {
        console.log('Valor detenido:', newValue);
        this.getProduct()
      });

    
    if (this.isEdit) {
      this.productForm.get('id')?.disable();
    }
  }

  minDateValidator(isRevisionDate = false) {
    return (control: any) => {
      const selectedDate = new Date(control.value);
      const releaseDate = new Date(this.productForm?.get('date_release')?.value);
      const oneYearLater = new Date(releaseDate);
      oneYearLater.setFullYear(releaseDate.getFullYear() + 1);
      
      if (isRevisionDate && selectedDate.getTime() !== oneYearLater.getTime()) {
        return { minDate: true };
      } else if (!isRevisionDate && selectedDate < releaseDate) {
        return { minDate: true };
      }
      
      return null;
    };
  }

  isValidId() {
    return (control: any) => {
      if (!this.isValid) {
        return { isInvalid: true };
        ;
      } 
      
      return null;
    };
  }

  isFieldInvalid(fieldName: string) {
    const control = this.productForm.get(fieldName);
    return control?.touched && control?.invalid;
  }

  getProduct() {
    this.productProvider.getProduct(this.productForm.value.id).subscribe(
      (exist) => {
        this.isValid = !exist;
        this.isValidId()
      },
      (error) => {
        alert(`${error}`)
      }
    );
  }

  resetForm() {
    this.productForm.reset(); // Esto restablecerá todos los campos del formulario
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      this.productForm.get('id')?.enable();
      this.formSubmit.emit(this.productForm.value);
    } else {
      console.log('Formulario Invalidao')
    }
  }
}