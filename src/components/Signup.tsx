'use client'

import React from 'react'
import Link from 'next/link'
import { useState } from 'react';
import Otp from './Otp';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/authContext';


function Signup() {


    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [nameError, setNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [loadingState, setLoadingState] = useState(false)

    const router = useRouter()
    const { setIsLogin } = useAuth();


    async function handleSignup() {
        try {
            setEmailError(false);
            setNameError(false);
            setPasswordError(false);


            if (!name) {
                setNameError(true);
                return;
            }

            if (!email) {
                setEmailError(true);
                return;
            }

            if (!password) {
                setPasswordError(true);
                return;
            }

            setLoading(true);

            const data = {
                name,
                email,
                password
            }

            const response = await axios.post(`/api/auth/signup`, data);
            setLoading(false)

            if (response.data.status === true) {
                setIsLoggedIn(true)
                localStorage.setItem("id", response.data.response.id)
            }
            if (response.data.status === false) {
                alert("Something went wrong")
            }
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    async function onSubmit(id: string | null, otp: number) {
        try {
            const data = {
                id,
                otp
            }
            setLoadingState(true)
            const response = await axios.post(`/api/auth/verify-otp`, data)
            setLoadingState(false)
            console.log(response)
            if (response.data.status) {
                setIsLogin(true)
                router.push('/main')
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (

        <>
            {
                isLoggedIn ? (<Otp length={8} onSubmit={onSubmit} email={email} loadingState={loadingState}></Otp >) :
                    (<div className='w-full flex justify-center items-center pt-[100px]'>
                        <div className='w-[450px] h-[500px] border border-gray-300 rounded-xl flex flex-col gap-4 items-center justify-center'>
                            <div>
                                <h1 className='text-[1.5rem] font-semibold'>Create your account</h1>
                            </div>

                            <div className='flex flex-col w-[70%]'>
                                <label htmlFor="name" className='text-gray-600'>Name</label>
                                <input
                                    onChange={(e) => {
                                        setName(e.target.value)
                                    }}
                                    type="text" name="name" id="name" placeholder='Enter' className={`w-full h-[2.5rem] p-4 outline-none border ${nameError ? 'border-red-500' : 'border-gray-300'} rounded-md `} />
                            </div>
                            <div className='flex flex-col w-[70%]'>
                                <label htmlFor="email" className='text-gray-600'>Email</label>
                                <input
                                    onChange={(e) => {
                                        setEmail(e.target.value)
                                    }}
                                    type="text" name="email" id="email" placeholder='Enter' className={`w-full h-[2.5rem] p-4 outline-none border ${emailError ? 'border-red-500' : 'border-gray-300'} rounded-md `} />
                            </div>
                            <div className='flex flex-col w-[70%]'>
                                <label htmlFor="name" className='text-gray-600'>Password</label>
                                <input
                                    onChange={(e) => {
                                        setPassword(e.target.value)
                                    }}
                                    type="text" name="password" id="password" placeholder='Enter' className={`w-full h-[2.5rem] p-4 outline-none border ${passwordError ? 'border-red-500' : 'border-gray-300'} rounded-md `} />
                            </div>

                            <div className='w-[70%] '>
                                <button className='w-full text-center bg-black text-white h-[2.5rem] rounded-md' onClick={handleSignup}>{loading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}</button>
                            </div>

                            <div>
                                <span>Have an Account? <Link href="./login">LOGIN</Link></span>
                            </div>
                        </div>
                    </div>)
            }
        </>
    )
}

export default Signup