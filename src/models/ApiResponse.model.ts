export interface ApiResponse<T> {
  dirty: boolean;
  errors: boolean;
  errorMessage?: string;
  data?: T;
}
