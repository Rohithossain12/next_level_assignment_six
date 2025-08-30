const trustFeatures = [
  { title: "Affordable Price", desc: "Best delivery rates in town.", icon: "💰" },
  { title: "Wide Coverage", desc: "Delivering parcels nationwide.", icon: "🌐" },
  { title: "Insurance", desc: "Safe delivery with insurance cover.", icon: "🛡️" },
  { title: "Customer Satisfaction", desc: "100% happy customers.", icon: "⭐" },
];

export default function WhyChooseUs() {
  return (
    <section className="py-8  px-4  ">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
        Why Choose Us?
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {trustFeatures.map((item, index) => (
          <div
            key={index}
            className="bg-white border-2 dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2 text-center"
          >
            <div className="text-4xl mb-4">{item.icon}</div>
            <h3 className="font-semibold text-xl mb-2 text-gray-900 dark:text-white">
              {item.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
