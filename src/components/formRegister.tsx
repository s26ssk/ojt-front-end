"use client";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userRegister } from "@/utils/api";
import { validationSchema } from "@/utils/validator";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
// ----------------------------------------------------------------------------------------------------------------------------
const FormRegister = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });
    const host = "https://provinces.open-api.vn/api/";
    const [isChecked, setIsChecked] = useState(false);
    const [provinces, setProvinces] = useState<IProvince[]>([]);
    const [province, setProvince] = useState<IProvince>();
    const [district, setDistrict] = useState<IDistrict | null>();
    const [ward, setWard] = useState<IWard | null>();
    const router = useRouter();
    // ----------------------------------------------------------------------------------------------------------------------------
    const handleLocationChange = async (code: string, type: "province" | "district" | "ward") => {
        try {
            let url = "";
            switch (type) {
                case "province":
                    url = `${host}p/${code}?depth=2`;
                    setProvince(await axios.get(url).then((response) => response.data));
                    setDistrict(null);
                    break;
                case "district":
                    url = `${host}d/${code}?depth=2`;
                    setDistrict(await axios.get(url).then((response) => response.data));
                    break;
                case "ward":
                    url = `${host}w/${code}?depth=2`;
                    setWard(await axios.get(url).then((response) => response.data));
                    break;
                default:
                    console.error("Invalid location type");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    // ----------------------------------------------------------------------------------------------------------------------------
    // const fetchData = async () => {
    //   try {
    //     const response = await axios.get(host + "?depth=2");
    //     const provincesData = response.data;
    //     setProvinces(provincesData);
    //   } catch (error) {
    //     console.error("Error fetching data:", error);
    //   }
    // };
    // useEffect(() => {
    //   fetchData();
    // }, []);

    // ----------------------------------------------------------------------------------------------------------------------------
    const handleSubmitForm = async (data: any) => {
        const reponse = await userRegister(data);
        if (reponse === 200) {
            toast.success("Đăng ký thành công!! ");
            reset();
            router.push("/dang-ky");
        } else {
            Object.entries(reponse).forEach(([key]) => {
                toast.error(`${data[key]} đã tồn tại trong hệ thống!! `);
            });
        }
    };
    // ----------------------------------------------------------------------------------------------------------------------------

    return (
        <form onSubmit={handleSubmit(handleSubmitForm)}>
            <div className="w-full mb-[24px]">
                <div className="flex items-start justify-center relative flex-col">
                    <input
                        className={`h-[44px] text-base w-full px-[12px] py-[12px] border border-solid border-gray-200 text-black  focus:outline-none  focus:shadow-md rounded-md transition ${
                            errors.shopName ? "border-red-500" : "focus:border-blue-400"
                        }`}
                        type="text"
                        placeholder="Tên cửa hàng/shop"
                        {...register("shopName")}
                    />
                    {errors.shopName && (
                        <span className="italic text-xs ml-2 text-red-500">
                            {errors.shopName.message}
                        </span>
                    )}
                </div>
            </div>
            <div className="w-full mb-[24px]">
                <div className="flex items-start justify-center relative flex-col">
                    <input
                        className={`h-[44px] text-base w-full px-[12px] py-[12px] border border-solid border-gray-200 text-black rounded-md focus:outline-none focus:border-blue-400 focus:shadow-md  transition ${
                            errors.phone ? "border-red-500" : "focus:border-blue-400"
                        }`}
                        type="text"
                        {...register("phone")}
                        placeholder="Điện thoại liên hệ"
                    />
                    {errors.phone && (
                        <span className="italic text-xs ml-2 text-red-500">
                            {errors.phone?.message}
                        </span>
                    )}
                </div>
            </div>
            <div className="w-full mb-[24px]">
                <div className="flex items-start justify-center relative flex-col">
                    <input
                        className={`h-[44px] text-base w-full px-[12px] py-[12px] border border-solid border-gray-200 text-black rounded-md focus:outline-none focus:border-blue-400 focus:shadow-md  transition ${
                            errors.email ? "border-red-500" : "focus:border-blue-400"
                        }`}
                        type="text"
                        {...register("email")}
                        placeholder="Email..."
                    />
                    {errors.email && (
                        <span className="italic text-xs ml-2 text-red-500">
                            {errors.email?.message}
                        </span>
                    )}
                </div>
            </div>
            <div className="w-full mb-[24px]">
                <div className="grid grid-cols-2 gap-3">
                    <div className="relative">
                        <div className="min-h-8 relative">
                            <div className="flex items-start justify-center relative flex-col">
                                <input
                                    className={`h-[44px] text-base w-full px-[12px] py-[2px] border border-solid border-gray-200 text-black  text-left focus:outline-none focus:border-blue-400 focus:shadow-md rounded-md transition ${
                                        errors.address ? "border-red-500" : "focus:border-blue-400"
                                    }`}
                                    placeholder="Tòa nhà/Hẻm/Đường"
                                    {...register("address")}
                                />
                                {errors.shopName && (
                                    <span className="italic text-xs ml-2 text-red-500">
                                        {errors.address?.message}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="min-h-8 relative">
                            <div className="flex items-start justify-center relative flex-col">
                                <select
                                    className="h-[44px] text-base w-full px-[12px] py-[2px] border border-solid border-gray-200 text-black rounded-md text-left focus:outline-none focus:border-blue-400 focus:shadow-md rounded-md transition"
                                    onChange={(e) => handleLocationChange(e.target.value, "ward")}
                                    defaultValue={""}
                                >
                                    <option value="" disabled>
                                        Phường/Xã
                                    </option>
                                    {district &&
                                        district.wards.map((e) => (
                                            <option key={e.code} value={e.code}>
                                                {e.name}
                                            </option>
                                        ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="min-h-8 relative">
                            <div className="flex items-start justify-center relative flex-col">
                                <select
                                    className="h-[44px] text-base w-full px-[12px] py-[2px] border border-solid border-gray-200 text-black rounded-md text-left focus:outline-none focus:border-blue-400 focus:shadow-md rounded-md transition"
                                    onChange={(e) =>
                                        handleLocationChange(e.target.value, "district")
                                    }
                                    defaultValue={""}
                                >
                                    <option value="" disabled>
                                        Quận/Huyện
                                    </option>
                                    {province
                                        ? province.districts.map((district) => (
                                              <option key={district.code} value={district.code}>
                                                  {district.name}
                                              </option>
                                          ))
                                        : ""}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="min-h-8 relative">
                            <div className="flex items-start justify-center relative flex-col">
                                <select
                                    className="h-[44px] text-base w-full px-[12px] py-[2px] border border-solid border-gray-200 text-black rounded-md text-left focus:outline-none focus:border-blue-400 focus:shadow-md rounded-md transition"
                                    onChange={(e) =>
                                        handleLocationChange(e.target.value, "province")
                                    }
                                    defaultValue={""}
                                >
                                    <option value="" disabled>
                                        Tỉnh/TP
                                    </option>
                                    {provinces.map((province) => (
                                        <option key={province.code} value={province.code}>
                                            {province.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full mb-[24px]">
                <div className="flex items-start justify-center relative flex-col">
                    <input
                        {...register("password")}
                        className={`h-[44px] text-base w-full px-[12px] py-[12px] border border-solid border-gray-200 text-black rounded-md focus:outline-none focus:border-blue-400 focus:shadow-md transition ${
                            errors.password ? "border-red-500" : "focus:border-blue-400"
                        }`}
                        type="text"
                        placeholder="Mật khẩu"
                    />
                    {errors.password && (
                        <span className="italic text-xs ml-2 text-red-500">
                            {errors.password?.message}
                        </span>
                    )}
                </div>
            </div>
            <div className="w-full mb-[24px]">
                <div className="flex items-start justify-center relative flex-col">
                    <input
                        {...register("confirmPassword")}
                        className={`h-[44px] text-base w-full px-[12px] py-[12px] border border-solid border-gray-200 text-black rounded-md focus:outline-none focus:border-blue-400 focus:shadow-md transition ${
                            errors.password ? "border-red-500" : "focus:border-blue-400"
                        }`}
                        type="text"
                        placeholder="Xác nhận mật khẩu"
                    />
                    {errors.confirmPassword && (
                        <span className="italic text-xs ml-2 text-red-500">
                            {errors.confirmPassword?.message}
                        </span>
                    )}
                </div>
            </div>
            <div className="font-bold text-sm mt-[8px] leading-5 flex">
                <input
                    className="accent-[rgb(6,146,85)]"
                    type="checkbox"
                    id="greenCheckbox"
                    onChange={() => setIsChecked(!isChecked)}
                />
                <label className="pl-2" htmlFor="greenCheckbox">
                    <span className="mr-[3px]">Tôi đã đọc hiểu và đồng ý với</span>
                    <a
                        className="text-[rgb(6,146,85)] no-underline bg-transparent outline-none cursor-pointer transition-color duration-300 hover:underline"
                        href=""
                        target="_blank"
                    >
                        {" "}
                        Điều khoản & Quy định
                    </a>{" "}
                    và{" "}
                    <a
                        className="text-[rgb(6,146,85)] no-underline bg-transparent outline-none cursor-pointer transition-color duration-300 hover:underline"
                        href=""
                        target="_blank"
                    >
                        {" "}
                        Chỉnh sách bảo mật
                    </a>
                </label>
            </div>
            <button
                className={
                    isChecked
                        ? "bg-[rgb(6,146,85)] h-12 leading-12 text-white font-medium text-[1rem] text-center rounded-md cursor-pointer w-full mt-4 hover:text-gray-700"
                        : "bg-gray-200 text-gray-400 h-12 leading-12 font-medium text-[1rem] text-center rounded-md w-full mt-4"
                }
                disabled={!isChecked}
                type="submit"
            >
                ĐĂNG KÝ NGAY
            </button>
        </form>
    );
};

export default FormRegister;
