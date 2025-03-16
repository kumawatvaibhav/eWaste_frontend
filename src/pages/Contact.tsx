
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Mail, MapPin, Phone, Send, MessageSquare, Clock, CheckCircle2 } from 'lucide-react';

const Contact: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log('Form submitted');
    // You could add a toast notification here
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-ewaste-50 to-white py-20">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                Get in <span className="text-ewaste-600">Touch</span>
              </h1>
              <p className="text-lg text-gray-700 mb-8">
                Have questions about our e-waste management solutions? We're here to help!
                Reach out to our team for assistance, partnerships, or general inquiries.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Information & Form Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Contact Information */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                <p className="text-gray-600 mb-8">
                  Our team is ready to assist you with any questions or concerns about e-waste 
                  management. Choose your preferred method of communication.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-ewaste-100 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-ewaste-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold mb-1">Office Location</h3>
                      <p className="text-gray-600">GSFC University<br />Vadodara, Gujarat, India</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-ewaste-100 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-ewaste-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold mb-1">Email Us</h3>
                      <p className="text-gray-600">info@ewaste.com<br />support@ewaste.com</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-ewaste-100 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-ewaste-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold mb-1">Call Us</h3>
                      <p className="text-gray-600">+91 123 456 7890<br />+91 987 654 3210</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-ewaste-100 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-ewaste-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold mb-1">Working Hours</h3>
                      <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM<br />Saturday: 10:00 AM - 4:00 PM</p>
                    </div>
                  </div>
                </div>

                <div className="mt-10">
                  <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                  <div className="flex space-x-4">
                    <a href="#" className="w-10 h-10 rounded-full bg-ewaste-100 flex items-center justify-center hover:bg-ewaste-200 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-ewaste-600"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-ewaste-100 flex items-center justify-center hover:bg-ewaste-200 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-ewaste-600"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-ewaste-100 flex items-center justify-center hover:bg-ewaste-200 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-ewaste-600"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-ewaste-100 flex items-center justify-center hover:bg-ewaste-200 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-ewaste-600"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <div className="bg-white p-8 rounded-xl shadow-md">
                  <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Your Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-ewaste-500 focus:border-ewaste-500"
                          placeholder="John Doe"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Your Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-ewaste-500 focus:border-ewaste-500"
                          placeholder="john@example.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="mb-6">
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-ewaste-500 focus:border-ewaste-500"
                        placeholder="How can we help you?"
                        required
                      />
                    </div>

                    <div className="mb-6">
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Message
                      </label>
                      <textarea
                        id="message"
                        rows={5}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-ewaste-500 focus:border-ewaste-500"
                        placeholder="Type your message here..."
                        required
                      ></textarea>
                    </div>

                    <Button type="submit" className="w-full bg-ewaste-500 hover:bg-ewaste-600 text-white flex items-center justify-center">
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-gray-600">
                Find answers to commonly asked questions about our e-waste management services
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {[
                {
                  question: "How do I schedule an e-waste pickup?",
                  answer: "You can schedule a pickup through our website by logging into your account and selecting the 'Schedule Pickup' option. Fill in the required details and choose a convenient date and time slot."
                },
                {
                  question: "What types of electronic waste do you accept?",
                  answer: "We accept a wide range of electronic waste including computers, laptops, mobile phones, tablets, printers, televisions, and other electronic devices. You can find a complete list on our website."
                },
                {
                  question: "Is there a fee for e-waste collection?",
                  answer: "Most standard collections are free of charge. However, there may be a nominal fee for bulk collections or certain specialized items. The exact cost will be provided during the scheduling process."
                },
                {
                  question: "How is my data handled during e-waste recycling?",
                  answer: "We take data security seriously. All devices undergo a certified data wiping process to ensure your personal information is completely erased before recycling."
                },
                {
                  question: "Can I track the status of my e-waste after collection?",
                  answer: "Yes, you can track the status of your e-waste through your account dashboard. We provide updates at each stage of the recycling process."
                },
                {
                  question: "Do you provide certificates for e-waste recycling?",
                  answer: "Yes, we provide certificates of recycling for businesses and individuals who require documentation for compliance or sustainability reporting purposes."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-start">
                    <MessageSquare className="w-5 h-5 text-ewaste-500 mt-1" />
                    <h3 className="text-lg font-semibold ml-3 mb-2">{faq.question}</h3>
                  </div>
                  <p className="text-gray-600 ml-8">{faq.answer}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-gray-600 mb-4">Didn't find what you're looking for?</p>
              <Button className="bg-ewaste-500 hover:bg-ewaste-600 text-white">
                Contact Us Directly
              </Button>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="h-96 relative">
          <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
            <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-lg shadow-md">
              <MapPin className="w-8 h-8 text-ewaste-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Our Location</h3>
              <p className="text-gray-600">GSFC University, Vadodara, Gujarat, India</p>
              <p className="mt-4 text-sm text-gray-500">Interactive map would be displayed here</p>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-20 bg-ewaste-600 text-white">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
                <p className="text-white/90">
                  Subscribe to our newsletter for the latest updates, tips, and news about e-waste management.
                </p>
              </div>
              <div className="md:w-1/2">
                <form className="flex w-full max-w-md" onSubmit={(e) => e.preventDefault()}>
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="flex-grow px-4 py-3 rounded-l-md focus:outline-none text-gray-900"
                    required
                  />
                  <Button type="submit" className="rounded-l-none bg-earth-500 hover:bg-earth-600">
                    Subscribe
                  </Button>
                </form>
                <p className="text-sm text-white/80 mt-2 flex items-center">
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  We respect your privacy and will never share your email
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
