"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
    { name: "Jessica Brown", role: "Frequent Customer", comment: "Fast and secure delivery! My parcels always arrive on time.", image: "https://randomuser.me/api/portraits/women/44.jpg" },
    { name: "John Doe", role: "Business Owner", comment: "Excellent service and real-time tracking is amazing.", image: "https://randomuser.me/api/portraits/men/46.jpg" },
    { name: "Mary Smith", role: "Shopper", comment: "Affordable pricing and very reliable. Highly recommended!", image: "https://randomuser.me/api/portraits/women/65.jpg" },
    { name: "David Wilson", role: "Entrepreneur", comment: "Customer support is fantastic, and delivery is always smooth.", image: "https://randomuser.me/api/portraits/men/33.jpg" },
    { name: "Alice Johnson", role: "Shopper", comment: "Quick delivery and excellent support!", image: "https://randomuser.me/api/portraits/women/12.jpg" },
    { name: "Michael Lee", role: "Frequent Customer", comment: "Very reliable service, highly recommended.", image: "https://randomuser.me/api/portraits/men/22.jpg" },
    { name: "Sophia Turner", role: "Business Owner", comment: "Tracking is accurate, and deliveries are timely.", image: "https://randomuser.me/api/portraits/women/30.jpg" },
    { name: "Daniel Martinez", role: "Shopper", comment: "Great service at affordable rates. Love it!", image: "https://randomuser.me/api/portraits/men/55.jpg" },
    { name: "Olivia Harris", role: "Entrepreneur", comment: "Professional team, always helps with any issues.", image: "https://randomuser.me/api/portraits/women/21.jpg" },
    { name: "James Anderson", role: "Frequent Customer", comment: "Prompt delivery and amazing customer support!", image: "https://randomuser.me/api/portraits/men/10.jpg" },
    { name: "Emily Clark", role: "Shopper", comment: "Love the service, very trustworthy and fast.", image: "https://randomuser.me/api/portraits/women/5.jpg" },
    { name: "Christopher Lewis", role: "Business Owner", comment: "Real-time updates make shipping so easy.", image: "https://randomuser.me/api/portraits/men/15.jpg" },
    { name: "Ava Walker", role: "Shopper", comment: "Affordable and dependable service every time.", image: "https://randomuser.me/api/portraits/women/7.jpg" },
    { name: "Matthew Hall", role: "Entrepreneur", comment: "Excellent delivery experience, highly recommend.", image: "https://randomuser.me/api/portraits/men/31.jpg" },
    { name: "Isabella Allen", role: "Frequent Customer", comment: "Always reliable and fast, no complaints.", image: "https://randomuser.me/api/portraits/women/14.jpg" },
    { name: "Ethan Young", role: "Shopper", comment: "Very easy to use and the support team is fantastic.", image: "https://randomuser.me/api/portraits/men/18.jpg" },
    { name: "Mia King", role: "Business Owner", comment: "Smooth experience, excellent service.", image: "https://randomuser.me/api/portraits/women/42.jpg" },
    { name: "Alexander Scott", role: "Entrepreneur", comment: "Always delivered on time. Very happy with the service.", image: "https://randomuser.me/api/portraits/men/26.jpg" },
    { name: "Charlotte Baker", role: "Shopper", comment: "Highly professional and trustworthy service.", image: "https://randomuser.me/api/portraits/women/39.jpg" },
    { name: "Benjamin Adams", role: "Frequent Customer", comment: "Reliable, fast, and friendly support!", image: "https://randomuser.me/api/portraits/men/8.jpg" },
];


export default function Testimonials() {
    const [current, setCurrent] = useState(0);
    const [cardsPerView, setCardsPerView] = useState(4);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const updateCardsPerView = () => {
            const width = window.innerWidth;
            if (width < 640) setCardsPerView(1);
            else if (width < 1024) setCardsPerView(2);
            else setCardsPerView(4);
            setCurrent(0);
        };
        updateCardsPerView();
        window.addEventListener("resize", updateCardsPerView);
        return () => window.removeEventListener("resize", updateCardsPerView);
    }, []);

    const handlePrev = () => setCurrent((prev) => Math.max(prev - 1, 0));
    const handleNext = () =>
        setCurrent((prev) => Math.min(prev + 1, testimonials.length - cardsPerView));


    const getTranslateX = () => {
        if (!containerRef.current) return 0;
        const containerWidth = containerRef.current.offsetWidth;
        const cardWidth = containerWidth / cardsPerView;
        return cardWidth * current;
    };

    return (
        <section className="py-8  px-5">
            <div className="max-w-6xl mx-auto text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                    What Our Customers Say
                </h2>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                    Hear from our satisfied customers and see why they trust our service.
                </p>
            </div>

            <div className="relative max-w-7xl mx-auto">
                <div className="overflow-hidden" ref={containerRef}>
                    <div
                        className="flex transition-transform duration-500 gap-2"
                        style={{ transform: `translateX(-${getTranslateX()}px)` }}
                    >
                        {testimonials.map((t, idx) => (
                            <Card
                                key={idx}
                                className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 bg-white dark:bg-gray-800 shadow-lg"
                            >
                                <CardContent className="flex flex-col items-center text-center p-6">
                                    <img
                                        src={t.image}
                                        alt={t.name}
                                        className="w-20 h-20 rounded-full mb-4 object-cover"
                                    />
                                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                                        "{t.comment}"
                                    </p>
                                    <h4 className="font-semibold text-gray-900 dark:text-white">
                                        {t.name}
                                    </h4>
                                    <span className="text-gray-500 dark:text-gray-400 text-sm">
                                        {t.role}
                                    </span>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>


                <button
                    onClick={handlePrev}
                    disabled={current === 0}
                    className="absolute top-1/2 -left-6 transform -translate-y-1/2 p-2 rounded-full shadow-md bg-rose-500 text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <ChevronLeft className="w-4 md:w-6 h-4 md:h-6" />
                </button>
                <button
                    onClick={handleNext}
                    disabled={current >= testimonials.length - cardsPerView}
                    className="absolute top-1/2 -right-6 transform -translate-y-1/2 p-2 rounded-full shadow-md bg-rose-500 text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <ChevronRight className="w-4 md:w-6 h-4 md:h-6" />
                </button>
            </div>
        </section>
    );
}
