const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Book Enthusiast',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      rating: 5,
      text: 'BookCourier has transformed my reading experience! Fast delivery, great selection, and excellent customer service. Highly recommended!',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'Michael Chen',
      role: 'College Student',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
      rating: 5,
      text: 'As a student, I need my textbooks quickly. BookCourier always delivers on time, and their prices are unbeatable. Love this service!',
      color: 'from-purple-500 to-pink-500'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Teacher',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
      rating: 5,
      text: 'I order books for my classroom regularly. The bulk ordering process is smooth, and the quality of service is consistently excellent.',
      color: 'from-green-500 to-emerald-500'
    }
  ];

  return (
    <section className="py-5 bg-base-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            What Our <span className="text-primary">Readers Say</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Don't just take our word for it - hear from our satisfied customers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-primary p-4"
            >
              <div className="card-body ">
                
                
                {/* Rating Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-600 dark:text-gray-400 mb-6 italic">
                  {testimonial.text}
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-4 mt-auto">
                  <div className="avatar">
                    <div className="w-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img src={testimonial.image} alt={testimonial.name} />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold text-lg">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-8 text-center">
          <div className="card bg-gradient-to-r from-primary to-secondary text-white shadow-2xl  mx-auto">
            <div className="card-body items-center text-center py-12">
              <h3 className="text-3xl font-bold mb-4">Ready to Start Your Reading Journey?</h3>
              <p className="text-lg mb-6 opacity-90">
                Join thousands of happy readers and get your favorite books delivered to your doorstep
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a href="/books" className="btn btn-lg bg-white text-primary hover:bg-gray-100 border-none px-4">
                  Browse Books
                </a>
                <a href="/register" className="btn btn-lg btn-outline border-white text-white hover:bg-white hover:text-primary px-4">
                  Sign Up Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
