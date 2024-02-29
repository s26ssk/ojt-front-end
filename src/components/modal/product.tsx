"use client";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { IoClose } from "react-icons/io5";
const FormProduct = () => {
    const [toggle, setToggle] = useState(false);
    const handleCloseModal = (e: any) => {
        if (toggle) {
            setToggle(false);
        }
    };
    return (
        <div className="fixed top-0 right-0 left-0 bottom-0 bg-black bg-opacity-20 z-[9999]">
            <div
                className="fixed top-1/2  left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-60 z-[9999] w-[600px] max-w-[calc(100vw-32px)] rounded-lg "
                onClick={(e) => {
                    handleCloseModal(e);
                }}
            >
                <div className="rounded-lg bg-white ">
                    <div className="text-center font-bold bg-[#069255] rounded-t-lg py-2 text-xl text-white relative">
                        <h3 className="mx-auto">Tạo sản phẩm</h3>
                        <p
                            className="absolute right-2 top-2 cursor-pointer"
                            onClick={() => setToggle(false)}
                        >
                            <IoClose className="text-3xl" />
                        </p>
                    </div>

                    <div
                        className="px-6"
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                    >
                        <div className="h-[36rem] overflow-y-scroll no-scrollbar">
                            <div className="border-b border-solid border-gray-300 py-4">
                                <div className="w-[70px]">
                                    <label className="border border-dashed border-green-700 text-[rgb(6,146,85)] py-2 w-[70px] h-[70px] text-center cursor-pointer flex flex-col items-center justify-between">
                                        <FaPlus className="text-xl" />
                                        <p>Ảnh</p>
                                        <input type="file" hidden />
                                    </label>
                                </div>
                            </div>
                            <div className="text-sm py-4">
                                <div className="flex items-center">
                                    <label htmlFor="product-name" className="w-1/4">
                                        Tên sản phẩm
                                    </label>
                                    <input
                                        type="text"
                                        id="product-name"
                                        className="border-b  p-[0.3rem] border-gray-300 w-full focus:outline-none"
                                        placeholder="Nhập tên sản phẩm"
                                    />
                                </div>
                                <div className="flex items-center mt-4">
                                    <label className="w-1/4">Danh mục</label>
                                    <div className="border border-solid border-gray-400 rounded-[0.3rem] w-full  p-1 relative">
                                        <div
                                            className="text-gray-400 flex justify-between items-center"
                                            onClick={() => setToggle(!toggle)}
                                        >
                                            Chọn danh mục sản phẩm
                                            <IoIosArrowDown className="text-lg text-gray-400" />
                                        </div>
                                        <div
                                            className={`absolute top-8 right-0 left-0 rounded-md h-48 bg-white overflow-y-scroll no-scrollbar shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] ${
                                                toggle ? "" : "hidden"
                                            }`}
                                        >
                                            <div className="border-b border-gray-300 border-solid px-2 py-1 hover:bg-[rgb(106,190,153)] hover:text-white hover:rounded-t-md cursor-pointer">
                                                Âm thanh ánh sáng
                                            </div>
                                            <div className="border-b border-gray-300 border-solid px-2 py-1 hover:bg-[rgb(106,190,153)] hover:text-white  cursor-pointer">
                                                Âm thanh ánh sáng
                                            </div>
                                            <div className="border-b border-gray-300 border-solid px-2 py-1 hover:bg-[rgb(106,190,153)] hover:text-white  cursor-pointer">
                                                Âm thanh ánh sáng
                                            </div>
                                            <div className="border-b border-gray-300 border-solid px-2 py-1 hover:bg-[rgb(106,190,153)] hover:text-white  cursor-pointer">
                                                Âm thanh ánh sáng
                                            </div>
                                            <div className="border-b border-gray-300 border-solid px-2 py-1 hover:bg-[rgb(106,190,153)] hover:text-white  cursor-pointer">
                                                Âm thanh ánh sáng
                                            </div>
                                            <div className="border-b border-gray-300 border-solid px-2 py-1 hover:bg-[rgb(106,190,153)] hover:text-white  cursor-pointer">
                                                Âm thanh ánh sáng
                                            </div>
                                            <div className="border-b border-gray-300 border-solid px-2 py-1 hover:bg-[rgb(106,190,153)] hover:text-white  cursor-pointer">
                                                Âm thanh ánh sáng
                                            </div>
                                            <div className="border-b border-gray-300 border-solid px-2 py-1 hover:bg-[rgb(106,190,153)] hover:text-white  cursor-pointer">
                                                Âm thanh ánh sáng
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center mt-4">
                                    <label htmlFor="mass" className="w-1/4">
                                        Khối lượng
                                    </label>
                                    <input
                                        type="text"
                                        id="mass"
                                        className="border-b border-solid p-[0.3rem] border-gray-200 w-full focus:outline-none"
                                        placeholder="Khối lượng sản phẩm"
                                    />
                                </div>
                                <div className="flex items-center mt-4">
                                    <label htmlFor="size" className="w-1/4">
                                        Kích thước
                                    </label>
                                    <input
                                        type="text"
                                        id="size"
                                        className="border-b border-solid p-[0.3rem] border-gray-200 w-full focus:outline-none"
                                        placeholder="Kích thước sản phẩm"
                                    />
                                </div>
                                <div className="flex items-center mt-4">
                                    <label htmlFor="import-price" className="w-1/4">
                                        Giá gốc
                                    </label>
                                    <input
                                        type="text"
                                        id="import-price"
                                        className="border-b border-solid p-[0.3rem] border-gray-200 w-full focus:outline-none"
                                        placeholder="Nhập giá gốc"
                                    />
                                </div>
                                <div className="flex items-center mt-4">
                                    <label htmlFor="export-price" className="w-1/4">
                                        Giá bán
                                    </label>
                                    <input
                                        type="text"
                                        id="export-price"
                                        className="border-b border-solid p-[0.3rem] border-gray-200 w-full focus:outline-none"
                                        placeholder="Nhập giá bán"
                                    />
                                </div>
                                <div className="flex items-center mt-4">
                                    <label htmlFor="id" className="w-1/4">
                                        Mã
                                    </label>
                                    <input
                                        type="text"
                                        id="id"
                                        className="border-b border-solid p-[0.3rem] border-gray-200 w-full focus:outline-none"
                                        placeholder="Nhập mã sản phẩm "
                                    />
                                </div>
                                <div className="flex items-center mt-4">
                                    <label htmlFor="des" className="w-1/4">
                                        Mô tả
                                    </label>
                                    <textarea
                                        id="des"
                                        className="border border-solid border-gray-400 rounded-[0.3rem] w-full  p-1 focus:outline-none h-20"
                                        placeholder="Nhập mô tả sản phẩm "
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center py-2 text-sm">
                            <p className="text-[rgb(6,146,85)] mr-3 w-1/5 font-semibold cursor-pointer">
                                Xem trước
                            </p>
                            <div className="bg-[#069255] text-center py-2 w-4/5 rounded-md text-white cursor-pointer">
                                Tạo 1 sản phẩm
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormProduct;
