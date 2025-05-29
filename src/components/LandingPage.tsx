
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, Award, ArrowRight, Star, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const LandingPage = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      event: "Wedding Reception",
      rating: 5,
      text: "Absolutely perfect! Every detail was handled with care. Our dream wedding became reality."
    },
    {
      name: "Michael Chen",
      event: "Corporate Event",
      rating: 5,
      text: "Professional service from start to finish. Our company event was a huge success!"
    },
    {
      name: "Emily Davis",
      event: "Birthday Party",
      rating: 5,
      text: "Amazing team! They made my daughter's birthday unforgettable. Highly recommend!"
    }
  ];

  const features = [
    {
      icon: Calendar,
      title: "Event Planning",
      description: "Professional event planning tailored to your vision and budget"
    },
    {
      icon: Users,
      title: "Team Coordination",
      description: "Experienced team managing every aspect of your event"
    },
    {
      icon: Award,
      title: "Quality Assurance",
      description: "Guaranteed quality service with 100% customer satisfaction"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">EventPro</div>
          <div className="space-x-4">
            <Link to="/login">
              <Button variant="ghost" className="text-blue-600 hover:text-blue-700">
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            Create <span className="text-blue-600">Unforgettable</span> Events
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            From intimate gatherings to grand celebrations, we bring your vision to life with 
            professional event planning and management services.
          </p>
          <div className="space-x-4">
            <Link to="/book">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                Book Your Event <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3">
              View Gallery
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            Why Choose EventPro?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-8 text-center">
                  <feature.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-blue-100">Events Completed</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-blue-100">Client Satisfaction</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">5</div>
              <div className="text-blue-100">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            What Our Clients Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
                  <div>
                    <div className="font-semibold text-gray-800">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.event}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-blue-600">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Plan Your Perfect Event?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Get started today and let our expert team handle every detail of your special occasion.
          </p>
          <Link to="/book">
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3">
              Start Planning Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 px-4">
        <div className="container mx-auto text-center">
          <div className="text-2xl font-bold text-blue-400 mb-4">EventPro</div>
          <p className="text-gray-400">Creating memorable experiences since 2019</p>
          <div className="mt-4 text-sm text-gray-500">
            © 2024 EventPro. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
