import axios from "axios";
import API_BASE_URL from "../config/api";

const API =
  `${API_BASE_URL}/api/docs`;

export const getDocuments = (
  token
) => {
  return axios.get(API, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const uploadDocument = (
  formData,
  token
) => {
  return axios.post(
    `${API_BASE_URL}/api/docs/upload`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type":
          "multipart/form-data",
      },
    }
  );
};