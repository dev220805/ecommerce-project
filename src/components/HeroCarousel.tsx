
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselPrevious, 
  CarouselNext 
} from '@/components/ui/carousel';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface HeroSlide {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  ctaLink: string;
}

const heroSlides: HeroSlide[] = [
  {
    id: 1,
    title: "Elevate Your Living Space",
    description: "Discover thoughtfully designed products that blend style, quality, and functionality for modern living.",
    imageUrl: "https://images.unsplash.com/photo-1565463646659-e7d4b9a78bef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    ctaLink: "/products",
  },
  {
    id: 2,
    title: "Premium Home Essentials",
    description: "Curated collection of high-quality furniture and accessories to transform your space.",
    imageUrl: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80",
    ctaLink: "/products",
  },
  {
    id: 3,
    title: "Sustainable Living",
    description: "Eco-friendly products that look good and do good for the planet.",
    imageUrl: "https://images.unsplash.com/photo-1567016432779-094069958ea5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1680&q=80",
    ctaLink: "/products",
  }
];

const HeroCarousel = () => {
  return (
    <div className="relative overflow-hidden bg-black">
      <Carousel className="w-full" opts={{
        loop: true,
        duration: 50,
      }}>
        <CarouselContent>
          {heroSlides.map((slide) => (
            <CarouselItem key={slide.id}>
              <div className="relative">
                <AspectRatio ratio={16/7} className="bg-muted">
                  <div className="absolute inset-0 bg-black/50 z-10" />
                  <img
                    src={slide.imageUrl}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 z-20 flex items-center">
                    <div className="container-custom">
                      <div className="max-w-2xl">
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white animate-fade-in">
                          {slide.title}
                        </h2>
                        <p className="text-lg md:text-xl text-white/90 mb-8 animate-fade-in">
                          {slide.description}
                        </p>
                        <div className="flex flex-wrap gap-4 animate-fade-in">
                          <Button className="bg-accent text-black hover:bg-accent/90 transition-colors">
                            <Link to={slide.ctaLink} className="flex items-center">
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
                  </div>
                </AspectRatio>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="container-custom relative">
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-30" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-30" />
        </div>
      </Carousel>
    </div>
  );
};

export default HeroCarousel;
