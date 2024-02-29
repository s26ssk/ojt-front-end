"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const SearchProvince = () => {
    const host = "https://provinces.open-api.vn/api/";
    const [provinces, setProvinces] = useState<IProvince[]>([]);
    const [province, setProvince] = useState<IProvince>();
    const fetchData = async () => {
        try {
            const response = await axios.get(host + "?depth=2");
            const provincesData = response.data;
            setProvinces(provincesData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <>
            <div className="md:flex max-w-[1200px] mx-auto py-5 md:text-center items-start ">
                <div className="map w-[60%] hidden md:block">
                    <img
                        className="w-full"
                        src="https://giaohangtietkiem.vn/wp-content/plugins/ghtk-post-offices/assets/img/list-post-offices.jpg"
                        alt=""
                    />
                </div>
                <div className="mx-auto w-[80%] text-center lg:mt-10">
                    <select
                        id="countries"
                        className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={(e) =>
                            setProvince(provinces.find((p) => p.code === Number(e.target.value)))
                        }
                    >
                        <option value={0}>Chọn tỉnh thành</option>
                        {provinces?.map((e) => (
                            <option key={e.code} value={e.code}>
                                {e.name}
                            </option>
                        ))}
                    </select>
                    <button className="bg-green-700 text-white p-2 my-7 hover:bg-black">
                        Tra Cứu Điểm Gửi Hàng
                    </button>
                    <div className="items-center font-light md:flex mt-10 md:mt-32">
                        <p>
                            <strong className="text-[5rem] font-semibold">1000++</strong>{" "}
                        </p>
                        <p className="text-2xl  md:text-3xl">
                            điểm gửi hàng...
                            <span className="block ">...trên toàn quốc!!</span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="text-center mx-auto my-auto mt-28">
                <div>
                    <h2 className="text-3xl py-5 font-extralight">Phương thức hoạt động</h2>
                    <div className="bg-[rgb(239,239,239)] pb-5 font-light text-sm">
                        <div className="lg:grid lg:grid-cols-5 lg:gap-4 mx-auto lg:w-[1200px]">
                            <div className="text-center lg:border-r border-dashed border-white py-5 px-3">
                                <img
                                    src="https://giaohangtietkiem.vn/wp-content/themes/giaohangtk/images/bkg-active-1.png"
                                    alt=""
                                    className="mx-auto" // Center the img horizontally
                                />
                                <div className="px-2">
                                    <h4 className="text-[rgb(6,146,85)] font-bold my-2">
                                        Tiếp nhận đơn hàng
                                    </h4>
                                    <p>
                                        Shop đăng nhập và đăng đơn hàng cho trung tâm điều khiển
                                        GHTK qua hệ thống quản lý riêng
                                    </p>
                                </div>
                            </div>
                            <div className="text-center lg:border-r border-dashed border-white py-5 px-3">
                                <img
                                    src="https://giaohangtietkiem.vn/wp-content/themes/giaohangtk/images/bkg-active-2.png"
                                    alt=""
                                    className="mx-auto" // Center the img horizontally
                                />
                                <div className="px-2">
                                    <h4 className="text-[rgb(6,146,85)] font-bold my-2">
                                        Lấy hàng
                                    </h4>
                                    <p>Nhân viên GHTK qua địa chỉ shop để lấy hàng tạm thời</p>
                                </div>
                            </div>
                            <div className="text-center lg:border-r border-dashed border-white py-5 px-3">
                                <img
                                    src="https://giaohangtietkiem.vn/wp-content/themes/giaohangtk/images/bkg-active-3.png"
                                    alt=""
                                    className="mx-auto" // Center the img horizontally
                                />
                                <div className="px-2">
                                    <h4 className="text-[rgb(6,146,85)] font-bold my-2">
                                        Giao hàng
                                    </h4>
                                    <p>
                                        GHTK giao hàng cho khách hàng và thu hộ tiền trực tiếp (Cash
                                        on Delivery)
                                    </p>
                                </div>
                            </div>
                            <div className="text-center lg:border-r border-dashed border-white py-5 px-3">
                                <img
                                    src="https://giaohangtietkiem.vn/wp-content/themes/giaohangtk/images/bkg-active-4.png"
                                    alt=""
                                    className="mx-auto" // Center the img horizontally
                                />
                                <div className="px-2">
                                    <h4 className="text-[rgb(6,146,85)] font-bold my-2">
                                        Đối soát
                                    </h4>
                                    <p>
                                        GHTK đối soát trả tiền cho shop (3 lần/tuần) qua tài khoản
                                        ngân hàng. Đồng thời gửi biên bản đối soát định kì vào
                                        email.
                                    </p>
                                </div>
                            </div>
                            <div className="text-center  py-5 px-3">
                                <img
                                    src="https://giaohangtietkiem.vn/wp-content/themes/giaohangtk/images/bkg-active-5.png"
                                    alt=""
                                    className="mx-auto" // Center the img horizontally
                                />
                                <div className="px-2">
                                    <h4 className="text-[rgb(6,146,85)] font-bold my-2">
                                        Kết thúc
                                    </h4>
                                    <p>Giao dịch hoàn thành</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="md:flex justify-center ">
                    <div className="text-center lg:mr-36">
                        <div className="pt-28 pb-16">
                            <h3 className="text-3xl font-extralight">Bạn có biết?</h3>
                            <p>Dịch vụ chúng tôi cung cấp đã phù hợp với </p>
                        </div>
                        <h2 className="text-4xl pb-6">1.000+ khách hàng</h2>
                        <Link
                            href="dang-ky"
                            className="w-[90%] mx-auto text-2xl font-light text-white py-1 px-[40px] lg:px-[50px] md:px-[50px] bg-[rgb(6,146,85)] hover:cursor-pointer hover:bg-black"
                        >
                            ĐĂNG KÝ NGAY
                        </Link>
                    </div>

                    <ul className="text-start md:mt-0 mt-16">
                        <li className="flex items-center m-5 px-8">
                            <img
                                src="https://giaohangtietkiem.vn/wp-content/uploads/2020/11/vn-01.png"
                                alt=""
                                className="w-[45px]"
                            />
                            <div className="w-[350px] mx-3">
                                <h3 className="font-semibold text-[rgb(6,146,85)] text-sm">
                                    PHỦ SÓNG 99% HUYỆN XÃ
                                </h3>
                                <p className="text-gray-500 italic text-sm">
                                    Lấy hàng/ Giao hàng trên 11.000 huyện xã trên toàn quốc
                                </p>
                            </div>
                        </li>
                        <li className="flex items-center m-5 px-8">
                            <img
                                src="https://giaohangtietkiem.vn/wp-content/themes/giaohangtk/images/icon-02.png"
                                alt=""
                                className="w-[43px] mr-3"
                            />
                            <div className="w-[350px]">
                                <h3 className="font-semibold text-[rgb(6,146,85)] text-sm">
                                    APP CHO IOS VÀ ANDROID
                                </h3>
                                <p className="text-gray-500 italic text-sm">
                                    Đăng đơn - Tracking - Xử lý đơn hàng mọi lúc mọi nơi trên điện
                                    thoại
                                </p>
                            </div>
                        </li>
                        <li className="flex items-center m-5 px-8">
                            <img
                                src="https://giaohangtietkiem.vn/wp-content/themes/giaohangtk/images/icon-05.png"
                                alt=""
                                className="w-[43px] mr-3"
                            />
                            <div className="w-[350px]">
                                <h3 className="font-semibold text-[rgb(6,146,85)] text-sm">
                                    GIAO NHANH KHÔNG KỊP HỦY
                                </h3>
                                <p className="text-gray-500 italic text-sm">
                                    Giao nội tỉnh 6-12h <br />
                                    Giao nội miền 24-36h <br />
                                    Giao liên miền 48h
                                </p>
                            </div>
                        </li>
                        <li className="flex items-center m-5 px-8">
                            <img
                                src="https://giaohangtietkiem.vn/wp-content/themes/giaohangtk/images/icon-06.png"
                                alt=""
                                className="w-[43px] mr-3"
                            />
                            <div className="w-[350px]">
                                <h3 className="font-semibold text-[rgb(6,146,85)] text-sm">
                                    ĐỔI TRẢ TIỀN NHANH
                                </h3>
                                <p className="text-gray-500 italic text-sm">
                                    Chuyển khoản vào tài khoản NH 3 lần/ tuần vào thứ 2/4/6
                                </p>
                            </div>
                        </li>
                        <li className="flex items-center m-5 px-8">
                            <img
                                src="https://giaohangtietkiem.vn/wp-content/themes/giaohangtk/images/icon-07.png"
                                alt=""
                                className="w-[43px] mr-3"
                            />
                            <div className="w-[350px]">
                                <h3 className="font-semibold text-[rgb(6,146,85)] text-sm">
                                    GIAO HÀNG LINH HOẠT
                                </h3>
                                <p className="text-gray-500 italic text-sm">
                                    Linh hoạt giao hàng cho khách chọn, đổi địa chỉ giao, đổi tiền
                                    thu hộ, đổi SDT, đổi người nhận hàng,...
                                </p>
                            </div>
                        </li>
                        <li className="flex items-center m-5 px-8">
                            <img
                                src="https://giaohangtietkiem.vn/wp-content/themes/giaohangtk/images/icon-03.png"
                                alt=""
                                className="w-[43px] mr-3"
                            />
                            <div className="w-[350px]">
                                <h3 className="font-semibold text-[rgb(6,146,85)] text-sm">
                                    MIỄN PHÍ GIAO NHIỀU LẦN
                                </h3>
                            </div>
                        </li>
                        <li className="flex items-center m-5 px-8">
                            <img
                                src="https://giaohangtietkiem.vn/wp-content/themes/giaohangtk/images/icon-03.png"
                                alt=""
                                className="w-[43px] mr-3"
                            />
                            <div className="w-[350px]">
                                <h3 className="font-semibold text-[rgb(6,146,85)] text-sm">
                                    MIỄN PHÍ THU HỘ TIỀN
                                </h3>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default SearchProvince;
