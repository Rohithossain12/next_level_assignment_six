import { Truck, Clock, ShieldCheck, MapPin } from "lucide-react";

const highlights = [
  {
    icon: <Truck className="w-10 h-10 text-blue-500" />,
    title: "Fast Delivery",
    desc: "Quick and reliable delivery service at your doorstep.",
  },
  {
    icon: <Clock className="w-10 h-10 text-green-500" />,
    title: "On-Time Service",
    desc: "We ensure your parcels are delivered on time, every time.",
  },
  {
    icon: <ShieldCheck className="w-10 h-10 text-purple-500" />,
    title: "Secure Handling",
    desc: "Your packages are handled with care and security.",
  },
  {
    icon: <MapPin className="w-10 h-10 text-orange-500" />,
    title: "Wide Coverage",
    desc: "Nationwide coverage with extensive delivery network.",
  },
];

export default function ServiceHighlights() {
  return (
    <section className="relative py-12 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
          Service Highlights
        </h2>
        <p className="mt-3 text-gray-600 dark:text-gray-300">
          Why customers trust our parcel delivery service
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {highlights.map((item, i) => (
          <div
            key={i}
            className="relative group rounded-2xl p-1 bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 shadow-lg"
          >
            <div className="h-full w-full bg-white dark:bg-gray-900 rounded-2xl p-6 flex flex-col items-center text-center transition-transform duration-300 group-hover:scale-[1.03] group-hover:shadow-2xl">
              {/* Icon */}
              <div className="mb-4 p-4 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-gray-700 dark:to-gray-800 shadow-inner">
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-300">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
