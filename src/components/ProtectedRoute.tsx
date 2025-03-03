'use client'

import React, { useEffect } from 'react'
import { useAuth } from '@/context/authContext'
import { useRouter } from 'next/navigation';

interface ProtectedRouteProps {
    children: React.ReactNode;
}


function ProtectedRoute({ children }: ProtectedRouteProps) {

    const { isLogin } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLogin) {
            router.push('/');
        }
    }, [isLogin, router]);

    if (!isLogin) {
        return null;
    }
    return (
        <>
            {children}
        </>
    )

}

export default ProtectedRoute