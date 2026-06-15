import axios from "axios";

const API = "http://localhost:5000/api/audit";

export const getAuditLogs = (documentId, token) => {
  return axios.get(`${API}/${documentId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
