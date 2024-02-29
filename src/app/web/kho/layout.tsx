import { Metadata } from "next";
import Head from "next/head";

export const metadata: Metadata = {
    title: "GHTK - Quản lý kho hàng",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
    return <>{children}</>;
};

export default Layout;
