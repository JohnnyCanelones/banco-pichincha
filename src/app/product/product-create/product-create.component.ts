import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductProvider } from 'src/app/providers/product.provider';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent {

  constructor(
    private router: Router,
    private productProvider: ProductProvider
  ) {}

  

  handleFormSubmit(formData: Product): void {
    this.productProvider.createProducts(formData).subscribe(
      (data: any) => {
        this.router.navigate(['/'])
        alert('Producto agregado exitosamente');
      }, error => {
        console.log(error);
      }
    )
  }

}
