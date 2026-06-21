"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    
    // Check Google session first
    console.log("Status:", status);
    console.log("Session:", session);
    if (status === "authenticated" && session?.backendToken) {
      // console.log("Session:", session); // ← add this
      // console.log("isNewUser:", session.isNewUser); // ← add this
      
      setUser(session.backendUser);
      setToken(session.backendToken);
      localStorage.setItem("token", session.backendToken);
      localStorage.setItem("user", JSON.stringify(session.backendUser));
      setLoading(false);

      const alreadyRegistered = localStorage.getItem("role_selected");
      if (session.isNewUser && !alreadyRegistered) {
        localStorage.setItem("temp_token", session.backendToken);
        localStorage.setItem("temp_user", JSON.stringify(session.backendUser));
        localStorage.setItem("role_selected", "true");
        router.push("/select-role");
      }
      return;
    }

    // Fall back to localStorage for email/password login
    if (status !== "loading") {
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    }
  }, [session, status]);

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