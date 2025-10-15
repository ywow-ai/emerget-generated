import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { ArrowLeft, Upload, X, Calendar as CalendarIcon } from 'lucide-react';
import { Calendar } from '../components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';
import { eventCategories, eventCities } from '../data/mockEvents';
import { toast } from '../hooks/use-toast';

const CreateEvent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    city: 'Jakarta',
    location: '',
    date: null,
    endDate: null,
    time: '',
    coverImage: null,
    tags: ''
  });
  const [ticketTypes, setTicketTypes] = useState([
    { id: 1, name: '', price: '' }
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, coverImage: URL.createObjectURL(file) });
    }
  };

  const formatDate = (date) => {
    if (!date) return 'Select date';
    return date.toLocaleDateString('id-ID', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  const addTicketType = () => {
    const newId = Math.max(...ticketTypes.map(t => t.id), 0) + 1;
    setTicketTypes([...ticketTypes, { id: newId, name: '', price: '' }]);
  };

  const removeTicketType = (id) => {
    if (ticketTypes.length > 1) {
      setTicketTypes(ticketTypes.filter(ticket => ticket.id !== id));
    }
  };

  const handleTicketChange = (id, field, value) => {
    setTicketTypes(ticketTypes.map(ticket => 
      ticket.id === id ? { ...ticket, [field]: value } : ticket
    ));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.date || !formData.location) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields',
        variant: 'destructive'
      });
      return;
    }

    // Validate ticket types
    const hasValidTicket = ticketTypes.some(ticket => ticket.name && ticket.price);
    if (!hasValidTicket) {
      toast({
        title: 'Error',
        description: 'Please add at least one ticket type with name and price',
        variant: 'destructive'
      });
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      toast({
        title: 'Event created!',
        description: 'Your event has been published successfully'
      });
      navigate('/events');
    }, 1500);
  };

  const isDateDisabled = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  return (
    <div className="min-h-screen bg-[var(--background)] pt-20 pb-24 md:pb-8">
      <div className="max-w-4xl mx-auto px-4">
        <button
          onClick={() => navigate('/events')}
          className="flex items-center space-x-2 text-[var(--text-secondary)] hover:text-[var(--primary)] mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Events</span>
        </button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-3" style={{ background: 'var(--hero-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Create Event
          </h1>
          <p className="text-lg text-[var(--text-secondary)]">Host your own cosplay event or meetup</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Basic Info */}
            <Card className="border-[var(--border)]">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6">Basic Information</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Event Title *</label>
                    <Input
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Enter event title"
                      required
                      className="border-[var(--border)]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Description *</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Describe your event..."
                      rows={4}
                      required
                      className="w-full px-4 py-3 border border-[var(--border)] rounded-lg bg-[var(--background)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">City *</label>
                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-[var(--border)] rounded-lg bg-[var(--background)] text-[var(--text-primary)]"
                    >
                      {eventCities.filter(c => c !== 'All').map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Venue Location *</label>
                    <Input
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="Enter venue address"
                      required
                      className="border-[var(--border)]"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Date & Time */}
            <Card className="border-[var(--border)]">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6">Date & Time</h2>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Start Date *</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal border-[var(--border)]"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formatDate(formData.date)}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={formData.date}
                          onSelect={(date) => setFormData({ ...formData, date })}
                          disabled={isDateDisabled}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">End Date (Optional)</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal border-[var(--border)]"
                          disabled={!formData.date}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formatDate(formData.endDate)}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={formData.endDate}
                          onSelect={(date) => setFormData({ ...formData, endDate: date })}
                          disabled={(date) => isDateDisabled(date) || (formData.date && date < formData.date)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Time *</label>
                    <Input
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      placeholder="e.g., 10:00 - 18:00"
                      required
                      className="border-[var(--border)]"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Ticket Types */}
            <Card className="border-[var(--border)]">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-[var(--text-primary)]">Ticket Types</h2>
                  <Button
                    type="button"
                    onClick={addTicketType}
                    variant="outline"
                    size="sm"
                    className="rounded-lg"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Ticket Type
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {ticketTypes.map((ticket, index) => (
                    <div key={ticket.id} className="flex items-end gap-3 p-4 bg-[var(--surface)] rounded-lg">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                          Ticket Name *
                        </label>
                        <Input
                          value={ticket.name}
                          onChange={(e) => handleTicketChange(ticket.id, 'name', e.target.value)}
                          placeholder="e.g., General, VIP, Early Bird"
                          className="border-[var(--border)]"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                          Price (IDR) *
                        </label>
                        <Input
                          type="number"
                          value={ticket.price}
                          onChange={(e) => handleTicketChange(ticket.id, 'price', e.target.value)}
                          placeholder="Enter price"
                          className="border-[var(--border)]"
                        />
                      </div>
                      {ticketTypes.length > 1 && (
                        <Button
                          type="button"
                          onClick={() => removeTicketType(ticket.id)}
                          variant="outline"
                          size="sm"
                          className="rounded-lg text-[var(--error)] hover:bg-[var(--error)] hover:text-white"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
                
                <p className="text-xs text-[var(--text-secondary)] mt-4">
                  Add multiple ticket types with different pricing (e.g., General, VIP, Student, etc.)
                </p>
              </CardContent>
            </Card>

            {/* Cover Image */}
            <Card className="border-[var(--border)]">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6">Cover Image</h2>
                
                {formData.coverImage ? (
                  <div className="relative aspect-video rounded-lg overflow-hidden group">
                    <img
                      src={formData.coverImage}
                      alt="Cover"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, coverImage: null })}
                      className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/70 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-5 h-5 text-white" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-[var(--border)] rounded-lg cursor-pointer hover:border-[var(--primary)] hover:bg-[var(--surface)] transition-all">
                    <Upload className="w-10 h-10 text-[var(--text-tertiary)] mb-2" />
                    <span className="text-sm text-[var(--text-secondary)]">Click to upload cover image</span>
                    <span className="text-xs text-[var(--text-tertiary)] mt-1">Recommended: 1200x600px</span>
                    <input
                      type="file"
                      accept="image/*"
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
              onClick={() => navigate('/events')}
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
                'Publish Event'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
