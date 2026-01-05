export function mapApiErrors(status: number, message?: string) {
  switch (status) {
    case 400:
      return "Invalid request. Please check your input.";
    case 401:
      return "Authentication failed. Please check your API key.";
    case 403:
      return "You don't have permission to perform this action.";
    case 404:
      return "The requested resource was not found.";
    case 405:
      return "This request method is not supported.";
    case 406:
      return "Invalid request headers.";
    case 422:
      return "Invalid parameters provided.";
    case 429:
      return "Too many requests. Please slow down.";
    case 500:
      return "Server error. Please try again later.";
    case 502:
      return "Cannot connect to server. Please try again.";
    case 503:
      return "Service temporarily unavailable.";
    case 504:
      return "Request timed out. Please try again.";
    default:
      return (
        message ||
        "Something went wrong. Please try again."
      );
  }
}
