export default class ServiceError extends Error {
  constructor(error) {
    this.error = error;
  }
};