import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { mockCostumes } from '../data/mockCostumes';
import { Calendar as CalendarIcon, ArrowLeft, Info } from 'lucide-react';
import { Calendar } from '../components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';

const CostumePreCheckout = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const costume = mockCostumes.find(c => c.id === parseInt(id)) || mockCostumes[0];
  
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [notes, setNotes] = useState('');

  const availableSizes = ['S', 'M', 'L', 'XL', 'XXL'];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const formatDate = (date) => {
    if (!date) return 'Select date';
    return date.toLocaleDateString('id-ID', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  const calculateDays = useMemo(() => {
    if (!startDate || !endDate) return 0;
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(diffDays, costume.minRentalDays);
  }, [startDate, endDate, costume.minRentalDays]);

  const calculateTotal = useMemo(() => {
    const days = calculateDays;
    const rentalCost = days * costume.pricePerDay;
    return rentalCost;
  }, [calculateDays, costume.pricePerDay]);

  const handleContinue = () => {
    if (!startDate || !endDate || !selectedSize) {
      return;
    }
    if (calculateDays < costume.minRentalDays) {
      return;
    }
    navigate(`/costumes/${costume.id}/checkout`, {
      state: {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        days: calculateDays,
        rentalCost: calculateTotal,
        deposit: costume.deposit,
        total: calculateTotal + costume.deposit,
        size: selectedSize,
        notes
      }
    });
  };

  const isDateDisabled = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  return (
    <div className="min-h-screen bg-[var(--background)] pt-20 pb-24 md:pb-8">
      <div className="max-w-5xl mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate(`/costumes/${costume.id}`)}
          className="flex items-center space-x-2 text-[var(--text-secondary)] hover:text-[var(--primary)] mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Costume Details</span>
        </button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-3" style={{ background: 'var(--hero-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Select Rental Period
          </h1>
          <p className="text-lg text-[var(--text-secondary)]">Choose your rental dates and confirm booking details</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Costume Summary */}
            <Card className="border-[var(--border)]">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <img
                    src={costume.images[0]}
                    alt={costume.characterName}
                    className="w-24 h-24 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-[var(--text-primary)] mb-1">{costume.characterName}</h2>
                    <p className="text-sm text-[var(--text-secondary)] mb-2">{costume.franchiseName}</p>
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
              </CardContent>
            </Card>

            {/* Date Selection */}
            <Card className="border-[var(--border)]">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-[var(--text-primary)] mb-6">Rental Dates</h3>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Start Date *</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal border-[var(--border)] hover:border-[var(--primary)]"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formatDate(startDate)}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={startDate}
                          onSelect={setStartDate}
                          disabled={isDateDisabled}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">End Date *</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal border-[var(--border)] hover:border-[var(--primary)]"
                          disabled={!startDate}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formatDate(endDate)}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={setEndDate}
                          disabled={(date) => isDateDisabled(date) || (startDate && date <= startDate)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                {startDate && endDate && calculateDays > 0 && (
                  <div className="p-4 bg-[var(--surface)] rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-[var(--text-secondary)]">Rental Duration</span>
                      <span className="text-xl font-bold text-[var(--primary)]">{calculateDays} days</span>
                    </div>
                    {calculateDays < costume.minRentalDays && (
                      <p className="text-sm text-[var(--error)] mt-2">
                        Minimum rental period is {costume.minRentalDays} days
                      </p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Additional Notes */}
            <Card className="border-[var(--border)]">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4">Additional Notes (Optional)</h3>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any special requests or questions for the owner..."
                  rows={4}
                  className="w-full px-4 py-3 border border-[var(--border)] rounded-lg bg-[var(--background)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] resize-none"
                />
              </CardContent>
            </Card>

            {/* Important Info */}
            <Card className="border-[var(--border)] bg-[var(--surface)]">
              <CardContent className="p-6">
                <div className="flex items-start space-x-3">
                  <Info className="w-5 h-5 text-[var(--info)] mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-[var(--text-primary)] mb-2">Important Information</h4>
                    <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                      <li>• Security deposit of {formatPrice(costume.deposit)} is fully refundable</li>
                      <li>• Costume must be returned in the same condition</li>
                      <li>• Late returns may incur additional charges</li>
                      <li>• Please try on costume upon pickup to ensure fit</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Price Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card className="border-[var(--border)] shadow-xl">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-[var(--text-primary)] mb-6">Price Summary</h3>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between">
                      <span className="text-[var(--text-secondary)]">Price per day</span>
                      <span className="font-semibold text-[var(--text-primary)]">{formatPrice(costume.pricePerDay)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[var(--text-secondary)]">Duration</span>
                      <span className="font-semibold text-[var(--text-primary)]">{calculateDays || 0} days</span>
                    </div>
                    <div className="flex items-center justify-between pb-4 border-b border-[var(--border)]">
                      <span className="text-[var(--text-secondary)]">Rental cost</span>
                      <span className="font-semibold text-[var(--text-primary)]">{formatPrice(calculateTotal)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[var(--text-secondary)]">Security deposit</span>
                      <span className="font-semibold text-[var(--text-primary)]">{formatPrice(costume.deposit)}</span>
                    </div>
                  </div>

                  <div className="pt-6 border-t-2 border-[var(--border)] mb-6">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-[var(--text-primary)]">Total Payment</span>
                      <span className="text-2xl font-bold" style={{ background: 'var(--hero-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                        {formatPrice(calculateTotal + costume.deposit)}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--text-secondary)] mt-2">
                      *Deposit will be refunded after return
                    </p>
                  </div>

                  <Button
                    onClick={handleContinue}
                    disabled={!startDate || !endDate || calculateDays < costume.minRentalDays}
                    className="w-full py-6 text-lg font-semibold text-white rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ background: 'var(--button-primary)' }}
                  >
                    Continue to Checkout
                  </Button>

                  {(!startDate || !endDate) && (
                    <p className="text-sm text-[var(--text-secondary)] text-center mt-4">
                      Please select rental dates
                    </p>
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

export default CostumePreCheckout;