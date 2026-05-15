import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { authClient } from "../../lib/auth";

interface User {
  id: string;
  email: string;
  role: "client" | "admin";
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

function userFromSession(neonUser: { id: string; email: string; role?: string }): User {
  return {
    id: neonUser.id,
    email: neonUser.email,
    role: neonUser.role === "admin" ? "admin" : "client",
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // On mount — check for an existing Neon Auth session (cookie-based)
  useEffect(() => {
    authClient
      .getSession()
      .then(async (res: any) => {
        const session = res?.data?.session;
        const neonUser = res?.data?.user;
        if (!session?.token || !neonUser) return;

        setToken(session.token);
        setUser(userFromSession(neonUser));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const login = async (email: string, password: string) => {
    const result: any = await authClient.signIn.email({ email, password });

    if (result.error) {
      throw new Error(result.error.message ?? "Invalid credentials");
    }

    // Grab the fresh session
    const ses: any = await authClient.getSession();
    const sessionToken = ses?.data?.session?.token;
    const neonUser = ses?.data?.user;

    if (!sessionToken || !neonUser) {
      throw new Error("Session could not be established");
    }

    setToken(sessionToken);
    setUser(userFromSession(neonUser));
  };

  const register = async (email: string, password: string) => {
    const result: any = await authClient.signUp.email({
      email,
      password,
      name: email.split("@")[0],
    });

    if (result.error) {
      throw new Error(result.error.message ?? "Registration failed");
    }

    // Grab the fresh session
    const ses: any = await authClient.getSession();
    const sessionToken = ses?.data?.session?.token;
    const neonUser = ses?.data?.user;

    if (!sessionToken || !neonUser) {
      throw new Error("Session could not be established");
    }

    setToken(sessionToken);
    setUser(userFromSession(neonUser));
  };

  const logout = async () => {
    await authClient.signOut();
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, loading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
