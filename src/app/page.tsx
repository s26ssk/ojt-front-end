import Banner from "@/components/banner";
import Footer from "@/components/footer";
import Header from "@/components/header";
import SearchProvince from "@/components/searchProvince";
import Head from "next/head";

export default function Home() {
    return (
        <div>
            <Head>
                <link
                    rel="icon"
                    href="https://giaohangtietkiem.vn/wp-content/themes/giaohangtk/images/ico/favicon.png"
                />
            </Head>
            <Header />
            <Banner />
            <SearchProvince />
            <Footer />
        </div>
    );
}
