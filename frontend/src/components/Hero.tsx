
export default function Hero() {
  return (
    <section className="min-h-screen bg-gradient-to-r from-blue-600 to-indigo-700 flex items-center px-6 pt-24">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
            Manage Books Smarter With Modern Digital Tools
          </h1>

          <p className="text-blue-100 text-lg mt-6 leading-relaxed">
            A powerful Book Management System for libraries, schools,
            universities, and bookstores.
          </p>

          <div className="flex gap-4 mt-8">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100">
              Get Started
            </button>
             
          </div>
        </div>

        <div>
          <img
            src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da"
            alt="Dashboard"
            className="rounded-3xl shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}
