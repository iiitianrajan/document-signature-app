import axios from "axios";
import API_BASE_URL from "../config/api";

const API = `${API_BASE_URL}/api/signatures`;

export const saveSignature = (data, token) => {
  return axios.post(API, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const finalizePdf = (documentId, token) =>
  axios.post(
    `${API_BASE_URL}/api/signatures/finalize/${documentId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

export const getPublicSignature = (token) => {
  return axios.get(`${API}/public/${token}`);
};

export const getSignatureByDocument = (documentId, token) =>
  axios.get(`${API}/document/${documentId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const generateLink = (signatureId, token) =>
  axios.get(`${API}/link/${signatureId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const sendSignatureEmail = (email, link, documentId, token) =>
  axios.post(
    `${API}/send-email`,
    {
      email,
      link,
      documentId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

export const savePublicSignature = (token, signatureImage) =>
  axios.post(`${API}/public-sign/${token}`, {
    signatureImage,
  });
export const rejectSignature = (token, reason) =>
  axios.post(`${API}/reject/${token}`, {
    reason,
  });
