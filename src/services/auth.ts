import api from "./api";

type signUpDataType = {
  username: string;
  email: string;
  password: string;
}

export const signUp = async ( data : signUpDataType) => {
  const res = await api.post("/auth/register",  data );
  return res;
};

export const logIn = async ( data : any) => {
  const res = await api.post("/auth/login",  data );
  return res;
};

export const getMyDetials = async () => {
  const res = await api.get("/auth/me");
  return res;
};

export const refreshTokens = async () => {
  const res = await api.post("/auth/refresh", {},{ withCredentials: true });
  return res.data;
};

export const forgotPassword = async ( data : any) => {
  const res = await api.post("/auth/forgot-password",  data );
  return res;
};

export const resetPassword = async ( data : any) => {
  const res = await api.post(`/auth/reset-password/${data.token}`,{ password: data.password });
  return res;
};