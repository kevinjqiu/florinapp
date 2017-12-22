export enum ErrorType {
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
  ACCOUNT_NOT_FOUND = "ACCOUNT_NOT_FOUND"
}

export class ErrorDTO {
  type: ErrorType;
  message: string;

  constructor(type: ErrorType, message: string) {
    this.type = type;
    this.message = message;
  }
}

export const InternalServerError = new ErrorDTO(
  ErrorType.INTERNAL_SERVER_ERROR,
  "Internal Server Error"
);
