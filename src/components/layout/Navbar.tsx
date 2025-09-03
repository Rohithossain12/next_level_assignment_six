/* eslint-disable @typescript-eslint/no-explicit-any */
import { Menu } from "lucide-react";
import { useState } from "react";
import { ModeToggle } from "./ModeToggler";
import { Button } from "../ui/button";
import { Link } from "react-router";
import { authApi, useLogoutMutation, useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { useAppDispatch } from "@/redux/hook";
import { toast } from "sonner";
import { role } from "@/constants/role";

const navItems = [
  { name: "HOME", path: "/", role: "PUBLIC" },
  { name: "TRACK PARCEL", path: "/track-parcel", role: role.receiver },
  { name: "ABOUT", path: "/about", role: "PUBLIC" },
  { name: "CONTACT", path: "/contact", role: "PUBLIC" },
  { name: "DASHBOARD", path: "/admin", role: role.admin },
  { name: "DASHBOARD", path: "/admin", role: role.superAdmin },
  { name: "DASHBOARD", path: "/sender", role: role.sender },
  { name: "DASHBOARD", path: "/receiver", role: role.receiver },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: userInfo } = useUserInfoQuery(undefined);

  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      const res = await logout(undefined).unwrap();
      dispatch(authApi.util.resetApiState());
      toast.success(res?.message || "User logged out successfully");
    } catch (err: any) {
      toast.error(err?.data?.message || "Logout failed");
    }
  };

  return (
    <nav className="sticky top-0 z-50 shadow-md bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <img
              className="w-12 h-12 mr-2"
              src="https://img.icons8.com/?size=100&id=pt5RU2ksbVFL&format=png&color=000000"
              alt="TrackFast Logo"
            />
            <p className="font-bold text-xl">TrackFast</p>
          </div>

          <div className="hidden md:flex space-x-6 items-center">
            {navItems.map((item) => (
              <>
                {item.role === "PUBLIC" && (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="border-b-2 border-transparent hover:border-rose-500 transition-all"
                  >
                    {item.name}
                  </Link>
                )}
                {item.role === userInfo?.data?.role && (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="border-b-2 border-transparent hover:border-rose-500 transition-all"
                  >
                    {item.name}
                  </Link>
                )}




              </>
            ))}

            <ModeToggle />

            {userInfo?.data?.email ? (
              <Button onClick={handleLogout}>LOGOUT</Button>
            ) : (
              <Link to="/login">
                <Button>LOGIN</Button>
              </Link>
            )}
          </div>


          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="focus:outline-none text-2xl"
            >
              <Menu />
            </button>
          </div>
        </div>
      </div>


      {menuOpen && (
        <div className="md:hidden backdrop-blur-md shadow-md">
          <div className="px-4 pt-2 pb-4 flex flex-col space-y-4">
            {navItems.map((item) => (
              <>
                {item.role === "PUBLIC" && (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="border-b-2 border-transparent hover:border-rose-500 transition-all"
                  >
                    {item.name}
                  </Link>
                )}
                {item.role === userInfo?.data?.role && (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="border-b-2 border-transparent hover:border-rose-500 transition-all"
                  >
                    {item.name}
                  </Link>
                )}




              </>
            ))}

            <div>
              <ModeToggle />
            </div>

            {userInfo?.data?.email ? (
              <Button className="w-full" onClick={handleLogout}>
                LOGOUT
              </Button>
            ) : (
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                <Button className="w-full">LOGIN</Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
