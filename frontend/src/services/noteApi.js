import axios from "axios";

const API_URL = "http://localhost:5000/api/notes";

// Helper to get token for authorized requests
const getAuthConfig = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const fetchNotes = async (filters = {}) => {
  let url = API_URL;
  const params = new URLSearchParams();

  Object.keys(filters).forEach((key) => {
    if (filters[key]) params.append(key, filters[key]);
  });

  if (params.toString()) {
    url += `?${params.toString()}`;
  }

  const { data } = await axios.get(url);
  return data;
};

export const fetchNoteById = async (id) => {
  const { data } = await axios.get(`${API_URL}/${id}`);
  return data;
};

export const createNote = async (formData) => {
  const token = localStorage.getItem("token");
  const { data } = await axios.post(API_URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const deleteNote = async (id) => {
  const { data } = await axios.delete(`${API_URL}/${id}`, getAuthConfig());
  return data;
};

export const updateNote = async (id, updateData) => {
  const { data } = await axios.put(
    `${API_URL}/${id}`,
    updateData,
    getAuthConfig()
  );
  return data;
};

export const rateNote = async (id, rating) => {
  const { data } = await axios.post(
    `${API_URL}/${id}/rate`,
    { rating },
    getAuthConfig()
  );
  return data;
};

export const incrementDownloads = async (id) => {
  const { data } = await axios.put(`${API_URL}/${id}/download`);
  return data;
};
