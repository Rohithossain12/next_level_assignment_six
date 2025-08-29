import { Menu } from "lucide-react";
import { useState } from "react";
import { ModeToggle } from "./ModeToggler";
import { Button } from "../ui/button";
import { Link } from "react-router";
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: "HOME", path: "/" },
    { name: "ABOUT", path: "/about" },
    { name: "CONTACT", path: "/contact" },

  ];

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
              <Link
                key={item.name}
                to={item.path}
                className="border-b-2 border-transparent hover:border-blue-600 transition-all"
              >
                {item.name}
              </Link>
            ))}
            <ModeToggle />
            <Button>REGISTER</Button>
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
              <Link
                key={item.name}
                to={item.path}
                className="block border-b-2 border-transparent hover:border-blue-600 transition-all"
                onClick={() => setMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}


            <div >
              <ModeToggle />
            </div>


            <Button
              className="w-full"
              onClick={() => setMenuOpen(false)}
            >
              REGISTER
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
