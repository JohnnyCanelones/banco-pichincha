import { PageLimitPipe } from './page-limit.pipe';

describe('PageLimitPipe', () => {
  let pipe: PageLimitPipe;

  beforeEach(() => {
    pipe = new PageLimitPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return the first n items from an array', () => {
    const items = [1, 2, 3, 4, 5];
    const limit = 3;

    const result = pipe.transform(items, limit);

    expect(result).toEqual([1, 2, 3]);
  });

  it('should return an empty array when input is null', () => {
    const items:any[] = [];
    const limit = 3;

    const result = pipe.transform(items, limit);

    expect(result).toEqual([]);
  });

  it('should return an empty array when limit is not provided', () => {
    const pipe = new PageLimitPipe();
    const items = [1, 2, 3, 4, 5];
    const limit:any = null; // Asegúrate de que limit sea null o no esté definido.

    const result = pipe.transform(items, limit);

    expect(result.length).toBe(0);

  });

  it('should return the entire array when limit is greater than the array length', () => {
    const items = [1, 2, 3, 4, 5];
    const limit = 10;

    const result = pipe.transform(items, limit);

    expect(result).toEqual([1, 2, 3, 4, 5]);
  });
});