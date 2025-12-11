import api from "./api";

export const profileUpload = async (file : File) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await api.post("/cloudinary/profile", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res;
};

export const getUserDetails = async () =>{
  const res = await api.get("/user/getProfile");
  return res;
}


export const updateUserDetails = async (data : any) => {
  const res = await api.put("/user/updateUser" , data);
  return res;
};