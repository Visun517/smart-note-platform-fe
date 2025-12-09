import api from "./api";

export const getSummary = async (id: any) => {
  const res = await api.get(`/ai/summary/${id}`);
  return res;
};

export const getExplanation = async (id: any) => {
  const res = await api.get(`/ai/explanation/${id}`);
  return res;
};

export const getQuiz = async (id: any) => {
  const res = await api.get(`/ai/quiz/${id}`);
  return res;
};

export const getFlasCards = async (id: any) => {
  const res = await api.get(`/ai/flashcards/${id}`);
  return res;
};