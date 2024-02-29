import { Metadata } from "next";

export const metadata: Metadata = {
    title: "GHTK - Quản lý kho & sản phẩm",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
    return <>{children}</>;
};

export default Layout;
