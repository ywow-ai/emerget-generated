import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { mockEvents, eventCategories, eventCities } from '../data/mockEvents';
import { Calendar, MapPin, Users, Search, Grid3x3, List, Plus, Bookmark, DollarSign } from 'lucide-react';

const Events = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [viewMode, setViewMode] = useState('grid');
  const [events, setEvents] = useState(mockEvents);

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           event.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
      const matchesCity = selectedCity === 'All' || event.city === selectedCity;
      const matchesStatus = selectedStatus === 'All' || event.status === selectedStatus.toLowerCase();
      
      return matchesSearch && matchesCategory && matchesCity && matchesStatus;
    });
  }, [events, searchQuery, selectedCategory, selectedCity, selectedStatus]);

  const handleBookmark = (eventId) => {
    setEvents(events.map(event => 
      event.id === eventId ? { ...event, isBookmarked: !event.isBookmarked } : event
    ));
  };

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
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-3" style={{ background: 'var(--hero-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Discover Events
          </h1>
          <p className="text-lg text-[var(--text-secondary)]">Find cosplay events, conventions, and meetups near you</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--text-secondary)]" />
            <Input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 py-6 text-base border-[var(--border)] focus:ring-[var(--primary)]"
            />
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSelectedStatus('All')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  selectedStatus === 'All'
                    ? 'text-white'
                    : 'bg-[var(--surface)] text-[var(--text-secondary)] hover:bg-[var(--surface-light)]'
                }`}
                style={selectedStatus === 'All' ? { background: 'var(--button-primary)' } : {}}
              >
                All
              </button>
              <button
                onClick={() => setSelectedStatus('Upcoming')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  selectedStatus === 'Upcoming'
                    ? 'text-white'
                    : 'bg-[var(--surface)] text-[var(--text-secondary)] hover:bg-[var(--surface-light)]'
                }`}
                style={selectedStatus === 'Upcoming' ? { background: 'var(--button-primary)' } : {}}
              >
                Upcoming
              </button>
              <button
                onClick={() => setSelectedStatus('Ongoing')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  selectedStatus === 'Ongoing'
                    ? 'text-white'
                    : 'bg-[var(--surface)] text-[var(--text-secondary)] hover:bg-[var(--surface-light)]'
                }`}
                style={selectedStatus === 'Ongoing' ? { background: 'var(--button-primary)' } : {}}
              >
                Sedang Berlangsung
              </button>
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-[var(--surface)] text-[var(--text-primary)] border border-[var(--border)] hover:bg-[var(--surface-light)] transition-all duration-200 cursor-pointer"
            >
              {eventCategories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            {/* City Filter */}
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-[var(--surface)] text-[var(--text-primary)] border border-[var(--border)] hover:bg-[var(--surface-light)] transition-all duration-200 cursor-pointer"
            >
              {eventCities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>

            {/* View Toggle */}
            <div className="ml-auto flex items-center gap-2 bg-[var(--surface)] rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  viewMode === 'grid'
                    ? 'bg-[var(--primary)] text-white'
                    : 'text-[var(--text-secondary)] hover:text-[var(--primary)]'
                }`}
              >
                <Grid3x3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  viewMode === 'list'
                    ? 'bg-[var(--primary)] text-white'
                    : 'text-[var(--text-secondary)] hover:text-[var(--primary)]'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-sm text-[var(--text-secondary)]">
            {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Events Grid/List */}
        <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
          {filteredEvents.map((event) => (
            <Link
              key={event.id}
              to={`/events/${event.id}`}
            >
            <Card
              className={`border-[var(--border)] hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer ${
                viewMode === 'list' ? 'flex' : ''
              }`}
            >
              {/* Event Image */}
              <div className={`relative overflow-hidden ${
                viewMode === 'list' ? 'w-64 flex-shrink-0' : 'h-48'
              }`}>
                <img
                  src={event.coverImage}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
                      event.status === 'ongoing' ? 'bg-[var(--success)]' : 'bg-[var(--secondary)]'
                    }`}
                  >
                    {event.status === 'ongoing' ? 'Berlangsung' : 'Upcoming'}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBookmark(event.id);
                    }}
                    className="p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-200"
                  >
                    <Bookmark
                      className={`w-4 h-4 ${
                        event.isBookmarked ? 'fill-[var(--primary)] text-[var(--primary)]' : 'text-[var(--text-secondary)]'
                      }`}
                    />
                  </button>
                </div>
              </div>

              <CardContent className="p-4 flex-1">
                {/* Event Details */}
                <div className="mb-3">
                  <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2 line-clamp-2 group-hover:text-[var(--primary)] transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] line-clamp-2 mb-3">{event.description}</p>
                </div>

                {/* Event Info */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-[var(--text-secondary)]">
                    <Calendar className="w-4 h-4 mr-2 text-[var(--primary)]" />
                    <span>{formatDate(event.date)} • {event.time}</span>
                  </div>
                  <div className="flex items-center text-sm text-[var(--text-secondary)]">
                    <MapPin className="w-4 h-4 mr-2 text-[var(--primary)]" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-[var(--text-secondary)]">
                    <Users className="w-4 h-4 mr-2 text-[var(--primary)]" />
                    <span>{event.attendees} / {event.maxAttendees} attendees</span>
                  </div>
                </div>

                {/* Price and CTA */}
                <div className="flex items-center justify-between pt-3 border-t border-[var(--border)]">
                  <div>
                    {event.isFree ? (
                      <span className="text-lg font-bold text-[var(--success)]">FREE</span>
                    ) : (
                      <span className="text-lg font-bold text-[var(--primary)]">{formatPrice(event.price)}</span>
                    )}
                  </div>
                  <Button
                    size="sm"
                    className="rounded-lg text-white"
                    style={{ background: 'var(--button-primary)' }}
                  >
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-20">
            <Calendar className="w-16 h-16 mx-auto mb-4 text-[var(--text-tertiary)]" />
            <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">No events found</h3>
            <p className="text-[var(--text-secondary)]">Try adjusting your filters or search query</p>
          </div>
        )}
      </div>

      {/* Floating Create Event Button */}
      <Link to="/create-event">
        <button
          className="fixed bottom-24 md:bottom-8 right-6 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl text-white transform hover:scale-110 transition-all duration-300 z-40"
          style={{ background: 'var(--button-primary)' }}
          aria-label="Create event"
        >
          <Plus className="w-6 h-6" />
        </button>
      </Link>
    </div>
  );
};

export default Events;