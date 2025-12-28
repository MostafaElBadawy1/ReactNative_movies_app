import { logger } from "src/shared/utils/logger";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

if (!API_KEY) {
  throw new Error("API key is missing");
}

export async function apiGet<T>(endpoint: string): Promise<T> {
  const url = `${BASE_URL}${endpoint}${
    endpoint.includes("?") ? "&" : "?"
  }api_key=${API_KEY}`;

  logger.request("GET", url);

  try {
    const response = await fetch(url);

    const data = await response.json();

    logger.response(url, response.status, data);

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    return data as T;
  } catch (error) {
    logger.error(url, error);
    throw error;
  }
}
