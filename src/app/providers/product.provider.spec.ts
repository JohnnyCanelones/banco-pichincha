import { TestBed } from '@angular/core/testing';

import { ProductProvider } from './product.provider';

describe('ProductProvider', () => {
  let provider: ProductProvider;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    provider = TestBed.inject(ProductProvider);
  });

  it('should be created', () => {
    expect(provider).toBeTruthy();
  });
});
