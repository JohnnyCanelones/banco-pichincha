import { Component, OnInit } from '@angular/core';
import { ProductProvider } from '../providers/product.provider';
import { Product } from '../models/product.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  public products:Product[] = [];
  public searchText: string = ''
  public selectedLimit:any = 5
  public updateProduct: boolean = false;
  public product!: Product

  constructor(private productProvider: ProductProvider) {}

  ngOnInit() {
    this.getProducts()
  }

  getProducts() {
    this.productProvider.getProducts().subscribe((products) => {
      this.products = products;
    });
  }
  editProduct(product: Product) {
    this.product = {... product};
    this.updateProduct = true;
  }

  productUpdated() {
    debugger
    this.getProducts();
    this.updateProduct = false;
  }

  deleteProduct(id: string) {
    this.productProvider.deleteProducts(id).subscribe(
      (data) => {
        alert('Producto Borrado Correctamente');
      }, 
      (error: HttpErrorResponse) => {
        alert(`Error: ${error.error}`);
      }
    )
  }
}
