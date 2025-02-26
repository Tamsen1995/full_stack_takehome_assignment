import { DataResponse } from "../types";

// Generic fetch function with error handling
async function fetchFromAPI<T>(endpoint: string): Promise<T> {
  try {
    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    return (await response.json()) as T;
  } catch (error) {
    console.error("API fetch error:", error);
    throw error;
  }
}

// Specific function to fetch data records
export async function fetchDataRecords(): Promise<DataResponse> {
  return fetchFromAPI<DataResponse>("/api/data");
}
