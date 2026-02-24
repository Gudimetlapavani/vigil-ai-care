import React, { createContext, useContext, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

export type UserRole = "student" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("safechat_user");
    return stored ? JSON.parse(stored) : null;
  });

  const login = useCallback(async (email: string, password: string) => {
    // Placeholder API call
    // const res = await fetch('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
    const mockUser: User = {
      id: "1",
      name: email.split("@")[0],
      email,
      role: email.includes("admin") ? "admin" : "student",
    };
    localStorage.setItem("safechat_user", JSON.stringify(mockUser));
    setUser(mockUser);
  }, []);

  const register = useCallback(async (name: string, email: string, password: string, role: UserRole) => {
    // Placeholder API call
    // const res = await fetch('/api/auth/register', { method: 'POST', body: JSON.stringify({ name, email, password, role }) });
    const mockUser: User = { id: "1", name, email, role };
    localStorage.setItem("safechat_user", JSON.stringify(mockUser));
    setUser(mockUser);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("safechat_user");
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};
