import api from "./api";

export const saveQuizAttempt = async (quizId: string, data: any) => {
  const res = await api.post(`/quiz/attempt/${quizId}`, data);
  return res;
};