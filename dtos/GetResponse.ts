export default class GetResponse<T> {
  result: T;
  constructor(result: T) {
      this.result = result;
  }
}