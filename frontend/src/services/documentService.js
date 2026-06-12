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