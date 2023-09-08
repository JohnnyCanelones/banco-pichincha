import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductProvider } from '../providers/product.provider';
import { Product } from '../models/product.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ProductFilterPipe } from '../pipes/product-filter.pipe';

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
  public pageEvent!: PageEvent;
  public pageIndex: number =0;
  public pageSize: number =0;
  public currentPage: number = 1;
  public totalPages!: number;
  public displayedProducts:Product[] = [];
  public filteredProducts:Product[] = [];

  constructor(
    private productProvider: ProductProvider,
    private productFilter: ProductFilterPipe
  ) {}

  ngOnInit() {
    this.getProducts()
  }

  getProducts() {
    this.productProvider.getProducts().subscribe((products) => {
      this.products = products;
      this.totalPages = Math.ceil(this.products.length / this.selectedLimit);
      this.updateDisplayedProducts();
    });
  }
  editProduct(product: Product) {
    this.product = {... product};
    this.updateProduct = true;
  }

  productUpdated() {
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

  updateDisplayedProducts(): void {
    let products = this.searchText.length > 0 ? this.filteredProducts : this.products
    this.totalPages = Math.ceil(products.length / this.selectedLimit);
    const startIndex = (this.currentPage - 1) * this.selectedLimit;
    const endIndex = startIndex + this.selectedLimit;
    this.displayedProducts = products.slice(startIndex, endIndex);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedProducts();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayedProducts();
    }
  }

  onSearchTextChange() {
    this.filteredProducts = this.productFilter.transform(
      this.products,
      this.searchText
    );
    this.currentPage = 1;
    this.updateDisplayedProducts();
  }


}
