
import React from 'react';
import { ArrowRight, Leaf, RefreshCw, BarChart, Award, ShieldCheck } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: <Leaf className="h-10 w-10 text-ewaste-500" />,
      title: 'Eco-Friendly Disposal',
      description: 'Properly recycle electronic waste to minimize environmental impact and prevent toxic materials from entering landfills.'
    },
    {
      icon: <RefreshCw className="h-10 w-10 text-ewaste-500" />,
      title: 'Circular Economy',
      description: 'Support the reuse and recycling of electronic components, reducing the need for new raw material extraction.'
    },
    {
      icon: <BarChart className="h-10 w-10 text-ewaste-500" />,
      title: 'Track Your Impact',
      description: 'Monitor your contributions with detailed analytics and see how your efforts are making a difference.'
    },
    {
      icon: <ShieldCheck className="h-10 w-10 text-ewaste-500" />,
      title: 'Data Security',
      description: 'All personal data on recycled devices is securely wiped according to industry standards before processing.'
    },
    {
      icon: <Award className="h-10 w-10 text-ewaste-500" />,
      title: 'Rewards Program',
      description: 'Earn points for your e-waste contributions that can be redeemed for eco-friendly products and services.'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Our E-Waste Management?</h2>
          <p className="text-gray-600 text-lg">
            Join our mission to create a sustainable future through responsible e-waste management.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600 mb-4">{feature.description}</p>
              <a href="#" className="inline-flex items-center text-ewaste-600 hover:text-ewaste-700 font-medium">
                Learn more <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
