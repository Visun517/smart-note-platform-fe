import axios, { AxiosError } from "axios";
import { refreshTokens } from "./auth";


const api = axios.create({
  // baseURL: "http://localhost:5000/api/v1",
  baseURL:'https://zippy-skunk-visun-72ceb542.koyeb.app/api/v1',
  withCredentials: true
})

const PUBLIC_END_POINTS = ['/auth/login', '/auth/signup'];

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  const isPublic = PUBLIC_END_POINTS.some((url) => config.url?.includes(url));

  if (token && !isPublic) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
})

api.interceptors.response.use(
  (response) => {
    return response
  },
  async (err: AxiosError) => {
    const originalRequest: any = err.config

    const isPublic = PUBLIC_END_POINTS.some((url) =>
      originalRequest.url?.includes(url)
    )

    if (err.response?.status === 401 && !isPublic && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const res = await refreshTokens();
        const newAccessToken = res.accessToken;

        localStorage.setItem('accessToken', newAccessToken);

        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axios(originalRequest);
        
      } catch (error : any) {
        localStorage.removeItem('accessToken');
        window.location.href = '/auth/login';
        return Promise.reject(error);
      }
    }
    return Promise.reject(err);
  }
)


export default api;