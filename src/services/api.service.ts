export interface ApiParams {
  endpoint: string;
  queryString?: string;
  data?: unknown;
}

const buildUrl = (endpoint: string, query?: string) => {
  return `${endpoint}${query ? `?${query}` : ""}`;
};

const baseFetch = async (url: string, options: RequestInit = {}) => {
  const res = await fetch(url, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await res.json();

  if (!res.ok) {
    throw data;
  }

  return data;
};

export const fetchLists = async ({ endpoint, queryString }: ApiParams) => {
  console.log("FINAL URL:", buildUrl(endpoint));
  return baseFetch(buildUrl(endpoint, queryString));
};

export const fetchDetails = async ({ endpoint }: ApiParams) => {
  return baseFetch(buildUrl(endpoint));
};

export const storeItem = async ({ endpoint, data }: ApiParams) => {
  console.log("FINAL URL:", buildUrl(endpoint));
  console.log("Data being sent:", data);
  return baseFetch(buildUrl(endpoint), {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const updateItem = async ({ endpoint, data }: ApiParams) => {
  return baseFetch(buildUrl(endpoint), {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

export const deleteItem = async ({ endpoint }: ApiParams) => {
  return baseFetch(buildUrl(endpoint), {
    method: "DELETE",
  });
};

export const changeStatus = async ({ endpoint, data }: ApiParams) => {
  return baseFetch(buildUrl(endpoint), {
    method: "PATCH",
    body: JSON.stringify(data),
  });
};
