"use client";
import { IoIosArrowForward, IoIosArrowDown, IoMdSearch } from "react-icons/io";
import { FaCalendarAlt, FaChevronLeft, FaChevronRight, FaFilePdf, FaSearch } from "react-icons/fa";
import { FormEvent, useEffect, useState } from "react";
import { BiBorderRadius } from "react-icons/bi";
import { format } from "date-fns";
import "../../../styles/dang-ky.css";
import {
    changeStatus,
    exportPdf,
    getAllOrders,
    searchOrders,
    sendEmailOnFail,
    updateStatusOrder,
} from "@/utils/api";
import WebHeader from "@/components/headerIn";
import { toast } from "react-toastify";
const initialState = {
    timeDs: false,
    orderStatus: false,
    store: false,
};

const OrderList = () => {
    const [state, setState] = useState(initialState);
    const [isModalOpen, setModalOpen] = useState(false);
    const [isModalOpen1, setModalOpen1] = useState(false);
    const [isModalOpen2, setModalOpen2] = useState(false);

    const [orders, setOrders] = useState<IOrder[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [sortBy, setSortBy] = useState("orderCode");
    const [order, setOrder] = useState("asc");

    const [selectedWarehouse, setSelectedWarehouse] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const [keyword, setKeyword] = useState("");

    const [selectedReason, setSelectedReason] = useState("Khách hàng vắng, hẹn giao sau");

    const closeModal = () => {
        setModalOpen(false);
    };
    const closeModal1 = () => {
        setModalOpen1(false);
    };
    const closeModal2 = () => {
        setModalOpen2(false);
    };

    const openModal2 = () => {
        setModalOpen2(true);
    };
    const ordersList = async () => {
        try {
            const response = (await getAllOrders(currentPage, sortBy, order)).data;
            const orders = response.orders;
            const totalPages = response.totalPages;
            const totalElements = response.totalElements;

            setOrders(orders);
            setTotalPages(totalPages);
            setTotalElements(totalElements);
            console.log(orders);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    const handlePageChange = (newPage: number) => {
        if (newPage >= 0 && newPage < totalPages) {
            setCurrentPage(newPage);
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        }
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

    const handleChangeSelect = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = event.target;

        switch (name) {
            case "warehouse":
                setSelectedWarehouse(value);
                break;
            case "time":
                setSelectedTime(value);
                break;
            case "status":
                setSelectedStatus(value);
                break;
            default:
                break;
        }
    };
    console.log(selectedTime);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const data = await searchOrders(
                keyword,
                selectedStatus,
                selectedTime,
                selectedWarehouse,
                0
            );
            setOrders(data.orders);
            setTotalPages(data.totalPages);
            setTotalElements(data.totalElements);
        } catch (error) {
            console.error("Error searching orders:", error);
        }
    };

    const handleExport = async (orderCode: string) => {
        try {
            const response = await exportPdf(orderCode);
            console.log(response);

            if (response.status === 200) {
                toast.success("Export đơn hàng thành công!");
            } else {
                toast.error("Export đơn hàng thất bại!");
            }
        } catch (error) {
            console.error("Error export order:", error);
        }
    };
    const handleCloseModal = () => {
        const checkTrue = Object.values(state).some((value) => value === true);
        if (checkTrue) {
            setState(initialState);
        }
    };

    const handleResetFilters = () => {
        setCurrentPage(0);
        setKeyword("");
        setSelectedWarehouse("");
        setSelectedTime("");
        setSelectedStatus("");
    };

    const [selectedStatusOrder, setSelectedStatusOrder] = useState("");

    const [delivery, setDelivery] = useState({
        orderCode: "",
        status: "",
        comment: "",
    });
    const handleChangeCheckboxRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedReason(event.target.value);
        setDelivery((prevState) => ({
            ...prevState,
            comment: selectedReason,
        }));
    };
    useEffect(() => {
        setDelivery((prevState) => ({
            ...prevState,
            comment: selectedReason,
            status: selectedStatusOrder,
        }));
    }, [selectedReason, selectedStatusOrder]);

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedStatusOrder(e.target.value);
        if (e.target.value === "DELIVERY_FAIL") {
            setDelivery((prevState) => ({
                ...prevState,
                status: selectedStatusOrder,
            }));
            setModalOpen(true);
        } else {
            setModalOpen(false);
        }
        if (e.target.value === "DELIVERED") {
            setDelivery((prevState) => ({
                ...prevState,
                status: selectedStatusOrder,
            }));
            setModalOpen1(true);
        } else {
            setModalOpen1(false);
        }
    };

    const handleOpenSelect = (order: IOrder) => {
        const orderCode = order.orderCode;
        setDelivery((prevState) => ({
            ...prevState,
            orderCode: orderCode,
        }));
    };

    const [orderHistory, setOrderHistory] = useState<IOrderHistory[]>([]);
    const [currentOrder, setCurrentOrder] = useState<IOrder>();

    const statuses = ["NEW_ORDER", "IN_STORED", "DELIVERED", "DELIVERY_FAIL", "RETURNED"];

    const [orderStatuses, setOrderStatuses] = useState<{ [key: string]: IOrderHistory[] }>({});

    useEffect(() => {
        const statusMap: { [key: string]: IOrderHistory[] } = {};

        statuses.forEach((status) => {
            statusMap[status] = orderHistory.filter((order) => order.status === status);
        });

        setOrderStatuses(statusMap);
    }, [orderHistory]);
    console.log(orderStatuses.NEW_ORDER);

    const handleOpenTrackingOrder = (order: IOrder) => {
        setModalOpen2(true);
        console.log(order);

        setCurrentOrder(order);
        setOrderHistory(order.ordersHistories);
    };

    const handleChangeStatusOrder = async () => {
        try {
            const response = await updateStatusOrder(delivery);
            console.log(response);
            if (response.status === 200) {
                toast.success("Cập nhập trạng thái đơn hàng thành công!");
                ordersList();
            } else if (response.status === 406) {
                toast.error("Đơn hàng đã giao thất bại quá 3 lần không thể giao lại được nữa");
                const data = await sendEmailOnFail(delivery.orderCode);
                console.log(data);
            } else {
                toast.error("Cập nhập trạng thái đơn hàng thất bại!");
            }
            setSelectedReason("Khách hàng vắng, hẹn giao sau");
            closeModal(), closeModal1();
            setSelectedStatusOrder("");
            ordersList();
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        ordersList();
    }, [currentPage, sortBy, order]);
    return (
        <div onClick={() => handleCloseModal()} className="h-screen">
            {isModalOpen && (
                <div
                    className="fixed top-0 right-0 bottom-0 left-0 z-[9999] h-full bg-black bg-opacity-30"
                    onClick={closeModal}
                >
                    <div className="fixed top-0 right-0 bottom-0 left-0 overflow-auto outline-none overscroll-touch z-[9999]">
                        <div className="w-[500px] transform origin-726px-73px box-border px-0 pt-0 pb-[24px] text-black text-[17px]  leading-1.5715 list-none font-tnum relative top-[100px] mx-auto max-w-[calc(100vw-32px)]">
                            <div
                                onClick={(e) => e.stopPropagation()}
                                className="relative bg-white bg-clip-padding border-0 rounded-md shadow-box"
                            >
                                <div className="p-0">
                                    <div className="flex items-center justify-center bg-[rgb(6,146,85)] rounded-t-md">
                                        <div className="pt-[0.75rem] pb-[0.75rem] text-[1.125rem] leading-[1.75rem] font-semibold text-white">
                                            Chọn lý do giao hàng thất bại
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
                                    <div className="mt-3 p-5 px-10 overflow-auto max-w-full max-h-[650px]">
                                        <div className="mb-[0.75rem] flex items-center justify-between">
                                            <div className="flex items-center">
                                                <input
                                                    className="w-[20px] h-[20px] border-[2px] border-[rgb(6,146,85)] accent-[rgb(6,146,85)]"
                                                    type="radio"
                                                    id="radio1"
                                                    name="reason"
                                                    defaultChecked
                                                    value="LD1"
                                                    onChange={handleChangeCheckboxRadio}
                                                />
                                                <label className="pl-3" htmlFor="radio1">
                                                    <span className="mr-[3px] text-[17px]">
                                                        Khách hàng vắng, hẹn giao sau
                                                    </span>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="mb-[0.75rem] flex items-center justify-between">
                                            <div className="flex items-center">
                                                <input
                                                    className="w-[20px] h-[20px] border-[2px] border-[rgb(6,146,85)] accent-[rgb(6,146,85)]"
                                                    type="radio"
                                                    id="radio2"
                                                    name="reason"
                                                    value="LD2"
                                                    onChange={handleChangeCheckboxRadio}
                                                />
                                                <label className="pl-3" htmlFor="radio2">
                                                    <span className="mr-[3px] text-[17px]">
                                                        Không liên hệ được với khách hàng
                                                    </span>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="mb-[0.75rem] flex items-center justify-between">
                                            <div className="flex items-center">
                                                <input
                                                    className="w-[20px] h-[20px] border-[2px] border-[rgb(6,146,85)] accent-[rgb(6,146,85)]"
                                                    type="radio"
                                                    id="radio3"
                                                    name="reason"
                                                    value="LD3"
                                                    onChange={handleChangeCheckboxRadio}
                                                />
                                                <label className="pl-3" htmlFor="radio3">
                                                    <span className="mr-[3px] text-[17px]">
                                                        Từ chối nhận vì hàng không như mô tả
                                                    </span>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="mb-[0.75rem] flex items-center justify-between">
                                            <div className="flex items-center">
                                                <input
                                                    className="w-[20px] h-[20px] border-[2px] border-[rgb(6,146,85)] accent-[rgb(6,146,85)]"
                                                    type="radio"
                                                    id="radio4"
                                                    name="reason"
                                                    value="LD4"
                                                    onChange={handleChangeCheckboxRadio}
                                                />
                                                <label className="pl-3" htmlFor="radio4">
                                                    <span className="mr-[3px] text-[17px]">
                                                        Từ chối nhận vì kiện hàng rách/móp
                                                    </span>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="mb-[0.75rem] flex items-center justify-between">
                                            <div className="flex items-center">
                                                <input
                                                    className="w-[20px] h-[20px] border-[2px] border-[rgb(6,146,85)] accent-[rgb(6,146,85)]"
                                                    type="radio"
                                                    id="radio5"
                                                    name="reason"
                                                    value="Lý do khác"
                                                    onChange={handleChangeCheckboxRadio}
                                                />
                                                <label className="pl-3" htmlFor="radio5">
                                                    <span className="mr-[3px] text-[17px]">
                                                        Lý do khác
                                                    </span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-3 text-center border-t border-gray-300">
                                        <button
                                            onClick={handleChangeStatusOrder}
                                            className="mb-1 min-w-[200px] font-semibold pt-[0.5rem] pb-[0.5rem] border-0 text-white rounded-md border-none outline-none bg-[rgb(6,146,85)]"
                                        >
                                            {" "}
                                            Gửi
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {isModalOpen1 && (
                <div
                    className="fixed top-0 right-0 bottom-0 left-0 z-[9999] h-full bg-black bg-opacity-30"
                    onClick={closeModal1}
                >
                    <div className="fixed top-0 right-0 bottom-0 left-0 overflow-auto outline-none overscroll-touch z-[9999]">
                        <div className="w-[700px] transform origin-726px-73px box-border px-0 pt-0 pb-[24px] text-black text-[17px] leading-1.5715 list-none font-tnum relative top-[100px] mx-auto max-w-[calc(100vw-32px)]">
                            <div
                                onClick={(e) => e.stopPropagation()}
                                className="relative bg-white bg-clip-padding border-0 rounded-md shadow-box"
                            >
                                <div className="p-0">
                                    <div className="flex items-center justify-center bg-[rgb(6,146,85)] rounded-t-md">
                                        <div className="pt-[0.75rem] pb-[0.75rem] text-[1.125rem] leading-[1.75rem] font-semibold text-white">
                                            Bạn có thật sự xác nhận giao hàng thành công hay không?
                                        </div>
                                        <button
                                            onClick={closeModal1}
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

                                    <div className="p-3 py-10 text-center border-t border-gray-300">
                                        <button
                                            onClick={handleChangeStatusOrder}
                                            className="mr-4 px-5 mb-1 min-w-[200px] font-semibold pt-[0.5rem] pb-[0.5rem] border-0 text-white rounded-md border-none outline-none bg-[rgb(6,146,85)]"
                                        >
                                            {" "}
                                            Có
                                        </button>
                                        <button
                                            onClick={closeModal1}
                                            className="ml-4 mb-1 min-w-[200px] font-semibold pt-[0.5rem] pb-[0.5rem]  text-[rgb(6,146,85)] rounded-md border border-[rgb(6,146,85)] outline-none "
                                        >
                                            {" "}
                                            Không
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {isModalOpen2 && (
                <div
                    className="fixed top-0 right-0 bottom-0 left-0 z-[9999] h-full bg-black bg-opacity-30"
                    onClick={closeModal2}
                >
                    <div className="fixed top-0 right-0 bottom-0 left-0 overflow-auto outline-none overscroll-touch z-[9999]">
                        <div className="w-[700px] transform origin-726px-73px box-border px-0 pt-0 pb-[24px] text-black text-[17px] leading-1.5715 list-none font-tnum relative top-[100px] mx-auto max-w-[calc(100vw-32px)]">
                            <div
                                onClick={(e) => e.stopPropagation()}
                                className="relative bg-white bg-clip-padding border-0 rounded-md shadow-box"
                            >
                                <div className="p-0">
                                    <div className="flex items-center justify-center bg-[rgb(6,146,85)] rounded-t-md">
                                        <div className="pt-[0.75rem] pb-[0.75rem] text-[1.125rem] leading-[1.75rem] font-semibold text-white">
                                            Thông tin vận chuyển
                                        </div>
                                        <button
                                            onClick={closeModal2}
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
                                    <div className="p-3 py-3 text-[18px] font-semibold text-center border-t border-gray-300">
                                        <div className="mt-1">
                                            Mã đơn hàng: {currentOrder?.orderCode}
                                        </div>
                                        {orderStatuses.DELIVERY_FAIL.length >= 3 && (
                                            <div className="text-red-600 mt-1">Trả hàng</div>
                                        )}
                                        {currentOrder?.orderStatus === "DELIVERY_FAIL" && (
                                            <div className="text-yellow-500 mt-1">
                                                Giao hàng thất bại
                                            </div>
                                        )}
                                        {currentOrder?.orderStatus === "DELIVERED" && (
                                            <div className="text-[rgb(6,146,85)] mt-1">Đã giao</div>
                                        )}
                                        {currentOrder?.orderStatus === "IN_STORED" && (
                                            <div className="text-[rgb(6,146,85)] mt-1">
                                                Đã lưu kho
                                            </div>
                                        )}
                                        {currentOrder?.orderStatus === "NEW_ORDER" && (
                                            <div className="text-[rgb(6,146,85)] mt-1">
                                                Đang chờ xác thực
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-3 py-10 text-center border-t border-gray-300">
                                        <div>
                                            <div className="row content">
                                                <div className="timeline">
                                                    {orderStatuses.DELIVERY_FAIL.length >= 3 && (
                                                        <div
                                                            className={
                                                                orderStatuses.DELIVERY_FAIL
                                                                    .length >= 3
                                                                    ? "item active"
                                                                    : "item"
                                                            }
                                                        >
                                                            <div className="item-label">
                                                                <div className="item-label-date">
                                                                    {format(
                                                                        orderStatuses
                                                                            .DELIVERY_FAIL[2]
                                                                            .updateAt,
                                                                        "dd.MM.yyyy"
                                                                    )}
                                                                </div>
                                                                <div className="item-label-hour">
                                                                    {format(
                                                                        orderStatuses
                                                                            .DELIVERY_FAIL[2]
                                                                            .updateAt,
                                                                        "HH:mm"
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div className="item-description">
                                                                <div className="item-description-status">
                                                                    Đơn hàng đã được trả lại
                                                                </div>
                                                                <div className="item-description-location">
                                                                    Không thể giao lại
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                    {(orderStatuses.DELIVERY_FAIL.length <= 2 &&
                                                        orderStatuses.DELIVERED.length > 0) ||
                                                    (currentOrder?.orderStatus != "DELIVERED" &&
                                                        currentOrder?.orderStatus != "RETURNED") ? (
                                                        <div
                                                            className={
                                                                orderStatuses.DELIVERED?.length > 0
                                                                    ? "item active"
                                                                    : "item bg-gray-100"
                                                            }
                                                        >
                                                            <div className="item-label">
                                                                <div className="item-label-date">
                                                                    {orderStatuses.DELIVERED
                                                                        .length > 0
                                                                        ? format(
                                                                              orderStatuses
                                                                                  .DELIVERED[0]
                                                                                  .updateAt,
                                                                              "dd.MM.yyyy"
                                                                          )
                                                                        : "--.--.----"}
                                                                </div>
                                                                <div className="item-label-hour">
                                                                    {orderStatuses.DELIVERED
                                                                        .length > 0
                                                                        ? format(
                                                                              orderStatuses
                                                                                  .DELIVERED[0]
                                                                                  .updateAt,
                                                                              "HH:mm"
                                                                          )
                                                                        : "--:--"}
                                                                </div>
                                                            </div>
                                                            <div className="item-description">
                                                                <div
                                                                    className={
                                                                        orderStatuses.DELIVERED
                                                                            .length > 0
                                                                            ? "item-description-status"
                                                                            : "item-description-status text-gray-400"
                                                                    }
                                                                >
                                                                    Đã giao hàng thành công
                                                                </div>
                                                                <div className="item-description-location">
                                                                    Đã xuất kho
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        ""
                                                    )}
                                                    {orderStatuses.DELIVERY_FAIL.length <= 2 &&
                                                        orderStatuses.DELIVERY_FAIL.length >= 1 &&
                                                        orderStatuses.DELIVERED.length == 0 && (
                                                            <div
                                                                className={
                                                                    orderStatuses.DELIVERY_FAIL
                                                                        ?.length > 0
                                                                        ? "item active"
                                                                        : "item bg-gray-100"
                                                                }
                                                            >
                                                                <div className="item-label">
                                                                    <div className="item-label-date">
                                                                        {orderStatuses.DELIVERY_FAIL
                                                                            .length > 0
                                                                            ? format(
                                                                                  orderStatuses
                                                                                      .DELIVERY_FAIL[0]
                                                                                      .updateAt,
                                                                                  "dd.MM.yyyy"
                                                                              )
                                                                            : "--.--.----"}
                                                                    </div>
                                                                    <div className="item-label-hour">
                                                                        {orderStatuses.DELIVERY_FAIL
                                                                            .length > 0
                                                                            ? format(
                                                                                  orderStatuses
                                                                                      .DELIVERY_FAIL[0]
                                                                                      .updateAt,
                                                                                  "HH:mm"
                                                                              )
                                                                            : "--:--"}
                                                                    </div>
                                                                </div>
                                                                <div className="item-description">
                                                                    <div
                                                                        className={
                                                                            orderStatuses
                                                                                .DELIVERY_FAIL
                                                                                .length > 0
                                                                                ? "item-description-status"
                                                                                : "item-description-status text-gray-400"
                                                                        }
                                                                    >
                                                                        Giao hàng thất bại (
                                                                        {
                                                                            orderStatuses
                                                                                .DELIVERY_FAIL
                                                                                .length
                                                                        }
                                                                        )
                                                                    </div>
                                                                    <div className="item-description-location">
                                                                        {
                                                                            orderStatuses
                                                                                .DELIVERY_FAIL[
                                                                                orderStatuses
                                                                                    .DELIVERY_FAIL
                                                                                    .length - 1
                                                                            ].comment
                                                                        }{" "}
                                                                        (Có thể giao lại)
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    <div
                                                        className={
                                                            orderStatuses.IN_STORED?.length > 0
                                                                ? "item active"
                                                                : "item bg-gray-100"
                                                        }
                                                    >
                                                        <div className="item-label">
                                                            <div className="item-label-date">
                                                                {orderStatuses.IN_STORED.length > 0
                                                                    ? format(
                                                                          orderStatuses.IN_STORED[0]
                                                                              .updateAt,
                                                                          "dd.MM.yyyy"
                                                                      )
                                                                    : "--.--.----"}
                                                            </div>
                                                            <div className="item-label-hour">
                                                                {orderStatuses.IN_STORED.length > 0
                                                                    ? format(
                                                                          orderStatuses.IN_STORED[0]
                                                                              .updateAt,
                                                                          "HH:mm"
                                                                      )
                                                                    : "--:--"}
                                                            </div>
                                                        </div>
                                                        <div className="item-description">
                                                            <div
                                                                className={
                                                                    orderStatuses.IN_STORED.length >
                                                                    0
                                                                        ? "item-description-status"
                                                                        : "item-description-status text-gray-400"
                                                                }
                                                            >
                                                                Đã lưu kho
                                                            </div>
                                                            {orderStatuses.IN_STORED.length > 0 ? (
                                                                <div className="item-description-location">
                                                                    {
                                                                        currentOrder?.warehouse
                                                                            ?.warehouseName
                                                                    }
                                                                </div>
                                                            ) : (
                                                                ""
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="item active">
                                                        <div className="item-label">
                                                            <div className="item-label-date">
                                                                {currentOrder &&
                                                                    currentOrder.createDate &&
                                                                    format(
                                                                        currentOrder.createDate,
                                                                        "dd.MM.yyyy"
                                                                    )}
                                                            </div>
                                                            <div className="item-label-hour">
                                                                {currentOrder &&
                                                                    currentOrder.createDate &&
                                                                    format(
                                                                        currentOrder.createDate,
                                                                        "HH:mm"
                                                                    )}
                                                            </div>
                                                        </div>
                                                        <div className="item-description">
                                                            <div className="item-description-status">
                                                                Đơn hàng đang xác thực
                                                            </div>
                                                            <div className="item-description-location">
                                                                Chưa về kho
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
            )}
            <WebHeader />
            <div className="mx-7 xl:container xl:w-[1350px] xl:mx-auto mt-5">
                {/* bearcrum */}
                <div className="flex overflow-hidden items-center ">
                    <h3 className="font-semibold text-lg mr-4">Quản lý đơn hàng</h3>
                    <p className="text-[rgb(6,146,85)]  flex items-center mr-1 text-nowrap">
                        {/* <span className="text-black mr-1 font-medium">Chưa tiếp nhận</span>{" "} */}
                        Chưa tiếp nhận
                        <span className="ml-1">
                            {" "}
                            <IoIosArrowForward />{" "}
                        </span>
                    </p>
                    <p className="text-[rgb(6,146,85)]  flex items-center mr-1 text-nowrap">
                        Đã tiếp nhận{" "}
                        <span className="ml-1">
                            {" "}
                            <IoIosArrowForward />{" "}
                        </span>
                    </p>
                    <p className="text-[rgb(6,146,85)]  flex items-center mr-1 text-nowrap">
                        Đã giao hàng{" "}
                        <span className="ml-1">
                            {" "}
                            <IoIosArrowForward />{" "}
                        </span>
                    </p>
                    <p className="text-[rgb(6,146,85)]  flex items-center mr-1 text-nowrap">
                        Giao hàng thất bại{" "}
                        <span className="ml-1">
                            {" "}
                            <IoIosArrowForward />{" "}
                        </span>
                    </p>
                    <p className="text-[rgb(6,146,85)]  flex items-center mr-1 text-nowrap">
                        Trả hàng{" "}
                    </p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-3 md:grid-cols-5 gap-x-4 gap-y-2 mt-5">
                        <div className="col-span-3 md:col-span-2 flex items-center w-full rounded-md border">
                            <IoMdSearch className="text-[rgb(6,146,85)] text-3xl cursor-pointer mx-3 " />
                            <input
                                placeholder="Nhập tên, SĐT, mã đơn hàng GHTK, mã đơn hàng riêng"
                                className="w-full focus:outline-none text-ellipsis"
                                name="keyword"
                                value={keyword}
                                onChange={handleChangeInput}
                            />
                        </div>

                        {/* timeDs */}
                        <div className="relative flex rounded-md border items-center">
                            <div className="relative w-full">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                    <svg
                                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                    </svg>
                                </div>
                                <input
                                    type="date"
                                    className=" border rounded-md  text-gray-900 text-sm  block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"
                                    placeholder="Select date"
                                    name="time"
                                    value={selectedTime}
                                    onChange={handleChangeSelect}
                                />
                            </div>
                        </div>
                        {/* order status */}
                        <div className="relative flex px-5 rounded-md border items-center">
                            <select
                                name="status"
                                value={selectedStatus}
                                onChange={handleChangeSelect}
                                id="hs-dropdown-default"
                                className="w-full flex items-center justify-between text-gray-900 truncate focus:outline-none"
                            >
                                <option value="">Chọn trạng thái đơn hàng</option>
                                <option value="NEW_ORDER">Chờ xác nhận</option>
                                <option value="IN_STORED">Đã lưu kho</option>
                                <option value="DELIVERED">Đã giao</option>
                                <option value="DELIVERY_FAIL">Giao hàng thất bại</option>
                                <option value="RETURNED">Trả hàng</option>
                            </select>
                        </div>
                        {/* service */}

                        {/* store */}
                        <div className="relative flex px-5 rounded-md border items-center py-1">
                            <select
                                id="hs-dropdown-default"
                                className="w-full flex items-center justify-between text-gray-900 text-ellipsis  focus:outline-none"
                                name="warehouse"
                                value={selectedWarehouse}
                                onChange={handleChangeSelect}
                            >
                                <option value="">Chọn kho hàng</option>
                                <option value="K-AC">Kho Âu Cơ</option>
                                <option value="K-DN">Kho Dương Nội</option>
                                <option value="K-HVT">Kho Hoàng Văn Thái</option>
                                <option value="K-KG">Kho Kim Giang</option>
                                <option value="K-LD">Kho Linh Đàm</option>
                                <option value="K-LH">Kho Láng Hạ</option>
                                <option value="K-LT">Kho La Thành</option>
                                <option value="K-MD">Kho Miếu Đầm</option>
                                <option value="K-ML2">Kho Mê Linh 2</option>
                                <option value="K-ND">Kho Nghĩa Đô</option>
                                <option value="K-PK">Kho Phùng Khoang</option>
                                <option value="K-PNL">Kho Phạm Ngũ Lão</option>
                                <option value="K-SD">Kho Sơn Đồng</option>
                                <option value="K-SS">Kho Sóc Sơn</option>
                                <option value="K-TD">Kho Trương Định</option>
                                <option value="K-TTT">Kho Tôn Thất Thuyết</option>
                                <option value="K-XL">Kho Xuân La</option>
                                <option value="K-XP">Kho Xuân Phương</option>
                                <option value="K-YL">Kho Ỷ Lan </option>
                                <option value="K-YX">Kho Yên Xá</option>
                            </select>
                        </div>
                    </div>
                    <div className="my-5 flex justify-between items-center">
                        <h3></h3>
                        <div className="flex items-center">
                            <button
                                onClick={handleResetFilters}
                                className="text-red-500 cursor-pointer border border-red-500 rounded-md px-3 py-1 mx-4"
                            >
                                Xóa bộ lọc
                            </button>
                            <button
                                type="submit"
                                className=" bg-[rgb(6,146,85)] cursor-pointer border border-[rgb(6,146,85)] text-white rounded-md px-3 py-1"
                            >
                                Tìm kiếm
                            </button>
                        </div>
                    </div>
                </form>

                {/* table */}
                <div className="relative overflow-x-auto border border-solid border-gray-300 ">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-center text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b border-gray-300">
                            <tr>
                                <th scope="col" className="w-[10%] px-6 py-3">
                                    Mã đơn hàng
                                </th>
                                <th scope="col" className="w-[55%] px-6 py-3">
                                    Thông tin đơn hàng
                                </th>
                                <th scope="col" className="w-[15%] px-6 py-3">
                                    Cập nhập
                                </th>
                                <th scope="col" className="w-[20%] px-2 py-3">
                                    Thao tác
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {/* if exist */}
                            {orders?.map((order, index) => (
                                <tr
                                    key={index}
                                    className=" bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-600"
                                >
                                    <td
                                        scope="row"
                                        className="w-[15%] px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        {order.orderCode}
                                    </td>
                                    <td className="w-[45%] px-6 py-4 text-gray-900">
                                        <div className="text-left pb-2 border-b border-gray-300">
                                            <p>
                                                <span className="font-semibold text-black mr-1">
                                                    Tên nhà cung cấp:
                                                </span>{" "}
                                                {order.providerName}
                                            </p>
                                            <p>
                                                <span className="font-semibold text-black mr-1">
                                                    Số điện thoại NCC:
                                                </span>{" "}
                                                {order.providerPhone}
                                            </p>
                                            <p>
                                                <span className="font-semibold text-black mr-1">
                                                    Email NCC:
                                                </span>{" "}
                                                {order.providerEmail}
                                            </p>
                                            <p>
                                                <span className="font-semibold text-black mr-1">
                                                    Địa chỉ NCC:
                                                </span>{" "}
                                                {order.providerAddress}
                                            </p>
                                        </div>
                                        <div className="text-left mt-2">
                                            <p>
                                                <span className="font-semibold text-black mr-1">
                                                    Tên bên nhận hàng:
                                                </span>{" "}
                                                {order.receiverName}
                                            </p>
                                            <p>
                                                <span className="font-semibold text-black mr-1">
                                                    Số điện thoại BNH:
                                                </span>{" "}
                                                {order.receiverPhone}
                                            </p>
                                            <p>
                                                <span className="font-semibold text-black mr-1">
                                                    Email BNH:
                                                </span>{" "}
                                                {order.receiverEmail}
                                            </p>
                                            <p>
                                                <span className="font-semibold text-black mr-1">
                                                    Địa chỉ BNH:
                                                </span>{" "}
                                                {order.receiverAddress}
                                            </p>
                                        </div>
                                    </td>
                                    <td className="text-gray-900 w-[20%] px-6 py-4">
                                        {order.orderStatus === "NEW_ORDER" && (
                                            <p className="font-semibold text-black mr-1">
                                                Đang xác thực
                                            </p>
                                        )}
                                        {order.orderStatus === "IN_STORED" && (
                                            <p className="font-semibold text-black mr-1">
                                                Đã lưu kho
                                            </p>
                                        )}
                                        {order.orderStatus === "DELIVERED" && (
                                            <p className="font-semibold text-black mr-1">
                                                Đã giao hàng
                                            </p>
                                        )}
                                        {order.orderStatus === "DELIVERY_FAIL" && (
                                            <p className="font-semibold text-black mr-1">
                                                Giao hàng thất bại
                                            </p>
                                        )}
                                        {order.orderStatus === "RETURNED" && (
                                            <p className="font-semibold text-black mr-1">
                                                Trả hàng
                                            </p>
                                        )}
                                        {order.orderStatus !== "DELIVERED" &&
                                            order.orderStatus !== "DELIVERY_FAIL" &&
                                            order.orderStatus !== "RETURNED" &&
                                            order.warehouse !== null && (
                                                <p>Kho hàng: {order.warehouse?.warehouseName}</p>
                                            )}

                                        {order.orderStatus === "IN_STORED" && (
                                            <div className="border-[rgb(6,146,85)] relative flex px-2 rounded-md border items-center mt-1">
                                                <select
                                                    onClick={() => handleOpenSelect(order)}
                                                    value={selectedStatusOrder}
                                                    onChange={handleSelectChange}
                                                    id="hs-dropdown-default"
                                                    className="text-[16px] py-1 font-semibold flex items-center justify-between text-[rgb(6,146,85)]  truncate focus:outline-none"
                                                >
                                                    <option value="">Cập nhập trạng thái</option>
                                                    <option value="DELIVERY_FAIL">
                                                        Giao hàng thất bại
                                                    </option>
                                                    <option value="DELIVERED">
                                                        Giao hàng thành công
                                                    </option>
                                                </select>
                                            </div>
                                        )}
                                        {order.orderStatus === "DELIVERY_FAIL" && (
                                            <div className="border-[rgb(6,146,85)] relative flex px-2 rounded-md border items-center mt-1">
                                                <select
                                                    onClick={() => handleOpenSelect(order)}
                                                    value={selectedStatusOrder}
                                                    onChange={handleSelectChange}
                                                    id="hs-dropdown-default"
                                                    className="text-[16px] py-1 font-semibold flex items-center justify-between text-[rgb(6,146,85)]  truncate focus:outline-none"
                                                >
                                                    <option value="">Cập nhập trạng thái</option>
                                                    <option value="DELIVERY_FAIL">
                                                        Giao hàng thất bại
                                                    </option>
                                                    <option value="DELIVERED">
                                                        Giao hàng thành công
                                                    </option>
                                                </select>
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-[83px] w-[250px] flex items-center justify-center">
                                        {(order.orderStatus === "IN_STORED" ||
                                            order.orderStatus === "DELIVERED" ||
                                            order.orderStatus === "DELIVERY_FAIL" ||
                                            order.orderStatus === "RETURNED") && (
                                            <button
                                                onClick={() => {
                                                    handleExport(order.orderCode);
                                                }}
                                                className="m-1 bg-[rgb(6,146,85)] text-white cursor-pointer rounded-md flex items-center py-[7px] px-[12px]  transition duration-150 ease-linear hover:opacity-90 "
                                            >
                                                <span className="mr-1">Export file PDF</span>{" "}
                                                <FaFilePdf />
                                            </button>
                                        )}

                                        <button
                                            onClick={() => handleOpenTrackingOrder(order)}
                                            className="m-1 rounded-md py-[10px] px-[12px] border border-[rgb(6,146,85)] text-[rgb(6,146,85)] transition duration-150 ease-linear hover:bg-[rgb(6,146,85)] hover:text-white"
                                        >
                                            <FaSearch />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {orders.length === 0 && (
                        <div className="w-full text-center">
                            <div className=" my-12">
                                <BiBorderRadius className="text-8xl mx-auto text-gray-500" />
                                <p className="text-gray-500 text-sm mt-1">Danh sách trống</p>
                            </div>
                        </div>
                    )}
                </div>
                <div className="pb-5 pt-2">
                    <div className={orders.length == 0 ? "hidden" : ""}>
                        <div className="flex justify-center ml-3 py-2 items-center">
                            <div
                                className="p-2 bg-[rgb(6,146,85)] font-semibold text-white rounded-[5px] m-1 cursor-pointer transition duration-150 ease-linear hover:opacity-90"
                                onClick={() => handlePageChange(currentPage - 1)}
                            >
                                <FaChevronLeft />
                            </div>
                            {Array.from({ length: totalPages }).map((_, index) => (
                                <div
                                    key={index}
                                    className={`py-1 px-3 bg-[rgb(6,146,85)] font-semibold text-white rounded-[5px] m-1 cursor-pointer transition duration-150 ease-linear hover:opacity-90 ${
                                        currentPage === index ? "bg-green-950" : ""
                                    }`}
                                    onClick={() => handlePageChange(index)}
                                >
                                    {index + 1}
                                </div>
                            ))}
                            <div
                                className="p-2 bg-[rgb(6,146,85)] font-semibold text-white rounded-[5px] m-1 cursor-pointer transition duration-150 ease-linear hover:opacity-90"
                                onClick={() => handlePageChange(currentPage + 1)}
                            >
                                <FaChevronRight />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderList;
