import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
const inter = Inter({ subsets: ["latin"] });
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
    title: "Giaohangtietkiem.vn - Dịch vụ giao hàng trong ngày chuyên nghiệp",
    description: "Giaohangtietkiem.vn - Dịch vụ giao hàng trong ngày chuyên nghiệp",
    icons: {
        icon: "https://giaohangtietkiem.vn/wp-content/themes/giaohangtk/images/ico/favicon.png",
    },
};

function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <div>{children}</div>
                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                />
            </body>
        </html>
    );
}
export default RootLayout;
