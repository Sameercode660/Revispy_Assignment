import React, { useState, useRef, useEffect } from 'react';

interface OtpProps {
    length?: number;
    onSubmit: (id: string | null, otp: number) => Promise<void>;
    email?: string;
    loadingState?: boolean;
}

const Otp: React.FC<OtpProps> = ({
    length = 8,
    onSubmit,
    email = "mohdsameer789736@gmail.com",
    loadingState
}) => {
    const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0]?.focus();
        }
    }, []);

    const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (isNaN(Number(value))) return;

        const newOtp = [...otp];
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);

        const combinedOtp = newOtp.join("");
        if (combinedOtp.length === length) {
            onSubmit(localStorage.getItem("id"), Number(combinedOtp));
        }

        if (value && index < length - 1 && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleClick = (index: number) => {
        inputRefs.current[index]?.setSelectionRange(1, 1);
        if (index > 0 && !otp[index - 1]) {
            inputRefs.current[otp.indexOf("")]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const maskEmail = (email: string) => {
        if (!email) {
            return '';
        }
        const [localPart, domain] = email.split('@');
        if (localPart.length <= 3) {
            return email;
        }
        return `${localPart.slice(0, 3)}****@${domain}`;
    };

    return (
        <div className='w-full flex justify-center items-center pt-10'>
            <div className='flex flex-col gap-4 border rounded-xl border-gray-300 w-[500px] h-[400px] justify-center items-center'>
                <div>
                    <span className='text-[1.6rem] font-semibold'>Verify your email</span>
                </div>
                <div className='text-center'>
                    <p>Enter the 8 digit code you have received on</p>
                    <p>{maskEmail(email)}</p>
                </div>
                <div className='w-[80%]'>
                    {otp.map((value, index) => (
                        <input
                            key={index}
                            type="text"
                            ref={(input) => {
                                inputRefs.current[index] = input;
                            }}
                            value={value}
                            onChange={(e) => handleChange(index, e)}
                            onClick={() => handleClick(index)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            className="w-[40px] h-[40px] border rounded border-gray-500 text-[1.6em] text-center m-1"
                        />
                    ))}
                </div>
                <div className='w-[80%]'>
                    <button className='w-full bg-black text-white h-[2.5rem] rounded-md'>
                        {loadingState ? 'VERIFYING...' : 'VERIFY'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Otp;