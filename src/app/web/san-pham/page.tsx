"use client";
import React, { useState } from "react";
import { TbTableExport, TbTableImport } from "react-icons/tb";
import { FiPlus } from "react-icons/fi";
import { IoIosArrowDown, IoMdSearch } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import FormProduct from "@/components/modal/product";
import WebHeader from "@/components/headerIn";

const Product = () => {
    const initialState = {
        dc: false,
        cd: false,
        db: false,
        tk: false,
        sp: false,
    };

    const [state, setState] = useState(initialState);

    const handleSetStatus = (field: string, e: any) => {
        e.stopPropagation();
        setState((prevState) => ({
            ...initialState,
            [field]: true,
        }));
    };
    const handleCloseModal = () => {
        const checkTrue = Object.values(state).some((value) => value === true);
        if (checkTrue) {
            setState(initialState);
        }
    };

    return (
        <div onClick={() => handleCloseModal()} className="h-screen">
            <WebHeader />
            <div className="mx-7 xl:container xl:w-[1350px] xl:mx-auto mt-5">
                <div className="flex items-center justify-between my-2">
                    <h3 className="font-bold text-lg">Quản lý kho & sản phẩm</h3>
                    <div className="flex text-[rgb(6,146,85)] items-center font-semibold">
                        <div className="flex items-center cursor-pointer">
                            <TbTableExport className="text-xl mr-1" />
                            <p>Xuất</p>
                        </div>
                        <div className="flex items-center px-3 mx-2 border-x-2 border-gray-50-200 cursor-pointer">
                            <TbTableImport className="text-xl mr-1" />
                            <p>Nhập</p>
                        </div>
                        <div
                            className="flex items-center cursor-pointer"
                            onClick={(e) => handleSetStatus("sp", e)}
                        >
                            <FiPlus className="text-xl mr-1" />
                            <p>Tạo SP</p>
                        </div>
                    </div>
                </div>
                <div className="grid gap-3 grid-cols-2 md:grid-cols-5 xl:grid-cols-9 mt-5">
                    <div className="flex items-center justify-center bg-[rgb(6,146,85)] rounded-full border border-[rgb(6,146,85)] text-white px-3 py-1 text-nowrap cursor-pointer text-center">
                        Bán chạy
                    </div>
                    <div className="flex items-center justify-center rounded-full border border-[rgb(6,146,85)]  px-3 py-1  cursor-pointer text-center">
                        Hoàn cao
                    </div>
                    <div className=" flex items-center  rounded-md border col-span-2">
                        <IoMdSearch className="text-[rgb(6,146,85)] text-3xl  mx-3 " />
                        <input
                            placeholder="Nhập tên sản phẩm"
                            className="w-full focus:outline-none text-ellipsis"
                        />
                    </div>
                    {/* address */}
                    <div
                        className="relative flex px-5 rounded-md border items-center py-1"
                        onClick={(e) => handleSetStatus("dc", e)}
                    >
                        <button
                            id="hs-dropdown-default"
                            type="button"
                            className="w-full flex items-center justify-between text-gray-400 text-ellipsis"
                        >
                            Tất cả
                            <IoIosArrowDown className="text-gray-400" />
                        </button>
                        {/* Dropdown menu */}
                        <div
                            onClick={(e) => {
                                e.stopPropagation();
                            }}
                            className={`z-50 bg-white  w-[200px] absolute top-10 left-0 border rounded-md shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)] ${
                                state.dc ? "" : "hidden"
                            }`}
                        >
                            <div className="flex items-center p-1 border-b-2 border-gray-200 cursor-pointer">
                                <input
                                    className="w-[18px] h-[18px] border-[2px] border-[rgb(6,146,85)] accent-[rgb(6,146,85)] mx-1"
                                    type="checkbox"
                                    id="checkbox3"
                                />
                                <label htmlFor="checkbox3" className="mr-[3px] font-normal w-full">
                                    Chưa tiếp nhận
                                </label>
                            </div>
                        </div>
                    </div>
                    {/* cộng dồn */}
                    <div
                        className="relative flex px-5 rounded-md border items-center z-50 py-1"
                        onClick={(e) => handleSetStatus("cd", e)}
                    >
                        <button
                            id="hs-dropdown-default"
                            type="button"
                            className="w-full flex items-center justify-between text-gray-400 text-ellipsis"
                        >
                            Cộng dồn
                            <IoIosArrowDown className="text-gray-400" />
                        </button>
                        <div
                            className={`z-50 bg-white  w-[200px] absolute top-10 left-0 border rounded-md shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)] ${
                                state.cd ? "" : "hidden"
                            }`}
                        >
                            <div className="px-2 py-1 text-sm border-b-2 hover:rounded-t-md hover:text-white hover:bg-[rgb(106,190,153)] cursor-pointer">
                                <h4 className="text-base">Hôm nay</h4>
                                <p className="mt-1">22-01</p>
                            </div>
                            <div className="px-2 py-1 text-sm border-b-2  hover:text-white hover:bg-[rgb(106,190,153)] cursor-pointer">
                                <h4 className="text-base">Hôm nay</h4>
                                <p className="mt-1">22-01</p>
                            </div>

                            <div className="pt-1 px-2 text-sm hover:text-white hover:bg-[rgb(106,190,153)] rounded-b-md">
                                <h4>Tất cả</h4>
                            </div>
                        </div>
                    </div>
                    {/* sold */}
                    <div
                        className="relative flex px-5 rounded-md border items-center py-1"
                        onClick={(e) => handleSetStatus("db", e)}
                    >
                        <button
                            id="hs-dropdown-default"
                            type="button"
                            className="w-full flex items-center justify-between text-gray-400 text-ellipsis"
                        >
                            Đã bán
                            <IoIosArrowDown className="text-gray-400" />
                        </button>
                        {/* Dropdown menu */}
                        <div
                            onClick={(e) => {
                                e.stopPropagation();
                            }}
                            className={`z-50 bg-white w-[200px] absolute top-10 left-0 border rounded-md shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)] p-2 ${
                                state.db ? "" : "hidden"
                            }`}
                        >
                            <div className="mb-2">
                                <h3 className="font-semibold">Gợi ý</h3>
                                <div className="flex items-center p-1  cursor-pointer mt-1">
                                    <input
                                        className="w-[18px] h-[18px] border-[2px] border-[rgb(6,146,85)] accent-[rgb(6,146,85)] mx-1"
                                        type="checkbox"
                                        id="checkbox4"
                                    />
                                    <label
                                        htmlFor="checkbox4"
                                        className="mr-[3px] font-normal w-full"
                                    >
                                        Chưa tiếp nhận
                                    </label>
                                </div>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">Tùy chỉnh</h3>
                                <div className="flex items-center">
                                    <p className="pr-3">Từ</p>
                                    <input
                                        type="text"
                                        className="border-b border-gray-200 border-solid text-end focus:outline-none w-full"
                                    />
                                </div>
                                <div className="flex items-center mt-1">
                                    <p className="pr-1">Đến</p>
                                    <input
                                        type="text"
                                        className="border-b border-gray-200 border-solid text-end focus:outline-none w-full"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* tồn kho */}
                    <div
                        className="relative flex px-5 rounded-md border items-center py-1"
                        onClick={(e) => handleSetStatus("tk", e)}
                    >
                        <button
                            id="hs-dropdown-default"
                            type="button"
                            className="w-full flex items-center justify-between text-gray-400 text-ellipsis"
                        >
                            Tồn kho
                            <IoIosArrowDown className="text-gray-400" />
                        </button>
                        {/* Dropdown menu */}
                        <div
                            className={`z-50 bg-white w-[200px] absolute top-10 left-0 border rounded-md shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)] p-2 ${
                                state.tk ? "" : "hidden"
                            }`}
                            onClick={(e) => {
                                e.stopPropagation();
                            }}
                        >
                            <div className="mb-2">
                                <h3 className="font-semibold">Gợi ý</h3>
                                <div className="flex items-center p-1  cursor-pointer mt-1">
                                    <input
                                        className="w-[18px] h-[18px] border-[2px] border-[rgb(6,146,85)] accent-[rgb(6,146,85)] mx-1"
                                        type="checkbox"
                                        id="checkbox4"
                                    />
                                    <label
                                        htmlFor="checkbox4"
                                        className="mr-[3px] font-normal w-full"
                                    >
                                        Chưa tiếp nhận
                                    </label>
                                </div>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">Tùy chỉnh</h3>
                                <div className="pl-2">
                                    <div className="flex items-center">
                                        <p className="pr-3">Từ</p>
                                        <input
                                            type="text"
                                            className="border-b border-gray-200 border-solid text-end focus:outline-none w-full"
                                        />
                                    </div>
                                    <div className="flex items-center mt-1">
                                        <p className="pr-1">Đến</p>
                                        <input
                                            type="text"
                                            className="border-b border-gray-200 border-solid text-end focus:outline-none w-full"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center bg-[rgb(6,146,85)] rounded-md border border-[rgb(6,146,85)] text-white px-3 py-1 text-nowrap text-center cursor-pointer">
                        Tìm kiếm
                    </div>
                </div>
                {/* table */}
                <div className="relative overflow-x-auto border border-solid border-gray-200 mt-10">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b border-gray-200">
                            <tr>
                                <th scope="col-2" className="px-6 py-3 border-x  border-gray-200">
                                    Tên sản phẩm
                                </th>
                                <th scope="col" className="px-6 py-3 border-x  border-gray-300">
                                    Giá bán
                                </th>
                                <th scope="col" className="px-6 py-3 border-x  border-gray-300">
                                    Tương tác
                                </th>
                                <th scope="col" className="px-6 py-3 border-x  border-gray-300">
                                    Đặt mua
                                </th>
                                <th scope="col" className="px-6 py-3 border-x  border-gray-300">
                                    Đã xuất
                                </th>
                                <th scope="col" className="px-6 py-3 border-x  border-gray-300">
                                    Đã bán
                                </th>
                                <th scope="col" className="px-6 py-3 border-x  border-gray-300">
                                    Hoàn hàng
                                </th>
                                <th scope="col" className="px-6 py-3 border-x  border-gray-300">
                                    Tồn
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* if exist */}
                            <tr className="bg-white border-b  ">
                                <td
                                    scope="row"
                                    className="p-2 font-medium text-gray-900 whitespace-nowrap dark:text-white border-x  border-gray-300"
                                >
                                    <div className="flex items-start">
                                        <div className="img w-[110px] mr-4">
                                            <img
                                                src="https://cache.giaohangtietkiem.vn/d/b5d091f198b3d8ee888c0b9b8a54f261.png"
                                                alt=""
                                                className="w-full"
                                            />
                                        </div>
                                        <div className="flex w-full items-center justify-between">
                                            <h4 className="text-lg">Áo</h4>
                                            <div className="justify-end flex items-center">
                                                <FaRegEdit
                                                    className="text-xl text-[rgb(6,146,85)] mr-2 cursor-pointer"
                                                    onClick={(e) => {
                                                        handleSetStatus("sp", e);
                                                    }}
                                                />
                                                <RiDeleteBinLine className="text-xl text-red-600  cursor-pointer" />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 border-x  border-gray-300">
                                    <span>12,2222</span>đ
                                </td>
                                <td className="px-6 py-4 border-x  border-gray-300">0</td>
                                <td className="px-6 py-4 border-x  border-gray-300">0</td>
                                <td className="px-6 py-4 border-x  border-gray-300">0</td>
                                <td className="px-6 py-4 border-x  border-gray-300">0</td>
                                <td className="px-6 py-4 border-x  border-gray-300">0</td>
                                <td className="px-6 py-4 border-x  border-gray-300">
                                    <span>0</span>đ
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    {/* <div className="w-full text-center">
            <div className=" my-12">
              <BiBorderRadius className="text-8xl mx-auto text-gray-500" />
              <p className="text-gray-500 text-sm mt-1">
                Chưa có sản phẩm tồn tại
              </p>
            </div>
          </div> */}
                </div>
            </div>
            {state.sp ? <FormProduct /> : ""}
        </div>
    );
};

export default Product;
