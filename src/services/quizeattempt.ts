import api from "./api";

export const saveQuizAttempt = async (quizId: string, data: any) => {
  console.log(quizId)
  const res = await api.post(`/quiz/attempt/${quizId}`, data);
  return res;
};