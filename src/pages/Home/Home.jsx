import SliderSection from './components/SliderSection';
import FeaturesAnimated from './components/FeaturesAnimated';
import StatsSection from './components/StatsSection';
import TestimonialsSection from './components/TestimonialsSection';
import LatestBooks from './components/LatestBooks';

const Home = () => {
  return (
    <div>
      <SliderSection />
       <LatestBooks />
      <FeaturesAnimated />
      <StatsSection />     
      <TestimonialsSection />
    </div>
  );
};

export default Home;
