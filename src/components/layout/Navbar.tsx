import { Menu } from "lucide-react";
import { useState } from "react";


export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const navItems = [
        { name: "HOME", path: "#home" },
        { name: "ABOUT", path: "#about" },
        { name: "CONTACT", path: "#contact" },
      
    ];

    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <div className="flex items-center">
                        <div className="flex flex-col space-y-1 mr-2">
                            <img className="w-16 h-16" src="https://img.icons8.com/?size=100&id=pt5RU2ksbVFL&format=png&color=000000" alt="" />
                        </div>


                        <div className="flex flex-col leading-tight">
                            <p className="font-bold text-gray-800 text-xl">
                                TrackFast
                            </p>

                        </div>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-6 items-center">
                        {navItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.path}
                                className="text-gray-800 border-b-2 border-transparent hover:border-blue-600 transition-all"
                            >
                                {item.name}
                            </a>
                        ))}
                        <a
                            href="#quote"
                            className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1.5 rounded-xl font-medium shadow-md hover:shadow-lg transition-all transform hover:scale-105"
                        >
                           REGISTER
                        </a>
                    </div>

                    {/* Mobile Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="text-gray-800 focus:outline-none text-2xl"
                        >
                           <Menu/>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden bg-white/90 backdrop-blur-md shadow-md">
                    <div className="px-4 pt-2 pb-4 space-y-2">
                        {navItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.path}
                                className="block text-gray-800 border-b-2 border-transparent hover:border-blue-600 transition-all"
                                onClick={() => setMenuOpen(false)}
                            >
                                {item.name}
                            </a>
                        ))}
                        <a
                            href="#quote"
                            className="block bg-orange-500 hover:bg-orange-600 text-white px-3 py-1.5 rounded-xl font-medium shadow-md hover:shadow-lg transition-all transform hover:scale-105 text-center"
                            onClick={() => setMenuOpen(false)}
                        >
                           REGISTER
                        </a>
                    </div>
                </div>
            )}
        </nav>
    );
};


