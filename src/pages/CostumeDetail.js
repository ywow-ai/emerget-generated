import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { mockCostumes } from '../data/mockCostumes';
import { Heart, Share2, ArrowLeft, Star, MapPin, Shield, Package, Calendar, ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';
import { toast } from '../hooks/use-toast';

const CostumeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const costume = mockCostumes.find(c => c.id === parseInt(id)) || mockCostumes[0];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(costume.isWishlisted);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast({
      title: isWishlisted ? 'Removed from wishlist' : 'Added to wishlist',
      description: isWishlisted ? 'Costume removed from your wishlist' : 'Costume saved to your wishlist'
    });
  };

  const handleShare = () => {
    toast({
      title: 'Link copied!',
      description: 'Costume link has been copied to clipboard'
    });
  };

  const handleRent = () => {
    if (costume.status !== 'available') {
      toast({
        title: 'Not available',
        description: 'This costume is currently not available for rent',
        variant: 'destructive'
      });
      return;
    }
    navigate(`/costumes/${costume.id}/pre-checkout`);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % costume.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + costume.images.length) % costume.images.length);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'var(--success)';
      case 'rented':
        return 'var(--accent-3)';
      case 'maintenance':
        return 'var(--warning)';
      default:
        return 'var(--text-secondary)';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'available':
        return 'Available';
      case 'rented':
        return 'Currently Rented';
      case 'maintenance':
        return 'Under Maintenance';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] pt-20 pb-24 md:pb-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate('/costumes')}
          className="flex items-center space-x-2 text-[var(--text-secondary)] hover:text-[var(--primary)] mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Costumes</span>
        </button>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Image Gallery */}
          <div>
            <div className="relative h-[600px] rounded-2xl overflow-hidden mb-4 shadow-2xl group">
              <img
                src={costume.images[currentImageIndex]}
                alt={costume.characterName}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              {/* Image Navigation */}
              {costume.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                  >
                    <ChevronLeft className="w-6 h-6 text-[var(--text-primary)]" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                  >
                    <ChevronRight className="w-6 h-6 text-[var(--text-primary)]" />
                  </button>
                </>
              )}

              {/* Image Indicators */}
              {costume.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                  {costume.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentImageIndex
                          ? 'w-8 bg-white'
                          : 'bg-white/50 hover:bg-white/75'
                      }`}
                    />
                  ))}
                </div>
              )}

              {/* Status Badge */}
              <div className="absolute top-4 left-4">
                <span
                  className="px-4 py-2 rounded-full text-sm font-semibold text-white shadow-lg"
                  style={{ backgroundColor: getStatusColor(costume.status) }}
                >
                  {getStatusText(costume.status)}
                </span>
              </div>

              {/* Actions */}
              <div className="absolute top-4 right-4 flex space-x-2">
                <button
                  onClick={handleShare}
                  className="p-3 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-all shadow-lg"
                >
                  <Share2 className="w-5 h-5 text-[var(--text-primary)]" />
                </button>
                <button
                  onClick={handleWishlist}
                  className="p-3 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-all shadow-lg"
                >
                  <Heart
                    className={`w-5 h-5 ${isWishlisted ? 'fill-[var(--error)] text-[var(--error)]' : 'text-[var(--text-primary)]'}`}
                  />
                </button>
              </div>
            </div>

            {/* Thumbnail Gallery */}
            {costume.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {costume.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      index === currentImageIndex
                        ? 'border-[var(--primary)] ring-2 ring-[var(--primary)]/30'
                        : 'border-transparent hover:border-[var(--border)]'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${costume.characterName} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Costume Info */}
          <div>
            <div className="mb-6">
              <div className="flex items-center space-x-2 text-sm text-[var(--text-secondary)] mb-2">
                <span className="px-2 py-1 rounded bg-[var(--surface)] text-[var(--primary)] font-medium">
                  {costume.franchise}
                </span>
                <span>•</span>
                <span>{costume.franchiseName}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ background: 'var(--hero-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                {costume.characterName}
              </h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  <Star className="w-5 h-5 fill-[var(--warning)] text-[var(--warning)]" />
                  <span className="font-bold text-[var(--text-primary)]">{costume.rating}</span>
                  <span className="text-sm text-[var(--text-secondary)]">({costume.reviews} reviews)</span>
                </div>
                <span className="text-[var(--text-secondary)]">•</span>
                <div className="text-sm text-[var(--text-secondary)]">{costume.rentals} rentals</div>
              </div>
            </div>

            {/* Pricing */}
            <Card className="border-[var(--border)] mb-6">
              <CardContent className="p-6">
                <div className="text-sm text-[var(--text-secondary)] mb-2">Rental Price</div>
                <div className="text-4xl font-bold mb-4" style={{ background: 'var(--hero-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  {formatPrice(costume.pricePerDay)}
                  <span className="text-xl text-[var(--text-secondary)] font-normal">/day</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-[var(--text-secondary)] mb-1">Minimum Rental</div>
                    <div className="font-semibold text-[var(--text-primary)]">{costume.minRentalDays} day{costume.minRentalDays > 1 ? 's' : ''}</div>
                  </div>
                  <div>
                    <div className="text-[var(--text-secondary)] mb-1">Deposit</div>
                    <div className="font-semibold text-[var(--text-primary)]">{formatPrice(costume.deposit)}</div>
                  </div>
                </div>

                {costume.status === 'rented' && costume.rentedUntil && (
                  <div className="mt-4 p-3 bg-[var(--warning)]/10 rounded-lg">
                    <p className="text-sm text-[var(--warning)] font-medium">
                      Available from {costume.rentedUntil}
                    </p>
                  </div>
                )}

                <Button
                  onClick={handleRent}
                  disabled={costume.status !== 'available'}
                  className="w-full mt-6 py-6 text-lg font-semibold text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
                  style={{ background: costume.status === 'available' ? 'var(--button-primary)' : 'var(--text-tertiary)' }}
                >
                  {costume.status === 'available' ? 'Rent This Costume' : getStatusText(costume.status)}
                </Button>
              </CardContent>
            </Card>

            {/* Owner Info */}
            <Card className="border-[var(--border)] mb-6">
              <CardContent className="p-6">
                <h3 className="font-bold text-[var(--text-primary)] mb-4">Costume Owner</h3>
                <div className="flex items-center space-x-4">
                  <img
                    src={costume.owner.avatar}
                    alt={costume.owner.name}
                    className="w-16 h-16 rounded-full border-2 border-[var(--primary)]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold text-[var(--text-primary)]">{costume.owner.name}</h4>
                      {costume.owner.verified && (
                        <span className="text-xs px-2 py-1 rounded-full bg-[var(--success)]/10 text-[var(--success)] font-medium">
                          ✓ Verified
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-3 text-sm text-[var(--text-secondary)]">
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 fill-[var(--warning)] text-[var(--warning)]" />
                        <span>{costume.owner.rating}</span>
                      </div>
                      <span>•</span>
                      <span>{costume.owner.reviews} reviews</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="rounded-lg">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Message
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Info */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="border-[var(--border)]">
                <CardContent className="p-4 text-center">
                  <Package className="w-6 h-6 mx-auto mb-2 text-[var(--primary)]" />
                  <div className="text-sm text-[var(--text-secondary)] mb-1">Size</div>
                  <div className="font-bold text-[var(--text-primary)]">{costume.size}</div>
                </CardContent>
              </Card>
              <Card className="border-[var(--border)]">
                <CardContent className="p-4 text-center">
                  <MapPin className="w-6 h-6 mx-auto mb-2 text-[var(--primary)]" />
                  <div className="text-sm text-[var(--text-secondary)] mb-1">Location</div>
                  <div className="font-bold text-[var(--text-primary)] text-sm">{costume.location}</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Description */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-[var(--border)]">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Description</h2>
                <p className="text-[var(--text-secondary)] leading-relaxed mb-6">{costume.description}</p>
                
                <h3 className="font-bold text-[var(--text-primary)] mb-3">What's Included</h3>
                <div className="grid md:grid-cols-2 gap-2">
                  {costume.includes.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2 text-[var(--text-secondary)]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            {costume.tags && costume.tags.length > 0 && (
              <Card className="border-[var(--border)]">
                <CardContent className="p-6">
                  <h3 className="font-bold text-[var(--text-primary)] mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {costume.tags.map((tag, index) => (
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
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Rental Terms */}
            <Card className="border-[var(--border)]">
              <CardContent className="p-6">
                <h3 className="font-bold text-[var(--text-primary)] mb-4 flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-[var(--primary)]" />
                  <span>Rental Terms</span>
                </h3>
                <ul className="space-y-3 text-sm text-[var(--text-secondary)]">
                  <li className="flex items-start space-x-2">
                    <span className="text-[var(--primary)] font-bold">•</span>
                    <span>Security deposit required</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-[var(--primary)] font-bold">•</span>
                    <span>Dry cleaning after use</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-[var(--primary)] font-bold">•</span>
                    <span>No alterations allowed</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-[var(--primary)] font-bold">•</span>
                    <span>Insurance coverage available</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-[var(--primary)] font-bold">•</span>
                    <span>Pickup or delivery options</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Similar Costumes */}
            <Card className="border-[var(--border)]">
              <CardContent className="p-6">
                <h3 className="font-bold text-[var(--text-primary)] mb-4">Similar Costumes</h3>
                <div className="space-y-3">
                  {mockCostumes.filter(c => c.id !== costume.id && c.franchise === costume.franchise && c.status === 'available').slice(0, 3).map(similar => (
                    <Link
                      key={similar.id}
                      to={`/costumes/${similar.id}`}
                      className="flex items-center space-x-3 p-2 rounded-lg hover:bg-[var(--surface)] transition-all group"
                    >
                      <img
                        src={similar.images[0]}
                        alt={similar.characterName}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-[var(--text-primary)] line-clamp-1 group-hover:text-[var(--primary)] transition-colors">
                          {similar.characterName}
                        </h4>
                        <p className="text-xs text-[var(--text-secondary)]">
                          {formatPrice(similar.pricePerDay)}/day
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostumeDetail;