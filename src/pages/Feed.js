import React, { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { mockStories, mockPosts } from "../data/mock";
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Plus,
  MapPin,
  Calendar as CalendarIcon,
  DollarSign,
} from "lucide-react";

const Feed = () => {
  const [posts, setPosts] = useState(mockPosts);

  const handleLike = (postId) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          };
        }
        return post;
      }),
    );
  };

  const handleBookmark = (postId) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return { ...post, isBookmarked: !post.isBookmarked };
        }
        return post;
      }),
    );
  };

  return (
    <div className="min-h-screen bg-[var(--background)] pt-20 pb-24 md:pb-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Stories Bar */}
        <div className="mb-6">
          <div className="flex items-center space-x-4 overflow-x-auto pb-2 scrollbar-hide">
            {mockStories.map((story) => (
              <div
                key={story.id}
                className="flex-shrink-0 cursor-pointer group"
              >
                <div
                  className={`relative ${
                    story.hasNew
                      ? "ring-2 ring-offset-2 ring-offset-[var(--background)]"
                      : "ring-2 ring-[var(--border)] ring-offset-2 ring-offset-[var(--background)]"
                  } rounded-full transition-all duration-300 group-hover:scale-110`}
                  style={story.hasNew ? { ringColor: "var(--primary)" } : {}}
                >
                  <img
                    src={story.userAvatar}
                    alt={story.username}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                </div>
                <p className="text-xs text-center mt-1 text-[var(--text-secondary)] truncate w-16">
                  {story.username}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Posts Feed */}
        <div className="space-y-6">
          {posts.map((post) => (
            <Card
              key={post.id}
              className="border-[var(--border)] overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {/* Post Header */}
              {post.user && (
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={post.user.avatar}
                      alt={post.user.name}
                      className="w-10 h-10 rounded-full border-2 border-[var(--primary)]"
                    />
                    <div>
                      <div className="font-semibold text-[var(--text-primary)]">
                        {post.user.name}
                      </div>
                      <div className="text-sm text-[var(--text-secondary)]">
                        {post.timestamp}
                      </div>
                    </div>
                  </div>
                  {(post.eventBadge || post.costumeBadge) && (
                    <span
                      className="px-3 py-1 rounded-full text-xs font-semibold text-white"
                      style={{
                        background: post.eventBadge
                          ? "var(--secondary)"
                          : "var(--success)",
                      }}
                    >
                      {post.eventBadge || post.costumeBadge}
                    </span>
                  )}
                </div>
              )}

              {/* Event Header (for event posts without user) */}
              {!post.user && post.type === "event" && (
                <div className="p-4 bg-[var(--surface)]">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">
                        {post.eventTitle}
                      </h3>
                      <div className="flex flex-wrap gap-3 text-sm text-[var(--text-secondary)]">
                        <div className="flex items-center space-x-1">
                          <CalendarIcon className="w-4 h-4" />
                          <span>{post.eventDate}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{post.eventLocation}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <DollarSign className="w-4 h-4" />
                          <span className="font-semibold text-[var(--primary)]">
                            {post.eventPrice}
                          </span>
                        </div>
                      </div>
                    </div>
                    <span
                      className="px-3 py-1 rounded-full text-xs font-semibold text-white flex-shrink-0"
                      style={{ background: "var(--secondary)" }}
                    >
                      {post.eventBadge}
                    </span>
                  </div>
                </div>
              )}

              {/* Post Images */}
              {post.images && post.images.length > 0 && (
                <div
                  className={`grid ${
                    post.images.length === 1 ? "grid-cols-1" : "grid-cols-2"
                  } gap-1`}
                >
                  {post.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt="Post content"
                      className="w-full h-80 object-cover cursor-pointer hover:opacity-95 transition-opacity"
                    />
                  ))}
                </div>
              )}

              <CardContent className="p-4">
                {/* Post Content */}
                <p className="text-[var(--text-primary)] mb-4 leading-relaxed">
                  {post.content}
                </p>

                {/* Costume Info */}
                {post.type === "costume" && (
                  <div className="flex items-center justify-between mb-4 p-3 bg-[var(--surface)] rounded-lg">
                    <div>
                      <div className="text-sm text-[var(--text-secondary)] mb-1">
                        Rental Price
                      </div>
                      <div className="text-lg font-bold text-[var(--primary)]">
                        {post.rentalPrice}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-[var(--text-secondary)] mb-1">
                        Franchise
                      </div>
                      <div className="text-sm font-semibold text-[var(--text-primary)]">
                        {post.franchise}
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-2 border-t border-[var(--border)]">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleLike(post.id)}
                      className="flex items-center space-x-2 group transition-all duration-200"
                    >
                      <Heart
                        className={`w-6 h-6 group-hover:scale-110 transition-transform ${
                          post.isLiked
                            ? "fill-[var(--error)] text-[var(--error)]"
                            : "text-[var(--text-secondary)]"
                        }`}
                      />
                      <span className="text-sm font-medium text-[var(--text-secondary)]">
                        {post.likes}
                      </span>
                    </button>
                    <button className="flex items-center space-x-2 group transition-all duration-200">
                      <MessageCircle className="w-6 h-6 text-[var(--text-secondary)] group-hover:scale-110 transition-transform" />
                      <span className="text-sm font-medium text-[var(--text-secondary)]">
                        {post.comments}
                      </span>
                    </button>
                    <button className="flex items-center space-x-2 group transition-all duration-200">
                      <Share2 className="w-6 h-6 text-[var(--text-secondary)] group-hover:scale-110 transition-transform" />
                      <span className="text-sm font-medium text-[var(--text-secondary)]">
                        {post.shares}
                      </span>
                    </button>
                  </div>
                  <button
                    onClick={() => handleBookmark(post.id)}
                    className="group transition-all duration-200"
                  >
                    <Bookmark
                      className={`w-6 h-6 group-hover:scale-110 transition-transform ${
                        post.isBookmarked
                          ? "fill-[var(--primary)] text-[var(--primary)]"
                          : "text-[var(--text-secondary)]"
                      }`}
                    />
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Floating Create Post Button */}
      <button
        className="fixed bottom-24 md:bottom-8 right-6 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl text-white transform hover:scale-110 transition-all duration-300 z-40"
        style={{ background: "var(--button-primary)" }}
        aria-label="Create post"
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
};

export default Feed;
