import React from "react";
import { ShoppingCart, Search } from "lucide-react";

const Navbar = () => {
    return (
        <div className='w-full h-[10rem] flex flex-col gap-4'>

            {/* top upper side menu items  */}
            <div className='flex justify-end p-4 space-x-6'>
                <div>
                    <span>Help</span>
                </div>
                <div>
                    Orders & Returns
                </div>
                <div>
                    <span>Hi, John</span>
                </div>
            </div>

            {/* mid Menu item list  */}
            <div className='flex justify-around items-center'>
                <div>
                    <span className='text-[2rem] font-semibold'>ECOMMERCE</span>
                </div>

                <div className='flex font-semibold space-x-5 text-black'>
                    <div >
                        <span>Categories</span>
                    </div>

                    <div>
                        <span>Sale</span>
                    </div>

                    <div>
                        <span>Clearance</span>
                    </div>

                    <div>
                        <span>New Stock</span>
                    </div>

                    <div>
                        <span>Trending</span>
                    </div>


                </div>

                <div className='flex font-semibold space-x-5 text-gray-500'>
                    <Search className="w-5 h-5 text-gray-600 cursor-pointer hover:text-black" />
                    <ShoppingCart className="w-5 h-5 text-gray-600 cursor-pointer hover:text-black" />

                </div>
            </div>



            {/* Promotion label  */}

            <div className='flex justify-center bg-gray-100 p-[6px] font-bold'>
                <span><span className="mr-10">&lt;</span><span className="text-sm">Get 10% off on business sign up</span>  <span className="ml-10">&gt;</span></span>
            </div>
        </div>
    );
};

export default Navbar;
