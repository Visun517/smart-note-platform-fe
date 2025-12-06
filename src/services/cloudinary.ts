import api from "./api";

export const uploadImage = async (file: any) => {
  const res = await api.post("/cloudinary/image", file);
  return res;
};

export const uploadPdf = async (file: any) => {
  const res = await api.post("/cloudinary/pdf", file);
  return res;
};