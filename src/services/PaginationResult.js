export default class PaginationResult<T> {
  result: Array<T>;
  total: Number;

  constructor(result: Array<T>, total: Number) {
    this.result = result;
    this.total = total;
  }
}