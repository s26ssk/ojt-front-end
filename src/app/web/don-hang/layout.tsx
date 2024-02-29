import { Metadata } from "next";

export const metadata: Metadata = {
    title: "GHTK - Quản lý đơn hàng",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
    return <>{children}</>;
};

export default Layout;
