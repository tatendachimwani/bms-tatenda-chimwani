import {
  BookOpen,
  Search,
  ShieldCheck,
  BarChart3,
  Database,
  Users,
} from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: <BookOpen className="w-8 h-8 text-blue-600" />,
      title: "Book Management",
      description: "Add, edit, organize, and manage books easily.",
    },
    {
      icon: <Search className="w-8 h-8 text-blue-600" />,
      title: "Advanced Search",
      description: "Search books by title, author, category, or ISBN.",
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-blue-600" />,
      title: "Secure Authentication",
      description: "JWT authentication and protected routes.",
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-blue-600" />,
      title: "Analytics Dashboard",
      description: "Track reports and system activities.",
    },
    {
      icon: <Database className="w-8 h-8 text-blue-600" />,
      title: "Reliable Database",
      description: "Powered by PostgreSQL for scalability.",
    },
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: "User Management",
      description: "Manage admins, librarians, and users.",
    },
  ];

  return (
    <section id="features" className="py-20 bg-gray-50 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Powerful Features
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Everything you need to manage books efficiently.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-md hover:shadow-2xl transition"
            >
              <div className="mb-5">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
