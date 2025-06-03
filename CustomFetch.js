const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YTEyYjUyMjJlNGFjMDRlNzExM2I2MCIsInVzZXJuYW1lIjoiZWdlbGVuIiwiaWF0IjoxNzM4OTMwODk4fQ.RqaaRZsjQNIi3t1gTixHciri_N7OvgjgZWDr9s37mNI";

export const apiRequest = async ({
  baseUrl = "http://10.22.101.157:8000",
  endpoint,
  method = "GET",
  queryParams = {},
  body = null,
}) => {
  const queryString = new URLSearchParams(queryParams).toString();
  const url = `${baseUrl}${endpoint}${queryString ? `?${queryString}` : ""}`;

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
