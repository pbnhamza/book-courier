import { GoStarFill } from "react-icons/go";
import { TbTruckDelivery } from "react-icons/tb";
import { MdOutlineSupportAgent } from "react-icons/md";
const StatsSection = () => {
  const stats = [
    {
      number: '50K+',
      label: 'Books Available',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
        </svg>
      ),
      color: 'bg-blue-500'
    },
    {
      number: '25K+',
      label: 'Happy Customers',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
        </svg>
      ),
      color: 'bg-green-500'
    },
    {
      number: '100+',
      label: 'Cities Covered',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
        </svg>
      ),
      color: 'bg-purple-500'
    },
    {
      number: '99.9%',
      label: 'On-Time Delivery',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
          <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
        </svg>
      ),
      color: 'bg-orange-500'
    }
  ];

  return (
    <section className=" py-5 ">
      <div className="container mx-auto px-4  text-white transition-transform "
       style={{
        background: "linear-gradient(180deg, #667eea 0%, #422AD5 100%) ",
      }}>
        <div className="text-center mb-5">
          <h2 className="text-4xl md:text-5xl font-bold py-4">Our Impact in Numbers</h2>
          <p className="text-lg text-indigo-100 max-w-2xl mx-auto">
            Join thousands of satisfied readers who trust BookCourier for their reading needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="text-center transform hover:scale-110 transition-transform duration-300"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm mb-4">
                <div className="text-white">
                  {stat.icon}
                </div>
              </div>
              <div className="text-5xl font-bold mb-2">{stat.number}</div>
              <div className="text-xl text-indigo-100">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Decorative Elements */}
        <div className="mt-5 py-5 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
            <div className="text-3xl font-bold mb-2 flex justify-center items-center"> 
              <GoStarFill  /> <span>4.9/5</span> </div>
            <div className="text-indigo-100">Average Rating</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center ">
            <div className="text-3xl font-bold mb-2 flex justify-center items-center gap-2">
              <TbTruckDelivery /> <span>#1</span>
               </div>
            <div className="text-indigo-100">Book Delivery Service</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
            <div className="text-3xl font-bold mb-2 flex justify-center items-center gap-2"><MdOutlineSupportAgent  /> <span>24/7</span> </div>
            <div className="text-indigo-100">Customer Support</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
