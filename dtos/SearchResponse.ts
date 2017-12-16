export default class SearchResponse<T> {
    result: Array<T>;
    total: number;
    constructor(result: Array<T>) {
        this.result = result;
        this.total = result.length;
    }
}
