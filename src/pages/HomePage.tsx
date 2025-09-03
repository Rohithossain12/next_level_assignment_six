import FAQSection from "@/components/FAQSection";
import HeroSection from "@/components/HeroSection";

import ServiceHighlights from "@/components/ServiceHighlights";
import Testimonials from "@/components/Testimonials";
import  WhyChooseUs from "@/components/WhyChooseUs";

export default function HomePage() {
    return (
        <div>
            <HeroSection/>
           <ServiceHighlights />
           <WhyChooseUs/>
           <Testimonials/>
           <FAQSection/>
        </div>
    );
}
