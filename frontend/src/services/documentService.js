import axios from "axios";

const API =
  "http://localhost:5000/api/docs";

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
    "http://localhost:5000/api/docs/upload",
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