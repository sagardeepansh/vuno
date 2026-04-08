import { api } from "../lib/api";
// const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const loginAPI = (payload) => {
  return api(`/login`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

export const signupAPI = (payload) => {
  return api(`/register`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

export const verifyOtpAPI = async (formData) => {
  return api(`/verify-otp`, {
    method: "POST",
    body: JSON.stringify(formData),
  });

};

export const getProfileAPI = () => {
  return api(`${apiUrl}/auth/me`);
};