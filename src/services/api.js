const API_URL = 'https://jsonplaceholder.typicode.com';

async function request(path, { signal } = {}) {
  const response = await fetch(`${API_URL}${path}`, { signal });
  if (!response.ok) throw new Error(`Não foi possível carregar os dados (HTTP ${response.status}).`);
  return response.json();
}

export const api = {
  users: (signal) => request('/users', { signal }),
  user: (id, signal) => request(`/users/${id}`, { signal }),
};
