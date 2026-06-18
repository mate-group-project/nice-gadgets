import { BASE_URL } from './endpoints';

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

async function request<TResponse>(
  endpoint: string,
  method: RequestMethod = 'GET',
  body: unknown | null = null,
): Promise<TResponse> {
  const options: RequestInit = { method };

  if (body) {
    options.body = JSON.stringify(body);
    options.headers = {
      'Content-Type': 'application/json; charset=UTF-8',
    };
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, options);

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json();
}

export const client = {
  get: <TResponse>(url: string) => request<TResponse>(url),

  post: <TResponse>(url: string, data: unknown) =>
    request<TResponse>(url, 'POST', data),

  put: <TResponse>(url: string, data: unknown) =>
    request<TResponse>(url, 'PUT', data),

  patch: <TResponse>(url: string, data: unknown) =>
    request<TResponse>(url, 'PATCH', data),

  delete: (url: string) => request<void>(url, 'DELETE'),
};
