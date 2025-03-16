
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ArrowRight, BarChart3, Clock, Earth, PieChart, RefreshCw, Recycle, HeartHandshake, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Impact: React.FC = () => {
  const impactStats = [
    {
      value: "24,560",
      label: "Devices Recycled",
      icon: <Recycle className="h-8 w-8 text-ewaste-500" />
    },
    {
      value: "568",
      label: "Tons of e-Waste Diverted",
      icon: <Earth className="h-8 w-8 text-ewaste-500" />
    },
    {
      value: "1,840",
      label: "Tons of CO2 Saved",
      icon: <RefreshCw className="h-8 w-8 text-ewaste-500" />
    },
    {
      value: "12,300",
      label: "Active Users",
      icon: <HeartHandshake className="h-8 w-8 text-ewaste-500" />
    }
  ];

  const impactStories = [
    {
      title: "School E-Waste Collection Drive",
      description: "Partnered with 25 schools across the country to collect over 5,000 electronic devices and educate students about e-waste management.",
      image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Corporate Sustainability Initiative",
      description: "Helped 50+ companies implement sustainable e-waste disposal protocols, recycling over 10 tons of corporate electronic waste.",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Community Repair Workshop",
      description: "Organized monthly repair workshops where community members learn to fix their devices, extending the life of over 1,200 gadgets.",
      image: "https://images.unsplash.com/photo-1581092921461-39b90de3f0e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-ewaste-50 to-white py-20">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                Our <span className="text-ewaste-600">Environmental Impact</span>
              </h1>
              <p className="text-lg text-gray-700 mb-10 max-w-3xl mx-auto">
                Through our collective efforts, we're making measurable progress in reducing 
                electronic waste and its harmful effects on our planet.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button className="bg-ewaste-500 hover:bg-ewaste-600 text-white">
                  Join Our Mission
                </Button>
                <Button variant="outline" className="border-ewaste-200 hover:border-ewaste-300 hover:bg-ewaste-50">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Impact Metrics Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Impact by Numbers</h2>
              <p className="text-lg text-gray-600">
                Measurable results from our collective efforts toward sustainable e-waste management
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {impactStats.map((stat, index) => (
                <div 
                  key={index}
                  className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 text-center"
                >
                  <div className="mx-auto w-16 h-16 flex items-center justify-center bg-ewaste-50 rounded-full mb-6">
                    {stat.icon}
                  </div>
                  <h3 className="text-3xl font-bold mb-2 text-gray-900">{stat.value}</h3>
                  <p className="text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Impact Timeline Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Journey of Impact</h2>
              <p className="text-lg text-gray-600">
                Key milestones in our mission to revolutionize e-waste management
              </p>
            </div>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-ewaste-100"></div>
              
              {/* Timeline Items */}
              <div className="space-y-20">
                {[
                  {
                    year: "2022",
                    title: "Launch of eWaste Platform",
                    description: "Initial release of our platform connecting consumers with certified e-waste recyclers."
                  },
                  {
                    year: "2022",
                    title: "First Major Collection Drive",
                    description: "Collected over 5,000 devices in our inaugural nationwide collection campaign."
                  },
                  {
                    year: "2023",
                    title: "Corporate Partnership Program",
                    description: "Launched partnerships with 50+ companies to implement sustainable e-waste disposal protocols."
                  },
                  {
                    year: "2023",
                    title: "Educational Outreach Expansion",
                    description: "Extended our awareness programs to 100+ schools and universities across the country."
                  },
                  {
                    year: "2024",
                    title: "Launch of Impact Dashboard",
                    description: "Introduced personalized impact tracking for users to visualize their contribution to environmental conservation."
                  }
                ].map((item, index) => (
                  <div key={index} className="relative">
                    {/* Timeline Dot */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-ewaste-500 flex items-center justify-center z-10">
                      <div className="w-4 h-4 rounded-full bg-white"></div>
                    </div>
                    
                    {/* Content */}
                    <div className={`w-5/12 ${index % 2 === 0 ? 'ml-auto pl-8' : 'mr-auto pr-8 text-right'}`}>
                      <div className="bg-white p-6 rounded-xl shadow-sm">
                        <div className="flex items-center mb-3 gap-2">
                          <Clock className={`w-5 h-5 text-ewaste-500 ${index % 2 !== 0 ? 'ml-auto' : ''}`} />
                          <span className="font-semibold text-ewaste-600">{item.year}</span>
                        </div>
                        <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Impact Stories Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Impact Stories</h2>
              <p className="text-lg text-gray-600">
                Real-world examples of how our initiatives are making a difference
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {impactStories.map((story, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={story.image} 
                      alt={story.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-3">{story.title}</h3>
                    <p className="text-gray-600 mb-4">{story.description}</p>
                    <a href="#" className="inline-flex items-center text-ewaste-600 hover:text-ewaste-700 font-medium">
                      Read full story <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Recognition Section */}
        <section className="py-20 bg-ewaste-50">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Recognition & Awards</h2>
              <p className="text-lg text-gray-600">
                Acknowledgments of our efforts in sustainable e-waste management
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  award: "Green Tech Innovation Award 2023",
                  organization: "Environmental Protection Agency",
                  description: "Recognized for innovative approaches to e-waste management and recycling technology."
                },
                {
                  award: "Community Impact Excellence",
                  organization: "National Sustainability Forum",
                  description: "Awarded for outstanding community engagement and educational initiatives on e-waste."
                },
                {
                  award: "Circular Economy Leadership",
                  organization: "Global Recycling Initiative",
                  description: "Recognized for promoting circular economy principles in electronics consumption and disposal."
                }
              ].map((item, index) => (
                <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="w-14 h-14 rounded-full bg-ewaste-100 flex items-center justify-center mb-6">
                    <Trophy className="w-7 h-7 text-ewaste-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.award}</h3>
                  <p className="text-ewaste-600 mb-4">{item.organization}</p>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Join Our Mission Section */}
        <section className="py-20 bg-gradient-to-r from-ewaste-500 to-ewaste-600 text-white">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="md:w-2/3">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Mission for a Cleaner Planet</h2>
                <p className="text-lg text-white/90 mb-0">
                  Be part of the solution to electronic waste. Together, we can make a significant impact.
                </p>
              </div>
              <div>
                <Button className="bg-white text-ewaste-600 hover:bg-white/90">
                  Get Started Today
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Impact;
