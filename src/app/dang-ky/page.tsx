/* eslint-disable @next/next/no-img-element */
"use client";
import "../../styles/dang-ky.css";
import Footer from "@/components/footer";
import Link from "next/link";
import FormRegister from "@/components/formRegister";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { login, sendMailAccountLocked } from "@/utils/api";

const LoginPage = () => {
    const router = useRouter();
    const { register, handleSubmit, reset } = useForm();
    const userLogin = async (data: any) => {
        const response = await login(data);
        if (response === 201) {
            toast.success("Đăng nhập thành công!!");
            router.push("/web");
        } else {
            reset();
            toast.error(response.data);
        }
    };
    return (
        <div>
            <div className="bg-[rgb(6,146,85)] md:h-[92px] h-[260px] w-full">
                <div className="max-w-[1200px] mx-auto md:flex md:justify-between flex-wrap">
                    <div className="h-[76px] md:mt-3 w-full md:w-1/3">
                        <Link
                            href="/"
                            className="text-[rgb(6,146,85)] no-underline bg-transparent outline-none cursor-pointer transition-color duration-300"
                        >
                            <img
                                className="align-middle border-none w-[210px]"
                                src="https://khachhang.giaohangtietkiem.vn/web/img/logo-login-v2.b50cc99a.png"
                                alt="logo login"
                            />
                        </Link>
                    </div>
                    <div className="w-full md:w-2/3 flex flex-col md:flex-row">
                        <div className="mt-4 md:mt-6 px-6 w-full  pl-[1rem]">
                            <div className="flex items-start justify-center relative flex-col">
                                <input
                                    className="h-9 text-base px-4 w-full border border-gray-300 rounded-[4px] focus:outline-none focus:border-gray-500"
                                    type="text"
                                    placeholder="Email hoặc số điện thoại"
                                    {...register("emailOrPhone")}
                                />
                            </div>
                        </div>
                        <div className="mt-4 md:mt-6 px-6 w-full pl-[1rem]">
                            <div className="flex items-start justify-center relative flex-col">
                                <input
                                    className="h-9 text-base px-4 w-full border border-gray-300 rounded-[4px] focus:outline-none focus:border-gray-500"
                                    type="text"
                                    placeholder="Mật khẩu"
                                    {...register("password")}
                                />
                            </div>
                        </div>
                        <div className="mt-4 md:mt-6 px-6 w-full md:w-1/3 pl-[1rem]">
                            <button
                                className="bg-white mt-0 w-full md:w-[100px] mx-auto md:mx-0 rounded-[4px] h-[36px] border-none outline-none cursor-pointer hover:opacity-[90%]"
                                onClick={handleSubmit(userLogin)}
                            >
                                <span className="text-[13px] leading-36 uppercase font-bold">
                                    Đăng nhập
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-base overflow-y-auto flex">
                <div className="w-full">
                    <div className="login-page">
                        <div className="container mx-auto max-w-screen-xl">
                            <div className="flex flex-col md:flex-row p-[48px] pt-[40px]">
                                <div className="w-full md:w-1/3 pr-[40px] pl-[0.5rem] mb-8 md:mb-0">
                                    <div className="font-semibold text-[1.875rem] leading-9 mb-[20px]">
                                        {" "}
                                        GHTK có gì hay?{" "}
                                    </div>
                                    <div>
                                        <ul className="list-none mt-0 mb-4">
                                            <li className="bg-url p-0 pt-0 pb-[20px] pl-[40px]">
                                                <div className="text-xl/[1.125rem] leading-7 translate-y-[-5px] ">
                                                    {" "}
                                                    Phủ sóng 99% huyện xã{" "}
                                                </div>
                                                <span className="text-sm text-gray-600 italic">
                                                    Lấy hàng / Giao hàng trên 600 huyện xã trên toàn
                                                    Hà Nội
                                                </span>
                                            </li>
                                            <li className="bg-url p-0 pt-0 pb-[20px] pl-[40px]">
                                                <div className="text-xl/[1.125rem] leading-7 translate-y-[-5px]">
                                                    {" "}
                                                    App cho iOS và Android{" "}
                                                </div>
                                                <span className="text-sm text-gray-600 italic">
                                                    {" "}
                                                    Đăng đơn - Tracking - Xử lý đơn hàng mọi lúc mọi
                                                    nơi trên điện thoại!{" "}
                                                </span>
                                            </li>
                                            <li className="bg-url p-0 pt-0 pb-[20px] pl-[40px]">
                                                <div className="text-xl/[1.125rem] leading-7 translate-y-[-5px]">
                                                    {" "}
                                                    Giao nhanh không kịp hủy{" "}
                                                </div>
                                                <span className="block text-sm text-gray-600 italic">
                                                    {" "}
                                                    Giao nội tỉnh 6-12h{" "}
                                                </span>
                                                <span className="block text-sm text-gray-600 italic">
                                                    Giao nội miền 24-36h
                                                </span>
                                                <span className="block text-sm text-gray-600 italic">
                                                    {" "}
                                                    Giao liên miền 48h
                                                </span>
                                            </li>
                                            <li className="bg-url p-0 pt-0 pb-[20px] pl-[40px]">
                                                <div className="text-xl/[1.125rem] leading-7 translate-y-[-5px]">
                                                    {" "}
                                                    Đối soát trả tiền nhanh{" "}
                                                </div>
                                                <span className="text-sm text-gray-600 italic">
                                                    Chuyển khoản vào tài khoản NH 3 lần/tuần vào thứ
                                                    2/4/6
                                                </span>
                                            </li>
                                            <li className="bg-url p-0 pt-0 pb-[20px] pl-[40px]">
                                                <div className="text-xl/[1.125rem] leading-7 translate-y-[-5px]">
                                                    {" "}
                                                    Miễn phí giao nhiều lần{" "}
                                                </div>
                                            </li>
                                            <li className="bg-url p-0 pt-0 pb-[20px] pl-[40px]">
                                                <div className="text-xl/[1.125rem] leading-7 translate-y-[-5px]">
                                                    {" "}
                                                    Miễn phí thu hộ tiền{" "}
                                                </div>
                                            </li>
                                            <li className="bg-url p-0 pt-0 pb-[20px] pl-[40px]">
                                                <div className="text-xl/[1.125rem] leading-7 translate-y-[-5px]">
                                                    Giao hàng linh hoạt
                                                </div>
                                                <span className="text-sm text-gray-600 italic">
                                                    Linh hoạt giao hàng cho khách chọn, đổi địa chỉ
                                                    giao, đổi tiền CoD, đổi SĐT, đổi người nhận
                                                    hàng,…
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="w-full md:w-2/3 px-4">
                                    <div className="font-semibold text-[1.875rem] leading-9 mb-[20px]">
                                        {" "}
                                        Đăng ký dịch vụ{" "}
                                    </div>
                                    <FormRegister />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default LoginPage;
