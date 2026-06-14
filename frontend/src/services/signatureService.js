import axios from "axios";

const API =
  "http://localhost:5000/api/signatures";

export const saveSignature = (
  data,
  token
) => {
  return axios.post(API, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const finalizePdf = (
  documentId,
  token
) =>
  axios.post(
    `http://localhost:5000/api/signatures/finalize/${documentId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );