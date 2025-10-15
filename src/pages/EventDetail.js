import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { mockEvents } from '../data/mockEvents';
import { Calendar, MapPin, Users, DollarSign, Clock, Tag, Share2, Bookmark, ArrowLeft, ChevronRight } from 'lucide-react';
import { toast } from '../hooks/use-toast';

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = mockEvents.find(e => e.id === parseInt(id)) || mockEvents[0];
  const [isBookmarked, setIsBookmarked] = useState(event.isBookmarked);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { 
      weekday: 'long',
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast({
      title: isBookmarked ? 'Removed from bookmarks' : 'Added to bookmarks',
      description: isBookmarked ? 'Event removed from your saved items' : 'Event saved to your bookmarks'
    });
  };

  const handleShare = () => {
    toast({
      title: 'Link copied!',
      description: 'Event link has been copied to clipboard'
    });
  };

  const handleBuyTicket = () => {
    navigate(`/events/${event.id}/pre-checkout`);
  };

  return (
    <div className="min-h-screen bg-[var(--background)] pt-20 pb-24 md:pb-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate('/events')}
          className="flex items-center space-x-2 text-[var(--text-secondary)] hover:text-[var(--primary)] mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Events</span>
        </button>

        {/* Event Header Image */}
        <div className="relative h-96 rounded-2xl overflow-hidden mb-8 shadow-2xl">
          <img
            src={event.coverImage}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="flex items-start justify-between">
              <div>
                <span
                  className="inline-block px-4 py-1 rounded-full text-sm font-semibold text-white mb-4"
                  style={{ backgroundColor: event.status === 'ongoing' ? 'var(--success)' : 'var(--secondary)' }}
                >
                  {event.status === 'ongoing' ? 'Sedang Berlangsung' : 'Upcoming'}
                </span>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{event.title}</h1>
                <p className="text-lg text-white/90">{event.category}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleShare}
                  className="p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all"
                >
                  <Share2 className="w-5 h-5 text-white" />
                </button>
                <button
                  onClick={handleBookmark}
                  className="p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all"
                >
                  <Bookmark
                    className={`w-5 h-5 ${isBookmarked ? 'fill-white text-white' : 'text-white'}`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Event Info Card */}
            <Card className="border-[var(--border)]">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">Event Details</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3">
                    <Calendar className="w-5 h-5 text-[var(--primary)] mt-1 flex-shrink-0" />
                    <div>
                      <div className="text-sm text-[var(--text-secondary)] mb-1">Date</div>
                      <div className="font-semibold text-[var(--text-primary)]">{formatDate(event.date)}</div>
                      {event.endDate && event.endDate !== event.date && (
                        <div className="text-sm text-[var(--text-secondary)] mt-1">Until {formatDate(event.endDate)}</div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-[var(--primary)] mt-1 flex-shrink-0" />
                    <div>
                      <div className="text-sm text-[var(--text-secondary)] mb-1">Time</div>
                      <div className="font-semibold text-[var(--text-primary)]">{event.time}</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-[var(--primary)] mt-1 flex-shrink-0" />
                    <div>
                      <div className="text-sm text-[var(--text-secondary)] mb-1">Location</div>
                      <div className="font-semibold text-[var(--text-primary)]">{event.location}</div>
                      <div className="text-sm text-[var(--text-secondary)] mt-1">{event.city}</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Users className="w-5 h-5 text-[var(--primary)] mt-1 flex-shrink-0" />
                    <div>
                      <div className="text-sm text-[var(--text-secondary)] mb-1">Attendees</div>
                      <div className="font-semibold text-[var(--text-primary)]">{event.attendees} / {event.maxAttendees}</div>
                      <div className="text-sm text-[var(--text-secondary)] mt-1">
                        {Math.round((event.attendees / event.maxAttendees) * 100)}% filled
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card className="border-[var(--border)]">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">About This Event</h2>
                <p className="text-[var(--text-secondary)] leading-relaxed">{event.description}</p>
              </CardContent>
            </Card>

            {/* Tags */}
            {event.tags && event.tags.length > 0 && (
              <Card className="border-[var(--border)]">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">Tags</h2>
                  <div className="flex flex-wrap gap-2">
                    {event.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded-full text-sm font-medium bg-[var(--surface)] text-[var(--primary)] border border-[var(--border)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Organizer */}
            <Card className="border-[var(--border)]">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">Organized By</h2>
                <div className="flex items-center space-x-4">
                  <img
                    src={event.organizer.avatar}
                    alt={event.organizer.name}
                    className="w-16 h-16 rounded-full border-2 border-[var(--primary)]"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-lg font-semibold text-[var(--text-primary)]">{event.organizer.name}</h3>
                      {event.organizer.verified && (
                        <span className="text-xs px-2 py-1 rounded-full bg-[var(--success)]/10 text-[var(--success)] font-medium">
                          ✓ Verified
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-[var(--text-secondary)]">Event Organizer</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Ticket Purchase */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card className="border-[var(--border)] shadow-xl">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    {event.isFree ? (
                      <div>
                        <div className="text-4xl font-bold text-[var(--success)] mb-2">FREE</div>
                        <div className="text-sm text-[var(--text-secondary)]">No ticket required</div>
                      </div>
                    ) : (
                      <div>
                        <div className="text-sm text-[var(--text-secondary)] mb-1">Starting from</div>
                        <div className="text-4xl font-bold" style={{ background: 'var(--hero-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                          {formatPrice(event.price)}
                        </div>
                        <div className="text-sm text-[var(--text-secondary)] mt-1">per ticket</div>
                      </div>
                    )}
                  </div>

                  <Button
                    onClick={handleBuyTicket}
                    className="w-full py-6 text-lg font-semibold text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
                    style={{ background: 'var(--button-primary)' }}
                    disabled={event.attendees >= event.maxAttendees}
                  >
                    {event.attendees >= event.maxAttendees ? 'Sold Out' : event.isFree ? 'Register Now' : 'Buy Tickets'}
                  </Button>

                  {event.attendees >= event.maxAttendees * 0.9 && event.attendees < event.maxAttendees && (
                    <div className="mt-4 p-3 bg-[var(--warning)]/10 rounded-lg">
                      <p className="text-sm text-[var(--warning)] text-center font-medium">
                        ⚠️ Almost sold out! Only {event.maxAttendees - event.attendees} spots left
                      </p>
                    </div>
                  )}

                  <div className="mt-6 pt-6 border-t border-[var(--border)] space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[var(--text-secondary)]">Availability</span>
                      <span className="font-semibold text-[var(--success)]">
                        {event.maxAttendees - event.attendees} spots left
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[var(--text-secondary)]">Category</span>
                      <span className="font-semibold text-[var(--text-primary)]">{event.category}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[var(--text-secondary)]">Status</span>
                      <span className="font-semibold" style={{ color: event.status === 'ongoing' ? 'var(--success)' : 'var(--secondary)' }}>
                        {event.status === 'ongoing' ? 'Ongoing' : 'Upcoming'}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Similar Events */}
              <Card className="border-[var(--border)] mt-6">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">Similar Events</h3>
                  <div className="space-y-3">
                    {mockEvents.filter(e => e.id !== event.id && e.category === event.category).slice(0, 3).map(similarEvent => (
                      <Link
                        key={similarEvent.id}
                        to={`/events/${similarEvent.id}`}
                        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-[var(--surface)] transition-all group"
                      >
                        <img
                          src={similarEvent.coverImage}
                          alt={similarEvent.title}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="text-sm font-semibold text-[var(--text-primary)] line-clamp-1 group-hover:text-[var(--primary)] transition-colors">
                            {similarEvent.title}
                          </h4>
                          <p className="text-xs text-[var(--text-secondary)]">
                            {similarEvent.isFree ? 'FREE' : formatPrice(similarEvent.price)}
                          </p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-[var(--text-secondary)] group-hover:text-[var(--primary)]" />
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;