import axios from "axios";

const API_URL = "http://localhost:5000/api/reports";

// Get all reports (Admin only)
export const fetchReports = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Update report status (Admin only)
export const updateReportStatus = async (id, status) => {
  const token = localStorage.getItem("token");
  const response = await axios.put(
    `${API_URL}/${id}`,
    { status },
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  return response.data;
};
