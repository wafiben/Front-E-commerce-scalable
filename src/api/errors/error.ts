interface ApiError {
  status: number;
  error: string;
  message: string;
  details?: Record<string, any>;
}
