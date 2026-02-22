const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const apiClient = async (
  endpoint: string,
  options: RequestInit = {},
) => {
  const url = `${BASE_URL}${endpoint}`;

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: "include", 
  });

  const data = await response.json();

  if (!response.ok) {
    throw data;
  }

  return data;
};
