import { TestBed } from '@angular/core/testing';
import { ProductFilterPipe } from './product-filter.pipe';
import { Product } from '../models/product.model';

describe('ProductFilterPipe', () => {
  let pipe: ProductFilterPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductFilterPipe]
    });

    pipe = TestBed.inject(ProductFilterPipe);
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should filter products based on searchText', () => {
    const products: Product[] = [
      { id: '1', name: 'Product 1', description: 'Description 1', logo: '  ', date_release: '2021-01-01', date_revision: '2022-01-01' },
      { id: '2', name: 'Product 2', description: 'Description 2' , logo: '  ', date_release: '2021-01-01', date_revision: '2022-01-01'},
      { id: '3', name: 'Product 3', description: 'Description 3' , logo: '  ', date_release: '2021-01-01', date_revision: '2022-01-01'}
    ];

    const searchText = 'product 2';

    const result = pipe.transform(products, searchText);

    expect(result.length).toBe(1);
    expect(result[0].name).toBe('Product 2');
  });

  it('should return all products when searchText is empty', () => {
    const products: Product[] = [
      { id: '1', name: 'Product 1', description: 'Description 1' , logo: '  ', date_release: '2021-01-01', date_revision: '2022-01-01'},
      { id: '2', name: 'Product 2', description: 'Description 2' , logo: '  ', date_release: '2021-01-01', date_revision: '2022-01-01'},
      { id: '3', name: 'Product 3', description: 'Description 3' , logo: '  ', date_release: '2021-01-01', date_revision: '2022-01-01'}
    ];

    const searchText = '';

    const result = pipe.transform(products, searchText);

    expect(result.length).toBe(3);
  });

  it('should return an empty array when products or searchText is not provided', () => {
    const products: Product[] = [
      { id: '1', name: 'Product 1', description: 'Description 1' , logo: '  ', date_release: '2021-01-01', date_revision: '2022-01-01'},
      { id: '2', name: 'Product 2', description: 'Description 2' , logo: '  ', date_release: '2021-01-01', date_revision: '2022-01-01'},
      { id: '3', name: 'Product 3', description: 'Description 3' , logo: '  ', date_release: '2021-01-01', date_revision: '2022-01-01'}
    ];

    let searchText: any = null;
    let result = pipe.transform(products, searchText);
    expect(result.length).toBe(3);

    searchText = undefined;
    result = pipe.transform(products, searchText);
    expect(result.length).toBe(3);

    searchText = '';
    result = pipe.transform([], searchText);
    expect(result.length).toBe(0);
  });
});

