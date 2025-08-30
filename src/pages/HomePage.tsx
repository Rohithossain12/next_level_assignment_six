import FAQSection from "@/components/FAQSection";
import ServiceHighlights from "@/components/ServiceHighlights";
import  WhyChooseUs from "@/components/WhyChooseUs";

export default function HomePage() {
    return (
        <div>
           <ServiceHighlights />
           <WhyChooseUs/>
           <FAQSection/>
        </div>
    );
}
