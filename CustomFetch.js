import { getToken } from "./AuthService"; // auth.js dosyasından getToken fonksiyonunu içe aktar

export const apiRequest = async ({
  baseUrl = "http://192.168.1.6:8080",
  endpoint,
  method = "GET",
  queryParams = {},
  body = null,
}) => {
  const queryString = new URLSearchParams(queryParams).toString();
  const url = `${baseUrl}${endpoint}${queryString ? `?${queryString}` : ""}`;
  const token = await getToken(); // Token'ı alıyoruz
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...(body && { body: JSON.stringify(body) }),
  };

  return fetch(url, options)
    .then((res) => res.json()) // burada json() dönüşümünü yapıyoruz
    .catch((err) => {
      console.error("API Request Error:", err.message);
      throw err;
    });
};
