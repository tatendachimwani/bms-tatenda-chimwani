import { CheckCircle } from "lucide-react";

export default function Benefits() {
  const benefits = [
    "Save time managing books",
    "Improve inventory organization",
    "Reduce manual paperwork",
    "Responsive and mobile-friendly",
    "Fast and secure platform",
    "Scalable architecture",
  ];

  return (
    <section className="py-20 bg-white px-6">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <img
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
            alt="Benefits"
            className="rounded-3xl shadow-2xl"
          />
        </div>

        <div>
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Why Choose Our Platform?
          </h2>

          <div className="space-y-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle className="text-blue-600" />
                <p className="text-gray-700 text-lg">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
