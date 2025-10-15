import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { mockEvents } from "../data/mockEvents";
import {
  Calendar,
  MapPin,
  Users,
  Share2,
  Bookmark,
  Clock,
  DollarSign,
  Star,
  ArrowLeft,
  Check,
} from "lucide-react";
import { useToast } from "../hooks/use-toast";

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  // Mock: Get event by ID
  const event = mockEvents.find((e) => e.id === parseInt(id)) || mockEvents[0];

  const ticketTypes = [
    {
      id: 1,
      name: "Regular",
      price: event.price,
      available: 150,
      benefits: ["Entry access", "Free merchandise", "Photo booth access"],
    },
    {
      id: 2,
      name: "VIP",
      price: event.price * 2,
      available: 50,
      benefits: [
        "All Regular benefits",
        "Priority entry",
        "Meet & greet",
        "VIP lounge access",
        "Exclusive merchandise",
      ],
    },
    {
      id: 3,
      name: "Early Bird",
      price: event.price * 0.8,
      available: 0,
      benefits: ["Entry access", "Free merchandise", "Early entry"],
    },
  ];

  const mockReviews = [
    {
      id: 1,
      user: {
        name: "Sakura Haruno",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sakura",
      },
      rating: 5,
      comment: "Amazing event! Well organized and so much fun!",
      date: "2 days ago",
      images: [
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=200&h=200&fit=crop",
      ],
    },
    {
      id: 2,
      user: {
        name: "Kaito Mizuki",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kaito",
      },
      rating: 5,
      comment: "Best cosplay event this year! Met so many amazing people.",
      date: "1 week ago",
      images: [],
    },
    {
      id: 3,
      user: {
        name: "Yuki Tanaka",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Yuki",
      },
      rating: 4,
      comment: "Great venue and activities. Only downside was the long queue.",
      date: "2 weeks ago",
      images: [],
    },
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast({
      title: isBookmarked ? "Removed from bookmarks" : "Added to bookmarks",
      description: isBookmarked
        ? "Event removed from your saved items"
        : "Event saved to your bookmarks",
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied!",
      description: "Event link copied to clipboard",
    });
  };

  const handleRSVP = (ticketType) => {
    if (ticketType.available === 0) {
      toast({
        title: "Sold out",
        description: "This ticket type is no longer available",
      });
      return;
    }
    setSelectedTicket(ticketType);
    navigate("/checkout", {
      state: { type: "event", item: event, ticketType },
    });
  };

  return (
    <div className="min-h-screen bg-[var(--background)] pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </button>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero Image */}
            <div className="relative h-96 rounded-2xl overflow-hidden">
              <img
                src={event.coverImage}
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <button
                  onClick={handleBookmark}
                  className="p-3 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-200"
                >
                  <Bookmark
                    className={`w-5 h-5 ${
                      isBookmarked
                        ? "fill-[var(--primary)] text-[var(--primary)]"
                        : "text-[var(--text-secondary)]"
                    }`}
                  />
                </button>
                <button
                  onClick={handleShare}
                  className="p-3 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-200"
                >
                  <Share2 className="w-5 h-5 text-[var(--text-secondary)]" />
                </button>
              </div>
              <div className="absolute bottom-4 left-4">
                <span
                  className="px-4 py-2 rounded-full text-sm font-semibold text-white backdrop-blur-sm"
                  style={{
                    backgroundColor:
                      event.status === "ongoing"
                        ? "var(--success)"
                        : "var(--secondary)",
                  }}
                >
                  {event.status === "ongoing"
                    ? "Sedang Berlangsung"
                    : "Upcoming"}
                </span>
              </div>
            </div>

            {/* Event Info */}
            <Card className="border-[var(--border)]">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-3">
                      {event.title}
                    </h1>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {event.tags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="px-3 py-1"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Event Details Grid */}
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-start space-x-3 p-4 bg-[var(--surface)] rounded-lg">
                    <Calendar className="w-5 h-5 text-[var(--primary)] mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-[var(--text-secondary)] mb-1">
                        Date & Time
                      </p>
                      <p className="font-semibold text-[var(--text-primary)]">
                        {formatDate(event.date)}
                      </p>
                      <p className="text-sm text-[var(--text-secondary)]">
                        {event.time}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-4 bg-[var(--surface)] rounded-lg">
                    <MapPin className="w-5 h-5 text-[var(--primary)] mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-[var(--text-secondary)] mb-1">
                        Location
                      </p>
                      <p className="font-semibold text-[var(--text-primary)]">
                        {event.location}
                      </p>
                      <p className="text-sm text-[var(--text-secondary)]">
                        {event.city}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-4 bg-[var(--surface)] rounded-lg">
                    <Users className="w-5 h-5 text-[var(--primary)] mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-[var(--text-secondary)] mb-1">
                        Attendees
                      </p>
                      <p className="font-semibold text-[var(--text-primary)]">
                        {event.attendees} / {event.maxAttendees}
                      </p>
                      <div className="w-full bg-[var(--border)] rounded-full h-2 mt-2">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${(event.attendees / event.maxAttendees) * 100}%`,
                            background: "var(--button-primary)",
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-4 bg-[var(--surface)] rounded-lg">
                    <DollarSign className="w-5 h-5 text-[var(--primary)] mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-[var(--text-secondary)] mb-1">
                        Starting Price
                      </p>
                      {event.isFree ? (
                        <p className="text-2xl font-bold text-[var(--success)]">
                          FREE
                        </p>
                      ) : (
                        <p className="text-2xl font-bold text-[var(--primary)]">
                          {formatPrice(event.price)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Organizer Info */}
                <div className="flex items-center space-x-3 p-4 border border-[var(--border)] rounded-lg">
                  <img
                    src={event.organizer.avatar}
                    alt={event.organizer.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex-1">
                    <p className="text-sm text-[var(--text-secondary)]">
                      Organized by
                    </p>
                    <div className="flex items-center space-x-2">
                      <p className="font-semibold text-[var(--text-primary)]">
                        {event.organizer.name}
                      </p>
                      {event.organizer.verified && (
                        <Badge className="bg-[var(--success)]/10 text-[var(--success)] border-0">
                          <Check className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Follow
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Tabs */}
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="w-full grid grid-cols-3 bg-[var(--surface)]">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="reviews">
                  Reviews ({mockReviews.length})
                </TabsTrigger>
                <TabsTrigger value="attendees">Attendees</TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="mt-6">
                <Card className="border-[var(--border)]">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4">
                      About This Event
                    </h3>
                    <p className="text-[var(--text-secondary)] leading-relaxed whitespace-pre-line">
                      {event.description}
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6 space-y-4">
                {mockReviews.map((review) => (
                  <Card key={review.id} className="border-[var(--border)]">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-3">
                        <img
                          src={review.user.avatar}
                          alt={review.user.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <p className="font-semibold text-[var(--text-primary)]">
                                {review.user.name}
                              </p>
                              <p className="text-sm text-[var(--text-secondary)]">
                                {review.date}
                              </p>
                            </div>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating
                                      ? "fill-[var(--warning)] text-[var(--warning)]"
                                      : "text-[var(--border)]"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-[var(--text-secondary)] mb-3">
                            {review.comment}
                          </p>
                          {review.images.length > 0 && (
                            <div className="flex gap-2">
                              {review.images.map((img, idx) => (
                                <img
                                  key={idx}
                                  src={img}
                                  alt="Review"
                                  className="w-20 h-20 rounded-lg object-cover"
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="attendees" className="mt-6">
                <Card className="border-[var(--border)]">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4">
                      Attendees ({event.attendees})
                    </h3>
                    <p className="text-[var(--text-secondary)]">
                      Attendee list will be available closer to the event date.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar - Ticket Selection */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              <Card className="border-[var(--border)]">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4">
                    Select Ticket
                  </h3>
                  <div className="space-y-3">
                    {ticketTypes.map((ticket) => (
                      <div
                        key={ticket.id}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                          selectedTicket?.id === ticket.id
                            ? "border-[var(--primary)] bg-[var(--card-gradient)]"
                            : "border-[var(--border)] hover:border-[var(--primary)]/50"
                        } ${ticket.available === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                        onClick={() =>
                          ticket.available > 0 && setSelectedTicket(ticket)
                        }
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-semibold text-[var(--text-primary)]">
                              {ticket.name}
                            </p>
                            <p className="text-2xl font-bold text-[var(--primary)]">
                              {formatPrice(ticket.price)}
                            </p>
                          </div>
                          {ticket.available === 0 && (
                            <Badge variant="destructive">Sold Out</Badge>
                          )}
                        </div>
                        <p className="text-sm text-[var(--text-secondary)] mb-2">
                          {ticket.available > 0
                            ? `${ticket.available} tickets left`
                            : "No tickets available"}
                        </p>
                        <ul className="space-y-1">
                          {ticket.benefits.map((benefit, idx) => (
                            <li
                              key={idx}
                              className="flex items-center text-sm text-[var(--text-secondary)]"
                            >
                              <Check className="w-4 h-4 mr-2 text-[var(--success)]" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <Button
                    className="w-full mt-4 py-6 text-white"
                    style={{ background: "var(--button-primary)" }}
                    disabled={!selectedTicket || selectedTicket.available === 0}
                    onClick={() => handleRSVP(selectedTicket)}
                  >
                    {selectedTicket ? "Buy Ticket" : "Select a ticket type"}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
