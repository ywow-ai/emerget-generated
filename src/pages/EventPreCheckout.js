import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { mockEvents } from '../data/mockEvents';
import { Calendar, MapPin, Minus, Plus, ArrowLeft, Ticket, Users } from 'lucide-react';

const EventPreCheckout = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = mockEvents.find(e => e.id === parseInt(id)) || mockEvents[0];
  
  const [ticketTypes] = useState([
    { id: 1, name: 'Regular', price: event.price, description: 'Standard entry ticket', available: true },
    { id: 2, name: 'VIP', price: event.price * 2, description: 'VIP access with special perks', available: true },
    { id: 3, name: 'Early Bird', price: event.price * 0.8, description: 'Limited early bird discount', available: false }
  ]);

  const [selectedTickets, setSelectedTickets] = useState({
    1: 1,
    2: 0,
    3: 0
  });

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

  const updateTicketCount = (ticketId, change) => {
    setSelectedTickets(prev => {
      const newCount = Math.max(0, Math.min(10, prev[ticketId] + change));
      return { ...prev, [ticketId]: newCount };
    });
  };

  const calculateTotal = () => {
    return ticketTypes.reduce((total, ticket) => {
      return total + (ticket.price * selectedTickets[ticket.id]);
    }, 0);
  };

  const getTotalTickets = () => {
    return Object.values(selectedTickets).reduce((sum, count) => sum + count, 0);
  };

  const handleContinue = () => {
    if (getTotalTickets() === 0) return;
    const ticketData = ticketTypes
      .filter(t => selectedTickets[t.id] > 0)
      .map(t => ({
        ...t,
        quantity: selectedTickets[t.id]
      }));
    navigate(`/events/${event.id}/checkout`, { 
      state: { 
        tickets: ticketData,
        total: calculateTotal()
      } 
    });
  };

  return (
    <div className="min-h-screen bg-[var(--background)] pt-20 pb-24 md:pb-8">
      <div className="max-w-5xl mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate(`/events/${event.id}`)}
          className="flex items-center space-x-2 text-[var(--text-secondary)] hover:text-[var(--primary)] mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Event Details</span>
        </button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-3" style={{ background: 'var(--hero-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Select Tickets
          </h1>
          <p className="text-lg text-[var(--text-secondary)]">Choose your ticket type and quantity</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content - Ticket Selection */}
          <div className="lg:col-span-2 space-y-6">
            {/* Event Summary */}
            <Card className="border-[var(--border)]">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <img
                    src={event.coverImage}
                    alt={event.title}
                    className="w-24 h-24 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">{event.title}</h2>
                    <div className="space-y-1 text-sm text-[var(--text-secondary)]">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(event.date)}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span>{event.location}, {event.city}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Ticket Types */}
            <div className="space-y-4">
              {ticketTypes.map(ticket => (
                <Card key={ticket.id} className={`border-[var(--border)] ${
                  !ticket.available ? 'opacity-60' : 'hover:shadow-lg'
                } transition-shadow`}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <Ticket className="w-5 h-5 text-[var(--primary)]" />
                          <h3 className="text-xl font-bold text-[var(--text-primary)]">{ticket.name}</h3>
                          {!ticket.available && (
                            <span className="px-2 py-1 rounded-full text-xs font-semibold bg-[var(--error)]/10 text-[var(--error)]">
                              Sold Out
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-[var(--text-secondary)] mb-3">{ticket.description}</p>
                        <div className="text-2xl font-bold" style={{ color: 'var(--primary)' }}>
                          {formatPrice(ticket.price)}
                        </div>
                      </div>

                      {ticket.available && (
                        <div className="flex items-center space-x-4 ml-4">
                          <button
                            onClick={() => updateTicketCount(ticket.id, -1)}
                            disabled={selectedTickets[ticket.id] === 0}
                            className="w-10 h-10 rounded-full border-2 border-[var(--border)] flex items-center justify-center hover:border-[var(--primary)] hover:bg-[var(--surface)] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                          >
                            <Minus className="w-4 h-4 text-[var(--text-primary)]" />
                          </button>
                          <span className="text-2xl font-bold text-[var(--text-primary)] w-8 text-center">
                            {selectedTickets[ticket.id]}
                          </span>
                          <button
                            onClick={() => updateTicketCount(ticket.id, 1)}
                            disabled={selectedTickets[ticket.id] >= 10}
                            className="w-10 h-10 rounded-full border-2 border-[var(--primary)] flex items-center justify-center hover:bg-[var(--primary)] hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                            style={{ color: 'var(--primary)' }}
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Note */}
            <Card className="border-[var(--border)] bg-[var(--surface)]">
              <CardContent className="p-4">
                <p className="text-sm text-[var(--text-secondary)]">
                  <span className="font-semibold">Note:</span> Maximum 10 tickets per transaction. 
                  All tickets are non-refundable after purchase.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card className="border-[var(--border)] shadow-xl">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-[var(--text-primary)] mb-6">Order Summary</h3>

                  {/* Selected Tickets */}
                  <div className="space-y-4 mb-6">
                    {ticketTypes.filter(t => selectedTickets[t.id] > 0).length === 0 ? (
                      <div className="text-center py-8">
                        <Users className="w-12 h-12 mx-auto mb-3 text-[var(--text-tertiary)]" />
                        <p className="text-sm text-[var(--text-secondary)]">No tickets selected</p>
                      </div>
                    ) : (
                      ticketTypes
                        .filter(t => selectedTickets[t.id] > 0)
                        .map(ticket => (
                          <div key={ticket.id} className="flex items-center justify-between pb-3 border-b border-[var(--border)] last:border-0">
                            <div>
                              <div className="font-semibold text-[var(--text-primary)]">{ticket.name}</div>
                              <div className="text-sm text-[var(--text-secondary)]">
                                {selectedTickets[ticket.id]} × {formatPrice(ticket.price)}
                              </div>
                            </div>
                            <div className="font-bold text-[var(--text-primary)]">
                              {formatPrice(ticket.price * selectedTickets[ticket.id])}
                            </div>
                          </div>
                        ))
                    )}
                  </div>

                  {/* Total */}
                  {getTotalTickets() > 0 && (
                    <>
                      <div className="pt-4 border-t-2 border-[var(--border)] mb-6">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[var(--text-secondary)]">Subtotal</span>
                          <span className="font-semibold text-[var(--text-primary)]">{formatPrice(calculateTotal())}</span>
                        </div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[var(--text-secondary)]">Service Fee</span>
                          <span className="font-semibold text-[var(--text-primary)]">{formatPrice(5000)}</span>
                        </div>
                        <div className="flex items-center justify-between pt-3 border-t border-[var(--border)]">
                          <span className="text-lg font-bold text-[var(--text-primary)]">Total</span>
                          <span className="text-2xl font-bold" style={{ background: 'var(--hero-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                            {formatPrice(calculateTotal() + 5000)}
                          </span>
                        </div>
                      </div>

                      <Button
                        onClick={handleContinue}
                        className="w-full py-6 text-lg font-semibold text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
                        style={{ background: 'var(--button-primary)' }}
                      >
                        Continue to Checkout
                      </Button>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPreCheckout;