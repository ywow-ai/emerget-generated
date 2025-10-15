import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { ArrowLeft, Upload, X } from 'lucide-react';
import { franchiseCategories, costumeSizes } from '../data/mockCostumes';
import { toast } from '../hooks/use-toast';

const CreateCostume = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    characterName: '',
    franchiseName: '',
    franchise: 'Anime',
    description: '',
    size: 'M',
    pricePerDay: '',
    minRentalDays: '1',
    deposit: '',
    location: '',
    includes: '',
    condition: 'Excellent',
    tags: '',
    images: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map(file => URL.createObjectURL(file));
    setFormData({ ...formData, images: [...formData.images, ...imageUrls].slice(0, 5) });
  };

  const removeImage = (index) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.characterName || !formData.pricePerDay || !formData.deposit) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields',
        variant: 'destructive'
      });
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      toast({
        title: 'Costume listed!',
        description: 'Your costume is now available for rent'
      });
      navigate('/costumes');
    }, 1500);
  };

  const formatPrice = (value) => {
    if (!value) return '';
    return new Intl.NumberFormat('id-ID').format(value);
  };

  return (
    <div className="min-h-screen bg-[var(--background)] pt-20 pb-24 md:pb-8">
      <div className="max-w-4xl mx-auto px-4">
        <button
          onClick={() => navigate('/costumes')}
          className="flex items-center space-x-2 text-[var(--text-secondary)] hover:text-[var(--primary)] mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Costumes</span>
        </button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-3" style={{ background: 'var(--hero-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            List Your Costume
          </h1>
          <p className="text-lg text-[var(--text-secondary)]">Share your cosplay creations with the community</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Basic Info */}
            <Card className="border-[var(--border)]">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6">Basic Information</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Character Name *</label>
                    <Input
                      name="characterName"
                      value={formData.characterName}
                      onChange={handleInputChange}
                      placeholder="e.g., Violet Evergarden"
                      required
                      className="border-[var(--border)]"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Franchise/Series Name *</label>
                      <Input
                        name="franchiseName"
                        value={formData.franchiseName}
                        onChange={handleInputChange}
                        placeholder="e.g., Violet Evergarden"
                        required
                        className="border-[var(--border)]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Category *</label>
                      <select
                        name="franchise"
                        value={formData.franchise}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-[var(--border)] rounded-lg bg-[var(--background)] text-[var(--text-primary)]"
                      >
                        {franchiseCategories.filter(c => c !== 'All').map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Description *</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Describe your costume in detail..."
                      rows={4}
                      required
                      className="w-full px-4 py-3 border border-[var(--border)] rounded-lg bg-[var(--background)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] resize-none"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Size *</label>
                      <select
                        name="size"
                        value={formData.size}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-[var(--border)] rounded-lg bg-[var(--background)] text-[var(--text-primary)]"
                      >
                        {costumeSizes.filter(s => s !== 'All').map(size => (
                          <option key={size} value={size}>{size}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Condition *</label>
                      <select
                        name="condition"
                        value={formData.condition}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-[var(--border)] rounded-lg bg-[var(--background)] text-[var(--text-primary)]"
                      >
                        <option value="Excellent">Excellent</option>
                        <option value="Good">Good</option>
                        <option value="Fair">Fair</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">What's Included *</label>
                    <Input
                      name="includes"
                      value={formData.includes}
                      onChange={handleInputChange}
                      placeholder="e.g., Dress, Gloves, Accessories (comma separated)"
                      required
                      className="border-[var(--border)]"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pricing */}
            <Card className="border-[var(--border)]">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6">Pricing & Rental Terms</h2>
                
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Price per Day (IDR) *</label>
                      <Input
                        name="pricePerDay"
                        type="number"
                        value={formData.pricePerDay}
                        onChange={handleInputChange}
                        placeholder="Enter daily rental price"
                        required
                        className="border-[var(--border)]"
                      />
                      {formData.pricePerDay && (
                        <p className="text-xs text-[var(--text-secondary)] mt-1">
                          {formatPrice(formData.pricePerDay)} IDR/day
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Security Deposit (IDR) *</label>
                      <Input
                        name="deposit"
                        type="number"
                        value={formData.deposit}
                        onChange={handleInputChange}
                        placeholder="Enter deposit amount"
                        required
                        className="border-[var(--border)]"
                      />
                      {formData.deposit && (
                        <p className="text-xs text-[var(--text-secondary)] mt-1">
                          {formatPrice(formData.deposit)} IDR (Refundable)
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Minimum Rental Days *</label>
                    <select
                      name="minRentalDays"
                      value={formData.minRentalDays}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-[var(--border)] rounded-lg bg-[var(--background)] text-[var(--text-primary)]"
                    >
                      {[1, 2, 3, 5, 7].map(days => (
                        <option key={days} value={days}>{days} day{days > 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Location */}
            <Card className="border-[var(--border)]">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">Location</h2>
                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Your Location *</label>
                  <Input
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="e.g., Jakarta Selatan"
                    required
                    className="border-[var(--border)]"
                  />
                  <p className="text-xs text-[var(--text-secondary)] mt-1">
                    This will be shown to renters for pickup arrangements
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Photos */}
            <Card className="border-[var(--border)]">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6">Photos</h2>
                
                {formData.images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                    {formData.images.map((image, index) => (
                      <div key={index} className="relative aspect-square rounded-lg overflow-hidden group">
                        <img
                          src={image}
                          alt={`Costume ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        {index === 0 && (
                          <div className="absolute top-2 left-2 px-2 py-1 bg-[var(--primary)] text-white text-xs font-semibold rounded">
                            Cover
                          </div>
                        )}
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/70 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {formData.images.length < 5 && (
                  <label className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-[var(--border)] rounded-lg cursor-pointer hover:border-[var(--primary)] hover:bg-[var(--surface)] transition-all">
                    <Upload className="w-10 h-10 text-[var(--text-tertiary)] mb-2" />
                    <span className="text-sm text-[var(--text-secondary)]">Click to upload photos</span>
                    <span className="text-xs text-[var(--text-tertiary)] mt-1">Up to 5 images • First image will be cover</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </CardContent>
            </Card>

            {/* Tags */}
            <Card className="border-[var(--border)]">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">Tags (Optional)</h2>
                <Input
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  placeholder="Enter tags separated by commas"
                  className="border-[var(--border)]"
                />
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-4 mt-8">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/costumes')}
              className="px-8 py-6 text-base font-semibold"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-6 text-base font-semibold text-white"
              style={{ background: 'var(--button-primary)' }}
            >
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Publishing...</span>
                </div>
              ) : (
                'List Costume'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCostume;
