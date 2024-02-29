import { Metadata } from "next";

export const metadata: Metadata = {
    title: "GHTK - Tổng quan",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
    return <>{children}</>;
};

export default Layout;
