import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { mockEvents } from '../data/mockEvents';
import { mockCostumes } from '../data/mockCostumes';
import { Calendar, MapPin, Users, Star, ArrowRight, Sparkles } from 'lucide-react';

const Home = () => {
  // Get latest events (upcoming ones)
  const latestEvents = mockEvents
    .filter(event => event.status === 'upcoming')
    .slice(0, 6);

  // Get latest costumes (available ones)
  const latestCostumes = mockCostumes
    .filter(costume => costume.status === 'available')
    .slice(0, 8);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-[var(--background)] pt-20 pb-24 md:pb-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Featured Banner */}
        <Card className="mb-8 border-[var(--border)] overflow-hidden">
          <div className="relative">
            <div className="absolute inset-0 opacity-10" style={{ background: 'var(--hero-gradient)' }}></div>
            <CardContent className="p-8 relative z-10">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex-1">
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[var(--surface)] border border-[var(--border)] mb-3">
                    <Sparkles className="w-4 h-4 text-[var(--primary)]" />
                    <span className="text-sm font-medium text-[var(--text-secondary)]">Featured Event</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ background: 'var(--hero-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    Anime Festival Jakarta 2025
                  </h2>
                  <p className="text-[var(--text-secondary)] mb-4">
                    Join the biggest anime festival of the year! Special guests, cosplay contests, and more.
                  </p>
                  <Link to="/events/1">
                    <Button 
                      className="rounded-lg text-white"
                      style={{ background: 'var(--button-primary)' }}
                    >
                      View Details
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>
                <div className="hidden md:block">
                  <img
                    src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=200&fit=crop"
                    alt="Featured Event"
                    className="w-64 h-40 rounded-lg object-cover shadow-lg"
                  />
                </div>
              </div>
            </CardContent>
          </div>
        </Card>

        {/* Latest Events Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-2">Latest Events</h2>
              <p className="text-[var(--text-secondary)]">Discover upcoming cosplay events and conventions</p>
            </div>
            <Link to="/events">
              <Button variant="outline" className="rounded-lg">
                View All
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestEvents.map((event) => (
              <Link key={event.id} to={`/events/${event.id}`}>
                <Card className="border-[var(--border)] hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={event.coverImage}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold text-white bg-[var(--secondary)]">
                        Upcoming
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2 line-clamp-2 group-hover:text-[var(--primary)] transition-colors">
                      {event.title}
                    </h3>
                    <div className="space-y-2 mb-3">
                      <div className="flex items-center text-sm text-[var(--text-secondary)]">
                        <Calendar className="w-4 h-4 mr-2 text-[var(--primary)]" />
                        <span>{formatDate(event.date)}</span>
                      </div>
                      <div className="flex items-center text-sm text-[var(--text-secondary)]">
                        <MapPin className="w-4 h-4 mr-2 text-[var(--primary)]" />
                        <span className="line-clamp-1">{event.location}</span>
                      </div>
                      <div className="flex items-center text-sm text-[var(--text-secondary)]">
                        <Users className="w-4 h-4 mr-2 text-[var(--primary)]" />
                        <span>{event.attendees} attendees</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-[var(--border)]">
                      {event.isFree ? (
                        <span className="text-lg font-bold text-[var(--success)]">FREE</span>
                      ) : (
                        <span className="text-lg font-bold text-[var(--primary)]">{formatPrice(event.price)}</span>
                      )}
                      <Button
                        size="sm"
                        className="rounded-lg text-white"
                        style={{ background: 'var(--button-primary)' }}
                      >
                        Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Latest Costumes Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-2">New Costumes</h2>
              <p className="text-[var(--text-secondary)]">Rent high-quality cosplay costumes from verified creators</p>
            </div>
            <Link to="/costumes">
              <Button variant="outline" className="rounded-lg">
                View All
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {latestCostumes.map((costume) => (
              <Link key={costume.id} to={`/costumes/${costume.id}`}>
                <Card className="border-[var(--border)] hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={costume.images[0]}
                      alt={costume.characterName}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold text-white bg-[var(--success)]">
                        Available
                      </span>
                      <div className="flex items-center text-xs text-white bg-black/60 backdrop-blur-sm rounded-full px-2 py-1">
                        <Star className="w-3 h-3 mr-1 fill-current text-[var(--warning)]" />
                        <span className="font-semibold">{costume.rating}</span>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-bold text-[var(--text-primary)] line-clamp-1 group-hover:text-[var(--primary)] transition-colors mb-1">
                      {costume.characterName}
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)] mb-3">{costume.franchiseName}</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs text-[var(--text-secondary)]">Per Day</div>
                        <div className="text-lg font-bold text-[var(--primary)]">{formatPrice(costume.pricePerDay)}</div>
                      </div>
                      <Button
                        size="sm"
                        className="rounded-lg text-white"
                        style={{ background: 'var(--button-primary)' }}
                      >
                        Rent
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
