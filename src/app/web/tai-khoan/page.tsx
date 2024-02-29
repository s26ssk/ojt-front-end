"use client";
import WebHeader from "@/components/headerIn";
import { changePassword, checkLogin, sendMailAccountLocked, updateProfile } from "@/utils/api";
import { passwordSchema, profileSchema } from "@/utils/validator";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Account = () => {
    const {
        register: changePass,
        handleSubmit: handleSubmitPassword,
        formState: { errors: changePassError },
    } = useForm({
        resolver: yupResolver(passwordSchema),
    });

    const {
        register: registerProfile,
        handleSubmit: handleSubmitProfile,
        formState: { errors: profileError },
        setValue,
        reset,
    } = useForm({
        resolver: yupResolver(profileSchema),
    });

    // ------------------------------------------------------------------------------------------------------------------------
    const [isModalOpen, setModalOpen] = useState(false);
    const router = useRouter();
    const openModal = () => {
        setModalOpen(true);
    };
    const closeModal = () => {
        setShowPassword(false);
        setShowPassword1(false);
        setShowPassword2(false);
        setModalOpen(false);
    };

    const [showPassword, setShowPassword] = useState(false);
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };
    const handleTogglePassword1 = () => {
        setShowPassword1(!showPassword1);
    };
    const handleTogglePassword2 = () => {
        setShowPassword2(!showPassword2);
    };
    const [image, setImage] = useState<string | null>(null);
    const [avatar, setAvatar] = useState<File | null>(null);
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            setAvatar(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                const imageDataURL = reader.result as string;
                setImage(imageDataURL);
            };
            reader.readAsDataURL(file);
        }
    };
    console.log(image);

    const [userLogin, setUserLogin] = useState<IUserLogin>();
    useEffect(() => {
        setUserLogin(checkLogin());
    }, []);

    useEffect(() => {
        if (userLogin) {
            reset({
                shopName: userLogin.shopName,
                phone: userLogin.phone,
                email: userLogin.email,
                address: userLogin.address,
            });
        }
    }, [userLogin]);
    // -----------------------------------------Change Password-------------------------------------------------
    const handleChangePass = async (data: any) => {
        const response = changePassword(data);
        if ((await response) === 200) {
            toast.success("Đổi mật khẩu thành công, yêu cầu đăng nhập lại!!");
            router.push("/dang-ky");
        } else {
            toast.error("Mật khẩu cũ không đúng!!");
        }
    };

    // -----------------------------------------Update Profile--------------------------------------------------
    const handleUpdateProfile = async (data: any) => {
        const response = updateProfile(data);
        if ((await response) === 200) {
            toast.success("Đổi thông tin người dùng thành công!");
            router.push("/dang-ky");
        } else {
            console.log(response);

            toast.error("Đổi thông tin người dùng thất bại, yêu cầu kiểm tra lại thông tin!!");
        }
    };

    return (
        <div className="h-screen">
            <WebHeader />
            <div className="flex overflow-y-auto text-[1rem]">
                <div className="w-full p-[15px]">
                    <div className="flex m-[-15px]">
                        <div className=" w-[420px] min-w-[250px] max-w-[420px] border-r border-gray-300 h-[calc(100vh-64px)] overflow-auto">
                            <div className="px-[1rem] flex relative mt-[3.5rem]">
                                <div className="bg-white absolute h-[115px] w-[115px] rounded-full bg-cover bg-center bottom-0 border-3 border-white shadow-md">
                                    <img
                                        src={`C:/Users/OWNER/md4/warehouse-ojt/src/main/resources/uploads/${userLogin?.avatar}`}
                                        alt=""
                                    />
                                </div>
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
                                        <span className="text-[rgb(6,146,85)]">
                                            Thông tin tài khoản
                                        </span>
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
                                        <span>Quản lý kho hàng/ trả hàng</span>
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
                                <div className="overflow-y-auto p-[1rem]">
                                    <div>
                                        <span className="text-[18px] font-semibold">
                                            {" "}
                                            Thông tin tài khoản{" "}
                                        </span>
                                    </div>
                                    <div className="flex mt-[1.5rem]">
                                        <div className="flex-1">
                                            <div className="max-w-[472px] mr-[0.5rem]">
                                                <div className="flex justify-between w-full mb-[1.5rem] ">
                                                    <div className="flex w-full">
                                                        <label className="flex items-center w-[100px]">
                                                            {" "}
                                                            Tên shop{" "}
                                                        </label>
                                                        <div className="flex w-full items-start justify-center relative flex-col">
                                                            <input
                                                                className={`${
                                                                    profileError.shopName &&
                                                                    "border-red-500"
                                                                } h-[35px] w-full text-[15px] px-[12px] py-[12px] border border-solid border-gray-400 text-black focus:outline-none rounded-md`}
                                                                type="text"
                                                                defaultValue={userLogin?.shopName}
                                                                placeholder="Nhập tên shop"
                                                                {...registerProfile("shopName")}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex justify-between w-full mb-[1.5rem] ">
                                                    <div className="flex w-full">
                                                        <label className="flex items-center w-[100px]">
                                                            Mật khẩu{" "}
                                                        </label>
                                                        <div className="items-center rounded-md flex justify-between relative h-[35px] w-full text-[15px] px-[12px] py-[12px] border border-solid border-gray-400">
                                                            <input
                                                                className=" text-black focus:outline-none "
                                                                type="password"
                                                                name=""
                                                                defaultValue="D5-group"
                                                                placeholder="Nhập mật khẩu"
                                                                readOnly
                                                            />
                                                            <span
                                                                onClick={openModal}
                                                                className="cursor-pointer text-[rgb(6,146,85)] font-semibold"
                                                            >
                                                                Đổi mật khẩu
                                                            </span>
                                                            {isModalOpen && (
                                                                <div
                                                                    className="fixed top-0 right-0 bottom-0 left-0 z-[9999] h-full bg-black bg-opacity-30"
                                                                    onClick={closeModal}
                                                                >
                                                                    <div className="fixed top-0 right-0 bottom-0 left-0 overflow-auto outline-none overscroll-touch z-[9999]">
                                                                        <div className="w-[600px] transform origin-726px-73px box-border px-0 pt-[100px] pb-[24px] text-black font-normal text-[16px] leading-1.5715 list-none font-tnum relative top-[100px] mx-auto max-w-[calc(100vw-32px)]">
                                                                            <div
                                                                                onClick={(e) =>
                                                                                    e.stopPropagation()
                                                                                }
                                                                                className="relative bg-white bg-clip-padding border-0 rounded-md shadow-box"
                                                                            >
                                                                                <div className="p-0">
                                                                                    <div className="flex items-center justify-center bg-[rgb(6,146,85)] rounded-t-md">
                                                                                        <div className="pt-[0.75rem] pb-[0.75rem] text-[1.125rem] leading-[1.75rem] font-semibold text-white">
                                                                                            Đổi mật
                                                                                            khẩu
                                                                                        </div>
                                                                                        <button
                                                                                            onClick={
                                                                                                closeModal
                                                                                            }
                                                                                            className="absolute w-[20px] top-[1rem] right-[1rem] cursor-pointer"
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
                                                                                        <div className="overflow-auto max-w-full max-h-[650px] mb-6">
                                                                                            <div className=" justify-between items-center flex">
                                                                                                <div className="font-medium leading-[1.25rem] text-[1rem]">
                                                                                                    Mật
                                                                                                    khẩu
                                                                                                    cũ
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="flex items-center border-b justify-between border-gray-300">
                                                                                                <div className="flex w-full item-center">
                                                                                                    <input
                                                                                                        className="pt-3 outline-2 outline-solid outline-transparent outline-offset-2  py-[0.25rem] w-full"
                                                                                                        {...changePass(
                                                                                                            "curPass"
                                                                                                        )}
                                                                                                        type={
                                                                                                            showPassword
                                                                                                                ? "text"
                                                                                                                : "password"
                                                                                                        }
                                                                                                        placeholder="Nhập mật khẩu cũ"
                                                                                                    />
                                                                                                    {changePassError.curPass && (
                                                                                                        <span className="italic text-xs ml-2 text-red-500">
                                                                                                            {
                                                                                                                changePassError
                                                                                                                    .curPass
                                                                                                                    .message
                                                                                                            }
                                                                                                        </span>
                                                                                                    )}
                                                                                                </div>
                                                                                                <button
                                                                                                    onClick={
                                                                                                        handleTogglePassword
                                                                                                    }
                                                                                                    className="mr-2 mb-[-0.5rem] cursor-pointer"
                                                                                                >
                                                                                                    {showPassword ? (
                                                                                                        <svg
                                                                                                            focusable="false"
                                                                                                            data-icon="eye"
                                                                                                            width="1.5rem"
                                                                                                            height="1.5rem"
                                                                                                            fill="currentColor"
                                                                                                            aria-hidden="true"
                                                                                                            viewBox="64 64 896 896"
                                                                                                        >
                                                                                                            <path
                                                                                                                fill="#00904A"
                                                                                                                d="M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z"
                                                                                                            ></path>
                                                                                                        </svg>
                                                                                                    ) : (
                                                                                                        <svg
                                                                                                            focusable="false"
                                                                                                            data-icon="eye-invisible"
                                                                                                            width="1.5rem"
                                                                                                            height="1.5rem"
                                                                                                            fill="currentColor"
                                                                                                            aria-hidden="true"
                                                                                                            viewBox="64 64 896 896"
                                                                                                        >
                                                                                                            <path d="M942.2 486.2Q889.47 375.11 816.7 305l-50.88 50.88C807.31 395.53 843.45 447.4 874.7 512 791.5 684.2 673.4 766 512 766q-72.67 0-133.87-22.38L323 798.75Q408 838 512 838q288.3 0 430.2-300.3a60.29 60.29 0 000-51.5zm-63.57-320.64L836 122.88a8 8 0 00-11.32 0L715.31 232.2Q624.86 186 512 186q-288.3 0-430.2 300.3a60.3 60.3 0 000 51.5q56.69 119.4 136.5 191.41L112.48 835a8 8 0 000 11.31L155.17 889a8 8 0 0011.31 0l712.15-712.12a8 8 0 000-11.32zM149.3 512C232.6 339.8 350.7 258 512 258c54.54 0 104.13 9.36 149.12 28.39l-70.3 70.3a176 176 0 00-238.13 238.13l-83.42 83.42C223.1 637.49 183.3 582.28 149.3 512zm246.7 0a112.11 112.11 0 01146.2-106.69L401.31 546.2A112 112 0 01396 512z"></path>
                                                                                                            <path d="M508 624c-3.46 0-6.87-.16-10.25-.47l-52.82 52.82a176.09 176.09 0 00227.42-227.42l-52.82 52.82c.31 3.38.47 6.79.47 10.25a111.94 111.94 0 01-112 112z"></path>
                                                                                                        </svg>
                                                                                                    )}
                                                                                                </button>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="overflow-auto max-w-full max-h-[650px] mb-2">
                                                                                            <div className=" justify-between items-center flex">
                                                                                                <div className="font-medium leading-[1.25rem] text-[1rem]">
                                                                                                    Mật
                                                                                                    khẩu
                                                                                                    mới
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="flex items-center border-b justify-between border-gray-300">
                                                                                                <div className="flex w-full item-center">
                                                                                                    <input
                                                                                                        className="pt-3 outline-2 outline-solid outline-transparent outline-offset-2  py-[0.25rem] w-full"
                                                                                                        {...changePass(
                                                                                                            "newPass"
                                                                                                        )}
                                                                                                        type={
                                                                                                            showPassword1
                                                                                                                ? "text"
                                                                                                                : "password"
                                                                                                        }
                                                                                                        placeholder="Nhập mật khẩu"
                                                                                                    />
                                                                                                    {changePassError.newPass && (
                                                                                                        <span className="italic text-xs ml-2 text-red-500">
                                                                                                            {
                                                                                                                changePassError
                                                                                                                    .newPass
                                                                                                                    .message
                                                                                                            }
                                                                                                        </span>
                                                                                                    )}
                                                                                                </div>
                                                                                                <button
                                                                                                    onClick={
                                                                                                        handleTogglePassword1
                                                                                                    }
                                                                                                    className="mr-2 mb-[-0.5rem] cursor-pointer"
                                                                                                >
                                                                                                    {showPassword1 ? (
                                                                                                        <svg
                                                                                                            focusable="false"
                                                                                                            data-icon="eye"
                                                                                                            width="1.5rem"
                                                                                                            height="1.5rem"
                                                                                                            fill="currentColor"
                                                                                                            aria-hidden="true"
                                                                                                            viewBox="64 64 896 896"
                                                                                                        >
                                                                                                            <path
                                                                                                                fill="#00904A"
                                                                                                                d="M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z"
                                                                                                            ></path>
                                                                                                        </svg>
                                                                                                    ) : (
                                                                                                        <svg
                                                                                                            focusable="false"
                                                                                                            data-icon="eye-invisible"
                                                                                                            width="1.5rem"
                                                                                                            height="1.5rem"
                                                                                                            fill="currentColor"
                                                                                                            aria-hidden="true"
                                                                                                            viewBox="64 64 896 896"
                                                                                                        >
                                                                                                            <path d="M942.2 486.2Q889.47 375.11 816.7 305l-50.88 50.88C807.31 395.53 843.45 447.4 874.7 512 791.5 684.2 673.4 766 512 766q-72.67 0-133.87-22.38L323 798.75Q408 838 512 838q288.3 0 430.2-300.3a60.29 60.29 0 000-51.5zm-63.57-320.64L836 122.88a8 8 0 00-11.32 0L715.31 232.2Q624.86 186 512 186q-288.3 0-430.2 300.3a60.3 60.3 0 000 51.5q56.69 119.4 136.5 191.41L112.48 835a8 8 0 000 11.31L155.17 889a8 8 0 0011.31 0l712.15-712.12a8 8 0 000-11.32zM149.3 512C232.6 339.8 350.7 258 512 258c54.54 0 104.13 9.36 149.12 28.39l-70.3 70.3a176 176 0 00-238.13 238.13l-83.42 83.42C223.1 637.49 183.3 582.28 149.3 512zm246.7 0a112.11 112.11 0 01146.2-106.69L401.31 546.2A112 112 0 01396 512z"></path>
                                                                                                            <path d="M508 624c-3.46 0-6.87-.16-10.25-.47l-52.82 52.82a176.09 176.09 0 00227.42-227.42l-52.82 52.82c.31 3.38.47 6.79.47 10.25a111.94 111.94 0 01-112 112z"></path>
                                                                                                        </svg>
                                                                                                    )}
                                                                                                </button>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="flex mt-[4px] text-[14px] flex-row items-center space-x-1 mb-6 text-[rgb(6,146,85)]">
                                                                                            Mật khẩu
                                                                                            phải dài
                                                                                            từ 8-16
                                                                                            ký tự,
                                                                                            có ít
                                                                                            nhất 1
                                                                                            chữ viết
                                                                                            hoa, 1
                                                                                            chữ viết
                                                                                            thường,
                                                                                            1 chữ số
                                                                                            và 1 ký
                                                                                            tự đặc
                                                                                            biệt
                                                                                            (!@#$%^&amp;*)
                                                                                        </div>
                                                                                        <div className="overflow-auto max-w-full max-h-[650px] mb-6">
                                                                                            <div className=" justify-between items-center flex">
                                                                                                <div className="font-medium leading-[1.25rem] text-[1rem]">
                                                                                                    Xác
                                                                                                    nhận
                                                                                                    mật
                                                                                                    khẩu
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="flex items-center border-b justify-between border-gray-300">
                                                                                                <div className="flex w-full item-center">
                                                                                                    <input
                                                                                                        className="pt-3 outline-2 outline-solid outline-transparent outline-offset-2  py-[0.25rem] w-full"
                                                                                                        type={
                                                                                                            showPassword2
                                                                                                                ? "text"
                                                                                                                : "password"
                                                                                                        }
                                                                                                        placeholder="Nhập mật khẩu"
                                                                                                        {...changePass(
                                                                                                            "cfPass"
                                                                                                        )}
                                                                                                    />
                                                                                                    {changePassError.cfPass && (
                                                                                                        <span className="italic text-xs ml-2 text-red-500">
                                                                                                            {
                                                                                                                changePassError
                                                                                                                    .cfPass
                                                                                                                    .message
                                                                                                            }
                                                                                                        </span>
                                                                                                    )}
                                                                                                </div>
                                                                                                <button
                                                                                                    onClick={
                                                                                                        handleTogglePassword2
                                                                                                    }
                                                                                                    className="mr-2 mb-[-0.5rem] cursor-pointer"
                                                                                                >
                                                                                                    {showPassword2 ? (
                                                                                                        <svg
                                                                                                            focusable="false"
                                                                                                            data-icon="eye"
                                                                                                            width="1.5rem"
                                                                                                            height="1.5rem"
                                                                                                            fill="currentColor"
                                                                                                            aria-hidden="true"
                                                                                                            viewBox="64 64 896 896"
                                                                                                        >
                                                                                                            <path
                                                                                                                fill="#00904A"
                                                                                                                d="M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z"
                                                                                                            ></path>
                                                                                                        </svg>
                                                                                                    ) : (
                                                                                                        <svg
                                                                                                            focusable="false"
                                                                                                            data-icon="eye-invisible"
                                                                                                            width="1.5rem"
                                                                                                            height="1.5rem"
                                                                                                            fill="currentColor"
                                                                                                            aria-hidden="true"
                                                                                                            viewBox="64 64 896 896"
                                                                                                        >
                                                                                                            <path d="M942.2 486.2Q889.47 375.11 816.7 305l-50.88 50.88C807.31 395.53 843.45 447.4 874.7 512 791.5 684.2 673.4 766 512 766q-72.67 0-133.87-22.38L323 798.75Q408 838 512 838q288.3 0 430.2-300.3a60.29 60.29 0 000-51.5zm-63.57-320.64L836 122.88a8 8 0 00-11.32 0L715.31 232.2Q624.86 186 512 186q-288.3 0-430.2 300.3a60.3 60.3 0 000 51.5q56.69 119.4 136.5 191.41L112.48 835a8 8 0 000 11.31L155.17 889a8 8 0 0011.31 0l712.15-712.12a8 8 0 000-11.32zM149.3 512C232.6 339.8 350.7 258 512 258c54.54 0 104.13 9.36 149.12 28.39l-70.3 70.3a176 176 0 00-238.13 238.13l-83.42 83.42C223.1 637.49 183.3 582.28 149.3 512zm246.7 0a112.11 112.11 0 01146.2-106.69L401.31 546.2A112 112 0 01396 512z"></path>
                                                                                                            <path d="M508 624c-3.46 0-6.87-.16-10.25-.47l-52.82 52.82a176.09 176.09 0 00227.42-227.42l-52.82 52.82c.31 3.38.47 6.79.47 10.25a111.94 111.94 0 01-112 112z"></path>
                                                                                                        </svg>
                                                                                                    )}
                                                                                                </button>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="p-[0.5rem]">
                                                                                        <button
                                                                                            className="min-w-[120px] font-semibold pt-[0.5rem] pb-[0.5rem] border-0 text-white rounded-md w-full border-none outline-none bg-[rgb(6,146,85)]"
                                                                                            onClick={handleSubmitPassword(
                                                                                                handleChangePass
                                                                                            )}
                                                                                        >
                                                                                            Cập nhập
                                                                                        </button>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <div className="max-w-[472px] mr-[0.5rem]">
                                                <div className="flex justify-between w-full mb-[1.5rem] ">
                                                    <div className="flex w-full">
                                                        <label className="flex items-center w-[100px]">
                                                            {" "}
                                                            SĐT{" "}
                                                        </label>
                                                        <div className="flex w-full items-start justify-center relative flex-col">
                                                            <input
                                                                className={`${
                                                                    profileError.phone &&
                                                                    "border-red-500"
                                                                } h-[35px] w-full text-[15px] px-[12px] py-[12px] border border-solid border-gray-400 text-black focus:outline-none rounded-md`}
                                                                type="text"
                                                                defaultValue={userLogin?.phone}
                                                                placeholder="Nhập SĐT"
                                                                {...registerProfile("phone")}
                                                                readOnly
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex justify-between w-full mb-[1.5rem] ">
                                                    <div className="flex w-full">
                                                        <label className="flex items-center w-[100px]">
                                                            {" "}
                                                            Email{" "}
                                                        </label>
                                                        <div className="flex w-full items-start justify-center relative flex-col">
                                                            <input
                                                                className={`${
                                                                    profileError.email &&
                                                                    "border-red-500"
                                                                } h-[35px] w-full text-[15px] px-[12px] py-[12px] border border-solid border-gray-400 text-black focus:outline-none rounded-md`}
                                                                type="text"
                                                                defaultValue={userLogin?.email}
                                                                placeholder="Nhập email"
                                                                {...registerProfile("email")}
                                                                readOnly
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex mt-[1rem]">
                                        <div>
                                            <span className="text-[17px] font-medium">
                                                Ảnh đại diện
                                            </span>
                                            <div className="relative flex mt-[0.5rem]">
                                                <div className="flex mt-[0.5rem]">
                                                    <div className="border border-gray-400 rounded px-10 py-2 flex flex-col items-center">
                                                        <span className="text-gray-400">
                                                            Ảnh đại diện
                                                        </span>
                                                        {!image && (
                                                            <label
                                                                htmlFor="upload1"
                                                                className="text-[rgb(6,146,85)] border-[2px] border-dashed border-[rgb(6,146,85)] w-28 h-28 flex flex-col items-center justify-center rounded-3 bg-cover bg-center cursor-pointer mt-2"
                                                            >
                                                                <span className="text-[35px] leading-[35px]">
                                                                    +
                                                                </span>
                                                                <span>Thêm ảnh</span>
                                                            </label>
                                                        )}
                                                        <input
                                                            id="upload1"
                                                            className="hidden"
                                                            type="file"
                                                            onChange={handleImageChange}
                                                        />
                                                        {image && (
                                                            <label
                                                                htmlFor="upload1"
                                                                className="mt-2 cursor-pointer w-28 h-28"
                                                            >
                                                                <img
                                                                    src={image}
                                                                    alt="Uploaded Image"
                                                                    className="w-[110px] h-[110px] absolute top-12 left-[2.6rem] rounded-full"
                                                                />
                                                            </label>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-end border-t border-gray-300 bg-white fixed bottom-0 right-0 h-[60px] w-full lg:w-[calc(100vw-420px)]">
                                <div className="w-full flex justify-end">
                                    <button
                                        className="mt-[10px] mr-3 cursor-pointer p-2 px-8 bg-[rgb(6,146,85)] text-white font-normal rounded-md transition duration-150 ease-linear hover:opacity-90"
                                        onClick={handleSubmitProfile(handleUpdateProfile)}
                                    >
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

export default Account;
