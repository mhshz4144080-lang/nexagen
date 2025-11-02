const testimonials = [
  {
    name: "James Smith",
    role: "Business Owner",
    text: "NexaGen exceeded our expectations, delivering exceptional leads and outstanding customer service. Their innovative solutions have truly boosted our business growth.",
    rating: 5,
    avatar: "JS",
    color: "from-red-600 to-red-700"
  },
  {
    name: "Oliver Williams",
    role: "Marketing Director",
    text: "Working with NexaGen was a game-changer for our business. Their dedication and expertise in lead generation made a significant impact on our success. Highly recommended!",
    rating: 5,
    avatar: "OW",
    color: "from-gray-700 to-gray-900"
  },
  {
    name: "Henry Evans",
    role: "Operations Manager",
    text: "NexaGen stands out for their professionalism and effectiveness. Their BPO services have been crucial in propelling our business forward. Great team to collaborate with!",
    rating: 5,
    avatar: "HE",
    color: "from-red-700 to-gray-900"
  }
];

export function Testimonials() {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-full shadow-lg">
            TESTIMONIALS
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mt-6 mb-4">
            What Our <span className="text-red-600 dark:text-red-500">Clients Say</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Don't just take our word for it - hear from our satisfied clients
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Quote icon */}
              <div className="absolute top-6 right-6 text-6xl text-gray-200 dark:text-gray-700 opacity-50">
                "
              </div>

              {/* Stars */}
              <div className="flex mb-6 relative z-10">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Testimonial text */}
              <p className="text-gray-700 dark:text-gray-300 mb-8 leading-relaxed italic relative z-10">
                "{testimonial.text}"
              </p>

              {/* Author info */}
              <div className="flex items-center border-t border-gray-200 dark:border-gray-700 pt-6 relative z-10">
                <div className={`w-12 h-12 bg-gradient-to-br ${testimonial.color} rounded-full flex items-center justify-center text-white font-bold shadow-lg`}>
                  {testimonial.avatar}
                </div>
                <div className="ml-4">
                  <p className="font-bold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
