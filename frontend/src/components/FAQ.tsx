export default function FAQ() {
  const faqs = [
    {
      question: "Is the system secure?",
      answer: "Yes, it uses JWT authentication and protected APIs.",
    },
    {
      question: "Is it mobile responsive?",
      answer: "Yes, the platform works on all devices.",
    },
    {
      question: "Can admins manage users?",
      answer: "Yes, admins can manage users and permissions.",
    },
  ];

  return (
    <section id="faq" className="py-20 bg-gray-50 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-md">
              <h3 className="text-xl font-semibold mb-3">{faq.question}</h3>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
