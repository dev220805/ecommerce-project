
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="relative bg-navy text-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1565463646659-e7d4b9a78bef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80')] bg-cover bg-center opacity-20"></div>
      <div className="container-custom relative z-10 py-24 md:py-32">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Elevate Your Living Space</h1>
          <p className="text-lg md:text-xl opacity-90 mb-8">
            Discover thoughtfully designed products that blend style, quality, and functionality for modern living.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button className="bg-white text-navy hover:bg-gray-100 transition-colors">
              <Link to="/products" className="flex items-center">
                Shop Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 transition-colors">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
