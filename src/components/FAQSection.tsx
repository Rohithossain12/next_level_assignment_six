import { useState } from "react";

const faqs = [
  {
    question: "How long does delivery take?",
    answer: "Our parcel delivery usually completes within 1–3 business days.",
  },
  {
    question: "How can I track my parcel?",
    answer: "Click on the 'Track Your Parcel' button to see live parcel status.",
  },
  {
    question: "Which areas do you cover?",
    answer: "We provide nationwide coverage, delivering parcels to almost all urban and rural areas.",
  },
  {
    question: "Is my parcel safe?",
    answer: "Yes, every parcel is handled securely, and insurance options are available.",
  },
   {
    question: "What payment methods do you accept?", 
    answer: "We accept cash on delivery, credit/debit cards, and online payment gateways like Stripe & PayPal.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-12 px-6 dark:bg-gray-900">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
        Frequently Asked Questions
      </h2>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={`rounded-xl overflow-hidden transition-all duration-300 
                ${isOpen ? "border-2 border-blue-500 shadow-lg" : "border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md"}
              `}
            >
              <button
                onClick={() => toggle(index)}
                className="w-full text-left px-6 py-4 flex justify-between items-center bg-white dark:bg-gray-800 focus:outline-none"
              >
                <span className="font-semibold text-gray-900 dark:text-white">
                  {faq.question}
                </span>
                <span className="text-xl text-rose-500">
                  {isOpen ? "−" : "+"}
                </span>
              </button>

              {isOpen && (
                <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 transition-all duration-300">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
