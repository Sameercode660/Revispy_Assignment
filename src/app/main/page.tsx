import React from 'react'
import Main from '@/components/Main'
import ProtectedRoute from '@/components/ProtectedRoute'

function page() {
    return (
        <>
            <ProtectedRoute>
                <Main />
            </ProtectedRoute>
        </>
    )
}

export default page
