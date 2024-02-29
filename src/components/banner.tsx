"use client";

import Link from "next/link";
import { FcNext } from "react-icons/fc";
const Banner = () => {
    return (
        <div className=" py-5 bg-[rgb(242,242,242)] ">
            <div className="lg:w-[1200px] lg:justify-between lg:flex  mx-auto">
                <Link href="/" className="mx-auto w-[80%] lg:w-[1024px]">
                    <img
                        className="w-full "
                        src="https://giaohangtietkiem.vn/wp-content/uploads/2023/12/Website-1.png"
                        alt=""
                    />
                </Link>
                <div className="mt-5 lg:mt-0 h-full md:w-full">
                    <ul className="border shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] w-[80%]  mx-auto">
                        <li className="border-b-2 font-semibold text-gray-600 border-gray-400 p-6 flex justify-between items-center cursor-pointer">
                            <a href="#">TRA CỨU ĐƠN HÀNG</a>
                            <FcNext className="text-gray-200" />
                        </li>
                        <Link
                            href="dang-ky"
                            className="border-b-2 font-semibold text-gray-600 border-gray-400 p-6 flex justify-between items-center cursor-pointer"
                        >
                            ĐĂNG KÝ SHOP | ĐĂNG NHẬP
                            <FcNext className="text-gray-200" />
                        </Link>
                        <li className="border-b-2 font-semibold text-gray-600 border-gray-400 p-6 flex justify-between items-center cursor-pointer">
                            <a href="#">ỨNG TUYỂN GIAO HÀNG</a>
                            <FcNext className="text-gray-200" />
                        </li>
                        <li className="border-b-2 font-semibold text-gray-600 border-gray-400 p-6 flex justify-between items-center cursor-pointer">
                            <a href="#">TẢI APP GIAOHANGTIETKIEM</a>
                            <FcNext className="text-gray-200" />
                        </li>
                        <li className="border-b-2 font-semibold text-gray-600 border-gray-400 p-6 flex justify-between items-center cursor-pointer">
                            <a href="#">BẢNG GIÁ</a>
                            <FcNext className="text-gray-200" />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Banner;
