export default class ServiceError extends Error {
  constructor(error) {
    super();
    this.error = error;
  }
};