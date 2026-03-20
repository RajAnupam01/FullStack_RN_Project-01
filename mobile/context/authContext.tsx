import { LoginUser, LogoutUser, RegisterUser } from "@/services/authApi";
import { getMyProfile } from "@/services/userApi";
import { getTokens } from "@/utils/storage";
import { router } from "expo-router";
import { createContext, useEffect, useState } from "react";

type AuthContextType = {
    user: any,
    loading: boolean,
    register: (name: string, email: string, password: string) => Promise<any>
    login: (email: string, password: string) => Promise<any>
    logout: () => void
}



export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: any) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)

    const loadUser = async () => {
        try {
            const tokens = await getTokens();
            if (tokens.accessToken) {
                const profile = await getMyProfile();
                setUser(profile)
            }
        } catch (error) {
            console.log("Load user error:", error)
            setUser(null)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadUser();
    }, [])

    const register = async (name: string, email: string, password: string) => {
        const res = await RegisterUser({ name, email, password });
        setUser(res.data.user);
        return res
    }

    const login = async (email: string, password: string) => {
        const res = await LoginUser({ email, password });
        setUser(res.data.user)
        return res;
    }

    const logout = async () => {
        await LogoutUser(null)
        setUser(null)
        router.replace("/login");
    }

    return (
        <AuthContext.Provider value={{ user, loading, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}