import FAQSection from "@/components/FAQSection";

import ServiceHighlights from "@/components/ServiceHighlights";
import Testimonials from "@/components/Testimonials";
import  WhyChooseUs from "@/components/WhyChooseUs";

export default function HomePage() {
    return (
        <div>
           <ServiceHighlights />
           <WhyChooseUs/>
           <Testimonials/>
           <FAQSection/>
        </div>
    );
}
