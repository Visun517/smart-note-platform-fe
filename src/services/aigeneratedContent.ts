import api from "./api";

export const getAigeneratedContent = async (id: any) => {
  const res = await api.get(`/aiGeneratedContent/${id}`);
  return res;
};