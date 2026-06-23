"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react"; // ← added signOut
import { useRouter } from "next/navigation";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    

    if (status === "authenticated" && session?.backendToken) {
      const backendUser = session.backendUser;
      const backendToken = session.backendToken;

      localStorage.setItem("token", backendToken);
      localStorage.setItem("user", JSON.stringify(backendUser));

      setTimeout(() => {
        setUser(backendUser);
        setToken(backendToken);
        setLoading(false);
      }, 0);

      const alreadyRegistered = localStorage.getItem("role_selected");
      if (session.isNewUser && !alreadyRegistered) {
        localStorage.setItem("temp_token", backendToken);
        localStorage.setItem("temp_user", JSON.stringify(backendUser));
        localStorage.setItem("role_selected", "true");
        router.push("/select-role");
      }
      return;
    }

    if (status !== "loading") {
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      setTimeout(() => {
        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
        }
        setLoading(false);
      }, 0);
    }
  }, [session, status, router]); // ← added router to dependencies

  const login = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
    localStorage.setItem("token", userToken);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role_selected");
    signOut({ redirect: false }); // ← added to clear Google session on logout
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}