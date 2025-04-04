const API_URL = 'http://localhost:5000/api';

const handleResponse = async (response) => {
  const data = await response.json();

  if (!response.ok) {
    const error = (data && data.error) || response.statusText;
    throw new Error(error);
  }

  return data.body;
};

export const loginUser = async (credentials) => {
  const response = await fetch(`${API_URL}/usuarios/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  });

  return handleResponse(response);
};

export const registerUser = async (userData) => {
  const response = await fetch(`${API_URL}/usuarios/registrar`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });

  return handleResponse(response);
};

export const getUserById = async (id) => {
  const response = await fetch(`${API_URL}/usuarios/${id}`);
  return handleResponse(response);
};

export const updateUser = async (userData) => {
  const response = await fetch(`${API_URL}/usuarios/actualizar`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });

  return handleResponse(response);
};

export const deleteUser = async (id) => {
  const response = await fetch(`${API_URL}/usuarios/eliminar`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id })
  });

  return handleResponse(response);
};
