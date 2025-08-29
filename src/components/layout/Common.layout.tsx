import type { ReactNode } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";


interface IProps {
    children: ReactNode
}


const CommonLayout = ({ children }: IProps) => {
    return (
        <div>
            <Navbar />
            <div className="min-h-[calc(100vh-210px)] container mx-auto ">
                {children}
            </div>
            <Footer />
        </div>
    );
};

export default CommonLayout;