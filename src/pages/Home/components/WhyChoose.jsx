const WhyChoose = () => {
  const features = [
    { title: 'Fast Delivery', description: 'Get your books within 24 hours' },
    { title: 'Wide Selection', description: 'Thousands of books to choose from' },
    { title: 'Secure Payment', description: 'Safe and encrypted transactions' },
  ];

  return (
    <section className="bg-base-200 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <div key={idx} className="card bg-base-100 shadow-xl">
              <div className="card-body text-center">
                <h3 className="card-title justify-center">{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
