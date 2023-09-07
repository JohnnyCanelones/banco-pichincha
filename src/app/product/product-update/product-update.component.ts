import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductProvider } from '../../providers/product.provider';
import {  Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';


@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent {
  public productId!: string;
  @Input() product!: Product;
  @Output() productUpdated: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private router: Router,
    private productProvider: ProductProvider
  ) {}

  ngOnInit(): void {
    
  }

  handleFormSubmit(formData: Product): void {
    this.productProvider.updatesProducts(formData).subscribe(
      (data: Product) => {
        alert('Producto editado exitosamente');
        this.productUpdated.emit(true);
        
      }, error => {
        console.log(error);
      }
    )
  }

}
