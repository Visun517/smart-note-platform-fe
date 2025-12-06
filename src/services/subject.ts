import api from "./api";

export const saveSubject = async (newSubjectName: string) => {
  const res = await api.post("/subject/create" , { subject : newSubjectName });
  return res;
};

export const getAll = async () => {
  const res = await api.get("/subject/all");
  return res;
};

export const getSubjectById = async () => {
  const res = await api.get("/subject/:id");
  return res;
};

export const updateSubjects = async () => {
  const res = await api.put("/subject/update/:id");
  return res;
};

export const deleteSubject = async (id : string ) => {
  const res = await api.delete(`/subject/delete/${id}`);
  return res;
};