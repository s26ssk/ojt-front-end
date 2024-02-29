/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { LuLogOut } from "react-icons/lu";
import "./../styles/dang-ky.css";
import { checkLogin, logout } from "@/utils/api";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
const WebHeader = () => {
    const [toggle, setToggle] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const [userLogin, setUserLogin] = useState<IUserLogin>();
    const [logoutModal, setLogoutModal] = useState(false);
    useEffect(() => {
        setUserLogin(checkLogin());
    }, []);
    const handleLogout = (e: any) => {
        e.stopPropagation();
        logout();
        router.push("/dang-ky");
    };
    const openLogoutModal = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        setLogoutModal(!logoutModal);
    };

    return (
        <nav
            className="bg-[rgb(6,146,85)] sticky top-0 left-0 right-0 z-50"
            onClick={() => setLogoutModal(false)}
        >
            <div className="mx-auto max-w-[119rem] px-2 sm:px-6 lg:px-8">
                <div className="relative h-16 items-center justify-between ">
                    {/* left */}
                    <div className="absolute inset-y-0 left-0 flex items-center xl:hidden">
                        <button
                            onClick={() => setToggle(!toggle)}
                            type="button"
                            className="relative inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                        >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Open main menu</span>

                            <svg
                                className="block h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                />
                            </svg>
                            <svg
                                className="hidden h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                    <div className="p-[12px] flex flex-1 items-center justify-center sm:items-stretch xl:justify-start ">
                        <Link href="/web" className="flex flex-shrink-0 items-center mr-[2rem]">
                            <img
                                className="h-10 w-auto"
                                src="https://khachhang.giaohangtietkiem.vn/web/logo.svg"
                                alt="Your Company"
                            />
                        </Link>
                        <Link
                            href="/web/tai-khoan"
                            className="xl:flex items-center px-4 text-gray-100 hidden  border-x border-gray-200 mx-4 cursor-pointer"
                        >
                            <img
                                src="https://cache.giaohangtietkiem.vn/d/b5d091f198b3d8ee888c0b9b8a54f261.png"
                                alt=""
                                className="w-9 h-9 rounded-full border-2 border-white mr-2"
                            />
                            <div className="leading-5">
                                <h3 className="font-bold ">{userLogin?.shopName}</h3>
                                <p className="w-48 overflow-hidden whitespace-nowrap overflow-ellipsis">
                                    {userLogin?.email}
                                </p>
                            </div>
                            <div className="relative">
                                <div
                                    className="rounded-md hover:bg-white hover:text-black p-2 hover:bg-opacity-55 ml-2 relative"
                                    onClick={(e) => openLogoutModal(e)}
                                >
                                    <LuLogOut />
                                </div>
                                <div
                                    className={`bg-white rounded-md z-50 p-2 absolute w-[210px] text-black top-10 before:bg-white before:h-[14px] before:w-[14px] before:rotate-45 before:absolute before:-top-1 before:left-3 left-1 border ${
                                        logoutModal ? "" : "hidden"
                                    }`}
                                >
                                    <h3>
                                        Bạn có chắc chắn muốn đăng xuất?{" "}
                                        <span
                                            className="text-[rgb(6,146,85)] font-bold ml-3"
                                            onClick={(e) => handleLogout(e)}
                                        >
                                            Đăng xuất
                                        </span>
                                    </h3>
                                </div>
                            </div>
                        </Link>
                        <div className={`hidden xl:ml-6 xl:block `}>
                            <div className="flex space-x-4">
                                <Link
                                    href="/web"
                                    className={`${
                                        pathname === "/web" ? "bg-white bg-opacity-20" : ""
                                    } text-white rounded-md px-3 py-2 text-sm font-medium hover:bg-white hover:bg-opacity-20 hover:text-white`}
                                    aria-current="page"
                                >
                                    Tổng quan
                                </Link>
                                <Link
                                    href="/web/don-hang"
                                    className={`${
                                        pathname === "/web/don-hang" ? "bg-white bg-opacity-20" : ""
                                    } text-white rounded-md px-3 py-2 text-sm font-medium hover:bg-white hover:bg-opacity-20 hover:text-white`}
                                >
                                    Đơn hàng
                                </Link>
                                <Link
                                    href="/web/san-pham"
                                    className={`${
                                        pathname === "/web/san-pham" ? "bg-white bg-opacity-20" : ""
                                    } text-white rounded-md px-3 py-2 text-sm font-medium hover:bg-white hover:bg-opacity-20 hover:text-white`}
                                >
                                    Kho & sản phẩm
                                </Link>
                            </div>
                        </div>
                    </div>
                    {/* right */}
                    <div className=" hidden md:block md:absolute inset-y-0 right-0 pt-[10px] items-center pr-2 sm:static sm:ml-6 sm:pr-0">
                        <div className="pb-[3px] bg-[#79271E] rounded-[20px]">
                            <Link
                                href="/web/tao-don-hang"
                                type="button"
                                className="flex items-center text-white font-bold text-[19px] h-11 bg-red-500 rounded-[20px] px-7 py-2.5 transition-transform duration-150 btn-bounce"
                            >
                                <img
                                    className="mr-2"
                                    src="https://khachhang.giaohangtietkiem.vn/web/img/plus.aebe5d76.svg"
                                    alt=""
                                />{" "}
                                Tạo đơn hàng
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`${!toggle ? "hidden" : ""} xl:hidden mx-3`} id="mobile-menu">
                <div className="space-y-1 px-2 pb-3 pt-2">
                    <Link
                        href="/web"
                        className={`${
                            pathname === "/web" ? "bg-white bg-opacity-20" : ""
                        } hover:bg-green-400 hover:bg-opacity-10 text-white block rounded-md px-3 py-2 text-base font-medium`}
                    >
                        Tổng quan
                    </Link>
                    <Link
                        href="/web/don-hang"
                        className={`${
                            pathname === "/web/don-hang" ? "bg-white bg-opacity-20" : ""
                        } hover:bg-green-400 hover:bg-opacity-10 text-white block rounded-md px-3 py-2 text-base font-medium`}
                    >
                        Đơn hàng
                    </Link>
                    <Link
                        href="/web/san-pham"
                        className={`${
                            pathname === "/web/san-pham" ? "bg-white bg-opacity-20" : ""
                        } hover:bg-green-400 hover:bg-opacity-10 text-white block rounded-md px-3 py-2 text-base font-medium`}
                    >
                        Kho & sản phẩm
                    </Link>

                    <Link
                        href="/web/tai-khoan"
                        className="flex items-center hover:bg-green-400 hover:bg-opacity-10 text-white  rounded-md px-3 py-2 text-base font-medium justify-between cursor-pointer my-5"
                    >
                        <div className="flex">
                            <img
                                src="https://cache.giaohangtietkiem.vn/d/b5d091f198b3d8ee888c0b9b8a54f261.png"
                                alt=""
                                className="w-9 h-9 rounded-full border-2 border-white mr-2"
                            />
                            <div className="leading-5">
                                <h3 className="font-bold ">{userLogin?.shopName}</h3>
                                <p className="w-48 overflow-hidden whitespace-nowrap overflow-ellipsis">
                                    {userLogin?.email}
                                </p>
                            </div>
                        </div>
                        <div
                            className="rounded-md hover:bg-white hover:text-black p-2 hover:bg-opacity-55 "
                            onClick={handleLogout}
                        >
                            <LuLogOut />
                        </div>
                    </Link>
                    <div className="pt-2 justify-end flex items-center pr-0">
                        <div className="pb-[3px] bg-[#79271E] rounded-[20px]">
                            <Link
                                href="/web/tao-don-hang"
                                type="button"
                                className="flex items-center md:hidden text-white font-bold text-[19px] h-11 bg-red-500 rounded-[20px] px-7 py-2.5 transition-transform duration-150 btn-bounce"
                            >
                                <img
                                    className="mr-2"
                                    src="https://khachhang.giaohangtietkiem.vn/web/img/plus.aebe5d76.svg"
                                    alt=""
                                />{" "}
                                Tạo ĐH
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default WebHeader;
