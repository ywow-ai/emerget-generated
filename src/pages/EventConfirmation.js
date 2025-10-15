import React, { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { CheckCircle2, Download, Calendar, MapPin, Mail, Phone, Ticket, ArrowRight } from 'lucide-react';
import { toast } from '../hooks/use-toast';

const EventConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { event, tickets = [], total = 0, bookingId, customerInfo, paymentMethod } = location.state || {};

  useEffect(() => {
    if (!event || !bookingId) {
      navigate('/events');
    }
  }, [event, bookingId, navigate]);

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

  const handleDownloadTicket = () => {
    toast({
      title: 'Download started',
      description: 'Your e-ticket is being downloaded'
    });
  };

  const handleEmailTicket = () => {
    toast({
      title: 'Email sent!',
      description: `Ticket has been sent to ${customerInfo?.email}`
    });
  };

  if (!event || !bookingId) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[var(--background)] pt-20 pb-24 md:pb-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Success Animation */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full mb-6 animate-bounce"
            style={{ background: 'var(--success)' }}>
            <CheckCircle2 className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3" style={{ background: 'var(--hero-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Booking Confirmed!
          </h1>
          <p className="text-lg text-[var(--text-secondary)]">
            Your tickets have been confirmed and sent to your email
          </p>
        </div>

        {/* Booking ID */}
        <Card className="border-[var(--border)] mb-6">
          <CardContent className="p-6 text-center">
            <div className="text-sm text-[var(--text-secondary)] mb-2">Booking ID</div>
            <div className="text-2xl font-bold" style={{ color: 'var(--primary)' }}>{bookingId}</div>
          </CardContent>
        </Card>

        {/* Event Details */}
        <Card className="border-[var(--border)] mb-6">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6">Event Details</h2>
            <div className="flex items-start space-x-4 mb-6">
              <img
                src={event.coverImage}
                alt={event.title}
                className="w-32 h-32 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-3">{event.title}</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-[var(--text-secondary)]">
                    <Calendar className="w-4 h-4 text-[var(--primary)]" />
                    <span>{formatDate(event.date)}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-[var(--text-secondary)]">
                    <MapPin className="w-4 h-4 text-[var(--primary)]" />
                    <span>{event.location}, {event.city}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tickets */}
            <div className="border-t border-[var(--border)] pt-6">
              <h3 className="font-bold text-[var(--text-primary)] mb-4 flex items-center space-x-2">
                <Ticket className="w-5 h-5 text-[var(--primary)]" />
                <span>Your Tickets</span>
              </h3>
              <div className="space-y-3">
                {tickets.map((ticket, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-[var(--surface)]">
                    <div>
                      <div className="font-semibold text-[var(--text-primary)]">{ticket.name}</div>
                      <div className="text-sm text-[var(--text-secondary)]">Quantity: {ticket.quantity}</div>
                    </div>
                    <div className="font-bold text-[var(--primary)]">
                      {formatPrice(ticket.price * ticket.quantity)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Customer Information */}
        <Card className="border-[var(--border)] mb-6">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6">Customer Information</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-[var(--text-secondary)] mb-1">Full Name</div>
                <div className="font-semibold text-[var(--text-primary)]">{customerInfo?.name}</div>
              </div>
              <div>
                <div className="text-sm text-[var(--text-secondary)] mb-1">Payment Method</div>
                <div className="font-semibold text-[var(--text-primary)] capitalize">
                  {paymentMethod?.replace('-', ' ')}
                </div>
              </div>
              <div>
                <div className="text-sm text-[var(--text-secondary)] mb-1 flex items-center space-x-1">
                  <Mail className="w-3 h-3" />
                  <span>Email</span>
                </div>
                <div className="font-semibold text-[var(--text-primary)]">{customerInfo?.email}</div>
              </div>
              <div>
                <div className="text-sm text-[var(--text-secondary)] mb-1 flex items-center space-x-1">
                  <Phone className="w-3 h-3" />
                  <span>Phone</span>
                </div>
                <div className="font-semibold text-[var(--text-primary)]">{customerInfo?.phone}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Summary */}
        <Card className="border-[var(--border)] mb-8">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6">Payment Summary</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[var(--text-secondary)]">Total Amount</span>
                <span className="text-2xl font-bold" style={{ background: 'var(--hero-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  {formatPrice(total)}
                </span>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-[var(--border)]">
                <span className="text-sm text-[var(--text-secondary)]">Status</span>
                <span className="px-3 py-1 rounded-full text-sm font-semibold text-white" style={{ backgroundColor: 'var(--success)' }}>
                  Paid
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <Button
            onClick={handleDownloadTicket}
            variant="outline"
            className="py-6 text-base font-semibold border-2 border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white"
          >
            <Download className="w-5 h-5 mr-2" />
            Download E-Ticket
          </Button>
          <Button
            onClick={handleEmailTicket}
            variant="outline"
            className="py-6 text-base font-semibold border-2 border-[var(--border)] hover:border-[var(--primary)]"
          >
            <Mail className="w-5 h-5 mr-2" />
            Email Ticket
          </Button>
        </div>

        {/* Next Steps */}
        <Card className="border-[var(--border)] bg-[var(--surface)] mb-6">
          <CardContent className="p-6">
            <h3 className="font-bold text-[var(--text-primary)] mb-4">What's Next?</h3>
            <ul className="space-y-3 text-sm text-[var(--text-secondary)]">
              <li className="flex items-start space-x-2">
                <span className="text-[var(--primary)] font-bold">1.</span>
                <span>Check your email for the e-ticket and booking confirmation</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-[var(--primary)] font-bold">2.</span>
                <span>Download and save your e-ticket on your phone</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-[var(--primary)] font-bold">3.</span>
                <span>Present your e-ticket at the event entrance</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-[var(--primary)] font-bold">4.</span>
                <span>Arrive 30 minutes before the event starts</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
          <Link to="/events" className="w-full sm:w-auto">
            <Button
              variant="outline"
              className="w-full sm:w-auto px-8 py-6 text-base font-semibold"
            >
              Browse More Events
            </Button>
          </Link>
          <Link to="/feed" className="w-full sm:w-auto">
            <Button
              className="w-full sm:w-auto px-8 py-6 text-base font-semibold text-white"
              style={{ background: 'var(--button-primary)' }}
            >
              Share on Feed
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventConfirmation;