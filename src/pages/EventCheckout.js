import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { mockEvents } from '../data/mockEvents';
import { CreditCard, Building2, Smartphone, ArrowLeft, Lock, CheckCircle2 } from 'lucide-react';
import { toast } from '../hooks/use-toast';

const EventCheckout = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const event = mockEvents.find(e => e.id === parseInt(id)) || mockEvents[0];
  const { tickets = [], total = 0 } = location.state || {};

  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVV: '',
    bankName: '',
    accountNumber: '',
    ewalletNumber: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      navigate(`/events/${event.id}/confirmation`, {
        state: {
          event,
          tickets,
          total: total + 5000,
          paymentMethod,
          bookingId: `EVT-${Date.now()}`,
          customerInfo: {
            name: formData.fullName,
            email: formData.email,
            phone: formData.phone
          }
        }
      });
    }, 2000);
  };

  const paymentMethods = [
    { id: 'credit-card', name: 'Credit/Debit Card', icon: CreditCard },
    { id: 'bank-transfer', name: 'Bank Transfer', icon: Building2 },
    { id: 'e-wallet', name: 'E-Wallet', icon: Smartphone }
  ];

  if (!tickets || tickets.length === 0) {
    return (
      <div className="min-h-screen bg-[var(--background)] pt-20 pb-24 md:pb-8 flex items-center justify-center">
        <Card className="border-[var(--border)] max-w-md">
          <CardContent className="p-8 text-center">
            <p className="text-[var(--text-secondary)] mb-4">No tickets selected</p>
            <Button onClick={() => navigate(`/events/${id}/pre-checkout`)}>Select Tickets</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)] pt-20 pb-24 md:pb-8">
      <div className="max-w-5xl mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate(`/events/${event.id}/pre-checkout`)}
          className="flex items-center space-x-2 text-[var(--text-secondary)] hover:text-[var(--primary)] mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Ticket Selection</span>
        </button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-3" style={{ background: 'var(--hero-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Checkout
          </h1>
          <p className="text-lg text-[var(--text-secondary)]">Complete your purchase securely</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Customer Information */}
              <Card className="border-[var(--border)]">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6">Customer Information</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Full Name *</label>
                      <Input
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        required
                        className="border-[var(--border)]"
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Email *</label>
                        <Input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your@email.com"
                          required
                          className="border-[var(--border)]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Phone Number *</label>
                        <Input
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="08xxxxxxxxxx"
                          required
                          className="border-[var(--border)]"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card className="border-[var(--border)]">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6">Payment Method</h2>
                  
                  {/* Payment Method Tabs */}
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {paymentMethods.map(method => {
                      const Icon = method.icon;
                      return (
                        <button
                          key={method.id}
                          type="button"
                          onClick={() => setPaymentMethod(method.id)}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            paymentMethod === method.id
                              ? 'border-[var(--primary)] bg-[var(--primary)]/5'
                              : 'border-[var(--border)] hover:border-[var(--primary)]/50'
                          }`}
                        >
                          <Icon className={`w-6 h-6 mx-auto mb-2 ${
                            paymentMethod === method.id ? 'text-[var(--primary)]' : 'text-[var(--text-secondary)]'
                          }`} />
                          <div className={`text-sm font-medium ${
                            paymentMethod === method.id ? 'text-[var(--primary)]' : 'text-[var(--text-secondary)]'
                          }`}>
                            {method.name}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Payment Details */}
                  {paymentMethod === 'credit-card' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Card Number *</label>
                        <Input
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          placeholder="1234 5678 9012 3456"
                          required
                          className="border-[var(--border)]"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Expiry Date *</label>
                          <Input
                            name="cardExpiry"
                            value={formData.cardExpiry}
                            onChange={handleInputChange}
                            placeholder="MM/YY"
                            required
                            className="border-[var(--border)]"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">CVV *</label>
                          <Input
                            name="cardCVV"
                            value={formData.cardCVV}
                            onChange={handleInputChange}
                            placeholder="123"
                            required
                            maxLength={3}
                            className="border-[var(--border)]"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'bank-transfer' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Bank Name *</label>
                        <select
                          name="bankName"
                          value={formData.bankName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-[var(--border)] rounded-lg bg-[var(--background)] text-[var(--text-primary)]"
                        >
                          <option value="">Select your bank</option>
                          <option value="bca">BCA</option>
                          <option value="mandiri">Mandiri</option>
                          <option value="bni">BNI</option>
                          <option value="bri">BRI</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Account Number *</label>
                        <Input
                          name="accountNumber"
                          value={formData.accountNumber}
                          onChange={handleInputChange}
                          placeholder="Enter your account number"
                          required
                          className="border-[var(--border)]"
                        />
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'e-wallet' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">E-Wallet Type *</label>
                        <select
                          name="ewalletType"
                          required
                          className="w-full px-3 py-2 border border-[var(--border)] rounded-lg bg-[var(--background)] text-[var(--text-primary)]"
                        >
                          <option value="">Select e-wallet</option>
                          <option value="gopay">GoPay</option>
                          <option value="ovo">OVO</option>
                          <option value="dana">DANA</option>
                          <option value="linkaja">LinkAja</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Phone Number *</label>
                        <Input
                          name="ewalletNumber"
                          value={formData.ewalletNumber}
                          onChange={handleInputChange}
                          placeholder="08xxxxxxxxxx"
                          required
                          className="border-[var(--border)]"
                        />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Security Notice */}
              <Card className="border-[var(--border)] bg-[var(--surface)]">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <Lock className="w-5 h-5 text-[var(--success)] mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-[var(--text-primary)] mb-1">Secure Payment</p>
                      <p className="text-sm text-[var(--text-secondary)]">
                        Your payment information is encrypted and secure. We never store your card details.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar - Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <Card className="border-[var(--border)] shadow-xl">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-[var(--text-primary)] mb-6">Order Summary</h3>

                    {/* Event Info */}
                    <div className="mb-6 pb-6 border-b border-[var(--border)]">
                      <img
                        src={event.coverImage}
                        alt={event.title}
                        className="w-full h-32 rounded-lg object-cover mb-3"
                      />
                      <h4 className="font-semibold text-[var(--text-primary)] mb-1">{event.title}</h4>
                      <p className="text-sm text-[var(--text-secondary)]">{event.location}</p>
                    </div>

                    {/* Tickets */}
                    <div className="space-y-3 mb-6 pb-6 border-b border-[var(--border)]">
                      {tickets.map((ticket, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-[var(--text-primary)]">{ticket.name}</div>
                            <div className="text-sm text-[var(--text-secondary)]">
                              {ticket.quantity} × {formatPrice(ticket.price)}
                            </div>
                          </div>
                          <div className="font-semibold text-[var(--text-primary)]">
                            {formatPrice(ticket.price * ticket.quantity)}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Pricing */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[var(--text-secondary)]">Subtotal</span>
                        <span className="font-semibold text-[var(--text-primary)]">{formatPrice(total)}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[var(--text-secondary)]">Service Fee</span>
                        <span className="font-semibold text-[var(--text-primary)]">{formatPrice(5000)}</span>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t-2 border-[var(--border)]">
                        <span className="text-lg font-bold text-[var(--text-primary)]">Total</span>
                        <span className="text-2xl font-bold" style={{ background: 'var(--hero-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                          {formatPrice(total + 5000)}
                        </span>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full py-6 text-lg font-semibold text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
                      style={{ background: 'var(--button-primary)' }}
                    >
                      {isProcessing ? (
                        <div className="flex items-center justify-center space-x-2">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Processing...</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center space-x-2">
                          <Lock className="w-5 h-5" />
                          <span>Complete Purchase</span>
                        </div>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventCheckout;