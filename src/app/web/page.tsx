"use client";
import {
    Chart,
    ArcElement,
    Tooltip,
    Legend,
    ChartOptions,
    BarElement,
    CategoryScale,
    LinearScale,
} from "chart.js";
import WebHeader from "@/components/headerIn";
import "../../styles/dang-ky.css";
import { useEffect, useState } from "react";
import { getDaily, getOrderStatistical, getStatistical, getWarehouses } from "@/utils/api";
import DailyChart from "@/components/chart/daily-chart";
import StatisticalTable from "@/components/table/statiscal-table";
import { FaFileExcel } from "react-icons/fa";
import DailyTable from "@/components/table/daily-table";
import * as XLSX from "xlsx";
import StatisticalChart from "@/components/chart/statiscals-chart";
Chart.register(BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);
const barOptions: ChartOptions<"bar"> = {
    scales: {
        x: {},
        y: {
            beginAtZero: true,
        },
    },
    plugins: {
        legend: {
            position: "bottom",
        },
    },
};
// ------------------------------------------------------------------------
const WebPage = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [activeDay, setActiveDay] = useState<number | null>(1);
    const [viewTypeStatistical, setViewTypeStatistical] = useState("bd");
    const [viewTypeDaily, setViewTypeDaily] = useState("bd");
    const hours = currentTime.getHours();
    const minutes =
        currentTime.getMinutes() < 10
            ? "0" + currentTime.getMinutes()
            : currentTime.getMinutes().toString();
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);
    const formatDate = (date: Date) => {
        return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date
            .getDate()
            .toString()
            .padStart(2, "0")}`;
    };
    const nextDay = new Date(currentTime);
    nextDay.setDate(currentTime.getDate() + 1);
    const initDateSelect = {
        from: formatDate(currentTime),
        to: formatDate(nextDay),
        warehouseCode: "",
    };

    // ------------------------------------------------------------------------
    const [dateSelect, setDateSelect] = useState<IDateSelect>(initDateSelect);
    const [warehouses, setWarehouses] = useState<IWardHouser[]>();
    const [statistics, setStatistics] = useState<IStatistical[]>();
    const [dailys, setDailys] = useState<IDaily[]>();
    const [orderStatistical, setOrderStatistical] = useState<IOrderStatistical>({
        delivered: 0,
        deliveryFail: 0,
        inStore: 0,
        returned: 0,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getWarehouses();
                setWarehouses(response);
                setDateSelect((prev) => ({
                    ...prev,
                    warehouseCode: response[0].warehouseCode,
                }));
                setDateSelect;
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getStatistical(dateSelect);
                const parseData: IStatistical[] = response.map((data: any) => ({
                    ...data,
                    date: new Date(data.date).toISOString().split("T")[0],
                }));
                setStatistics(parseData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [dateSelect]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (dateSelect.warehouseCode != "") {
                    const response = await getDaily(dateSelect);
                    const parseData: IDaily[] = response.map((data: any) => ({
                        ...data,
                        date: new Date(data.date).toISOString().split("T")[0],
                    }));
                    setDailys(parseData);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [dateSelect]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (dateSelect.warehouseCode != "") {
                    const response = await getOrderStatistical(dateSelect);
                    console.log(response);
                    setOrderStatistical(response);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [dateSelect]);
    // ------------------------------------------------------------------------

    const setWarehouseCode = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (e.target && e.target.value) {
            setDateSelect((prev) => ({
                ...prev,
                warehouseCode: e.target.value,
            }));
        }
    };
    const updateDateRange = (days: number): void => {
        const currentTime = new Date(nextDay);
        const targetDate = new Date(currentTime);
        targetDate.setDate(currentTime.getDate() - days);

        setDateSelect((prev) => ({
            ...prev,
            from: formatDate(targetDate),
            to: formatDate(currentTime),
        }));

        setActiveDay(days);
    };

    const handleButtonClick = (days: number): void => {
        if (days === 0) {
            setDateSelect(initDateSelect);
            setActiveDay(null);
        } else {
            updateDateRange(days);
        }
    };

    console.log();

    return (
        <div className="h-screen no-scrollbar ">
            <WebHeader />
            <div className="pb-10">
                <div className="mx-7 xl:container xl:w-[1350px] xl:mx-auto">
                    <div className="xl:flex block items-center my-5 justify-between">
                        <div className="flex items-center">
                            <h3 className="text-2xl font-semibold ">Tổng quan</h3>
                            <p className="mx-2">
                                <svg
                                    width="31"
                                    height="23"
                                    viewBox="0 0 31 23"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="icon-live-anim"
                                >
                                    <path
                                        d="M17.1617 13.1584C15.9728 14.3447 14.0461 14.3447 12.8573 13.1584C11.6688 11.9722 11.6688 10.0487 12.8573 8.86245C14.0461 7.6762 15.9728 7.6762 17.1617 8.86245C18.3501 10.0487 18.3501 11.9722 17.1617 13.1584Z"
                                        fill="#EF4444"
                                    />
                                    <path
                                        d="M21.3132 17.761C20.9424 17.761 20.5716 17.6195 20.2893 17.3361C19.7247 16.7707 19.7258 15.8547 20.2911 15.2905C21.4368 14.147 22.0676 12.6269 22.0676 11.0102C22.0676 9.39359 21.4368 7.87348 20.2911 6.73001C19.7258 6.16541 19.7247 5.24976 20.2893 4.68406C20.8535 4.11872 21.7695 4.11762 22.3349 4.68223C24.0283 6.37238 24.9608 8.61945 24.9608 11.0102C24.9608 13.4007 24.0283 15.6481 22.3349 17.3382C22.0526 17.6202 21.6829 17.761 21.3132 17.761Z"
                                        fill="#EF4444"
                                    />
                                    <path
                                        d="M24.5865 22.0196C24.2157 22.0196 23.845 21.8781 23.5627 21.595C22.998 21.0293 22.9991 20.1137 23.5645 19.5491C25.85 17.268 27.109 14.2355 27.109 11.0098C27.109 7.78422 25.85 4.75168 23.5645 2.47059C22.9991 1.90599 22.998 0.990341 23.5627 0.424641C24.1273 -0.140693 25.0429 -0.14179 25.6082 0.422813C28.4415 3.25058 30.0022 7.01045 30.0018 11.0098C30.0018 15.0092 28.4415 18.7695 25.6082 21.5972C25.3259 21.8788 24.9562 22.0196 24.5865 22.0196Z"
                                        fill="#EF4444"
                                    />
                                    <path
                                        d="M8.68734 17.7611C8.31764 17.7611 7.94794 17.6203 7.66527 17.3384C5.97183 15.6482 5.03936 13.4008 5.03936 11.0104C5.03936 8.61959 5.97183 6.37252 7.66527 4.68236C8.23061 4.11776 9.14662 4.11849 9.71086 4.68419C10.2755 5.24953 10.2744 6.16554 9.70903 6.73015C8.56337 7.87361 7.93258 9.39372 7.93258 11.0104C7.93258 12.627 8.56337 14.1471 9.70903 15.2906C10.2744 15.8548 10.2755 16.7709 9.71086 17.3362C9.42856 17.6192 9.05777 17.7611 8.68734 17.7611Z"
                                        fill="#EF4444"
                                    />
                                    <path
                                        d="M5.41565 22.0198C5.04559 22.0198 4.67589 21.879 4.39359 21.5971C1.56034 18.7693 0 15.0094 0 11.01C0 7.01027 1.56034 3.2504 4.39359 0.42263C4.95892 -0.141607 5.87494 -0.140876 6.43918 0.424824C7.00378 0.990158 7.00268 1.90581 6.43735 2.47041C4.15188 4.75149 2.89286 7.78404 2.89286 11.0097C2.89286 14.2353 4.15188 17.2682 6.43735 19.5493C7.00268 20.1139 7.00378 21.0295 6.43918 21.5952C6.15687 21.8783 5.78608 22.0198 5.41565 22.0198Z"
                                        fill="#EF4444"
                                    />
                                </svg>
                            </p>
                            <p>
                                Live - <span>{`${hours}:${minutes}`}</span>
                            </p>
                        </div>
                        <div className=" md:justify-end my-3 flex overflow-hidden">
                            <div
                                className={`${
                                    activeDay === 1 && "bg-[rgb(6,146,85)] text-white"
                                } bg-[rgb(234,234,234)] rounded-full px-5 py-2 ml-2 text-nowrap cursor-pointer `}
                                onClick={() => handleButtonClick(1)}
                            >
                                Hôm nay
                            </div>
                            <div
                                className={`${
                                    activeDay === 7 && "bg-[rgb(6,146,85)] text-white"
                                } bg-[rgb(234,234,234)] rounded-full px-5 py-2 ml-2 text-nowrap cursor-pointer `}
                                onClick={() => handleButtonClick(7)}
                            >
                                7 ngày trước
                            </div>
                            <div
                                className={`${
                                    activeDay === 30 && "bg-[rgb(6,146,85)] text-white"
                                } bg-[rgb(234,234,234)] rounded-full px-5 py-2 ml-2 text-nowrap cursor-pointer `}
                                onClick={() => handleButtonClick(30)}
                            >
                                15 ngày trước
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 xl:grid-cols-4">
                        <div className=" p-4 relative border border-gray-200 rounded-lg font-semibold mt-7 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)]">
                            <div className="px-4 py-2 absolute -top-5 border border-gray-200 rounded-lg bg-white">
                                Phát sinh
                            </div>
                            <div className="py-8 px-10 flex items-center  ">
                                <p className="font-extrabold text-4xl mx-2 text-yellow-500">
                                    {orderStatistical?.deliveryFail}
                                </p>{" "}
                                <p className="translate-y-1">Đơn hàng</p>
                            </div>
                        </div>
                        <div className=" p-4 relative border border-gray-200 rounded-lg font-semibold mt-7 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)]">
                            <div className="px-4 py-2 absolute -top-5 border border-gray-200 rounded-lg bg-white">
                                Thành công
                            </div>
                            <div className="py-8 px-10 flex items-center  ">
                                <p className="font-extrabold text-4xl mx-2 text-green-500">
                                    {orderStatistical?.delivered}
                                </p>{" "}
                                <p className="translate-y-1">Đơn hàng</p>
                            </div>
                        </div>
                        <div className=" p-4 relative border border-gray-200 rounded-lg font-semibold mt-7 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)]">
                            <div className="px-4 py-2 absolute -top-5 border border-gray-200 rounded-lg bg-white">
                                Thất bại
                            </div>
                            <div className="py-8 px-10 flex items-center  ">
                                <p className="font-extrabold text-4xl mx-2 text-red-500">
                                    {orderStatistical?.returned}
                                </p>{" "}
                                <p className="translate-y-1">Đơn hàng</p>
                            </div>
                        </div>
                        <div className=" p-4 relative border border-gray-200 rounded-lg font-semibold mt-7 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)]">
                            <div className="px-4 py-2 absolute -top-5 border border-gray-200 rounded-lg bg-white">
                                Đang lưu kho
                            </div>
                            <div className="py-8 px-10 flex items-center  ">
                                <p className="font-extrabold text-4xl mx-2 text-blue-500">
                                    {orderStatistical?.inStore}
                                </p>{" "}
                                <p className="translate-y-1">Đơn hàng</p>
                            </div>
                        </div>
                    </div>
                    {/* chart */}
                    <div className="mt-12">
                        {/* Theo nhiều kho */}
                        <div className="p-4 relative border border-gray-200 rounded-lg font-semibold mt-7  shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)]">
                            <div className="px-4 py-2 absolute -top-5 border border-gray-200 rounded-lg bg-white text-nowrap w-28 overflow-hidden md:w-auto">
                                Thống kê tổng số lượng đơn hàng theo các kho
                            </div>
                            <div className="my-2 md:my-0">
                                <div className="py-2 flex justify-end items-center">
                                    <div className=" font-medium text-[1.125rem] border-gray-300 px-[10px] text-white cursor-pointer">
                                        {/* <label
                                            htmlFor="import"
                                            className="bg-[rgb(6,146,85)] cursor-pointer rounded-lg flex items-center py-[3px] px-[10px]  transition duration-150 ease-linear hover:opacity-90 "
                                        >
                                            <span className="mr-1">Export Excel</span>{" "}
                                            <FaFileExcel />
                                        </label> */}
                                    </div>
                                    <div className="border rounded-full p-1 flex items-center">
                                        <div
                                            className={` rounded-full py-1 px-3  cursor-pointer ${
                                                viewTypeStatistical === "bd" &&
                                                "text-white bg-[rgb(6,146,85)]"
                                            }`}
                                            onClick={() => setViewTypeStatistical("bd")}
                                        >
                                            Biểu đồ
                                        </div>
                                        <div
                                            className={` rounded-full py-1 px-3  cursor-pointer ${
                                                viewTypeStatistical === "b" &&
                                                "text-white bg-[rgb(6,146,85)]"
                                            }`}
                                            onClick={() => setViewTypeStatistical("b")}
                                        >
                                            Bảng
                                        </div>
                                    </div>
                                </div>
                                {viewTypeStatistical === "bd"
                                    ? statistics && (
                                          <StatisticalChart
                                              statistics={statistics}
                                              warehouses={warehouses}
                                              barOptions={barOptions}
                                          />
                                      )
                                    : statistics && <StatisticalTable statistics={statistics} />}
                            </div>
                        </div>
                        {/* Theo 1 kho */}
                        <div className="p-4 relative border border-gray-200 rounded-lg font-semibold mt-7  shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)]">
                            <div className="px-4 py-2 absolute -top-5 border border-gray-200 rounded-lg bg-white">
                                <select
                                    className="focus:outline-none"
                                    defaultValue={dateSelect?.warehouseCode}
                                    onChange={(e) => setWarehouseCode(e)}
                                >
                                    {warehouses?.map((e) => (
                                        <option key={e.warehouseCode} value={e.warehouseCode}>
                                            {e.warehouseName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="my-2 md:my-0">
                                <div className="py-2 flex items-center justify-end">
                                    <div className=" font-medium text-[1.125rem] border-gray-300 px-[10px] text-white cursor-pointer">
                                        {/* <label
                                            htmlFor="exportExcel"
                                            className="bg-[rgb(6,146,85)] cursor-pointer rounded-lg flex items-center py-[3px] px-[10px]  transition duration-150 ease-linear hover:opacity-90 "
                                        >
                                            <span className="mr-1">Export Excel</span>{" "}
                                            <FaFileExcel />
                                            <input id="exportExcel" type="file" hidden />
                                        </label> */}
                                    </div>
                                    <div className="border rounded-full p-1 flex items-center">
                                        <div
                                            className={` rounded-full py-1 px-3  cursor-pointer ${
                                                viewTypeDaily === "bd" &&
                                                "text-white bg-[rgb(6,146,85)]"
                                            }`}
                                            onClick={() => setViewTypeDaily("bd")}
                                        >
                                            Biểu đồ
                                        </div>
                                        <div
                                            className={` rounded-full py-1 px-3  cursor-pointer ${
                                                viewTypeDaily === "b" &&
                                                "text-white bg-[rgb(6,146,85)]"
                                            }`}
                                            onClick={() => setViewTypeDaily("b")}
                                        >
                                            Bảng
                                        </div>
                                    </div>
                                </div>
                                {viewTypeDaily === "bd"
                                    ? dailys && (
                                          <DailyChart
                                              dailys={dailys}
                                              warehouses={warehouses}
                                              barOptions={barOptions}
                                          />
                                      )
                                    : dailys && <DailyTable dailys={dailys} />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WebPage;
