import axios from "axios";
import API_BASE_URL from "../config/api";

const API = `${API_BASE_URL}/api/audit`;

export const getAuditLogs = (documentId, token) => {
  return axios.get(`${API}/${documentId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
