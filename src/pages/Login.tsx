import DeliveryLogin from "@/assets/images/login.avif";
import { Link } from "react-router";
import { LoginForm } from "@/components/modules/Authentication/LoginFrom";



export default function Login() {
    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start">
                    <Link to="/" className="flex items-center gap-2 font-medium">
                        <img

                            className="w-16 h-16"
                            src="https://img.icons8.com/?size=100&id=11910&format=png&color=000000" alt="" />
                    </Link>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">
                        <LoginForm />
                    </div>
                </div>
            </div>
            <div className="relative hidden bg-muted lg:block">
                <img
                    src={DeliveryLogin}
                    alt="Image"
                    className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.8]"
                />
            </div>
        </div>
    );
}