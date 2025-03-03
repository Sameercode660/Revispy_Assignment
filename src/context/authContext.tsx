'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
    isLogin: boolean;
    setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
    userId: string | null;
    setUserId: React.Dispatch<React.SetStateAction<string | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isLogin, setIsLogin] = useState(false);
    const [userId, setUserId] = useState<string | null>(null);

    return (
        <AuthContext.Provider value={{ isLogin, setIsLogin, userId, setUserId }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};