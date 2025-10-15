import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { mockCostumes } from '../data/mockCostumes';
import { CreditCard, Building2, Smartphone, ArrowLeft, Lock, Calendar, MapPin } from 'lucide-react';

const CostumeCheckout = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const costume = mockCostumes.find(c => c.id === parseInt(id)) || mockCostumes[0];
  const { startDate, endDate, days = 0, rentalCost = 0, deposit = 0, total = 0, notes = '' } = location.state || {};

  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [pickupMethod, setPickupMethod] = useState('pickup');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
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

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      navigate(`/costumes/${costume.id}/confirmation`, {
        state: {
          costume,
          startDate,
          endDate,
          days,
          rentalCost,
          deposit,
          total,
          paymentMethod,
          pickupMethod,
          bookingId: `COS-${Date.now()}`,
          customerInfo: {
            name: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            address: pickupMethod === 'delivery' ? formData.address : costume.location
          },
          notes
        }
      });
    }, 2000);
  };

  const paymentMethods = [
    { id: 'credit-card', name: 'Credit/Debit Card', icon: CreditCard },
    { id: 'bank-transfer', name: 'Bank Transfer', icon: Building2 },
    { id: 'e-wallet', name: 'E-Wallet', icon: Smartphone }
  ];

  if (!startDate || !endDate) {
    return (
      <div className="min-h-screen bg-[var(--background)] pt-20 pb-24 md:pb-8 flex items-center justify-center">
        <Card className="border-[var(--border)] max-w-md">
          <CardContent className="p-8 text-center">
            <p className="text-[var(--text-secondary)] mb-4">No rental dates selected</p>
            <Button onClick={() => navigate(`/costumes/${id}/pre-checkout`)}>Select Dates</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)] pt-20 pb-24 md:pb-8">
      <div className="max-w-5xl mx-auto px-4">
        <button
          onClick={() => navigate(`/costumes/${costume.id}/pre-checkout`)}
          className="flex items-center space-x-2 text-[var(--text-secondary)] hover:text-[var(--primary)] mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Date Selection</span>
        </button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-3" style={{ background: 'var(--hero-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Checkout
          </h1>
          <p className="text-lg text-[var(--text-secondary)]">Complete your rental booking</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
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

              {/* Pickup/Delivery */}
              <Card className="border-[var(--border)]">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6">Pickup Method</h2>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <button
                      type="button"
                      onClick={() => setPickupMethod('pickup')}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        pickupMethod === 'pickup'
                          ? 'border-[var(--primary)] bg-[var(--primary)]/5'
                          : 'border-[var(--border)] hover:border-[var(--primary)]/50'
                      }`}
                    >
                      <MapPin className={`w-6 h-6 mx-auto mb-2 ${
                        pickupMethod === 'pickup' ? 'text-[var(--primary)]' : 'text-[var(--text-secondary)]'
                      }`} />
                      <div className={`text-sm font-medium ${
                        pickupMethod === 'pickup' ? 'text-[var(--primary)]' : 'text-[var(--text-secondary)]'
                      }`}>
                        Self Pickup
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPickupMethod('delivery')}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        pickupMethod === 'delivery'
                          ? 'border-[var(--primary)] bg-[var(--primary)]/5'
                          : 'border-[var(--border)] hover:border-[var(--primary)]/50'
                      }`}
                    >
                      <Calendar className={`w-6 h-6 mx-auto mb-2 ${
                        pickupMethod === 'delivery' ? 'text-[var(--primary)]' : 'text-[var(--text-secondary)]'
                      }`} />
                      <div className={`text-sm font-medium ${
                        pickupMethod === 'delivery' ? 'text-[var(--primary)]' : 'text-[var(--text-secondary)]'
                      }`}>
                        Delivery
                      </div>
                    </button>
                  </div>
                  {pickupMethod === 'pickup' && (
                    <div className="p-4 bg-[var(--surface)] rounded-lg">
                      <div className="flex items-start space-x-2">
                        <MapPin className="w-4 h-4 text-[var(--primary)] mt-0.5" />
                        <div>
                          <div className="text-sm font-semibold text-[var(--text-primary)] mb-1">Pickup Location</div>
                          <div className="text-sm text-[var(--text-secondary)]">{costume.location}</div>
                        </div>
                      </div>
                    </div>
                  )}
                  {pickupMethod === 'delivery' && (
                    <div>
                      <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Delivery Address *</label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Enter your complete address"
                        required
                        rows={3}
                        className="w-full px-4 py-3 border border-[var(--border)] rounded-lg bg-[var(--background)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] resize-none"
                      />
                      <p className="text-sm text-[var(--text-secondary)] mt-2">
                        ⚠️ Delivery fee: {formatPrice(25000)} (within city)
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card className="border-[var(--border)]">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6">Payment Method</h2>
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

                  {paymentMethod === 'credit-card' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Card Number *</label>
                        <Input name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} placeholder="1234 5678 9012 3456" required className="border-[var(--border)]" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Expiry Date *</label>
                          <Input name="cardExpiry" value={formData.cardExpiry} onChange={handleInputChange} placeholder="MM/YY" required className="border-[var(--border)]" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">CVV *</label>
                          <Input name="cardCVV" value={formData.cardCVV} onChange={handleInputChange} placeholder="123" required maxLength={3} className="border-[var(--border)]" />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'bank-transfer' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Bank Name *</label>
                        <select name="bankName" value={formData.bankName} onChange={handleInputChange} required className="w-full px-3 py-2 border border-[var(--border)] rounded-lg bg-[var(--background)] text-[var(--text-primary)]">
                          <option value="">Select your bank</option>
                          <option value="bca">BCA</option>
                          <option value="mandiri">Mandiri</option>
                          <option value="bni">BNI</option>
                          <option value="bri">BRI</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'e-wallet' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">E-Wallet Type *</label>
                        <select required className="w-full px-3 py-2 border border-[var(--border)] rounded-lg bg-[var(--background)] text-[var(--text-primary)]">
                          <option value="">Select e-wallet</option>
                          <option value="gopay">GoPay</option>
                          <option value="ovo">OVO</option>
                          <option value="dana">DANA</option>
                        </select>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="border-[var(--border)] bg-[var(--surface)]">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <Lock className="w-5 h-5 text-[var(--success)] mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-[var(--text-primary)] mb-1">Secure Payment</p>
                      <p className="text-sm text-[var(--text-secondary)]">
                        Your payment is encrypted and secure. Deposit will be refunded after costume return.
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
                    <div className="mb-6 pb-6 border-b border-[var(--border)]">
                      <img src={costume.images[0]} alt={costume.characterName} className="w-full h-32 rounded-lg object-cover mb-3" />
                      <h4 className="font-semibold text-[var(--text-primary)] mb-1">{costume.characterName}</h4>
                      <p className="text-sm text-[var(--text-secondary)]">{costume.franchiseName}</p>
                    </div>

                    <div className="space-y-3 mb-6 pb-6 border-b border-[var(--border)]">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[var(--text-secondary)]">Rental period</span>
                        <span className="font-medium text-[var(--text-primary)]">{days} days</span>
                      </div>
                      <div className="text-xs text-[var(--text-secondary)]">
                        {formatDate(startDate)} - {formatDate(endDate)}
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[var(--text-secondary)]">Rental cost</span>
                        <span className="font-semibold text-[var(--text-primary)]">{formatPrice(rentalCost)}</span>
                      </div>
                      {pickupMethod === 'delivery' && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-[var(--text-secondary)]">Delivery fee</span>
                          <span className="font-semibold text-[var(--text-primary)]">{formatPrice(25000)}</span>
                        </div>
                      )}
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[var(--text-secondary)]">Security deposit</span>
                        <span className="font-semibold text-[var(--text-primary)]">{formatPrice(deposit)}</span>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t-2 border-[var(--border)]">
                        <span className="text-lg font-bold text-[var(--text-primary)]">Total</span>
                        <span className="text-2xl font-bold" style={{ background: 'var(--hero-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                          {formatPrice(total + (pickupMethod === 'delivery' ? 25000 : 0))}
                        </span>
                      </div>
                    </div>

                    <Button type="submit" disabled={isProcessing} className="w-full py-6 text-lg font-semibold text-white rounded-xl shadow-lg hover:shadow-xl transition-all" style={{ background: 'var(--button-primary)' }}>
                      {isProcessing ? (
                        <div className="flex items-center justify-center space-x-2">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Processing...</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center space-x-2">
                          <Lock className="w-5 h-5" />
                          <span>Complete Booking</span>
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

export default CostumeCheckout;