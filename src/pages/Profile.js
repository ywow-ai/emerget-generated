import React, { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { mockUsers } from "../data/mock";
import { mockPosts } from "../data/mock";
import { mockEvents } from "../data/mockEvents";
import { mockCostumes } from "../data/mockCostumes";
import {
  Settings,
  MapPin,
  Calendar,
  Users,
  Heart,
  Shirt,
  Badge,
  Edit,
} from "lucide-react";

const Profile = () => {
  const currentUser = mockUsers[0];
  const [activeTab, setActiveTab] = useState("posts");

  const userPosts = mockPosts.filter((post) => post.userId === currentUser.id);
  const userEvents = mockEvents.slice(0, 2);
  const userCostumes = mockCostumes.slice(0, 3);
  const savedItems = mockPosts.filter((post) => post.isBookmarked);

  const stats = [
    { label: "Posts", value: userPosts.length, icon: Users },
    { label: "Events", value: userEvents.length, icon: Calendar },
    { label: "Costumes", value: userCostumes.length, icon: Shirt },
    { label: "Followers", value: "1.2K", icon: Heart },
  ];

  return (
    <div className="min-h-screen bg-[var(--background)] pt-20 pb-24 md:pb-8">
      <div className="max-w-5xl mx-auto px-4">
        {/* Profile Header */}
        <Card className="border-[var(--border)] mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {/* Avatar */}
              <div className="relative">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-32 h-32 rounded-full border-4 border-[var(--primary)] object-cover"
                />
                <div className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-[var(--success)] border-4 border-white flex items-center justify-center">
                  <Badge className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* User Info */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                  <div>
                    <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-1">
                      {currentUser.name}
                    </h1>
                    <p className="text-[var(--text-secondary)]">
                      {currentUser.username}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 mt-3 md:mt-0">
                    <Button variant="outline" size="sm" className="rounded-lg">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                    <Button variant="outline" size="sm" className="rounded-lg">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <p className="text-[var(--text-secondary)] mb-4">
                  {currentUser.bio}
                </p>

                <div className="flex items-center justify-center md:justify-start text-sm text-[var(--text-secondary)] mb-4">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>Jakarta, Indonesia</span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-4 gap-4">
                  {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <div key={index} className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <Icon className="w-4 h-4 text-[var(--primary)] mr-1" />
                          <span className="text-xl font-bold text-[var(--text-primary)]">
                            {stat.value}
                          </span>
                        </div>
                        <span className="text-xs text-[var(--text-secondary)]">
                          {stat.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="w-full grid grid-cols-4 mb-6 bg-[var(--surface)] p-1 rounded-lg">
            <TabsTrigger value="posts" className="rounded-lg">
              Postingan
            </TabsTrigger>
            <TabsTrigger value="events" className="rounded-lg">
              Event Saya
            </TabsTrigger>
            <TabsTrigger value="costumes" className="rounded-lg">
              Kostum Saya
            </TabsTrigger>
            <TabsTrigger value="saved" className="rounded-lg">
              Disimpan
            </TabsTrigger>
          </TabsList>

          {/* Posts Tab */}
          <TabsContent value="posts" className="space-y-4">
            {userPosts.length === 0 ? (
              <div className="text-center py-20">
                <Users className="w-16 h-16 mx-auto mb-4 text-[var(--text-tertiary)]" />
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
                  No posts yet
                </h3>
                <p className="text-[var(--text-secondary)]">
                  Start sharing your cosplay journey!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-2">
                {userPosts.map((post) => (
                  <div
                    key={post.id}
                    className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group"
                  >
                    <img
                      src={post.images[0]}
                      alt="Post"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4 text-white">
                      <div className="flex items-center">
                        <Heart className="w-5 h-5 mr-1" />
                        <span>{post.likes}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events" className="space-y-4">
            {userEvents.length === 0 ? (
              <div className="text-center py-20">
                <Calendar className="w-16 h-16 mx-auto mb-4 text-[var(--text-tertiary)]" />
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
                  No events created
                </h3>
                <p className="text-[var(--text-secondary)]">
                  Create your first event and bring the community together!
                </p>
                <Button
                  className="mt-4 rounded-lg text-white"
                  style={{ background: "var(--button-primary)" }}
                >
                  Create Event
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {userEvents.map((event) => (
                  <Card
                    key={event.id}
                    className="border-[var(--border)] hover:shadow-lg transition-all duration-300"
                  >
                    <CardContent className="p-4 flex gap-4">
                      <img
                        src={event.coverImage}
                        alt={event.title}
                        className="w-32 h-32 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">
                          {event.title}
                        </h3>
                        <div className="flex items-center text-sm text-[var(--text-secondary)] mb-2">
                          <Calendar className="w-4 h-4 mr-1" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center text-sm text-[var(--text-secondary)]">
                          <Users className="w-4 h-4 mr-1" />
                          <span>{event.attendees} attendees</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Costumes Tab */}
          <TabsContent value="costumes" className="space-y-4">
            {userCostumes.length === 0 ? (
              <div className="text-center py-20">
                <Shirt className="w-16 h-16 mx-auto mb-4 text-[var(--text-tertiary)]" />
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
                  No costumes listed
                </h3>
                <p className="text-[var(--text-secondary)]">
                  List your costumes for rent and earn money!
                </p>
                <Button
                  className="mt-4 rounded-lg text-white"
                  style={{ background: "var(--button-primary)" }}
                >
                  Add Costume
                </Button>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {userCostumes.map((costume) => (
                  <Card
                    key={costume.id}
                    className="border-[var(--border)] hover:shadow-lg transition-all duration-300"
                  >
                    <div className="relative h-64 overflow-hidden rounded-t-lg">
                      <img
                        src={costume.images[0]}
                        alt={costume.characterName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="text-lg font-bold text-[var(--text-primary)] mb-1">
                        {costume.characterName}
                      </h3>
                      <p className="text-sm text-[var(--text-secondary)] mb-2">
                        {costume.franchiseName}
                      </p>
                      <div className="text-lg font-bold text-[var(--primary)]">
                        Rp {costume.pricePerDay.toLocaleString("id-ID")}/day
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Saved Tab */}
          <TabsContent value="saved" className="space-y-4">
            {savedItems.length === 0 ? (
              <div className="text-center py-20">
                <Heart className="w-16 h-16 mx-auto mb-4 text-[var(--text-tertiary)]" />
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
                  No saved items
                </h3>
                <p className="text-[var(--text-secondary)]">
                  Bookmark posts to save them for later!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-2">
                {savedItems.map((post) => (
                  <div
                    key={post.id}
                    className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group"
                  >
                    <img
                      src={post.images[0]}
                      alt="Saved post"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4 text-white">
                      <div className="flex items-center">
                        <Heart className="w-5 h-5 mr-1 fill-current" />
                        <span>{post.likes}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
