import { ErrorResponse } from './ErrorResponse.model';

export interface ServiceResponse<T> {
  data?: T;
  errorResponse?: ErrorResponse;
}
