import { createContext, useContext, useEffect, useState } from "react";
import { getMyDetials, logOut } from "../services/auth";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      getMyDetials()
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => {
          console.log("Token invalid or expired", err);
          localStorage.removeItem("accessToken");
          setUser(null);
        });
    }
  }, []);

  const logoutUser = async () => {
    try {
      await logOut(); 
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("accessToken");
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
