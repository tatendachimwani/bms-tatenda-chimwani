import {BookOpen,Users,  ShieldCheck,  Database, BarChart3,  Clock3,} from "lucide-react";

export default function About() {
  const features = [
    {
      icon: <BookOpen className="w-8 h-8 text-blue-600" />,
      title: "Book Management",
      description:
        "Easily add, edit, organize, and manage books in one centralized system.",
    },
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: "User Management",
      description:
        "Manage administrators, librarians, and users with secure authentication.",
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-blue-600" />,
      title: "Secure Access",
      description:
        "Protected routes and JWT authentication ensure secure access to the platform.",
    },
    {
      icon: <Database className="w-8 h-8 text-blue-600" />,
      title: "Reliable Database",
      description:
        "Powered by PostgreSQL for fast, scalable, and reliable data management.",
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-blue-600" />,
      title: "Analytics Dashboard",
      description:
        "Track book statistics, borrowing trends, and user activity in real time.",
    },
    {
      icon: <Clock3 className="w-8 h-8 text-blue-600" />,
      title: "Time Saving",
      description:
        "Reduce manual processes and improve efficiency through automation.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">
            About Our Book Management System
          </h1>

          <p className="text-lg text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Our platform is designed to simplify book and library management
            through a modern, secure, and user-friendly digital experience.
            Whether managing a school library, university collection, or
            bookstore inventory, our system helps streamline operations
            efficiently.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div>
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Our Mission
            </h2>

            <p className="text-gray-600 leading-relaxed mb-4">
              We aim to modernize traditional book management systems by
              providing a fast, scalable, and intelligent platform for managing
              books, users, and borrowing activities.
            </p>

            <p className="text-gray-600 leading-relaxed">
              Built with modern technologies like React, NestJS, and PostgreSQL,
              our solution focuses on performance, security, and usability.
            </p>
          </div>

          {/* Image */}
          <div>
            <img
              src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da"
              alt="Library"
              className="rounded-3xl shadow-2xl object-cover h-[400px] w-full"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Why Choose Our System?
            </h2>

            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform combines simplicity, performance, and security to
              deliver a complete book management experience.
            </p>
          </div>

          {/* Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-50 p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300"
              >
                <div className="mb-5">{feature.icon}</div>

                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {feature.title}
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-6 bg-blue-600 text-white">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center">
          <div>
            <h3 className="text-5xl font-bold mb-2">10K+</h3>
            <p className="text-blue-100">Books Managed</p>
          </div>

          <div>
            <h3 className="text-5xl font-bold mb-2">5K+</h3>
            <p className="text-blue-100">Active Users</p>
          </div>

          <div>
            <h3 className="text-5xl font-bold mb-2">99.9%</h3>
            <p className="text-blue-100">System Reliability</p>
          </div>

          <div>
            <h3 className="text-5xl font-bold mb-2">24/7</h3>
            <p className="text-blue-100">Availability</p>
          </div>
        </div>
      </section>

      {/* Team / Closing */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Built for Modern Libraries & Institutions
          </h2>

          <p className="text-gray-600 leading-relaxed text-lg">
            Our Book Management System empowers institutions to digitize their
            operations, improve efficiency, and provide better access to
            knowledge through innovative technology.
          </p>

          <button className="mt-8 bg-blue-600 hover:bg-blue-700 transition text-white px-8 py-4 rounded-xl font-semibold shadow-lg">
            Get Started
          </button>
        </div>
      </section>
    </div>
  );
}
