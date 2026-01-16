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
  const { subject, search } = filters;
  let url = API_URL;
  const params = new URLSearchParams();
  if (subject) params.append("subject", subject);
  if (search) params.append("search", search);

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

export const incrementDownloads = async (id) => {
  const { data } = await axios.put(`${API_URL}/${id}/download`);
  return data;
};
