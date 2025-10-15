import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { ArrowLeft, Upload, X, Image as ImageIcon } from 'lucide-react';
import { toast } from '../hooks/use-toast';

const CreateFeed = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    content: '',
    type: 'post',
    images: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map(file => URL.createObjectURL(file));
    setFormData({ ...formData, images: [...formData.images, ...imageUrls].slice(0, 4) });
  };

  const removeImage = (index) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.content.trim()) {
      toast({
        title: 'Error',
        description: 'Please write something to post',
        variant: 'destructive'
      });
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      toast({
        title: 'Post created!',
        description: 'Your post has been published successfully'
      });
      navigate('/feed');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[var(--background)] pt-20 pb-24 md:pb-8">
      <div className="max-w-3xl mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate('/feed')}
          className="flex items-center space-x-2 text-[var(--text-secondary)] hover:text-[var(--primary)] mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Feed</span>
        </button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-3" style={{ background: 'var(--hero-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Create Post
          </h1>
          <p className="text-lg text-[var(--text-secondary)]">Share your cosplay journey with the community</p>
        </div>

        <form onSubmit={handleSubmit}>
          <Card className="border-[var(--border)] mb-6">
            <CardContent className="p-6">
              {/* Post Type */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-3">Post Type</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: 'post', label: 'Regular Post' },
                    { value: 'showcase', label: 'Showcase' },
                    { value: 'wip', label: 'Work in Progress' }
                  ].map(type => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, type: type.value })}
                      className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                        formData.type === type.value
                          ? 'border-[var(--primary)] bg-[var(--primary)]/5 text-[var(--primary)]'
                          : 'border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--primary)]/50'
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">What's on your mind?</label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  placeholder="Share your thoughts, progress, or showcase your work..."
                  rows={6}
                  required
                  className="w-full px-4 py-3 border border-[var(--border)] rounded-lg bg-[var(--background)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] resize-none"
                />
              </div>

              {/* Image Upload */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-3">Add Photos (Optional)</label>
                
                {/* Image Grid */}
                {formData.images.length > 0 && (
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    {formData.images.map((image, index) => (
                      <div key={index} className="relative aspect-square rounded-lg overflow-hidden group">
                        <img
                          src={image}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
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

                {/* Upload Button */}
                {formData.images.length < 4 && (
                  <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-[var(--border)] rounded-lg cursor-pointer hover:border-[var(--primary)] hover:bg-[var(--surface)] transition-all">
                    <Upload className="w-8 h-8 text-[var(--text-tertiary)] mb-2" />
                    <span className="text-sm text-[var(--text-secondary)]">Click to upload images</span>
                    <span className="text-xs text-[var(--text-tertiary)] mt-1">Up to 4 images</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Tags (Optional)</label>
                <Input
                  name="tags"
                  placeholder="Enter tags separated by commas (e.g., anime, cosplay, genshin)"
                  className="border-[var(--border)]"
                />
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/feed')}
              className="px-8 py-6 text-base font-semibold"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !formData.content.trim()}
              className="px-8 py-6 text-base font-semibold text-white"
              style={{ background: 'var(--button-primary)' }}
            >
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Publishing...</span>
                </div>
              ) : (
                'Publish Post'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateFeed;