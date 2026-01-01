import { mapApiErrors } from "src/features/movies/api/apiErrors";
import { useToastStore } from "src/shared/store/toast.store";
import { logger } from "src/shared/utils/logger";
import { API_CONSTANTS } from "src/shared/constants/api";

const { BASE_URL, API_KEY } = API_CONSTANTS;

export async function apiGet<T>(endpoint: string): Promise<T> {
  const execute = async (): Promise<T> => {
    
  const url = `${BASE_URL}${endpoint}${
    endpoint.includes("?") ? "&" : "?"
  }api_key=${API_KEY}`;

  logger.request("GET", url);

  try {
    const response = await fetch(url);

    if (!response) {
        throw new Error("Network error");
      }

    const data = await response.json();

    logger.response(url, response.status, data);

    if (!response.ok) {
        const message = mapApiErrors(
          response.status,
          data?.status_message
        );

        throw new Error(message);
      }

    return data as T;
  } catch (error) {
    logger.error(url, error);
     const message =
        error instanceof Error
          ? error.message
          : "Something went wrong";

      useToastStore.getState().show(message, "error", {
        actionLabel: "Retry",
        onAction: execute,
        duration: 8000,
      });
    throw error;
  }
}
 return execute();
}
