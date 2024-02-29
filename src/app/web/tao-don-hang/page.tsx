"use client";
import WebHeader from "@/components/headerIn";
import Link from "next/link";
import React, { ChangeEvent, useEffect, useState } from "react";
import { FaFileExcel } from "react-icons/fa";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { orderSchema } from "@/utils/validator";
import { addOrder, importExcel } from "@/utils/api";
import { toast } from "react-toastify";

const CreateOrder = () => {
    const [selectedType, setSelectedType] = useState("a1");
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(false);
    const [countdown, setCountdown] = useState<string[]>([]);
    const [countdown1, setCountdown1] = useState<string[]>([]);
    const [checkedItems, setCheckedItems] = useState<CheckedItems>({});

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedType(event.target.value);
    };

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setSelectedProduct(false);
        setModalOpen(false);
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = event.target;
        setCheckedItems((prevCheckedItems) => ({
            ...prevCheckedItems,
            [value]: checked,
        }));
    };

    const getCheckedValues = () => {
        return Object.keys(checkedItems).filter((key) => checkedItems[key]);
    };

    useEffect(() => {
        const targetDate = new Date();
        targetDate.setHours(18, 0, 0, 0);

        let currentDate = new Date();
        const newCountdown = [];
        const newCountdown1 = [];

        while (currentDate < targetDate) {
            const nextDate = new Date(currentDate.getTime() + 2 * 60 * 60 * 1000);
            const nextDate1 = new Date(currentDate.getTime() + 4 * 24 * 60 * 60 * 1000);

            const formattedDate = `${currentDate.toLocaleDateString()} (${currentDate.getHours()}h-${nextDate.getHours()}h)`;
            const formattedDate1 = `${nextDate1.toLocaleDateString()} (${currentDate.getHours()}h-${nextDate.getHours()}h)`;

            newCountdown.push(formattedDate);
            newCountdown1.push(formattedDate1);

            currentDate = nextDate;
        }
        setCountdown(newCountdown);
        setCountdown1(newCountdown1);
    }, []);

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        try {
            const response = await importExcel(file);
            if (response.status === 200) {
                toast.success("Đăng đơn thành công!");
            } else {
                Object.entries(response).map(([key, value]) => toast.error(`Ô ${key} ${value}`));
            }
            event.target.value = "";
        } catch (error) {
            console.error("Error import file", error);
        }
    };

    const {
        register: createOrder,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(orderSchema),
    });

    const onSubmit = async (newOrder: any) => {
        const response = await addOrder(newOrder);
        console.log(response);

        if (response.status === 200) {
            toast.success("Tạo đơn hàng thành công!");
        } else {
            toast.error("Tạo đơn hàng thất bại!");
        }
    };

    return (
        <div>
            <WebHeader />
            <div className="relative font-sans overflow-y-auto flex z-48">
                <div className="w-full p-[15px]">
                    <div className="h-[30px] flex items-center leading-[30px] mb-[10px]">
                        <span className="font-medium text-[1.625rem] border-r-2 border-gray-300 pr-[30px] text-black">
                            Tạo đơn hàng
                        </span>
                        <Link
                            href="/web/tao-don-hang"
                            className="text-[rgb(6,146,85)] font-medium text-[1.125rem] border-r-2 border-gray-300 px-[10px] cursor-pointer"
                        >
                            <span className="border-b-2 border-[rgb(6,146,85)] pb-[3px] px-[6px]">
                                Đăng đơn lẻ
                            </span>
                        </Link>

                        <Link
                            href="/web/don-da-tao"
                            className="font-medium text-[1.125rem] border-r-2 border-gray-300 px-[10px] text-gray-400 cursor-pointer"
                        >
                            <span className="px-[6px]">Đã tạo</span>
                        </Link>
                        <span className=" font-medium text-[1.125rem]  border-gray-300 px-[10px] text-white cursor-pointer">
                            <label
                                htmlFor="import"
                                className="bg-[rgb(6,146,85)] cursor-pointer rounded-md flex items-center py-[3px] px-[10px]  transition duration-150 ease-linear hover:opacity-90 "
                            >
                                <span className="mr-1">Đăng đơn Excel</span> <FaFileExcel />
                                <input id="import" type="file" onChange={handleFileChange} hidden />
                            </label>
                        </span>
                    </div>
                    <div className="xl:flex flex-col">
                        <div className="pb-[20px]">
                            <div className="pt-[30px] pb-[30px] border-solid border-b-1 border-0 max-w-[85%] xl:flex mx-auto relative">
                                <div className="xl:flex w-full">
                                    <div className="xl:border-b-0 border-b xl:bottom-0 pb-5 xl:pr-[40px] p-[2px] xl:border-r border-gray-300 border-0 w-full mb-8 xl:mb-0 xl:w-1/2">
                                        <section className="mb-[1.25rem]">
                                            <div className="uppercase font-bold text-[1.125rem] leading-7 mb-[0.75rem]">
                                                Người nhận
                                            </div>
                                            <form onSubmit={handleSubmit(onSubmit)}>
                                                <div className="items-center w-full flex mb-1">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        className="overflow-hidden w-[22px] h-[20px] mr-[0.625rem]"
                                                    >
                                                        <path
                                                            fill="#000"
                                                            d="M9.921 10.777h.144c1.32-.021 2.386-.448 3.174-1.264 1.733-1.797 1.445-4.878 1.414-5.173-.113-2.207-1.247-3.263-2.184-3.756C11.771.215 10.957.017 10.047 0h-.076c-.5 0-1.481.075-2.422.567-.946.493-2.098 1.55-2.21 3.773-.032.295-.32 3.376 1.413 5.173.783.816 1.85 1.243 3.17 1.264Zm-3.38-6.333c0-.012.004-.025.004-.033.148-2.97 2.44-3.289 3.421-3.289H10.02c1.216.025 3.282.48 3.422 3.289 0 .012 0 .025.004.033.005.029.32 2.845-1.112 4.328-.567.588-1.323.878-2.318.886H9.97c-.99-.008-1.752-.298-2.314-.886C6.23 7.298 6.536 4.469 6.54 4.444Z"
                                                        ></path>
                                                        <path
                                                            fill="#000"
                                                            d="M19.244 15.887v-.012c0-.033-.004-.066-.004-.104-.027-.82-.086-2.737-2.04-3.35l-.044-.013c-2.03-.476-3.719-1.553-3.737-1.565a.641.641 0 0 0-.846.136.53.53 0 0 0 .148.78c.077.049 1.869 1.196 4.11 1.726 1.05.344 1.166 1.375 1.198 2.32 0 .037 0 .07.005.103.004.373-.023.949-.095 1.28-.73.38-3.588 1.698-7.937 1.698-4.33 0-7.207-1.321-7.94-1.702-.073-.332-.104-.907-.095-1.28 0-.033.004-.066.004-.104.032-.944.149-1.975 1.198-2.319 2.241-.53 4.033-1.681 4.11-1.727a.53.53 0 0 0 .148-.779.641.641 0 0 0-.846-.136c-.018.012-1.697 1.089-3.737 1.565-.018.004-.031.008-.045.013C.846 13.034.787 14.95.76 15.767c0 .038 0 .07-.004.104v.012c-.005.216-.01 1.321.23 1.876a.544.544 0 0 0 .233.261c.135.083 3.372 1.98 8.788 1.98 5.415 0 8.652-1.901 8.787-1.98a.568.568 0 0 0 .234-.26c.226-.552.221-1.657.216-1.873Z"
                                                        ></path>
                                                    </svg>
                                                    <div className="items-center w-full flex relative">
                                                        <input
                                                            className={`w-full p-[2px] border-b  overflow-visible m-0 text-inherit text-base font-inherit leading-inherit focus:outline-none ${
                                                                errors.receiverName
                                                                    ? "border-red-500"
                                                                    : "border-gray-400"
                                                            }`}
                                                            type="text"
                                                            placeholder="Tên khách hàng"
                                                            {...createOrder("receiverName")}
                                                        />
                                                    </div>
                                                </div>
                                                {errors.receiverName && (
                                                    <span className="italic text-[14px] ml-8 text-red-500">
                                                        {errors.receiverName.message}
                                                    </span>
                                                )}

                                                <div className="items-center w-full flex mb-1 mt-3">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        className="overflow-hidden w-[22px] h-[20px] mr-[0.625rem]"
                                                    >
                                                        <path
                                                            stroke="#000"
                                                            d="m5.874 7.683-.025-.045c-.049-.088-.096-.174-.143-.256l1.045-1.045-.877 1.346Zm0 0 .003.005m-.003-.005.003.005m2.71 3.753c1.415 1.42 2.76 2.167 3.742 2.713l.307.171-4.05-2.884Zm0 0c-1.417-1.42-2.164-2.768-2.71-3.753m2.71 3.753-2.71-3.753m.52-1.705L5.353 7.03l-.27.27.189.33.14.25.024.045v.001l.007.011c.549.991 1.323 2.388 2.79 3.858 1.466 1.471 2.863 2.247 3.852 2.796l.31.173.33.182.265-.267 1.556-1.559c.454-.455 1.155-.45 1.564-.042l3.087 3.095c.407.41.413 1.113-.039 1.57l-.698.685-.159.124c-.332.26-.718.481-1.133.644-.388.15-.767.245-1.162.293-.151.015-4.635.43-10.259-5.205C1.585 10.11.18 7.16.56 4.007v-.003c.042-.377.135-.757.289-1.163.164-.42.384-.807.644-1.14l.158-.202.65-.654C2.755.389 3.457.395 3.863.802L6.951 3.9c.408.409.414 1.113-.04 1.57H6.91l-.513.514Z"
                                                        ></path>
                                                    </svg>
                                                    <div className="items-center w-full flex relative">
                                                        <input
                                                            className={`w-full p-[2px] border-b  overflow-visible m-0 text-inherit text-base font-inherit leading-inherit focus:outline-none ${
                                                                errors.receiverPhone
                                                                    ? "border-red-500"
                                                                    : "border-gray-400"
                                                            }`}
                                                            type="text"
                                                            placeholder="Số điện thoại khách hàng"
                                                            {...createOrder("receiverPhone")}
                                                        />
                                                    </div>
                                                </div>
                                                {errors.receiverPhone && (
                                                    <span className="italic text-[14px] ml-8 text-red-500">
                                                        {errors.receiverPhone.message}
                                                    </span>
                                                )}

                                                <div className="items-center w-full flex mb-1 mt-3">
                                                    <svg
                                                        className="overflow-hidden w-[22px] h-[20px] mr-[0.625rem]"
                                                        viewBox="5 0 42 42"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <g
                                                            id="🔍-Product-Icons"
                                                            stroke="none"
                                                            strokeWidth="1"
                                                            fill="none"
                                                            fillRule="evenodd"
                                                        >
                                                            <g
                                                                id="ic_fluent_mail_48_regular"
                                                                fill="#212121"
                                                                fillRule="nonzero"
                                                            >
                                                                <path
                                                                    d="M37.75,9 C40.6494949,9 43,11.3505051 43,14.25 L43,33.75 C43,36.6494949 40.6494949,39 37.75,39 L10.25,39 C7.35050506,39 5,36.6494949 5,33.75 L5,14.25 C5,11.3505051 7.35050506,9 10.25,9 L37.75,9 Z M40.5,18.351 L24.6023984,27.0952699 C24.2689733,27.2786537 23.8727436,27.2990297 23.5253619,27.1563978 L23.3976016,27.0952699 L7.5,18.351 L7.5,33.75 C7.5,35.2687831 8.73121694,36.5 10.25,36.5 L37.75,36.5 C39.2687831,36.5 40.5,35.2687831 40.5,33.75 L40.5,18.351 Z M37.75,11.5 L10.25,11.5 C8.73121694,11.5 7.5,12.7312169 7.5,14.25 L7.5,15.499 L24,24.573411 L40.5,15.498 L40.5,14.25 C40.5,12.7312169 39.2687831,11.5 37.75,11.5 Z"
                                                                    id="🎨-Color"
                                                                ></path>
                                                            </g>
                                                        </g>
                                                    </svg>

                                                    <div className="items-center w-full flex relative">
                                                        <input
                                                            className={`w-full p-[2px] border-b  overflow-visible m-0 text-inherit text-base font-inherit leading-inherit focus:outline-none ${
                                                                errors.receiverEmail
                                                                    ? "border-red-500"
                                                                    : "border-gray-400"
                                                            }`}
                                                            type="text"
                                                            placeholder="Email khách hàng"
                                                            {...createOrder("receiverEmail")}
                                                        />
                                                    </div>
                                                </div>
                                                {errors.receiverEmail && (
                                                    <span className="italic text-[14px] ml-8 text-red-500">
                                                        {errors.receiverEmail.message}
                                                    </span>
                                                )}
                                                <div className="items-center w-full flex mb-1 mt-3">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        className="overflow-hidden w-[22px] h-[20px] mr-[0.625rem]"
                                                    >
                                                        <path
                                                            stroke="#000"
                                                            d="M4.879 9.121A3 3 0 1 0 9.12 4.88 3 3 0 0 0 4.88 9.12ZM7 19.24a45.97 45.97 0 0 1-3.086-4.05c-.865-1.283-1.723-2.718-2.364-4.147C.907 9.605.5 8.212.5 7a6.5 6.5 0 1 1 13 0c0 1.211-.407 2.605-1.05 4.042-.64 1.43-1.499 2.864-2.364 4.147A45.964 45.964 0 0 1 7 19.24Z"
                                                        ></path>
                                                    </svg>

                                                    <div className="items-center w-full flex relative">
                                                        <input
                                                            className={`w-full p-[2px] border-b  overflow-visible m-0 text-inherit text-base font-inherit leading-inherit focus:outline-none ${
                                                                errors.receiverAddress
                                                                    ? "border-red-500"
                                                                    : "border-gray-400"
                                                            }`}
                                                            type="text"
                                                            placeholder="Địa chỉ khách hàng"
                                                            {...createOrder("receiverAddress")}
                                                        />
                                                    </div>
                                                </div>
                                                {errors.receiverAddress && (
                                                    <span className="italic text-[14px] ml-8 text-red-500">
                                                        {errors.receiverAddress.message}
                                                    </span>
                                                )}
                                                <div className="text-end border-t border-gray-300 bg-white fixed bottom-0 left-0 w-full h-[60px] ">
                                                    <button
                                                        type="submit"
                                                        className="font-semibold cursor-pointer p-2 px-8 bg-[rgb(6,146,85)] text-white mt-[10px] mr-6 rounded-md transition duration-150 ease-linear hover:opacity-90"
                                                    >
                                                        Tạo đơn hàng
                                                    </button>
                                                </div>
                                            </form>
                                        </section>
                                        <section className="mb-[1.5rem]">
                                            <div className="font-bold text-[1.125rem] leading-7 mb-[0.75rem]">
                                                Lấy & Giao tận nơi
                                            </div>
                                            <div className="flex items-center">
                                                <div className="w-1/2">
                                                    <div className="flex items-center me-4">
                                                        <input
                                                            defaultChecked
                                                            id="type1"
                                                            type="radio"
                                                            value="express"
                                                            name="type-radio"
                                                            className="w-5 h-5 accent-[rgb(6,146,85)] bg-gray-100 border-gray-300 "
                                                        />

                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            className="overflow-hidden w-[38px] h-[29px] ml-[0.5rem]"
                                                        >
                                                            <path
                                                                fill="#00904A"
                                                                d="M34.2 7.258 22.05.588a.707.707 0 0 0-.68 0l-4.568 2.508a.704.704 0 0 0-.28.155l-7.3 4.007a.706.706 0 0 0-.366.62v1.444H.706a.706.706 0 0 0 0 1.412h8.15v2.543h-4.05a.707.707 0 1 0 0 1.413h4.05v3.673H2.922a.706.706 0 0 0 0 1.412h5.934v1.445a.706.706 0 0 0 .366.62l12.149 6.67a.707.707 0 0 0 .68 0L34.2 21.84a.707.707 0 0 0 .366-.62v-3.163a.706.706 0 0 0-1.413 0v2.745l-10.736 5.895V14.966l3.414-1.876v2.975a.706.706 0 0 0 1.046.62l2.603-1.433a.707.707 0 0 0 .366-.62v-3.747l3.305-1.816v3.335a.705.705 0 1 0 1.413 0v-4.53a.706.706 0 0 0-.364-.616ZM21.004 26.697 10.268 20.8V9.071l10.736 5.895v11.73Zm.707-12.954L11.03 7.877l3.357-1.843L25.067 11.9l-3.357 1.844Zm4.825-2.65L15.854 5.228l1.158-.636 10.681 5.865-1.157.636Zm1.897 3.123-1.189.655v-2.556l1.19-.653-.001 2.554Zm.726-4.564-10.68-5.866 3.232-1.774 10.68 5.865-3.232 1.775Z"
                                                            ></path>
                                                        </svg>
                                                        <label
                                                            htmlFor="type1"
                                                            className="pl-[0.5rem]"
                                                        >
                                                            EXPRESS nhanh {"<"} 20kg
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="w-1/2">
                                                    <div className="flex items-center me-4">
                                                        <input
                                                            id="type2"
                                                            type="radio"
                                                            value="bbs"
                                                            name="type-radio"
                                                            className="w-5 h-5 accent-[rgb(6,146,85)] bg-gray-100 border-gray-300 "
                                                        />

                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            className="overflow-hidden w-[30px] h-[29px] ml-[0.5rem]"
                                                        >
                                                            <path
                                                                fill="#00904A"
                                                                d="M.706 5.1a2.824 2.824 0 0 1 .18-2.188 2.927 2.927 0 0 1 1.702-1.429 3.004 3.004 0 0 1 2.236.158c.696.34 1.226.933 1.475 1.653l5.786 17.155a3.95 3.95 0 0 0-1.684-.062L4.798 3.778a1.344 1.344 0 0 0-.682-.773 1.392 1.392 0 0 0-1.04-.076c-.345.111-.629.351-.792.667-.162.316-.19.683-.077 1.019a.758.758 0 0 1-.045.59.785.785 0 0 1-.458.386.806.806 0 0 1-.603-.044.778.778 0 0 1-.395-.448Zm22.796 13.458-9.48 3.059c.347.384.61.833.773 1.32.006.017.01.037.015.053l9.187-2.965a.796.796 0 0 0 .478-.382.76.76 0 0 0-.106-.87.789.789 0 0 0-.555-.262.806.806 0 0 0-.312.047Zm-9.457 4.62c.192.571.207 1.184.043 1.763a3.029 3.029 0 0 1-.964 1.49 3.164 3.164 0 0 1-3.423.412 3.075 3.075 0 0 1-1.305-1.217 2.983 2.983 0 0 1 .255-3.365c.378-.473.891-.826 1.474-1.014a3.167 3.167 0 0 1 2.369.172 3.057 3.057 0 0 1 1.55 1.76Zm-1.474.476a1.519 1.519 0 0 0-.518-.72 1.58 1.58 0 0 0-1.72-.125c-.267.147-.484.37-.622.638a1.49 1.49 0 0 0 .21 1.674c.201.228.466.392.762.472.296.08.61.073.9-.021.392-.126.715-.4.9-.759.185-.36.217-.776.088-1.159ZM21.107 6.92l3.218 9.543a.38.38 0 0 1-.023.294.394.394 0 0 1-.228.193l-10.131 3.27a.403.403 0 0 1-.301-.022.39.39 0 0 1-.197-.223l-3.218-9.543a.379.379 0 0 1 .023-.294.392.392 0 0 1 .228-.193l10.13-3.27a.403.403 0 0 1 .301.022.39.39 0 0 1 .198.223Zm-1.34 5.542-3.451-1.855-1.642 3.5 1.087.49.71-1.515 1.282 3.802 1.225-.397-1.278-3.8 1.493.803.574-1.028Zm-3.01-5.691L14.7.67a.25.25 0 0 0-.126-.144.258.258 0 0 0-.193-.014l-1.764.57-.009.015-.014-.008-.931.3.765 2.273-1.049.34-.765-2.273-.932.3-.007.015-.016-.008-1.753.566a.251.251 0 0 0-.146.124.242.242 0 0 0-.015.188l2.057 6.102a.249.249 0 0 0 .126.143c.06.03.13.035.193.014l6.476-2.09a.25.25 0 0 0 .147-.124.242.242 0 0 0 .015-.188Z"
                                                            ></path>
                                                        </svg>
                                                        <label
                                                            htmlFor="type2"
                                                            className="pl-[0.5rem]"
                                                        >
                                                            BBS lớn ≥ 20kg
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>
                                        <div>
                                            <div className="flex items-center mb-[1rem]">
                                                <div className="flex-shrink-0 w-[190px]">
                                                    <div className="flex items-center">
                                                        <input
                                                            defaultChecked
                                                            id="type3"
                                                            type="radio"
                                                            value="a1"
                                                            name="vehicle"
                                                            onChange={handleChange}
                                                            className="w-5 h-5 accent-[rgb(6,146,85)] bg-gray-100 border-gray-300 "
                                                        />

                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            className="overflow-hidden w-[30px] h-[29px] ml-[0.5rem] mt-[10px]"
                                                        >
                                                            <path
                                                                fill={
                                                                    selectedType === "a1"
                                                                        ? "#00904A"
                                                                        : "#C4C4C4"
                                                                }
                                                                d="M24.697 4.733h-3.9V.369H2.6C1.163.37 0 1.345 0 2.551v12h2.6c0 1.806 1.748 3.273 3.9 3.273 2.15 0 3.899-1.468 3.899-3.273h7.799c0 1.806 1.748 3.273 3.899 3.273s3.9-1.468 3.9-3.273h2.6V9.096l-3.9-4.363ZM6.498 16.187c-1.079 0-1.95-.73-1.95-1.636 0-.905.871-1.636 1.95-1.636s1.95.73 1.95 1.636c0 .905-.871 1.636-1.95 1.636Zm15.598 0c-1.079 0-1.95-.73-1.95-1.636 0-.905.871-1.636 1.95-1.636s1.95.73 1.95 1.636c0 .905-.871 1.636-1.95 1.636Zm-1.3-7.09V6.368h3.25L26.6 9.096h-5.804Z"
                                                            ></path>
                                                        </svg>
                                                        <label
                                                            htmlFor="type3"
                                                            className="pl-[0.5rem]"
                                                        >
                                                            Bộ
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="overflow-auto items-center w-full flex">
                                                    <div className="w-1/2">
                                                        <select
                                                            defaultValue=""
                                                            className={
                                                                selectedType === "a1"
                                                                    ? "h-[44px] text-base w-full px-[12px] py-[2px] border border-solid border-gray-200 text-black rounded-md text-left focus:outline-none focus:border-blue-400 focus:shadow-md rounded-md transition"
                                                                    : "bg-[#E8E8E8] h-[44px] text-base w-full px-[12px] py-[2px] border border-solid border-gray-200 text-black rounded-md text-left focus:outline-none focus:border-blue-400 focus:shadow-md rounded-md transition"
                                                            }
                                                        >
                                                            <option value="" disabled>
                                                                Hẹn lấy
                                                            </option>
                                                            {countdown.map((item, index) => (
                                                                <option key={index}>{item}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div className="w-1/2 pl-[0.25rem]">
                                                        <select
                                                            defaultValue=""
                                                            className={
                                                                selectedType === "a1"
                                                                    ? "h-[44px] text-base w-full px-[12px] py-[2px] border border-solid border-gray-200 text-black rounded-md text-left focus:outline-none focus:border-blue-400 focus:shadow-md rounded-md transition"
                                                                    : "bg-[#E8E8E8] h-[44px] text-base w-full px-[12px] py-[2px] border border-solid border-gray-200 text-black rounded-md text-left focus:outline-none focus:border-blue-400 focus:shadow-md rounded-md transition"
                                                            }
                                                        >
                                                            <option value="" disabled>
                                                                Hẹn giao
                                                            </option>
                                                            {countdown1.map((item, index) => (
                                                                <option key={index}>{item}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center mb-[1.25rem]">
                                                <div className="flex-shrink-0 w-[190px]">
                                                    <div className="flex items-center">
                                                        <input
                                                            id="type4"
                                                            type="radio"
                                                            value="a2"
                                                            name="vehicle"
                                                            onChange={handleChange}
                                                            className="w-5 h-5 accent-[rgb(6,146,85)] bg-gray-100 border-gray-300 "
                                                        />

                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            className="overflow-hidden w-[30px] h-[29px] ml-[0.5rem] mt-[10px]"
                                                        >
                                                            <path
                                                                fill={
                                                                    selectedType === "a2"
                                                                        ? "#00904A"
                                                                        : "#C4C4C4"
                                                                }
                                                                stroke="#BDBDBD"
                                                                strokeWidth=".7"
                                                                d="m16.51 7.675-.037.14.073.126L23.1 19.293c.286.495.361 1.072.213 1.628l-.304 1.132a.147.147 0 0 1-.108.106H22.9a.147.147 0 0 1-.145-.044l-7.54-8.27-.402-.44-.189.564c-.479 1.43-.925 2.61-1.47 4.054l-.563 1.485-.075.198.14.158L15.44 23v.001a.147.147 0 0 1 .033.137l-.259.966A.15.15 0 0 1 15 24.2l-3.989-2.08-.069-.036-.078-.003-4.495-.194a.147.147 0 0 1-.113-.06.152.152 0 0 1-.024-.129l.259-.966a.152.152 0 0 1 .099-.104L10.57 19.3l.2-.067.034-.209.254-1.562c.25-1.524.454-2.77.754-4.249l.119-.583-.568.18L.697 16.204H.695a.147.147 0 0 1-.147-.034H.547a.148.148 0 0 1-.04-.147l.302-1.132a2.132 2.132 0 0 1 1.002-1.305l-.175-.303.175.303 11.35-6.552.125-.073.038-.14 1.064-3.97a4.169 4.169 0 0 1 .817-1.579l.334-.363.006-.006.006-.007a1.126 1.126 0 0 1 1.163-.355c.44.118.757.466.835.915l.002.009.002.008.098.433c.106.61.078 1.224-.076 1.799l-1.064 3.97Z"
                                                            ></path>
                                                        </svg>
                                                        <label
                                                            htmlFor="type4"
                                                            className="pl-[0.5rem]"
                                                        >
                                                            Bay
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="overflow-auto items-center w-full flex">
                                                    <div className="w-1/2">
                                                        <select
                                                            defaultValue=""
                                                            className={
                                                                selectedType === "a2"
                                                                    ? "h-[44px] text-base w-full px-[12px] py-[2px] border border-solid border-gray-200 text-black rounded-md text-left focus:outline-none focus:border-blue-400 focus:shadow-md rounded-md transition"
                                                                    : "bg-[#E8E8E8] h-[44px] text-base w-full px-[12px] py-[2px] border border-solid border-gray-200 text-black rounded-md text-left focus:outline-none focus:border-blue-400 focus:shadow-md rounded-md transition"
                                                            }
                                                        >
                                                            <option value="" disabled>
                                                                Hẹn lấy
                                                            </option>
                                                            {countdown.map((item, index) => (
                                                                <option key={index}>{item}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div className="w-1/2 pl-[0.25rem]">
                                                        <select
                                                            defaultValue=""
                                                            className={
                                                                selectedType === "a2"
                                                                    ? "h-[44px] text-base w-full px-[12px] py-[2px] border border-solid border-gray-200 text-black rounded-md text-left focus:outline-none focus:border-blue-400 focus:shadow-md rounded-md transition"
                                                                    : "bg-[#E8E8E8] h-[44px] text-base w-full px-[12px] py-[2px] border border-solid border-gray-200 text-black rounded-md text-left focus:outline-none focus:border-blue-400 focus:shadow-md rounded-md transition"
                                                            }
                                                        >
                                                            <option value="" disabled>
                                                                Hẹn giao
                                                            </option>
                                                            {countdown1.map((item, index) => (
                                                                <option key={index}>{item}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <section className="mb-[1.25rem]">
                                            <div className="font-bold text-[1.125rem] leading-7 mb-[0.75rem]">
                                                Hình thức lấy hàng
                                            </div>
                                            <div className="flex items-center mb-[1.5rem]">
                                                <div className="flex-shrink-0 w-[190px]">
                                                    <div className="flex items-center py-[10px]">
                                                        <input
                                                            defaultChecked
                                                            id="type5"
                                                            type="radio"
                                                            value=""
                                                            name="colored-radio"
                                                            className="w-5 h-5 accent-[rgb(6,146,85)] bg-gray-100 border-gray-300 "
                                                        />

                                                        <label
                                                            htmlFor="type5"
                                                            className="pl-[0.5rem]"
                                                        >
                                                            Lấy hàng tận nơi
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="overflow-auto items-center w-full flex">
                                                    <div className="overflow-auto items-center w-full flex">
                                                        <div className="w-full">
                                                            <select
                                                                defaultValue=""
                                                                className="h-[44px] text-base w-full px-[12px] py-[2px] border border-solid border-gray-200 text-black rounded-md text-left focus:outline-none focus:border-blue-400 focus:shadow-md rounded-md transition"
                                                            >
                                                                <option value="" disabled>
                                                                    Địa chỉ người gửi
                                                                </option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="w-1/2">
                                                    <div className="flex items-center me-4">
                                                        <input
                                                            id="type6"
                                                            type="radio"
                                                            value=""
                                                            name="colored-radio"
                                                            className="w-5 h-5 accent-[rgb(6,146,85)] bg-gray-100 border-gray-300 "
                                                        />

                                                        <label
                                                            htmlFor="type6"
                                                            className="pl-[0.5rem]"
                                                        >
                                                            Gửi hàng bưu cục
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>
                                    </div>
                                    <div className="p-0 w-full xl:w-1/2">
                                        <div className="xl:pl-[40px]">
                                            <section className="mb-[1.5rem]">
                                                <div className="justify-between items-center flex mb-[1.5rem]">
                                                    <h4 className="text-[1.125rem] font-semibold leading-7">
                                                        Sản phẩm
                                                    </h4>
                                                    <div
                                                        onClick={openModal}
                                                        className="py-[7px] px-[8px] font-medium border border-solid border-[rgb(6,146,85)] text-[rgb(6,146,85)] rounded-[7px] justify-center items-center cursor-pointer flex hover:bg-[rgb(6,146,85)] hover:text-white"
                                                    >
                                                        + Sản phẩm có sẵn
                                                    </div>
                                                    {isModalOpen && (
                                                        <div
                                                            className="fixed top-0 right-0 bottom-0 left-0 z-[9999] h-full bg-black bg-opacity-30"
                                                            onClick={closeModal}
                                                        >
                                                            <div className="fixed top-0 right-0 bottom-0 left-0 overflow-auto outline-none overscroll-touch z-[9999]">
                                                                <div className="w-[500px] transform origin-726px-73px box-border px-0 pt-0 pb-[24px] text-black font-normal text-[16px] leading-1.5715 list-none font-tnum relative top-[100px] mx-auto max-w-[calc(100vw-32px)]">
                                                                    <div
                                                                        onClick={(e) =>
                                                                            e.stopPropagation()
                                                                        }
                                                                        className="relative bg-white bg-clip-padding border-0 rounded-md shadow-box"
                                                                    >
                                                                        <div className="p-0">
                                                                            <div className="flex items-center justify-center bg-[rgb(6,146,85)] rounded-t-md">
                                                                                <div className="pt-[0.75rem] pb-[0.75rem] text-[1.125rem] leading-[1.75rem] font-semibold text-white">
                                                                                    Thêm sản phẩm có
                                                                                    sẵn
                                                                                </div>
                                                                                <button
                                                                                    onClick={
                                                                                        closeModal
                                                                                    }
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
                                                                            <div className="overflow-auto max-w-full max-h-[650px]">
                                                                                <div className="pt-[0.5rem] pb-[0.5rem] pl-[1rem] pr-[1rem] justify-between items-center flex">
                                                                                    <strong className="font-semibold leading-[1.25rem] text-[0.875rem] italic">
                                                                                        Vui lòng bấm
                                                                                        để chọn sản
                                                                                        phẩm
                                                                                    </strong>
                                                                                </div>
                                                                                <div className="pl-[1rem] pr-[1rem] pb-[0.5rem] flex item-center">
                                                                                    <svg
                                                                                        data-v-97d35c10=""
                                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                                        width="20"
                                                                                        height="20"
                                                                                        fill="currentColor"
                                                                                        className="mr-3 text-[#ababab] text-sm"
                                                                                    >
                                                                                        <g clip-path="url(#a)">
                                                                                            <path
                                                                                                fillRule="evenodd"
                                                                                                stroke="#fff"
                                                                                                strokeWidth=".2"
                                                                                                d="M.037 8.459C.037 3.795 3.832 0 8.496 0s8.459 3.795 8.459 8.459c0 2.012-.708 3.86-1.886 5.314l-.123.152 4.813 4.888v.002a.694.694 0 1 1-.981.982l-4.814-4.89-.154.125a8.417 8.417 0 0 1-5.314 1.886c-4.664 0-8.459-3.795-8.459-8.459Zm8.459-7.07c-3.899 0-7.07 3.17-7.07 7.07 0 3.9 3.171 7.07 7.07 7.07 3.9 0 7.07-3.17 7.07-7.07 0-3.9-3.17-7.07-7.07-7.07Z"
                                                                                                clip-rule="evenodd"
                                                                                            ></path>
                                                                                        </g>
                                                                                        <defs>
                                                                                            <clipPath id="a">
                                                                                                <path
                                                                                                    fill="#fff"
                                                                                                    d="M0 0h20v20H0z"
                                                                                                ></path>
                                                                                            </clipPath>
                                                                                        </defs>
                                                                                    </svg>
                                                                                    <input
                                                                                        className="outline-2 outline-solid outline-transparent outline-offset-2 border-none w-full"
                                                                                        type="text"
                                                                                        placeholder="Tìm và chọn sản phẩm"
                                                                                    />
                                                                                </div>
                                                                                <div>
                                                                                    <div
                                                                                        onClick={() =>
                                                                                            setSelectedProduct(
                                                                                                !selectedProduct
                                                                                            )
                                                                                        }
                                                                                        className={
                                                                                            selectedProduct
                                                                                                ? "flex cursor-pointer items-center  pt-[0.5rem] pb-[0.5rem] pl-[1rem] pr-[1rem] bg-gray-100"
                                                                                                : "flex cursor-pointer items-center  pt-[0.5rem] pb-[0.5rem] pl-[1rem] pr-[1rem]"
                                                                                        }
                                                                                    >
                                                                                        <div className="mr-[1rem] relative ">
                                                                                            <img
                                                                                                className="object-cover w-[52px] align-middle border-none"
                                                                                                src="https://cache.giaohangtietkiem.vn/d/b5d091f198b3d8ee888c0b9b8a54f261.png"
                                                                                                alt=""
                                                                                            />
                                                                                            {!selectedProduct ? (
                                                                                                ""
                                                                                            ) : (
                                                                                                <svg
                                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                                    width="45"
                                                                                                    height="45"
                                                                                                    fill="none"
                                                                                                    className="absolute top-0 left-0"
                                                                                                >
                                                                                                    <rect
                                                                                                        width="45"
                                                                                                        height="45"
                                                                                                        fill="url(#a)"
                                                                                                        rx="21.5"
                                                                                                    ></rect>
                                                                                                    <circle
                                                                                                        cx="22.5"
                                                                                                        cy="22.5"
                                                                                                        r="22.5"
                                                                                                        fill="#000"
                                                                                                        fill-opacity=".5"
                                                                                                    ></circle>
                                                                                                    <path
                                                                                                        fill="#FEFEFE"
                                                                                                        d="M12.82 24.578a1.314 1.314 0 0 1 .035-1.897 1.412 1.412 0 0 1 1.955.035l5.882 5.92-1.259 1.179a1.037 1.037 0 0 1-1.435-.026l-5.177-5.21Z"
                                                                                                    ></path>
                                                                                                    <path
                                                                                                        fill="#FEFEFE"
                                                                                                        d="M30.385 16.066a1.473 1.473 0 0 1 2.039.038 1.37 1.37 0 0 1-.038 1.98L19.621 30.012a1.037 1.037 0 0 1-1.435-.027l-1.297-1.308 13.496-12.613Z"
                                                                                                    ></path>
                                                                                                    <defs>
                                                                                                        <pattern
                                                                                                            id="a"
                                                                                                            width="1"
                                                                                                            height="1"
                                                                                                            patternContentUnits="objectBoundingBox"
                                                                                                        >
                                                                                                            <use transform="scale(.00049)"></use>
                                                                                                        </pattern>
                                                                                                    </defs>
                                                                                                </svg>
                                                                                            )}
                                                                                        </div>
                                                                                        <div className="w-full">
                                                                                            <div className="flex items-center">
                                                                                                <div className="flex items-center pt-[0.25rem] pb-[0.25rem]">
                                                                                                    <span className="text-[0.875rem] leading-5 whitespace-nowrap overflow-hidden overflow-ellipsis max-w-[412px] mr-[0.25rem]">
                                                                                                        áo
                                                                                                    </span>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="flex w-full gap-4 flex-row">
                                                                                                <div className="flex items-center justify-between z-99 h-[38px] text-base w-[120px] px-[12px] py-[12px] border border-solid border-gray-300 text-black rounded-md focus:outline-none focus:border-blue-400 focus:shadow-md rounded-md transition">
                                                                                                    <span>
                                                                                                        KL(kg)
                                                                                                    </span>
                                                                                                    <input
                                                                                                        name=""
                                                                                                        className="h-[28px] text-base w-[40px] px-[12px] py-[12px] text-black focus:outline-none rounded-md transition placeholder-gray-900"
                                                                                                        type="text"
                                                                                                        placeholder="0"
                                                                                                    />
                                                                                                </div>
                                                                                                <div className="flex items-center justify-between z-99 h-[38px] text-base w-[120px] px-[12px] py-[12px] border border-solid border-gray-300 text-black rounded-md focus:outline-none focus:border-blue-400 focus:shadow-md rounded-md transition">
                                                                                                    <span>
                                                                                                        SL
                                                                                                    </span>
                                                                                                    <input
                                                                                                        name=""
                                                                                                        className="h-[28px] text-base w-[40px] px-[12px] py-[12px] text-black focus:outline-none rounded-md transition placeholder-gray-900"
                                                                                                        type="text"
                                                                                                        placeholder="1"
                                                                                                    />
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="p-[0.5rem]">
                                                                                <button
                                                                                    className={
                                                                                        selectedProduct
                                                                                            ? "min-w-[120px] pt-[0.5rem] pb-[0.5rem] border-0 text-white rounded-md w-full border-none outline-none bg-[rgb(6,146,85)]"
                                                                                            : "min-w-[120px] pt-[0.5rem] pb-[0.5rem] border-0 text-white rounded-md w-full border-none outline-none bg-gray-300"
                                                                                    }
                                                                                >
                                                                                    Thêm sản phẩm
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex mb-[1rem] justify-between">
                                                    <div className="border border-1 border-gray-400 rounded-[5px] grid grid-cols-[80px,1fr] w-full">
                                                        <div className="border-r-[1px] border-gray-400 justify-center items-center flex">
                                                            <label className="m-0">
                                                                <svg
                                                                    data-v-84055dc4=""
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="46"
                                                                    height="46"
                                                                    fill="none"
                                                                >
                                                                    <rect
                                                                        width="46"
                                                                        height="46"
                                                                        fill="#E5E6E8"
                                                                        rx="23"
                                                                    ></rect>
                                                                    <path
                                                                        fill="#4E4E4E"
                                                                        d="M34.143 12.613H10.3l-.004 19.352h23.848V12.613Z"
                                                                    ></path>
                                                                    <path
                                                                        fill="#E5E6E8"
                                                                        d="M33.24 13.512H11.202l-.003 17.547H33.24V13.512Z"
                                                                    ></path>
                                                                    <path
                                                                        fill="#515151"
                                                                        d="M32.346 14.863H12.55l-.003 14.852h19.8V14.863Z"
                                                                    ></path>
                                                                    <path
                                                                        fill="#E5E6E8"
                                                                        d="M31.436 15.766h-17.99l-.002 13.046h17.992V15.767Z"
                                                                    ></path>
                                                                    <path
                                                                        fill="#4F4F4F"
                                                                        d="M20.04 18.766a1.914 1.914 0 1 1-3.827 0 1.914 1.914 0 0 1 3.827 0Zm-2.87 0a.957.957 0 1 0 1.914 0 .957.957 0 0 0-1.914 0Z"
                                                                    ></path>
                                                                    <circle
                                                                        cx="31.781"
                                                                        cy="31.413"
                                                                        r="8.718"
                                                                        fill="#E5E6E8"
                                                                    ></circle>
                                                                    <path
                                                                        fill="#4F4F4F"
                                                                        d="M39.196 31.413a7.414 7.414 0 1 1-14.829 0 7.414 7.414 0 0 1 14.829 0Zm-13.727 0a6.312 6.312 0 1 0 12.624 0 6.312 6.312 0 0 0-12.624 0Z"
                                                                    ></path>
                                                                    <path
                                                                        fill="#E5E6E8"
                                                                        d="M40.499 31.413a8.718 8.718 0 1 1-17.435 0 8.718 8.718 0 0 1 17.435 0Zm-16.14 0a7.422 7.422 0 1 0 14.844 0 7.422 7.422 0 0 0-14.843 0Z"
                                                                    ></path>
                                                                    <path
                                                                        fill="#4F4F4F"
                                                                        d="M35.94 31.059h-8.093v.902h8.094v-.902Z"
                                                                    ></path>
                                                                    <path
                                                                        fill="#4F4F4F"
                                                                        d="M31.44 27.464v8.094h.903v-8.094h-.902Z"
                                                                    ></path>
                                                                    <path
                                                                        fill="#4E504F"
                                                                        d="m16.031 21.575-2.587 2.545v1.302l2.587-2.587 3.808 2.97 5.943-5.209 3.788 4.162.993-.457-4.78-5.104-5.944 5.38-3.808-3.003Z"
                                                                    ></path>
                                                                </svg>
                                                                <input
                                                                    id="upload-image0"
                                                                    className="hidden"
                                                                    type="file"
                                                                    name="upload"
                                                                    accept="image/*, video/*"
                                                                ></input>
                                                            </label>
                                                        </div>
                                                        <div className="grid">
                                                            <div className="p-2 px-[12px] border-b-[1px] border-gray-400 items-center flex">
                                                                1.
                                                                <input
                                                                    className="outline-2 outline-solid outline-transparent outline-offset-2 border-width-0 w-full ml-2 placeholder-red-500"
                                                                    type="text"
                                                                    placeholder="Nhập tên sản phẩm"
                                                                />
                                                                <div className="justify-end items-baseline max-w-200 flex mr-2">
                                                                    0
                                                                </div>
                                                            </div>
                                                            <div className="grid grid-cols-2 p-2 py-[12px]">
                                                                <div className="grid items-center p-0 px-[6px] border-r border-solid border-gray-400 grid-cols-2">
                                                                    <span>Khối lượng (kg)</span>
                                                                    <span>
                                                                        <div className="text-right">
                                                                            <input
                                                                                name=""
                                                                                className="h-[28px] text-base w-[50px] ml-[20px] px-[12px] py-[12px] text-black focus:outline-none rounded-md transition placeholder-gray-900"
                                                                                type="text"
                                                                                placeholder="0"
                                                                            />
                                                                        </div>
                                                                    </span>
                                                                </div>
                                                                <div className="grid items-center p-0 px-[12px] grid-cols-2">
                                                                    <span>Số lượng</span>
                                                                    <span>
                                                                        <div className="text-right">
                                                                            <input
                                                                                name=""
                                                                                className="h-[28px] text-base w-[50px] ml-[20px] px-[12px] py-[12px] text-black focus:outline-none rounded-md transition placeholder-gray-900"
                                                                                type="text"
                                                                                placeholder="1"
                                                                            />
                                                                        </div>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="cursor-pointer pb-[8px] w-[48px]  rounded-md flex justify-center items-center text-[35px] font-bold ml-[13px] border border-solid border-[rgb(6,146,85)] text-[rgb(6,146,85)]">
                                                        +
                                                    </div>
                                                </div>
                                            </section>
                                            <section>
                                                <div className="flex justify-between items-end mb-[20px]">
                                                    <div className="w-[calc(100%-125px)] mr-3/4">
                                                        <div>
                                                            <div className="grid grid-cols-[170px,1fr] items-center mb-[20px]">
                                                                <div>Tổng KL</div>
                                                                <div className="flex items-center z-99 h-[38px] text-base w-[100px] px-[12px] py-[12px] border border-solid border-gray-300 text-black  focus:outline-none focus:border-blue-400 focus:shadow-md rounded-md transition">
                                                                    <input
                                                                        name=""
                                                                        className="h-[28px] text-base w-[50px] px-[12px] py-[12px] text-black focus:outline-none rounded-md transition placeholder-gray-900"
                                                                        type="text"
                                                                        placeholder="0"
                                                                    />
                                                                    <span>kg</span>
                                                                </div>
                                                            </div>
                                                            <div className="grid grid-cols-[170px,1fr] items-center mb-[20px]">
                                                                <div>Tổng KL</div>
                                                                <div>
                                                                    <span>0 kg </span>
                                                                    <span className="text-[rgb(6,146,85)] font-semibold">
                                                                        (?)
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="w-full grid grid-cols-[170px,1fr] items-center mb-[20px]">
                                                            <h6>Tiền thu hộ</h6>
                                                            <div className="flex items-baseline border-b-[1px] border-gray-300 shadow-none w-full">
                                                                <input
                                                                    name=""
                                                                    className="h-[28px] text-base w-full text-black focus:outline-none rounded-md transition placeholder-gray-900"
                                                                    type="text"
                                                                    placeholder="0"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="w-full grid grid-cols-[170px,1fr] items-center">
                                                            <h6>Giá trị hàng</h6>
                                                            <div className="flex items-baseline border-b-[1px] border-gray-300 shadow-none w-full">
                                                                <input
                                                                    name=""
                                                                    className="h-[28px] text-base w-full text-black focus:outline-none rounded-md transition placeholder-gray-900"
                                                                    type="text"
                                                                    placeholder="0"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <label className="">
                                                            <div className="cursor-pointer w-[100px] h-[100px] border border-dashed border-[rgb(6,146,85)] flex justify-center items-center text-[rgb(6,146,85)] font-normal font-semibold flex-col">
                                                                <div className="flex justify-center mb-[0.5rem]">
                                                                    <svg
                                                                        data-v-02bdc387=""
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        width="35"
                                                                        height="35"
                                                                        fill="#069255"
                                                                        viewBox="0 0 40 41"
                                                                    >
                                                                        <path
                                                                            fill="#069255"
                                                                            d="M40 23.057H22.857V40.2h-5.714V23.057H0v-5.714h17.143V.2h5.714v17.143H40v5.714Z"
                                                                        ></path>
                                                                    </svg>
                                                                </div>
                                                                <div className="font-semibold">
                                                                    Ảnh ĐH
                                                                </div>
                                                                <input
                                                                    className="hidden"
                                                                    type="file"
                                                                    name="upload"
                                                                    accept="image/*"
                                                                ></input>
                                                            </div>
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="w-full grid grid-cols-[170px,1fr] items-center mb-[20px]">
                                                    <h6>Phí ship</h6>
                                                    <div className="flex items-baseline justify-between shadow-none w-full">
                                                        <span>0đ</span>
                                                        <select
                                                            defaultValue=""
                                                            className="h-[38px] text-base w-[150px] px-[12px] py-[2px] border border-solid border-gray-200 text-black rounded-md text-left focus:outline-none focus:border-blue-400 focus:shadow-md rounded-md transition"
                                                        >
                                                            <option value="">Khách trả ship</option>
                                                            <option value="">Shop trả ship</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="w-full grid grid-cols-[170px,1fr] items-center mb-[20px]">
                                                    <h6>Tổng tiền</h6>
                                                    <div className="flex items-baseline justify-between shadow-none w-full">
                                                        <span>0đ</span>
                                                    </div>
                                                </div>
                                                <div className="w-full grid grid-cols-[170px,1fr] items-center mb-[20px]">
                                                    <h6>Chú thích</h6>
                                                    <div className="flex items-baseline border-b-[1px] border-gray-300 shadow-none w-full">
                                                        <input
                                                            name=""
                                                            className="h-[28px] text-base w-full text-black focus:outline-none rounded-md transition"
                                                            type="text"
                                                            placeholder="Nhập ghi chú riêng của đơn hàng"
                                                            value={getCheckedValues().join(", ")}
                                                        />
                                                    </div>
                                                </div>
                                            </section>
                                            <div className="mt-[10px]">
                                                <div className="mb-[1rem] text-[1.125rem] leading-7 font-semibold">
                                                    {" "}
                                                    Dịch vụ gia tăng{" "}
                                                </div>
                                                <div className="">
                                                    <div className="mb-[0.75rem] flex items-center justify-between">
                                                        <div className="flex items-center">
                                                            <input
                                                                className="w-[18px] h-[18px] border-[2px] border-[rgb(6,146,85)] accent-[rgb(6,146,85)]"
                                                                type="checkbox"
                                                                id="checkbox1"
                                                                value="Hàng nhỏ"
                                                                onChange={handleCheckboxChange}
                                                            />
                                                            <label
                                                                className="pl-2"
                                                                htmlFor="checkbox1"
                                                            >
                                                                <span className="mr-[3px] font-normal">
                                                                    Hàng nhỏ
                                                                </span>
                                                            </label>
                                                        </div>
                                                        <div className="">
                                                            <span className="text-[rgb(6,146,85)] cursor-pointer border-b-[1px] border-[rgb(6,146,85)]">
                                                                Miễn phí
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="mb-[0.75rem] flex items-center justify-between">
                                                        <div className="flex items-center">
                                                            <input
                                                                className="w-[18px] h-[18px] border-[2px] border-[rgb(6,146,85)] accent-[rgb(6,146,85)]"
                                                                type="checkbox"
                                                                id="checkbox2"
                                                                value="Hàng dễ vỡ"
                                                                onChange={handleCheckboxChange}
                                                            />
                                                            <label
                                                                className="pl-2"
                                                                htmlFor="checkbox2"
                                                            >
                                                                <span className="mr-[3px] font-normal">
                                                                    Hàng dễ vỡ
                                                                </span>
                                                            </label>
                                                        </div>
                                                        <div className="">
                                                            <span className="text-[rgb(6,146,85)] cursor-pointer border-b-[1px] border-[rgb(6,146,85)]">
                                                                Phí 1,000đ
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="mb-[0.75rem] flex items-center justify-between">
                                                        <div className="flex items-center">
                                                            <input
                                                                className="w-[18px] h-[18px] border-[2px] border-[rgb(6,146,85)] accent-[rgb(6,146,85)]"
                                                                type="checkbox"
                                                                id="checkbox3"
                                                                value="Hàng giá trị cao"
                                                                onChange={handleCheckboxChange}
                                                            />
                                                            <label
                                                                className="pl-2"
                                                                htmlFor="checkbox3"
                                                            >
                                                                <span className="mr-[3px] font-normal">
                                                                    Hàng giá trị cao ≥ 1,000,000đ
                                                                </span>
                                                            </label>
                                                        </div>
                                                        <div className="">
                                                            <span className="text-[rgb(6,146,85)] cursor-pointer border-b-[1px] border-[rgb(6,146,85)]">
                                                                +Ảnh giá trị hàng
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="mb-[0.75rem] flex items-center justify-between">
                                                        <div className="flex items-center">
                                                            <input
                                                                className="w-[18px] h-[18px] border-[2px] border-[rgb(6,146,85)] accent-[rgb(6,146,85)]"
                                                                type="checkbox"
                                                                id="checkbox4"
                                                                value="Thư tín, tài liệu"
                                                                onChange={handleCheckboxChange}
                                                            />
                                                            <label
                                                                className="pl-2"
                                                                htmlFor="checkbox4"
                                                            >
                                                                <span className="mr-[3px] font-normal">
                                                                    Thư tín, tài liệu
                                                                </span>
                                                            </label>
                                                        </div>
                                                        <div className="">
                                                            <span className="text-[rgb(6,146,85)] cursor-pointer border-b-[1px] border-[rgb(6,146,85)]">
                                                                Miễn phí
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="mb-[0.75rem] flex items-center justify-between">
                                                        <div className="flex items-center">
                                                            <input
                                                                className="w-[18px] h-[18px] border-[2px] border-[rgb(6,146,85)] accent-[rgb(6,146,85)]"
                                                                type="checkbox"
                                                                id="checkbox5"
                                                                value="Hàng chất lỏng"
                                                                onChange={handleCheckboxChange}
                                                            />
                                                            <label
                                                                className="pl-2"
                                                                htmlFor="checkbox5"
                                                            >
                                                                <span className="mr-[3px] font-normal">
                                                                    Hàng chất lỏng
                                                                </span>
                                                            </label>
                                                        </div>
                                                        <div className="">
                                                            <span className="text-[rgb(6,146,85)] cursor-pointer border-b-[1px] border-[rgb(6,146,85)]">
                                                                Miễn phí
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="mb-[0.75rem] flex items-center justify-between">
                                                        <div className="flex items-center">
                                                            <input
                                                                className="w-[18px] h-[18px] border-[2px] border-[rgb(6,146,85)] accent-[rgb(6,146,85)]"
                                                                type="checkbox"
                                                                id="checkbox6"
                                                                value="Nông sản/ Thực phẩm khô"
                                                                onChange={handleCheckboxChange}
                                                            />
                                                            <label
                                                                className="pl-2"
                                                                htmlFor="checkbox6"
                                                            >
                                                                <span className="mr-[3px] font-normal">
                                                                    Nông sản/ Thực phẩm khô
                                                                </span>
                                                            </label>
                                                        </div>
                                                        <div className="">
                                                            <span className="text-[rgb(6,146,85)] cursor-pointer border-b-[1px] border-[rgb(6,146,85)]">
                                                                Miễn phí
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="mb-[0.75rem] flex items-center justify-between">
                                                        <div className="flex items-center">
                                                            <input
                                                                className="w-[18px] h-[18px] border-[2px] border-[rgb(6,146,85)] accent-[rgb(6,146,85)]"
                                                                type="checkbox"
                                                                id="checkbox7"
                                                                value="Hàng nguyên hộp"
                                                                onChange={handleCheckboxChange}
                                                            />
                                                            <label
                                                                className="pl-2"
                                                                htmlFor="checkbox7"
                                                            >
                                                                <span className="mr-[3px] font-normal">
                                                                    Hàng nguyên hộp
                                                                </span>
                                                            </label>
                                                        </div>
                                                        <div className="">
                                                            <span className="text-[rgb(6,146,85)] cursor-pointer border-b-[1px] border-[rgb(6,146,85)]">
                                                                Phí 1,000đ
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="mb-[0.75rem] flex items-center justify-between">
                                                        <div className="flex items-center">
                                                            <input
                                                                className="w-[18px] h-[18px] border-[2px] border-[rgb(6,146,85)] accent-[rgb(6,146,85)]"
                                                                type="checkbox"
                                                                id="checkbox8"
                                                                value="Hàng có HSD ngắn"
                                                                onChange={handleCheckboxChange}
                                                            />
                                                            <label
                                                                className="pl-2"
                                                                htmlFor="checkbox8"
                                                            >
                                                                <span className="mr-[3px] font-normal">
                                                                    Hàng có HSD ngắn
                                                                </span>
                                                            </label>
                                                        </div>
                                                        <div className="">
                                                            <span className="text-[rgb(6,146,85)] cursor-pointer border-b-[1px] border-[rgb(6,146,85)]">
                                                                Miễn phí
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="mb-[0.75rem] flex items-center justify-between">
                                                        <div className="flex items-center">
                                                            <input
                                                                className="w-[18px] h-[18px] border-[2px] border-[rgb(6,146,85)] accent-[rgb(6,146,85)]"
                                                                type="checkbox"
                                                                id="checkbox9"
                                                                value="Hàng có cạnh sắc nhọn"
                                                                onChange={handleCheckboxChange}
                                                            />
                                                            <label
                                                                className="pl-2"
                                                                htmlFor="checkbox9"
                                                            >
                                                                <span className="mr-[3px] font-normal">
                                                                    Hàng có cạnh sắc nhọn
                                                                </span>
                                                            </label>
                                                        </div>
                                                        <div className="">
                                                            <span className="text-[rgb(6,146,85)] cursor-pointer border-b-[1px] border-[rgb(6,146,85)]">
                                                                Miễn phí
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="mb-[0.75rem] flex items-center justify-between">
                                                        <div className="flex items-center">
                                                            <input
                                                                className="w-[18px] h-[18px] border-[2px] border-[rgb(6,146,85)] accent-[rgb(6,146,85)]"
                                                                type="checkbox"
                                                                id="checkbox10"
                                                                value="Hàng không xếp chồng"
                                                                onChange={handleCheckboxChange}
                                                            />
                                                            <label
                                                                className="pl-2"
                                                                htmlFor="checkbox10"
                                                            >
                                                                <span className="mr-[3px] font-normal">
                                                                    Hàng không xếp chồng
                                                                </span>
                                                            </label>
                                                        </div>
                                                        <div className="">
                                                            <span className="text-[rgb(6,146,85)] cursor-pointer border-b-[1px] border-[rgb(6,146,85)]">
                                                                Miễn phí
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="mb-[0.75rem] flex items-center justify-between">
                                                        <div className="flex items-center">
                                                            <input
                                                                className=" w-[18px] h-[18px] border-[2px] border-[rgb(6,146,85)] accent-[rgb(6,146,85)]"
                                                                type="checkbox"
                                                                id="checkbox11"
                                                                value="Hàng yêu cầu xếp đúng chiều"
                                                                onChange={handleCheckboxChange}
                                                            />
                                                            <label
                                                                className="pl-2"
                                                                htmlFor="checkbox11"
                                                            >
                                                                <span className="mr-[3px] font-normal">
                                                                    Hàng yêu cầu xếp đúng chiều
                                                                </span>
                                                            </label>
                                                        </div>
                                                        <div className="">
                                                            <span className="text-[rgb(6,146,85)] cursor-pointer border-b-[1px] border-[rgb(6,146,85)]">
                                                                Miễn phí
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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

export default CreateOrder;
