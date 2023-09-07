import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductProvider } from './product.provider';

describe('ProductProvider', () => {
  let service: ProductProvider;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductProvider],
    });
    service = TestBed.inject(ProductProvider);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verificar que no haya solicitudes pendientes.
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get products', () => {
    const mockProducts = [
      {
        id: '1',
        name: 'Product 1',
        description: 'Description 1',
        logo: 'logo.jpg',
        date_release: new Date(),
        date_revision: new Date(),
      }
    ];

    service.getProducts().subscribe((response) => {
      expect(response).toEqual(mockProducts);
    });

    const req = httpMock.expectOne(`${service.baseUrl}/bp/products`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });

  it('should get product verification', () => {
    const productId = '123';

    service.getProduct(productId).subscribe((response) => {
      expect(response).toBe(true);
    });

    const req = httpMock.expectOne(`${service.baseUrl}/bp/products/verification?id=${productId}`);
    expect(req.request.method).toBe('GET');
    req.flush(true); 
  });

  it('should create product', () => {
    const mockProduct = {
      id: '1',
      name: 'Product 1',
      description: 'Description 1',
      logo: 'logo.jpg',
      date_release: new Date(),
      date_revision: new Date(),
    };

    service.createProducts(mockProduct).subscribe((response) => {
      expect(response).toEqual(mockProduct);
    });

    const req = httpMock.expectOne(`${service.baseUrl}/bp/products`);
    expect(req.request.method).toBe('POST');
    req.flush(mockProduct);
  });

  it('should update product', () => {
    const mockProduct = {
      id: '1',
      name: 'Product 1',
      description: 'Description 1',
      logo: 'logo.jpg',
      date_release: new Date(),
      date_revision: new Date(),
    };

    service.updatesProducts(mockProduct).subscribe((response) => {
      expect(response).toEqual(mockProduct);
    });

    const req = httpMock.expectOne(`${service.baseUrl}/bp/products`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockProduct);
  });

  it('should delete product', () => {
    const productId = '123';

    service.deleteProducts(productId).subscribe((response) => {
      expect(response).toBe(true);
    });

    const req = httpMock.expectOne(`${service.baseUrl}/bp/products?id=${productId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(true);
  });
});
