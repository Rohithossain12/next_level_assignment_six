import heroImage from "../assets/images/hero1.png";
import { Button } from "./ui/button";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { useNavigate } from "react-router";

const HeroSection = () => {
    const { data } = useUserInfoQuery(undefined);
    const navigate = useNavigate();

    const role = data?.data?.role;


    const handleClick = (path: string) => {
        navigate(path);
    };

    return (
        <section className="relative bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-10 md:py-16 rounded-lg border">
            <div className="container mx-auto px-6 md:px-12 lg:px-20">
                <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12">

                    <div className="text-center md:text-left">
                        <h1 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white leading-tight">
                            Fast & Reliable Parcel Delivery <br /> Anytime, Anywhere
                        </h1>
                        <p className="text-lg md:text-xl mb-8 text-gray-700 dark:text-gray-300 max-w-lg mx-auto md:mx-0">
                            TrackFast ensures your parcels reach safely and on time with
                            real-time tracking updates.
                        </p>


                        {role === "RECEIVER" && (
                            <Button onClick={() => handleClick("/track-parcel")}>
                                Track Now
                            </Button>
                        )}

                        {role === "SENDER" && (
                            <Button onClick={() => handleClick("/sender/create-parcel")}>
                                Send Parcel
                            </Button>
                        )}

                        {(role === "ADMIN" || role === "SUPER_ADMIN") && (
                            <Button onClick={() => handleClick("/admin/analytics")}>
                                Go Analytics
                            </Button>
                        )}

                        {!role && (
                            <Button onClick={() => handleClick("/login")}>
                                Track Now
                            </Button>
                        )}
                    </div>


                    <div className="flex justify-center md:justify-end border">
                        <img
                            src={heroImage}
                            alt="Delivery Illustration"
                            className="w-full max-w-md md:max-w-lg lg:max-w-xl"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
