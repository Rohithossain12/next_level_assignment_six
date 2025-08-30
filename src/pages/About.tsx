import { Button } from "@/components/ui/button";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

export default function About() {
    const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.3 });

    const formatNumber = (num: number): string => {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1).replace(/\.0$/, '') + "M";
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1).replace(/\.0$/, '') + "k";
        } else {
            return num + "+";
        }
    };

    const stats = [
        { icon: "⏱️", label: "Years Experience", value: 10 },
        { icon: "👥", label: "Happy Clients", value: 50000 },
        { icon: "📦", label: "Parcels Delivered", value: 1000000 },
        { icon: "🌐", label: "Countries Covered", value: 120 },
    ];

    return (
        <section className="relative py-12 px-5 md:px-20 transition-colors duration-300">
            <div className="max-w-5xl mx-auto text-center space-y-8">

                
                <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white leading-snug">
                    About <span>TractFast</span>
                </h2>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
                    At <span className="font-semibold">TractFast</span>, we redefine logistics with a
                    perfect blend of <span className="font-semibold">speed, security</span>, and
                    <span className="font-semibold"> advanced tracking</span>. From local to international shipments,
                    we make sure your parcels reach safely and on time.
                </p>
                <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                    With real-time tracking, secure handling, and dedicated customer support,
                    we’re setting new standards for hassle-free delivery experiences.
                </p>

               
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                    {[
                        { icon: "🚚", title: "Fast Delivery" },
                        { icon: "🛡️", title: "Secure Handling" },
                        { icon: "🌍", title: "Global Reach" },
                        { icon: "📊", title: "Real-Time Tracking" },
                    ].map((item, idx) => (
                        <div
                            key={idx}
                            className="flex flex-col items-center text-center bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition transform hover:-translate-y-2"
                        >
                            <div className="text-4xl mb-3">
                                {item.icon}
                            </div>
                            <h3 className="font-semibold text-gray-800 dark:text-gray-200">{item.title}</h3>
                        </div>
                    ))}
                </div>

            
                <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
                    {stats.map((stat, idx) => (
                        <div
                            key={idx}
                            className="flex flex-col items-center text-center bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl p-6 transition transform hover:-translate-y-2"
                        >
                            <div className="text-4xl mb-3">{stat.icon}</div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                {inView ? (
                                    <CountUp
                                        end={stat.value}
                                        duration={3}
                                        separator=","
                                        formattingFn={formatNumber}
                                        key={stat.label + inView} 
                                    />
                                ) : "0"}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">{stat.label}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-8">
                    <Button>
                        Learn More
                    </Button>
                </div>
            </div>
        </section>
    );
}
