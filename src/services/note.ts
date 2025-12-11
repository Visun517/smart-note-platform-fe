import api from "./api";

export const createNnote = async (data: any) => {
  const res = await api.post("/note/create", data);
  return res;
};

export const getAllNotes = async (page = 1, limit = 10) => {
  const res = await api.get(`/note/all?page=${page}&limit=${limit}`);
  return res;
};

export const getNoteById = async (id: string | undefined) => {
  console.log(id)
  const res = await api.get(`/note/user/${id}`);
  return res;
};

export const updateNoteById = async (id: string, data: any) => {
  const res = await api.put(`/note/update/${id}`, data);
  return res;
};


export const deleteNoteId = async (id: string) => {
  const res = await api.patch(`/note/delete/${id}`);
  return res;
};

export const noteConvertToPdf = async (id: string) => {
  const res = await api.get(`/note/pdf/${id}`);
  return res;
};

export const getNotesBysubId = async (id: string) => {
  const res = await api.get(`/note/note/subject/${id}`);
  return res;
}

export const getTrashedNotes = async (page = 1, limit = 10) => {
  const res = api.get(`/note/trashed?page=${page}&limit=${limit}`);
  return res;
};

export const restoreNote = async (id: string) => {
  const res = await api.patch(`/note/restore/${id}`);
  return res;
};

export const deleteNotePermanently = async (id: string) => {
  const res = await api.delete(`/note/delete/permanently/${id}`);
  return res;
};

export const searchNotes = async (query: string) => {
  const res = await api.get(`/note/search?q=${query}`);
  return res;
};