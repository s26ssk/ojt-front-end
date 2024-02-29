"use client";
import Link from "next/link";
import React from "react";

const NotFound = () => {
    return (
        <div className="w-full p-15">
            <div className="pt-[4rem] pb-[3rem]">
                <main className="flex justify-center flex-col flex-grow items-center max-w-screen-xl w-full mx-auto">
                    <div className="flex justify-center flex-shrink-0">
                        <div className="inline-flex">
                            <img
                                className="w-auto h-[30rem]"
                                src="https://khachhang.giaohangtietkiem.vn/web/img/images/error.png"
                                alt=""
                            />
                        </div>
                    </div>
                    <div className="pt-[4rem] pb-[4rem]">
                        <div className="text-center">
                            <h1 className="tracking-tighter font-bold text-[3rem] leading-2.5rem mt-[0.5rem]">
                                {" "}
                                Không tìm thấy trang{" "}
                            </h1>
                            <p className="mt-[0.5rem] text-[1rem] leading-6 text-gray-500">
                                Rất tiếc, chúng tôi không thể tìm thấy trang bạn yêu cầu
                            </p>
                            <div className="mt-[1rem] text-[1rem] font-semibold text-green-600">
                                <Link href="/">
                                    Trang chủ <span> →</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default NotFound;
