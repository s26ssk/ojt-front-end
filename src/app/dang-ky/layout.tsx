import { Metadata } from "next";
import Head from "next/head";

export const metadata: Metadata = {
    title: "GHTK - Đăng nhập / Đăng ký",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
    return <>{children}</>;
};

export default Layout;
