
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Users, Building, Award, Shield, Leaf, Clock } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-ewaste-50 to-white py-20">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="lg:w-1/2">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                  Our Mission to Reduce <span className="text-ewaste-600">Electronic Waste</span>
                </h1>
                <p className="text-lg text-gray-700 mb-8">
                  We're dedicated to creating a sustainable future by revolutionizing how electronic waste is managed, 
                  reducing environmental impact, and promoting a circular economy.
                </p>
              </div>
              <div className="lg:w-1/2">
                <div className="relative">
                  <div className="absolute -top-6 -left-6 w-24 h-24 bg-ewaste-100 rounded-full"></div>
                  <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-earth-100 rounded-full"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                    alt="E-waste recycling" 
                    className="rounded-xl shadow-lg relative z-10 w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Story</h2>
              <p className="text-lg text-gray-600">
                From a small initiative to a comprehensive e-waste management platform
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="relative h-full">
                  <img 
                    src="https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                    alt="Team working together" 
                    className="rounded-xl shadow-md w-full h-full object-cover"
                  />
                  <div className="absolute -bottom-4 -right-4 w-2/3 h-24 bg-earth-50 rounded-xl -z-10"></div>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4 text-ewaste-700">How It All Started</h3>
                <p className="text-gray-600 mb-6">
                  Founded in 2022, our journey began when a group of environmental scientists and tech enthusiasts 
                  realized the growing crisis of electronic waste. With the rapid technological advancement and 
                  shorter device lifecycles, e-waste had become one of the fastest-growing waste streams globally.
                </p>
                <p className="text-gray-600 mb-6">
                  What started as a small recycling drive soon evolved into a comprehensive platform connecting 
                  consumers, recyclers, and manufacturers in a circular economy model. Our founders' vision 
                  was simple yet ambitious: to create a world where electronic devices never end up in landfills.
                </p>
                <div className="flex items-center text-ewaste-600">
                  <Clock className="w-5 h-5 mr-2" />
                  <span className="font-medium">Established in 2022</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Values</h2>
              <p className="text-lg text-gray-600">
                The principles that guide our mission and operations
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="w-14 h-14 rounded-full bg-ewaste-100 flex items-center justify-center mb-6">
                  <Leaf className="w-7 h-7 text-ewaste-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Environmental Responsibility</h3>
                <p className="text-gray-600">
                  We prioritize solutions that minimize environmental impact and promote sustainability 
                  in every aspect of our operations.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="w-14 h-14 rounded-full bg-ewaste-100 flex items-center justify-center mb-6">
                  <Users className="w-7 h-7 text-ewaste-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Community Engagement</h3>
                <p className="text-gray-600">
                  We believe in the power of collective action and actively involve communities in our 
                  e-waste management initiatives.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="w-14 h-14 rounded-full bg-ewaste-100 flex items-center justify-center mb-6">
                  <Building className="w-7 h-7 text-ewaste-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Innovation</h3>
                <p className="text-gray-600">
                  We continuously seek innovative solutions to improve e-waste collection, processing, 
                  and recycling methodologies.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="w-14 h-14 rounded-full bg-ewaste-100 flex items-center justify-center mb-6">
                  <Award className="w-7 h-7 text-ewaste-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Excellence</h3>
                <p className="text-gray-600">
                  We strive for excellence in all our operations, setting high standards for quality, 
                  safety, and efficiency.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="w-14 h-14 rounded-full bg-ewaste-100 flex items-center justify-center mb-6">
                  <Shield className="w-7 h-7 text-ewaste-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Data Privacy</h3>
                <p className="text-gray-600">
                  We are committed to protecting user data and ensuring secure disposal of sensitive 
                  information stored on electronic devices.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="w-14 h-14 rounded-full bg-ewaste-100 flex items-center justify-center mb-6">
                  <Users className="w-7 h-7 text-ewaste-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Transparency</h3>
                <p className="text-gray-600">
                  We maintain transparency in our operations, providing clear information about our 
                  recycling processes and impact metrics.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Team</h2>
              <p className="text-lg text-gray-600">
                Meet the passionate individuals behind our mission
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Aastha Basu",
                  role: "Founder & CEO",
                  image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
                },
                {
                  name: "Harsh Sharma",
                  role: "Environmental Scientist",
                  image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
                },
                {
                  name: "Dipankar Gupta",
                  role: "Tech Lead",
                  image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
                },
                {
                  name: "Ankita Patel",
                  role: "Outreach Coordinator",
                  image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
                },
                {
                  name: "Rahul Mehra",
                  role: "Sustainability Expert",
                  image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
                },
                {
                  name: "Priya Singh",
                  role: "Marketing Director",
                  image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
                }
              ].map((member, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-64 object-cover object-center"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                    <p className="text-ewaste-600">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
