// Используем относительный путь — Vite сам проксирует на бэкенд
const BASE_URL = "/api";

async function request(endpoint, options = {}) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`API Error ${res.status}: ${error}`);
  }

  return res.json();
}

export const aboutUsApi = {
  getList: () => request("/about-us/"),
  getById: (id) => request(`/about-us/${id}/`),
};

export const feedbackApi = {
  getList: () => request("/feedback"),
  create: (data) =>
    request("/feedback", {
      method: "POST",
      body: JSON.stringify(data),
    }),
};

export const newsApi = {
  getList: () => request("/news"),
};

export const projectApi = {
  getList: () => request("/project"),
};

export const reviewsApi = {
  getList: () => request("/reviews"),
};