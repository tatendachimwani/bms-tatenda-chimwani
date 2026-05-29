export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Create Account",
      description: "Register securely and access the system instantly.",
    },
    {
      number: "02",
      title: "Manage Books",
      description: "Add books, categories, and organize inventory.",
    },
    {
      number: "03",
      title: "Track Activities",
      description: "Monitor borrowing history and analytics.",
    },
  ];

  return (
    <section className="py-20 bg-gray-50 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-12">
          How It Works
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-md"
            >
              <div className="text-5xl font-bold text-blue-600 mb-4">
                {step.number}
              </div>
              <h3 className="text-2xl font-semibold mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
