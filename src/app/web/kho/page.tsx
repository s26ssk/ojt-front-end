"use client";
import WebHeader from "@/components/headerIn";
import { checkLogin } from "@/utils/api";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Warehouse = () => {
    const [userLogin, setUserLogin] = useState<IUserLogin>();

    useEffect(() => {
        setUserLogin(checkLogin());
    }, []);
    return (
        <div className="h-screen">
            <WebHeader />
            <div className="flex overflow-y-auto text-[1rem]">
                <div className="w-full p-[15px]">
                    <div className="flex m-[-15px]">
                        <div className=" w-[420px] min-w-[250px] max-w-[420px] border-r border-gray-300 h-[calc(100vh-64px)] overflow-auto">
                            <div className="px-[1rem] flex relative mt-[3.5rem]">
                                <div className="bg-white absolute h-[115px] w-[115px] rounded-full bg-cover bg-center bottom-0 border-3 border-white shadow-md"></div>
                                <div className="ml-[calc(115px+0.5rem)] w-[calc(100%-115px-0.5rem)] min-h-[76px]">
                                    <div className="text-base h-5 leading-5 whitespace-nowrap overflow-hidden overflow-ellipsis font-medium">
                                        <span>{userLogin?.shopName}</span>
                                    </div>
                                    <div className="h-[20px] leading-5 mt-[0.5rem] flex">
                                        <span className="whitespace-nowrap overflow-ellipsis overflow-hidden">
                                            API Token Key: {userLogin?.token}
                                        </span>
                                        <span className="text-gray-500 cursor-pointer">
                                            <svg
                                                data-v-2e1cff64=""
                                                width="18"
                                                height="18"
                                                viewBox="0 0 18 18"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M18 2L18 14L14 14L14 18L-7.86805e-07 18L-1.74846e-07 4L4 4L4 -6.11959e-07L18 0L18 2ZM14 12L16 12L16 2L6 2L6 4L14 4L14 12ZM4 6L2 6L2 16L12 16L12 6L4 6Z"
                                                    fill="#069255"
                                                ></path>
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="px-[1rem] mt-[1.5rem]">
                                <div>
                                    <Link
                                        href="/web/tai-khoan"
                                        className="line-clamp-5 py-[1rem] border-b border-t border-gray-300 cursor-pointer flex justify-between items-center hover:text-[rgb(6,146,85)]"
                                    >
                                        <span>Thông tin tài khoản</span>
                                        <svg
                                            className="text-[rgb(6,146,85)]"
                                            width="7"
                                            height="12"
                                            viewBox="0 0 7 12"
                                            fill="currentColor"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M0.645894 0.146894C0.739525 0.0530257 0.866605 0.000188029 0.999187 5.00866e-07C1.13177 -0.000187027 1.259 0.0522911 1.35289 0.145894L6.83689 5.61089C6.88814 5.66199 6.9288 5.72269 6.95655 5.78953C6.98429 5.85637 6.99858 5.92803 6.99858 6.00039C6.99858 6.07276 6.98429 6.14442 6.95655 6.21126C6.9288 6.2781 6.88814 6.3388 6.83689 6.3899L1.35289 11.8549C1.25847 11.9458 1.13209 11.9961 1.00099 11.9948C0.869887 11.9934 0.74455 11.9407 0.651973 11.8478C0.559397 11.755 0.50699 11.6295 0.50604 11.4984C0.50509 11.3673 0.555673 11.2411 0.646894 11.1469L5.81189 5.99989L0.646894 0.853894C0.553026 0.760263 0.500188 0.633183 0.500001 0.500601C0.499813 0.368019 0.552291 0.24079 0.645894 0.146894Z"></path>
                                        </svg>
                                    </Link>
                                    <Link
                                        href="/web/kho"
                                        className="line-clamp-5 py-[1rem] border-b border-gray-300 cursor-pointer flex justify-between items-center hover:text-[rgb(6,146,85)]"
                                    >
                                        <span className="text-[rgb(6,146,85)]">
                                            Quản lý kho hàng/ trả hàng
                                        </span>
                                        <svg
                                            width="7"
                                            height="12"
                                            viewBox="0 0 7 12"
                                            fill="currentColor"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M0.645894 0.146894C0.739525 0.0530257 0.866605 0.000188029 0.999187 5.00866e-07C1.13177 -0.000187027 1.259 0.0522911 1.35289 0.145894L6.83689 5.61089C6.88814 5.66199 6.9288 5.72269 6.95655 5.78953C6.98429 5.85637 6.99858 5.92803 6.99858 6.00039C6.99858 6.07276 6.98429 6.14442 6.95655 6.21126C6.9288 6.2781 6.88814 6.3388 6.83689 6.3899L1.35289 11.8549C1.25847 11.9458 1.13209 11.9961 1.00099 11.9948C0.869887 11.9934 0.74455 11.9407 0.651973 11.8478C0.559397 11.755 0.50699 11.6295 0.50604 11.4984C0.50509 11.3673 0.555673 11.2411 0.646894 11.1469L5.81189 5.99989L0.646894 0.853894C0.553026 0.760263 0.500188 0.633183 0.500001 0.500601C0.499813 0.368019 0.552291 0.24079 0.645894 0.146894Z"></path>
                                        </svg>
                                    </Link>
                                    <Link
                                        href="https://admin.giaohangtietkiem.vn/files/templates/Bieuphi_Giaohangtietkiem.pdf"
                                        target="blank"
                                        className="line-clamp-5 py-[1rem] border-b border-gray-300 cursor-pointer flex justify-between items-center hover:text-[rgb(6,146,85)]"
                                    >
                                        <span>Điều khoản & quy định</span>
                                        <svg
                                            width="7"
                                            height="12"
                                            viewBox="0 0 7 12"
                                            fill="currentColor"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M0.645894 0.146894C0.739525 0.0530257 0.866605 0.000188029 0.999187 5.00866e-07C1.13177 -0.000187027 1.259 0.0522911 1.35289 0.145894L6.83689 5.61089C6.88814 5.66199 6.9288 5.72269 6.95655 5.78953C6.98429 5.85637 6.99858 5.92803 6.99858 6.00039C6.99858 6.07276 6.98429 6.14442 6.95655 6.21126C6.9288 6.2781 6.88814 6.3388 6.83689 6.3899L1.35289 11.8549C1.25847 11.9458 1.13209 11.9961 1.00099 11.9948C0.869887 11.9934 0.74455 11.9407 0.651973 11.8478C0.559397 11.755 0.50699 11.6295 0.50604 11.4984C0.50509 11.3673 0.555673 11.2411 0.646894 11.1469L5.81189 5.99989L0.646894 0.853894C0.553026 0.760263 0.500188 0.633183 0.500001 0.500601C0.499813 0.368019 0.552291 0.24079 0.645894 0.146894Z"></path>
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1">
                            <div className="h-[calc(100vh-64px)] overflow-y-auto">
                                <div className="overflow-y-auto p-[1rem] ">
                                    <div className="grid">
                                        <span className="text-[18px] font-semibold">
                                            {" "}
                                            Quản lý kho hàng{" "}
                                        </span>
                                        <span className="text-[16px] font-medium mt-1">
                                            {" "}
                                            Kho hàng 1 - Mã kho <span>17674659</span>
                                        </span>
                                    </div>
                                    <div className="flex mt-[1.5rem] border-b border-gray-300 pb-[10px]">
                                        <div className="flex-1">
                                            <div className="max-w-[472px] mr-[0.5rem]">
                                                <div className="flex justify-between w-full mb-[1.5rem] ">
                                                    <div className="flex w-full">
                                                        <label className="flex items-center w-[200px]">
                                                            {" "}
                                                            Tên người liên hệ{" "}
                                                        </label>
                                                        <div className="flex w-full items-start justify-center relative flex-col">
                                                            <input
                                                                className="h-[35px] w-full text-[15px] px-[12px] py-[12px] border border-solid border-gray-400 text-black focus:outline-none rounded-md"
                                                                type="text"
                                                                name=""
                                                                defaultValue={userLogin?.shopName}
                                                                placeholder="Nhập tên shop"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex justify-between w-full mb-[1.5rem] ">
                                                    <div className="flex w-full">
                                                        <label className="flex items-center w-[200px]">
                                                            {" "}
                                                            Số điện thoại{" "}
                                                        </label>
                                                        <div className="flex w-full items-start justify-center relative flex-col">
                                                            <input
                                                                className="h-[35px] w-full text-[15px] px-[12px] py-[12px] border border-solid border-gray-400 text-black focus:outline-none rounded-md"
                                                                type="text"
                                                                name=""
                                                                defaultValue={userLogin?.phone}
                                                                placeholder="Nhập SĐT"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <div className="max-w-[472px] mr-[0.5rem]">
                                                <div className="flex justify-between w-full mb-[1.5rem] ">
                                                    <div className="flex w-full">
                                                        <label className="flex items-center w-[200px]">
                                                            {" "}
                                                            Địa chỉ lấy hàng{" "}
                                                        </label>
                                                        <div className="flex w-full items-start justify-center relative flex-col">
                                                            <textarea
                                                                className="h-[95px] w-full text-[15px] px-[12px] py-[12px] border border-solid border-gray-400 text-black focus:outline-none rounded-md"
                                                                name=""
                                                                defaultValue={userLogin?.address}
                                                                placeholder="Nhập Địa chỉ"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="py-[20px]">
                                        <div className="font-medium text-[18px] leading-[22px]">
                                            Chính sách trả hàng
                                        </div>
                                        <div className="w-[58.333333%]">
                                            <div className="flex mt-3">
                                                <div className="">
                                                    <div className="pt-[5px] px-3">
                                                        <input
                                                            className="w-6 h-6 accent-[rgb(6,146,85)] bg-gray-100 border-gray-300 "
                                                            type="radio"
                                                            name="flexRadioDefault"
                                                            id="radioDefault01"
                                                            defaultChecked
                                                        />
                                                    </div>
                                                </div>
                                                <div className="">
                                                    <label
                                                        htmlFor="radioDefault01"
                                                        className="text-left leading-[20px] text-[16px] cursor-pointer"
                                                    >
                                                        Tự động lưu kho chờ check cho đến khi có
                                                        thao tác của shop hoặc tự động hoàn sau{" "}
                                                        <select
                                                            className="h-[30px] text-base w-[70px] px-[12px] py-[2px] border border-solid border-gray-200 text-black rounded-md text-left focus:outline-none focus:border-blue-400 focus:shadow-md  transition"
                                                            defaultValue={3}
                                                        >
                                                            <option value="">1</option>
                                                            <option value="">2</option>
                                                            <option value="3">3</option>
                                                            <option value="">4</option>
                                                            <option value="">5</option>
                                                            <option value="">6</option>
                                                            <option value="">7</option>
                                                            <option value="">8</option>
                                                            <option value="">9</option>
                                                            <option value="">10</option>
                                                        </select>{" "}
                                                        ngày lưu kho
                                                    </label>
                                                    <div className="mt-3 text-[14px] leading-[18px] text-gray-500">
                                                        <div className="pt-[0.125rem] pb-[4px] pl-[0.5rem]">
                                                            {" "}
                                                            Đơn hàng sau 3 ca giao không thành công,
                                                            Shop có 24h để xác nhận. Sau 24h xác
                                                            nhận, ĐH sẽ được lưu kho tự động và tính
                                                            phí lưu kho. Thời gian lưu kho tối đa 30
                                                            ngày. Shop có thể tùy chỉnh thời gian
                                                            lưu kho tối đa theo mong muốn của shop.{" "}
                                                        </div>
                                                        <div className="pt-[0.125rem] pb-[4px] pl-[0.5rem]">
                                                            Phí lưu kho:
                                                            <p>Ngày đầu tiên: 1000đ/đơn</p>
                                                            <p>Ngày thứ 2: 2000đ/ đơn</p>
                                                            <p>Từ ngày thứ 3: 3000đ/đơn.</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex mt-3">
                                                <div className="">
                                                    <div className="mt-[1px] px-3">
                                                        <input
                                                            className="w-6 h-6 accent-[rgb(6,146,85)] bg-gray-100 border-gray-300 "
                                                            type="radio"
                                                            name="flexRadioDefault"
                                                            id="radioDefault02"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="">
                                                    <label
                                                        htmlFor="radioDefault02"
                                                        className="text-left leading-[20px] text-[16px] cursor-pointer"
                                                    >
                                                        Không lưu kho/ hoàn ngay
                                                    </label>
                                                    <div className="mt-3 text-[14px] leading-[18px] text-gray-500">
                                                        <div className="pt-[0.125rem] pb-[4px] pl-[0.5rem]">
                                                            {" "}
                                                            Đơn hàng sau 3 ca giao không thành công,
                                                            Shop có 24h để xác nhận. Sau 24h xác
                                                            nhận, đơn hàng sẽ không lưu kho và được
                                                            trả về ngay cho shop.
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex mt-3">
                                                <div className="">
                                                    <div className="mt-[px] px-3">
                                                        <input
                                                            className="w-6 h-6 accent-[rgb(6,146,85)] bg-gray-100 border-gray-300"
                                                            type="radio"
                                                            name="flexRadioDefault"
                                                            id="radioDefault03"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="">
                                                    <label
                                                        htmlFor="radioDefault03"
                                                        className="text-left leading-[20px] text-[16px] cursor-pointer"
                                                    >
                                                        Không nhận hàng trả
                                                    </label>
                                                    <div className="mt-3 text-[14px] leading-[18px] text-gray-500">
                                                        <div className="pt-[0.125rem] pb-[4px] pl-[0.5rem]">
                                                            {" "}
                                                            Đơn hàng sau 3 ca giao không thành công,
                                                            Shop có 24h để xác nhận. Hết thời gian
                                                            này, GHTK sẽ không trả hàng về shop và
                                                            có toàn quyền xử lý với những đơn hàng
                                                            này.
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-end border-t border-gray-300 bg-white fixed bottom-0 right-0 h-[60px] w-full lg:w-[calc(100vw-420px)]">
                                <div className="w-full flex justify-end">
                                    <button className="mt-[10px] mr-3 cursor-pointer p-2 px-8 bg-[rgb(6,146,85)] text-white font-normal rounded-md transition duration-150 ease-linear hover:opacity-90">
                                        Lưu thay đổi
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Warehouse;
