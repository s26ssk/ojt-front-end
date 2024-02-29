"use client";
import WebHeader from "@/components/headerIn";
import Link from "next/link";
import React, { ChangeEvent, useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaFileExcel, FaSort } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { deleteOrder, getAllOrders, importExcel, searchOrders, updateOrder } from "@/utils/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TbEdit } from "react-icons/tb";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { editOrderSchema, orderSchema } from "@/utils/validator";
import { BiBorderRadius } from "react-icons/bi";

const CreatedOrder = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(editOrderSchema),
    });

    const [isModalOpen, setModalOpen] = useState(false);
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [sortBy, setSortBy] = useState("orderCode");
    const [order, setOrder] = useState("asc");
    const [keyword, setKeyword] = useState("");
    const [isOrder, setIsOrder] = useState<IOrder | null>();
    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    function formatDate(dateString: Date): string {
        const date = new Date(dateString);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        const hours = String(date.getHours() % 12 || 12).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");

        const meridiem = date.getHours() >= 12 ? "PM" : "AM";

        const formattedDate = `${year}/${day}/${month} ${hours}:${minutes} ${meridiem}`;

        return formattedDate;
    }

    const ordersList = async () => {
        try {
            const response = (await getAllOrders(currentPage, sortBy, order)).data;
            const orders = response.orders;
            const totalPages = response.totalPages;
            const totalElements = response.totalElements;

            setOrders(orders);
            setTotalPages(totalPages);
            setTotalElements(totalElements);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    const handleDelete = async (orderCode: string) => {
        try {
            const response = await deleteOrder(orderCode);

            if (response.status === 200) {
                if (orders.length === 1) {
                    setCurrentPage(currentPage - 1);
                }
                toast.success("Xóa đơn hàng thành công!");
            } else {
                toast.error(response);
            }
            const updatedOrders = (await getAllOrders(currentPage, sortBy, order)).data.orders;
            setOrders(updatedOrders);
        } catch (error) {
            console.error("Error deleting order:", error);
        }
    };

    useEffect(() => {
        ordersList();
    }, [currentPage, sortBy, order, totalElements]);

    useEffect(() => {
        if (isOrder) {
            reset({
                providerAddress: isOrder.providerAddress,
                providerEmail: isOrder.providerEmail,
                providerName: isOrder.providerName,
                providerPhone: isOrder.providerPhone,
                receiverAddress: isOrder.receiverAddress,
                receiverEmail: isOrder.receiverEmail,
                receiverName: isOrder.receiverName,
                receiverPhone: isOrder.receiverPhone,
            });
        }
    }, [isOrder]);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 0 && newPage < totalPages) {
            setCurrentPage(newPage);
        }
    };

    const handleSortChange = (sortByField: string) => {
        if (sortBy === sortByField) {
            setOrder(order === "asc" ? "desc" : "asc");
        } else {
            setSortBy(sortByField);
            setOrder("asc");
        }
        setCurrentPage(0);
    };

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        try {
            const response = await importExcel(file);
            console.log(response);

            if (response.status === 200) {
                toast.success("Đăng đơn thành công!");
                const updatedOrders = (await getAllOrders(currentPage, sortBy, order)).data;
                setOrders(updatedOrders.orders);
                setTotalPages(updatedOrders.totalPages);
                setTotalElements(updatedOrders.totalElements);
                setCurrentPage(updatedOrders.totalPages - 1);
            } else {
                Object.entries(response).map(([key, value]) => toast.error(`Ô ${key} ${value}`));
            }
            event.target.value = "";
        } catch (error) {
            console.error("Error import file", error);
        }
    };
    const [orderCodeCurrent, setOrderCodeCurrent] = useState("");

    const handleOpenModal = (order: IOrder) => {
        setModalOpen(true);
        setIsOrder(order);
        setOrderCodeCurrent(order.orderCode);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setIsOrder(null);
    };

    const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        switch (name) {
            case "keyword":
                setKeyword(value);
                break;
            default:
                break;
        }
    };

    const handleSearch = async () => {
        try {
            const data = await searchOrders(keyword);
            setOrders(data.orders);
            setTotalPages(data.totalPages);
            setTotalElements(data.totalElements);
        } catch (error) {
            console.error("Error searching orders:", error);
        }
    };

    const handleChangeOrder = async (data: any) => {
        try {
            const response = await updateOrder(orderCodeCurrent, data);
            console.log(response);

            if (response.status === 200) {
                toast.success("Cập nhập đơn hàng thành công!");
            } else if (response.status === 500) {
                toast.error(
                    "Chỉ trạng thái đơn hàng đang chờ xác thực mới có thể cập nhập, cập nhập đơn hàng thất bại!"
                );
            }
            closeModal();
            ordersList();
        } catch (error) {
            console.error("Error update order:", error);
        }
    };
    return (
        <div>
            <WebHeader />
            <div className="font-sans overflow-y-auto flex z-48">
                {isModalOpen && (
                    <div
                        className="fixed top-0 right-0 bottom-0 left-0 z-[9999] h-full bg-black bg-opacity-30"
                        onClick={handleCloseModal}
                    >
                        <div className="fixed top-0 right-0 bottom-0 left-0 overflow-auto outline-none overscroll-touch z-[9999]">
                            <div className="w-[1000px] transform origin-726px-73px box-border px-0 pt-[70px] pb-[24px] text-black font-normal text-[16px] leading-1.5715 list-none font-tnum relative top-[100px] mx-auto max-w-[calc(100vw-32px)]">
                                <div
                                    onClick={(e) => e.stopPropagation()}
                                    className="relative bg-white bg-clip-padding border-0 rounded-md shadow-box"
                                >
                                    <form
                                        onSubmit={handleSubmit(handleChangeOrder)}
                                        className="p-0"
                                    >
                                        <div className="flex items-center justify-center bg-[rgb(6,146,85)] rounded-t-md">
                                            <div className="pt-[0.75rem] pb-[0.75rem] text-[1.125rem] leading-[1.75rem] font-semibold text-white">
                                                Cập nhập thông tin đơn hàng
                                            </div>
                                            <button
                                                onClick={closeModal}
                                                className="absolute w-[20px] h- top-[1rem] right-[1rem] cursor-pointer"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="w-[20px] h-[20px] cursor-pointer"
                                                >
                                                    <path
                                                        fill="#fff"
                                                        stroke="#fff"
                                                        strokeWidth=".3"
                                                        d="m17.976.833.044-.044V.788a.847.847 0 0 1 1.345.963l.138.06-.138-.06a.847.847 0 0 1-.192.274l-.002.003-7.868 7.87-.106.105.106.106 7.865 7.865a.845.845 0 0 1-1.195 1.195l-7.865-7.865-.106-.106-.106.106-7.87 7.866-.002.002A.846.846 0 1 1 .83 17.975l.003-.002 7.865-7.866.106-.106-.106-.106L.837 2.03A.846.846 0 0 1 2.03.835L9.896 8.7l.106.106.106-.106L17.976.833Z"
                                                    ></path>
                                                </svg>
                                            </button>
                                        </div>
                                        <div className="p-4">
                                            <div className="flex text-center mb-5">
                                                <div className="w-1/2 p-[10px] font-bold text-[20px] text-[rgb(6,146,85)]">
                                                    Thông tin NCC
                                                </div>
                                                <div className="w-1/2 p-[10px] font-bold text-[20px] text-[rgb(6,146,85)]">
                                                    Thông tin BNH
                                                </div>
                                            </div>
                                            <div className="flex">
                                                <div className="w-1/2 pr-5 border-r border-gray-300">
                                                    <div className="overflow-auto max-w-full max-h-[650px] mb-6">
                                                        <div className=" justify-between items-center flex">
                                                            <div className="font-medium leading-[1.25rem] text-[1rem]">
                                                                Tên nhà cung cấp
                                                                {errors.providerName && (
                                                                    <span className="italic text-xs ml-2 text-red-500">
                                                                        {
                                                                            errors.providerName
                                                                                ?.message
                                                                        }
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div
                                                            className={`${
                                                                errors.providerName
                                                                    ? "border-red-500"
                                                                    : "border-gray-300"
                                                            } flex items-center border-b justify-between`}
                                                        >
                                                            <div className="flex w-full item-center">
                                                                <input
                                                                    className="pt-3 outline-2 outline-solid outline-transparent outline-offset-2  py-[0.25rem] w-full"
                                                                    type="text"
                                                                    placeholder="Nhập tên NCC"
                                                                    {...register("providerName")}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="overflow-auto max-w-full max-h-[650px] mb-6">
                                                        <div className=" justify-between items-center flex">
                                                            <div className="font-medium leading-[1.25rem] text-[1rem]">
                                                                Số điện thoại NCC
                                                                {errors.providerPhone && (
                                                                    <span className="italic text-xs ml-2 text-red-500">
                                                                        {
                                                                            errors.providerPhone
                                                                                ?.message
                                                                        }
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div
                                                            className={`${
                                                                errors.providerPhone
                                                                    ? "border-red-500"
                                                                    : "border-gray-300"
                                                            } flex items-center border-b justify-between`}
                                                        >
                                                            <div className="flex w-full item-center">
                                                                <input
                                                                    className="pt-3 outline-2 outline-solid outline-transparent outline-offset-2  py-[0.25rem] w-full"
                                                                    type="text"
                                                                    placeholder="Nhập số điện thoại NCC"
                                                                    {...register("providerPhone")}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="overflow-auto max-w-full max-h-[650px] mb-6">
                                                        <div className=" justify-between items-center flex">
                                                            <div className="font-medium leading-[1.25rem] text-[1rem]">
                                                                Email NCC
                                                                {errors.providerEmail && (
                                                                    <span className="italic text-xs ml-2 text-red-500">
                                                                        {
                                                                            errors.providerEmail
                                                                                ?.message
                                                                        }
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div
                                                            className={`${
                                                                errors.providerEmail
                                                                    ? "border-red-500"
                                                                    : "border-gray-300"
                                                            } flex items-center border-b justify-between`}
                                                        >
                                                            <div className="flex w-full item-center">
                                                                <input
                                                                    className="pt-3 outline-2 outline-solid outline-transparent outline-offset-2  py-[0.25rem] w-full"
                                                                    type="text"
                                                                    placeholder="Nhập email NCC"
                                                                    {...register("providerEmail")}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="overflow-auto max-w-full max-h-[650px] mb-6">
                                                        <div className=" justify-between items-center flex">
                                                            <div className="font-medium leading-[1.25rem] text-[1rem]">
                                                                Địa chỉ NCC
                                                                {errors.providerAddress && (
                                                                    <span className="italic text-xs ml-2 text-red-500">
                                                                        {
                                                                            errors.providerAddress
                                                                                ?.message
                                                                        }
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div
                                                            className={`${
                                                                errors.providerAddress
                                                                    ? "border-red-500"
                                                                    : "border-gray-300"
                                                            } flex items-center border-b justify-between`}
                                                        >
                                                            <div className="flex w-full item-center">
                                                                <textarea
                                                                    className="pt-3 outline-2 outline-solid outline-transparent outline-offset-2  py-[0.25rem] w-full"
                                                                    placeholder="Nhập địa chỉ NCC"
                                                                    {...register("providerAddress")}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="w-1/2 pl-5">
                                                    <div className="overflow-auto max-w-full max-h-[650px] mb-6">
                                                        <div className=" justify-between items-center flex">
                                                            <div className="font-medium leading-[1.25rem] text-[1rem]">
                                                                Tên bên nhận hàng
                                                                {errors.receiverName && (
                                                                    <span className="italic text-xs ml-2 text-red-500">
                                                                        {
                                                                            errors.receiverName
                                                                                ?.message
                                                                        }
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div
                                                            className={`${
                                                                errors.receiverName
                                                                    ? "border-red-500"
                                                                    : "border-gray-300"
                                                            } flex items-center border-b justify-between`}
                                                        >
                                                            <div className="flex w-full item-center">
                                                                <input
                                                                    className="pt-3 outline-2 outline-solid outline-transparent outline-offset-2  py-[0.25rem] w-full"
                                                                    type="text"
                                                                    placeholder="Nhập tên BNH"
                                                                    {...register("receiverName")}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="overflow-auto max-w-full max-h-[650px] mb-6">
                                                        <div className=" justify-between items-center flex">
                                                            <div className="font-medium leading-[1.25rem] text-[1rem]">
                                                                Số điện thoại BNH{" "}
                                                                {errors.receiverPhone && (
                                                                    <span className="italic text-xs ml-2 text-red-500">
                                                                        {
                                                                            errors.receiverPhone
                                                                                ?.message
                                                                        }
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div
                                                            className={`${
                                                                errors.receiverPhone
                                                                    ? "border-red-500"
                                                                    : "border-gray-300"
                                                            } flex items-center border-b justify-between`}
                                                        >
                                                            <div className="flex w-full item-center">
                                                                <input
                                                                    className="pt-3 outline-2 outline-solid outline-transparent outline-offset-2  py-[0.25rem] w-full"
                                                                    type="text"
                                                                    placeholder="Nhập số điện thoại BNH"
                                                                    {...register("receiverPhone")}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="overflow-auto max-w-full max-h-[650px] mb-6">
                                                        <div className=" justify-between items-center flex">
                                                            <div className="font-medium leading-[1.25rem] text-[1rem]">
                                                                Email BNH
                                                                {errors.receiverEmail && (
                                                                    <span className="italic text-xs ml-2 text-red-500">
                                                                        {
                                                                            errors.receiverEmail
                                                                                ?.message
                                                                        }
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div
                                                            className={`${
                                                                errors.receiverEmail
                                                                    ? "border-red-500"
                                                                    : "border-gray-300"
                                                            } flex items-center border-b justify-between`}
                                                        >
                                                            <div className="flex w-full item-center">
                                                                <input
                                                                    className="pt-3 outline-2 outline-solid outline-transparent outline-offset-2  py-[0.25rem] w-full"
                                                                    type="text"
                                                                    placeholder="Nhập email BNH"
                                                                    {...register("receiverEmail")}
                                                                />{" "}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="overflow-auto max-w-full max-h-[650px] mb-6">
                                                        <div className=" justify-between items-center flex">
                                                            <div className="font-medium leading-[1.25rem] text-[1rem]">
                                                                Địa chỉ BNH
                                                                {errors.receiverAddress && (
                                                                    <span className="italic text-xs ml-2 text-red-500">
                                                                        {
                                                                            errors.receiverAddress
                                                                                ?.message
                                                                        }
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div
                                                            className={`${
                                                                errors.receiverAddress
                                                                    ? "border-red-500"
                                                                    : "border-gray-300"
                                                            } flex items-center border-b justify-between`}
                                                        >
                                                            <div className="flex w-full item-center">
                                                                <textarea
                                                                    className="pt-3 outline-2 outline-solid outline-transparent outline-offset-2  py-[0.25rem] w-full"
                                                                    placeholder="Nhập địa chỉ BNH"
                                                                    {...register("receiverAddress")}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-[0.5rem] text-center">
                                            <button
                                                type="submit"
                                                className="mb-1 min-w-[200px] font-semibold pt-[0.5rem] pb-[0.5rem] border-0 text-white rounded-md border-none outline-none bg-[rgb(6,146,85)]"
                                            >
                                                Cập nhập
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <div className="w-full p-[15px]">
                    <div className="h-[30px] flex items-center leading-[30px] mb-[10px]">
                        <span className="font-medium text-[1.625rem] border-r-2 border-gray-300 pr-[30px] text-black">
                            Tạo đơn hàng
                        </span>
                        <Link
                            href="/web/tao-don-hang"
                            className=" font-medium text-[1.125rem] border-r-2 border-gray-300 px-[10px]  text-gray-400 cursor-pointer"
                        >
                            <span className=" pb-[3px] px-[6px]">Đăng đơn lẻ</span>
                        </Link>
                        <Link
                            href="/web/don-da-tao"
                            className="font-medium text-[1.125rem] border-r-2 border-gray-300 px-[10px] text-gray-400 cursor-pointer"
                        >
                            <span className="text-[rgb(6,146,85)] border-b-2 border-[rgb(6,146,85)] px-[6px]">
                                Đã tạo
                            </span>
                        </Link>
                        <span className=" font-medium text-[1.125rem]  border-gray-300 px-[10px] text-white cursor-pointer">
                            <label
                                htmlFor="import"
                                className="bg-[rgb(6,146,85)] cursor-pointer rounded-md flex items-center py-[3px] px-[10px] hover:opacity-90"
                            >
                                <span className="mr-1">Đăng đơn Excel</span> <FaFileExcel />
                                <input id="import" type="file" onChange={handleFileChange} hidden />
                            </label>
                        </span>
                    </div>
                    <div>
                        <div>
                            <div className="inline-block w-full text-base ">
                                <div className="items-center mb-4">
                                    <div className="flex justify-end mt-5">
                                        <div className="flex items-center w-[450px] rounded-md border">
                                            <IoMdSearch
                                                onClick={handleSearch}
                                                className="text-[rgb(6,146,85)] text-3xl mx-3 "
                                            />
                                            <input
                                                placeholder="Tìm tên, SĐT, mã ĐH"
                                                className="w-full focus:outline-none text-ellipsis"
                                                type="text"
                                                name="keyword"
                                                value={keyword}
                                                onChange={handleChangeInput}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="">
                            <div className=" transition-opacity duration-300 z-1 ">
                                <div className=" border h-[calc(100vh-266px)] border-gray-300 overflow-y-auto ">
                                    <table className="border-none relative overflow-x-auto w-[140vw]">
                                        <thead className="top-0 z-50 transform translate-z-0 w-full min-w-full bg-[#EFEFEF] sticky left-0">
                                            <tr className="flex w-fit-content min-w-full h-fit-content min-h-full">
                                                <th className="py-5 px-2 w-[6%] border-r border-b border-solid border-gray-300 text-gray-700 text-center text-base font-semibold flex items-center justify-center">
                                                    <div className="mr-1">Mã đơn hàng</div>
                                                    <button
                                                        className="p-1 bg-[rgb(6,146,85)] font-semibold text-white rounded-[5px] m-1 cursor-pointer transition duration-150 ease-linear hover:opacity-90"
                                                        onClick={() =>
                                                            handleSortChange("orderCode")
                                                        }
                                                    >
                                                        <FaSort />
                                                    </button>
                                                </th>
                                                <th className="py-5 px-2 w-[9%] border-r border-b border-solid border-gray-300 text-gray-700 text-center text-base font-semibold flex items-center justify-center">
                                                    <div>Tên nhà cung cấp</div>
                                                </th>
                                                <th className="py-5 px-2 w-[7%] border-r border-b border-solid border-gray-300 text-gray-700 text-center text-base font-semibold flex items-center justify-center">
                                                    <div>Số điện thoại NCC</div>
                                                </th>
                                                <th className="py-5 px-2 w-[9%] border-r border-b border-solid border-gray-300 text-gray-700 text-center text-base font-semibold flex items-center justify-center">
                                                    <div>Email NCC</div>
                                                </th>
                                                <th className="py-5 px-2 w-[15%] border-r border-b border-solid border-gray-300 text-gray-700 text-center text-base font-semibold flex items-center justify-center">
                                                    <div>Địa chỉ NCC</div>
                                                </th>
                                                <th className="py-5 px-2 w-[9%] border-r border-b border-solid border-gray-300 text-gray-700 text-center text-base font-semibold flex items-center justify-center">
                                                    <div>Tên bên nhận hàng</div>
                                                </th>
                                                <th className="py-5 px-2 w-[7%] border-r border-b border-solid border-gray-300 text-gray-700 text-center text-base font-semibold flex items-center justify-center">
                                                    <div>Số điện thoại BNH</div>
                                                </th>
                                                <th className="py-5 px-2 w-[9%] border-r border-b border-solid border-gray-300 text-gray-700 text-center text-base font-semibold flex items-center justify-center">
                                                    <div>Email BNH</div>
                                                </th>
                                                <th className="py-5 px-2 w-[15%]  border-r border-b border-solid border-gray-300 text-gray-700 text-center text-base font-semibold flex items-center justify-center">
                                                    <div>Địa chỉ BNH</div>
                                                </th>
                                                <th className="py-5 px-2 w-[8%] border-r border-b border-solid border-gray-300 text-gray-700 text-center text-base font-semibold flex items-center justify-center">
                                                    <div>Ngày tạo đơn</div>
                                                </th>
                                                <th className="py-5 px-2 w-[6%] border-b border-solid border-gray-300 text-gray-700 text-center text-base font-semibold flex items-center justify-center">
                                                    <div>Thao tác</div>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="top-0 z-50 transform translate-z-0 w-full min-w-full bg-white ">
                                            {orders?.map((order, index) => (
                                                <tr
                                                    key={index}
                                                    className="flex w-fit-content min-w-full h-fit-content min-h-full"
                                                >
                                                    <th className="py-2 px-2 w-[6%] border-r border-b border-solid border-gray-300 text-gray-700 text-center text-base font-semibold flex items-center justify-center">
                                                        <div className="">{order.orderCode}</div>
                                                    </th>
                                                    <th className="py-2 px-2 w-[9%] border-r border-b border-solid border-gray-300 text-gray-700 text-center text-base font-semibold flex items-center justify-center">
                                                        <div className="">{order.providerName}</div>
                                                    </th>
                                                    <th className="py-2 px-2 w-[7%] border-r border-b border-solid border-gray-300 text-gray-700 text-center text-base font-semibold flex items-center justify-center">
                                                        <div className="">
                                                            {order.providerPhone}
                                                        </div>
                                                    </th>
                                                    <th className="py-2 px-2 w-[9%] border-r border-b border-solid border-gray-300 text-gray-700 text-center text-base font-semibold flex items-center justify-center">
                                                        <div className="">
                                                            {order.providerEmail}
                                                        </div>
                                                    </th>
                                                    <th className="py-2 px-2 w-[15%] border-r border-b border-solid border-gray-300 text-gray-700 text-center text-base font-semibold flex items-center justify-center">
                                                        <div className="">
                                                            {order.providerAddress}
                                                        </div>
                                                    </th>
                                                    <th className="py-2 px-2 w-[9%] border-r border-b border-solid border-gray-300 text-gray-700 text-center text-base font-semibold flex items-center justify-center">
                                                        <div className="">{order.receiverName}</div>
                                                    </th>
                                                    <th className="py-2 px-2 w-[7%] border-r border-b border-solid border-gray-300 text-gray-700 text-center text-base font-semibold flex items-center justify-center">
                                                        <div className="">
                                                            {order.receiverPhone}
                                                        </div>
                                                    </th>
                                                    <th className="py-2 px-2 w-[9%] border-r border-b border-solid border-gray-300 text-gray-700 text-center text-base font-semibold flex items-center justify-center">
                                                        <div className="">
                                                            {order.receiverEmail}
                                                        </div>
                                                    </th>
                                                    <th className="py-2 px-2 w-[15%]  border-r border-b border-solid border-gray-300 text-gray-700 text-center text-base font-semibold flex items-center justify-center">
                                                        <div className="">
                                                            {order.receiverAddress}
                                                        </div>
                                                    </th>
                                                    <th className="py-2 px-2 w-[8%] border-r border-b border-solid border-gray-300 text-gray-700 text-center text-base font-semibold flex items-center justify-center">
                                                        <div className="">
                                                            {formatDate(order.createDate)}
                                                        </div>
                                                    </th>
                                                    <th className="py-2 px-2 w-[6%] border-b border-solid border-gray-300 text-gray-700 text-center text-base font-semibold flex items-center justify-center">
                                                        <div className="p-3">
                                                            <div className="p-3 grid grid-cols-2">
                                                                <button
                                                                    onClick={() =>
                                                                        handleOpenModal(order)
                                                                    }
                                                                    className="grid-cols-1 bg-yellow-500 mr-1 text-white cursor-pointer rounded-md flex items-center py-[7px] px-[12px]  transition duration-150 ease-linear hover:opacity-90 "
                                                                >
                                                                    <TbEdit />
                                                                </button>
                                                                <button
                                                                    onClick={() =>
                                                                        handleDelete(
                                                                            order.orderCode
                                                                        )
                                                                    }
                                                                    className="grid-cols-1 bg-red-500 ml-1 text-white cursor-pointer rounded-md flex items-center py-[7px] px-[12px]  transition duration-150 ease-linear hover:opacity-90 "
                                                                >
                                                                    <MdDeleteForever />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </th>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    {orders.length === 0 && (
                                        <div className="w-[99%] text-center absolute top-[450px]">
                                            <div className=" my-12">
                                                <BiBorderRadius className="text-8xl mx-auto text-gray-500" />
                                                <p className="text-gray-500 text-sm mt-1">
                                                    Danh sách trống
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                    <div>
                                        <div className="mt-2"></div>
                                    </div>
                                </div>
                            </div>
                            <div className={orders.length == 0 ? "hidden" : ""}>
                                <div className="flex ml-3 py-2 items-center">
                                    <div
                                        className="py-3 px-3 bg-[rgb(6,146,85)] font-semibold text-white rounded-[5px] m-1 cursor-pointer transition duration-150 ease-linear hover:opacity-90"
                                        onClick={() => handlePageChange(currentPage - 1)}
                                    >
                                        <FaChevronLeft />
                                    </div>
                                    {Array.from({ length: totalPages }).map((_, index) => (
                                        <div
                                            key={index}
                                            className={`py-2 px-4 bg-[rgb(6,146,85)] font-semibold text-white rounded-[5px] m-1 cursor-pointer transition duration-150 ease-linear hover:opacity-90 ${
                                                currentPage === index ? "bg-green-950" : ""
                                            }`}
                                            onClick={() => handlePageChange(index)}
                                        >
                                            {index + 1}
                                        </div>
                                    ))}
                                    <div
                                        className="py-3 px-3 bg-[rgb(6,146,85)] font-semibold text-white rounded-[5px] m-1 cursor-pointer transition duration-150 ease-linear hover:opacity-90"
                                        onClick={() => handlePageChange(currentPage + 1)}
                                    >
                                        <FaChevronRight />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatedOrder;
