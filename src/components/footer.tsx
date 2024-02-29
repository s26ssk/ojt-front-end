import { FaFacebook, FaMailBulk, FaYoutube } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
const Footer = () => {
    return (
        <footer className="bg-black text-white dark:bg-gray-900">
            <div className="mx-auto max-w-[1200px] p-4 py-6 lg:py-8">
                <div className="md:flex md:justify-between text-center">
                    <div className="mb-6 md:mb-0">
                        <a
                            href="#"
                            className="flex items-center space-x-3 rtl:space-x-reverse mb-4"
                        >
                            <img
                                src="https://giaohangtietkiem.vn/wp-content/themes/giaohangtk/images/logo-footer.png"
                                className="h-8"
                            />
                        </a>
                        <h3 className="font-semibold text-xs my-2">
                            CÔNG TY CỔ PHẦN GIAO HÀNG TIẾT KIỆM
                        </h3>
                        <div className="w-[15rem] text-xs">
                            <ul className="flex flex-wrap">
                                <li className="mr-2">
                                    <a href="#">Về chúng tôi</a>
                                </li>
                                <li className="mr-2">
                                    <a href="#">Tuyển dụng</a>
                                </li>
                                <li className="mr-2">
                                    <a href="#">Dịch vụ</a>
                                </li>
                                <li className="mr-2">
                                    <a href="#">Quy định chung</a>
                                </li>
                                <li className="mr-2">
                                    <a href="#">Chính sách bảo mật</a>
                                </li>
                            </ul>
                        </div>

                        <div className="flex text-lg mt-4">
                            <a href="#" className="mr-3">
                                <FaFacebook />
                            </a>
                            <a href="#" className="mr-3">
                                <FaUserGroup />
                            </a>
                            <a href="#" className="mr-3">
                                <FaMailBulk />
                            </a>
                            <a href="#" className="mr-3">
                                <FaYoutube />
                            </a>
                        </div>
                    </div>
                    <div className="text-right">
                        <h3 className="font-semibold text-sm my-2">
                            CÔNG TY CỔ PHẦN GIAO HÀNG TIẾT KIỆM
                        </h3>
                        <div className=" text-[0.8rem] text-gray-300">
                            <p>
                                Giấy CNĐKKD: 0106181807 - Ngày cấp 21/05/2013,
                                đăng ký thay đổi lần 09 ngày 04/06/2020.
                            </p>
                            <p>
                                Cơ quan cấp: Phòng Đăng ký kinh doanh - Sở kế
                                hoạch và đầu tư TP Hà Nội
                            </p>
                            <p className="mt-2">
                                Giấy phép bưu chính số 346/GP-BTTTT do Bộ TT&TT
                                cấp này 23/08/2019
                            </p>
                            <p>
                                Văn bản xác nhận thông báo hoạt động bưu chính
                                số 2784/XN-BTTTT do Bộ TT&TT cấp ngày 19/08/2019{" "}
                            </p>
                            <p>
                                Văn bản xác nhận thông báo hoạt động bưu chính
                                của 62 chi nhánh trên toàn quốc{" "}
                            </p>
                            <p className="mt-2">
                                Địa chỉ trụ sở chính: Tòa nhà VTV, số 8 Phạm
                                Hùng, phường Mễ Trì, quận Nam Từ Liêm, thành phố
                                Hà Nội, Việt Nam
                            </p>
                            <p>Hotline: 1900 6092</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
