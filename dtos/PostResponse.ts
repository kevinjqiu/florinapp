export default class PostResponse<T> {
  result: T;
  constructor(result: T) {
      this.result = result;
  }
}