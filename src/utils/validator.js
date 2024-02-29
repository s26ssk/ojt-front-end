import * as yup from "yup";

export const validationSchema = yup.object().shape({
    shopName: yup
        .string()
        .required("Tên cửa hàng không được để trống!!")
        .matches(/^.{3,50}$/, "Tên cửa hàng phải nằm trong khoảng từ 3 đến 50 kí tự!!"),
    phone: yup
        .string()
        .required("Số điện thoại không được để trống!!")
        .matches(/^(84|0[3|5|7|8|9])([0-9]{8})$/, "Không đúng định dạng số điện thoại!!"),
    email: yup
        .string()
        .matches(/^[A-Za-z0-9+_.-]+@(.+)$/, "Không đúng định dạng email!!")
        .required("Email không được để trống!!"),
    address: yup.string().required("Địa chỉ không được để trống!!"),
    password: yup
        .string()
        .required("Mật khẩu không được để trống!!")
        .min(8, "Mật khẩu phải có ít nhất 8 ký tự!!")
        .matches(
            /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,}$/,
            "Mật khẩu phải chứa ít nhất một chữ cái và một số và 1 kí tự đặc biệt!!"
        ),
    confirmPassword: yup.string().oneOf([yup.ref("password")], "Xác nhận mật khẩu không khớp!!"),
});

// ----------------------------------------------------------------------------------------------------------------------------
export const passwordSchema = yup.object().shape({
    curPass: yup.string().required("Mật khẩu cũ không được để trống!!"),
    newPass: yup
        .string()
        .required("Mật khẩu không được để trống!!")
        .min(8, "Mật khẩu phải có ít nhất 8 ký tự!!")
        .matches(
            /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,}$/,
            "Mật khẩu phải chứa ít nhất một chữ cái và một số và 1 kí tự đặc biệt!!"
        ),
    cfPass: yup
        .string()
        .oneOf([yup.ref("newPass")], "Xác nhận mật khẩu không khớp!!")
        .required("Xác nhận mật khẩu không được để trống!!"),
});

export const profileSchema = yup.object().shape({
    shopName: yup
        .string()
        .required("Tên cửa hàng không được để trống!!")
        .matches(/^.{3,50}$/, "Tên cửa hàng phải nằm trong khoảng từ 3 đến 50 kí tự!!"),
    phone: yup
        .string()
        .required("Số điện thoại không được để trống!!")
        .matches(/^(84|0[3|5|7|8|9])([0-9]{8})$/, "Không đúng định dạng số điện thoại!!"),
    email: yup
        .string()
        .required("Email không được để trống!!")
        .matches(/^[A-Za-z0-9+_.-]+@(.+)$/, "Không đúng định dạng email!!"),
    address: yup.string().required("Địa chỉ không được để trống!!"),
});

export const orderSchema = yup.object().shape({
    receiverName: yup.string().required("Tên khách hàng không được để trống"),
    receiverPhone: yup
        .string()
        .required("Số điện khách hàng không được để trống")
        .matches(/^(0|\+84)[3|5|7|8|9][0-9]{8}$/, "Số điện thoại không hợp lệ")
        .required("Số điện thoại không được để trống"),
    receiverEmail: yup
        .string()
        .required("Email khách hàng không được để trống")
        .email("Định dạng email không đúng"),
    receiverAddress: yup.string().required("Địa chỉ khách hàng không được để trống"),
});
export const editOrderSchema = yup.object().shape({
    receiverName: yup.string().required("(Tên khách hàng không được để trống)"),
    receiverPhone: yup
        .string()
        .required("(Số điện khách hàng không được để trống)")
        .matches(/^(0|\+84)[3|5|7|8|9][0-9]{8}$/, "(Số điện thoại không hợp lệ)"),
    receiverEmail: yup
        .string()
        .required("(Email khách hàng không được để trống)")
        .email("(Định dạng email không đúng)"),
    receiverAddress: yup.string().required("(Địa chỉ khách hàng không được để trống)"),
    providerName: yup.string().required("(Tên nhà cung cấp không được để trống)"),
    providerPhone: yup
        .string()
        .required("(Số điện nhà cung cấp không được để trống)")
        .matches(/^(0|\+84)[3|5|7|8|9][0-9]{8}$/, "(Số điện thoại không hợp lệ)"),
    providerEmail: yup
        .string()
        .required("(Email nhà cung cấp không được để trống)")
        .email("(Định dạng email không đúng)"),
    providerAddress: yup.string().required("(Địa chỉ nhà cung cấp không được để trống)"),
});
