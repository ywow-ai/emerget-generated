import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { mockFeatures, mockTestimonials } from '../data/mock';
import { Users, Calendar, Shirt, Heart, ArrowRight, Star, Sparkles } from 'lucide-react';

const iconMap = {
  users: Users,
  calendar: Calendar,
  shirt: Shirt,
  heart: Heart
};

const Landing = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl animate-pulse" style={{ background: 'var(--hero-gradient)' }}></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl animate-pulse" style={{ background: 'var(--hero-gradient)', animationDelay: '1s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-[var(--surface)] border border-[var(--border)] mb-6 animate-bounce">
              <Sparkles className="w-4 h-4 text-[var(--primary)]" />
              <span className="text-sm font-medium text-[var(--text-secondary)]">Join 10,000+ Cosplayers Worldwide</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span style={{ background: 'var(--hero-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Your Cosplay
              </span>
              <br />
              <span className="text-[var(--text-primary)]">Journey Starts Here</span>
            </h1>
            
            <p className="text-xl text-[var(--text-secondary)] mb-10 max-w-2xl mx-auto leading-relaxed">
              Connect with the global cosplay community, discover events, rent amazing costumes, and showcase your creativity.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/register">
                <Button 
                  size="lg" 
                  className="rounded-xl px-8 py-6 text-lg font-semibold text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  style={{ background: 'var(--button-primary)' }}
                >
                  Get Started Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/feed">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="rounded-xl px-8 py-6 text-lg font-semibold border-2 hover:bg-[var(--surface-light)] transition-all duration-300"
                >
                  Explore Feed
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold text-[var(--primary)] mb-2">10K+</div>
                <div className="text-sm text-[var(--text-secondary)]">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[var(--primary)] mb-2">500+</div>
                <div className="text-sm text-[var(--text-secondary)]">Events</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[var(--primary)] mb-2">2K+</div>
                <div className="text-sm text-[var(--text-secondary)]">Costumes</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[var(--text-primary)]">
              Everything You Need
            </h2>
            <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
              All-in-one platform for cosplayers to connect, create, and celebrate
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockFeatures.map((feature) => {
              const Icon = iconMap[feature.icon];
              return (
                <Card 
                  key={feature.id} 
                  className="border-[var(--border)] hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group"
                  style={{ background: 'var(--card-gradient)' }}
                >
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300" style={{ background: 'var(--button-primary)' }}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-[var(--text-primary)]">{feature.title}</h3>
                    <p className="text-[var(--text-secondary)] leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[var(--text-primary)]">
              Loved by Cosplayers
            </h2>
            <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
              See what our community members have to say
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {mockTestimonials.map((testimonial) => (
              <Card key={testimonial.id} className="border-[var(--border)] hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full border-2 border-[var(--primary)]"
                    />
                    <div>
                      <div className="font-semibold text-[var(--text-primary)]">{testimonial.name}</div>
                      <div className="text-sm text-[var(--text-secondary)]">{testimonial.username}</div>
                    </div>
                  </div>
                  <div className="flex space-x-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[var(--warning)] text-[var(--warning)]" />
                    ))}
                  </div>
                  <p className="text-[var(--text-secondary)] leading-relaxed">{testimonial.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 overflow-hidden relative">
            <div className="absolute inset-0" style={{ background: 'var(--hero-gradient)', opacity: 0.1 }}></div>
            <CardContent className="p-12 relative z-10 text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[var(--text-primary)]">
                Ready to Join?
              </h2>
              <p className="text-xl text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto">
                Start your cosplay journey today and connect with thousands of passionate creators
              </p>
              <Link to="/register">
                <Button 
                  size="lg" 
                  className="rounded-xl px-10 py-6 text-lg font-semibold text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  style={{ background: 'var(--button-primary)' }}
                >
                  Create Free Account
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[var(--surface)] border-t border-[var(--border)] py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--hero-gradient)' }}>
                  <Shirt className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold" style={{ background: 'var(--hero-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  CosplayHub
                </span>
              </div>
              <p className="text-sm text-[var(--text-secondary)]">
                Your ultimate cosplay community platform
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-[var(--text-primary)]">Platform</h4>
              <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                <li><Link to="/feed" className="hover:text-[var(--primary)] transition-colors">Feed</Link></li>
                <li><Link to="/events" className="hover:text-[var(--primary)] transition-colors">Events</Link></li>
                <li><Link to="/costumes" className="hover:text-[var(--primary)] transition-colors">Costumes</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-[var(--text-primary)]">Company</h4>
              <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                <li><a href="#" className="hover:text-[var(--primary)] transition-colors">About</a></li>
                <li><a href="#" className="hover:text-[var(--primary)] transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-[var(--primary)] transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-[var(--text-primary)]">Support</h4>
              <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                <li><a href="#" className="hover:text-[var(--primary)] transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-[var(--primary)] transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-[var(--primary)] transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[var(--border)] pt-8 text-center text-sm text-[var(--text-secondary)]">
            <p>© 2025 CosplayHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;