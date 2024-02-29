import { Metadata } from "next";
import Head from "next/head";

export const metadata: Metadata = {
    title: "GHTK - Thông tin tài khoản",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
    return <>{children}</>;
};

export default Layout;
