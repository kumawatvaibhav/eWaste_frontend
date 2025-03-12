
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Recycle, Leaf, Earth } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Hero: React.FC = () => {
  return (
    <section className="pt-28 pb-16 md:pt-36 md:pb-24 px-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-ewaste-50/50 to-transparent -z-10" />
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-ewaste-100 rounded-full blur-3xl opacity-30 -z-10" />
      <div className="absolute top-40 -left-24 w-72 h-72 bg-earth-100 rounded-full blur-3xl opacity-30 -z-10" />

      {/* Floating icons decoration */}
      <div className="hidden lg:block absolute top-40 right-10 animate-float opacity-10">
        <Recycle className="w-24 h-24 text-ewaste-500" />
      </div>
      <div className="hidden lg:block absolute bottom-20 left-10 animate-float opacity-10" style={{ animationDelay: '1s' }}>
        <Leaf className="w-16 h-16 text-ewaste-600" />
      </div>
      <div className="hidden lg:block absolute top-1/2 left-1/4 animate-float opacity-10" style={{ animationDelay: '2s' }}>
        <Earth className="w-20 h-20 text-earth-500" />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-12">
          {/* Hero Content */}
          <div className="lg:w-1/2 space-y-8">
            <div 
              className="inline-block px-4 py-1.5 rounded-full bg-ewaste-100 text-ewaste-800 font-medium text-sm mb-2"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              Innovative E-Waste Management
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight md:leading-tight lg:leading-tight tracking-tight">
              <span>Transform </span>
              <span className="text-gradient">electronic waste </span>
              <span>into environmental impact</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
              Join our mission to reduce e-waste and create a sustainable future through responsible recycling and innovative solutions.
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-2">
              <Link to="/register">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto bg-ewaste-500 hover:bg-ewaste-600 text-white"
                >
                  <span>Get Started</span>
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link to="/about">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full sm:w-auto border-ewaste-200 hover:bg-ewaste-50 hover:border-ewaste-300"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="lg:w-1/2 mt-12 lg:mt-0">
            <div className="relative">
              {/* Main image with glass effect card */}
              <div className="rounded-2xl overflow-hidden shadow-xl transform transition-all hover:scale-[1.02] duration-500">
                <div className="aspect-[4/3] bg-gradient-to-br from-ewaste-600 to-ewaste-400 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-white">
                    <div className="w-full h-full flex items-center justify-center">
                      <img 
                        src="https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&q=80&w=1000"
                        alt="E-waste collection and recycling" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Stats card */}
              <div className="absolute -bottom-8 -left-8 md:bottom-8 md:-left-16 glass-card rounded-xl p-4 shadow-lg animate-float">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-ewaste-100 flex items-center justify-center">
                    <Recycle className="w-6 h-6 text-ewaste-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Recycled This Year</p>
                    <p className="text-xl font-bold">4.2M+ Devices</p>
                  </div>
                </div>
              </div>
              
              {/* Impact card */}
              <div className="absolute -top-6 -right-6 md:-top-10 md:-right-10 glass-card rounded-xl p-4 shadow-lg animate-float" style={{ animationDelay: '0.5s' }}>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <Earth className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">CO₂ Reduction</p>
                    <p className="text-xl font-bold">28K+ Tons</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
