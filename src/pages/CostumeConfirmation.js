import React, { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { CheckCircle2, Download, Calendar, MapPin, Mail, Phone, Package, ArrowRight } from 'lucide-react';
import { toast } from '../hooks/use-toast';

const CostumeConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { costume, startDate, endDate, days, rentalCost, deposit, total, bookingId, customerInfo, paymentMethod, pickupMethod, notes } = location.state || {};

  useEffect(() => {
    if (!costume || !bookingId) {
      navigate('/costumes');
    }
  }, [costume, bookingId, navigate]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { 
      weekday: 'long',
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const handleDownload = () => {
    toast({
      title: 'Download started',
      description: 'Your rental confirmation is being downloaded'
    });
  };

  const handleEmail = () => {
    toast({
      title: 'Email sent!',
      description: `Confirmation has been sent to ${customerInfo?.email}`
    });
  };

  if (!costume || !bookingId) {
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
            Your costume rental has been confirmed
          </p>
        </div>

        {/* Booking ID */}
        <Card className="border-[var(--border)] mb-6">
          <CardContent className="p-6 text-center">
            <div className="text-sm text-[var(--text-secondary)] mb-2">Booking ID</div>
            <div className="text-2xl font-bold" style={{ color: 'var(--primary)' }}>{bookingId}</div>
          </CardContent>
        </Card>

        {/* Costume Details */}
        <Card className="border-[var(--border)] mb-6">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6">Costume Details</h2>
            <div className="flex items-start space-x-4 mb-6">
              <img
                src={costume.images[0]}
                alt={costume.characterName}
                className="w-32 h-32 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-2">{costume.characterName}</h3>
                <p className="text-[var(--text-secondary)] mb-2">{costume.franchiseName}</p>
                <div className="flex items-center space-x-4 text-sm">
                  <div>
                    <span className="text-[var(--text-secondary)]">Size:</span>
                    <span className="font-semibold text-[var(--text-primary)] ml-1">{costume.size}</span>
                  </div>
                  <div>
                    <span className="text-[var(--text-secondary)]">Condition:</span>
                    <span className="font-semibold text-[var(--text-primary)] ml-1">{costume.condition}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Rental Period */}
            <div className="border-t border-[var(--border)] pt-6">
              <h3 className="font-bold text-[var(--text-primary)] mb-4 flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-[var(--primary)]" />
                <span>Rental Period</span>
              </h3>
              <div className="grid md:grid-cols-3 gap-4 p-4 rounded-lg bg-[var(--surface)]">
                <div>
                  <div className="text-sm text-[var(--text-secondary)] mb-1">Start Date</div>
                  <div className="font-semibold text-[var(--text-primary)]">{formatDate(startDate)}</div>
                </div>
                <div>
                  <div className="text-sm text-[var(--text-secondary)] mb-1">End Date</div>
                  <div className="font-semibold text-[var(--text-primary)]">{formatDate(endDate)}</div>
                </div>
                <div>
                  <div className="text-sm text-[var(--text-secondary)] mb-1">Duration</div>
                  <div className="font-semibold text-[var(--text-primary)]">{days} days</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pickup/Delivery Info */}
        <Card className="border-[var(--border)] mb-6">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6">
              {pickupMethod === 'pickup' ? 'Pickup Information' : 'Delivery Information'}
            </h2>
            <div className="flex items-start space-x-3 p-4 rounded-lg bg-[var(--surface)]">
              <MapPin className="w-5 h-5 text-[var(--primary)] mt-1 flex-shrink-0" />
              <div>
                <div className="font-semibold text-[var(--text-primary)] mb-1">
                  {pickupMethod === 'pickup' ? 'Pickup Location' : 'Delivery Address'}
                </div>
                <div className="text-[var(--text-secondary)]">{customerInfo?.address}</div>
              </div>
            </div>
            {notes && (
              <div className="mt-4 p-4 rounded-lg bg-[var(--surface)]">
                <div className="text-sm font-semibold text-[var(--text-primary)] mb-1">Additional Notes</div>
                <div className="text-sm text-[var(--text-secondary)]">{notes}</div>
              </div>
            )}
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
                <span className="text-[var(--text-secondary)]">Rental Cost ({days} days)</span>
                <span className="font-semibold text-[var(--text-primary)]">{formatPrice(rentalCost)}</span>
              </div>
              {pickupMethod === 'delivery' && (
                <div className="flex items-center justify-between">
                  <span className="text-[var(--text-secondary)]">Delivery Fee</span>
                  <span className="font-semibold text-[var(--text-primary)]">{formatPrice(25000)}</span>
                </div>
              )}
              <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
                <span className="text-[var(--text-secondary)]">Security Deposit (Refundable)</span>
                <span className="font-semibold text-[var(--text-primary)]">{formatPrice(deposit)}</span>
              </div>
              <div className="flex items-center justify-between pt-3">
                <span className="text-lg font-bold text-[var(--text-primary)]">Total Paid</span>
                <span className="text-2xl font-bold" style={{ background: 'var(--hero-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  {formatPrice(total + (pickupMethod === 'delivery' ? 25000 : 0))}
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
            onClick={handleDownload}
            variant="outline"
            className="py-6 text-base font-semibold border-2 border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white"
          >
            <Download className="w-5 h-5 mr-2" />
            Download Confirmation
          </Button>
          <Button
            onClick={handleEmail}
            variant="outline"
            className="py-6 text-base font-semibold border-2 border-[var(--border)] hover:border-[var(--primary)]"
          >
            <Mail className="w-5 h-5 mr-2" />
            Email Confirmation
          </Button>
        </div>

        {/* Next Steps */}
        <Card className="border-[var(--border)] bg-[var(--surface)] mb-6">
          <CardContent className="p-6">
            <h3 className="font-bold text-[var(--text-primary)] mb-4">What's Next?</h3>
            <ul className="space-y-3 text-sm text-[var(--text-secondary)]">
              <li className="flex items-start space-x-2">
                <span className="text-[var(--primary)] font-bold">1.</span>
                <span>Check your email for booking confirmation and costume care instructions</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-[var(--primary)] font-bold">2.</span>
                <span>{pickupMethod === 'pickup' ? 'Pickup costume at scheduled date' : 'Wait for costume delivery'}</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-[var(--primary)] font-bold">3.</span>
                <span>Inspect costume condition upon receipt</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-[var(--primary)] font-bold">4.</span>
                <span>Return costume on time in original condition</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-[var(--primary)] font-bold">5.</span>
                <span>Security deposit will be refunded within 3-5 business days</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
          <Link to="/costumes" className="w-full sm:w-auto">
            <Button
              variant="outline"
              className="w-full sm:w-auto px-8 py-6 text-base font-semibold"
            >
              Browse More Costumes
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

export default CostumeConfirmation;