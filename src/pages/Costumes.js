import React, { useState, useMemo } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  mockCostumes,
  franchiseCategories,
  costumeStatuses,
} from "../data/mockCostumes";
import { Search, Heart, Plus, Star, MapPin, DollarSign } from "lucide-react";

const Costumes = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFranchise, setSelectedFranchise] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [costumes, setCostumes] = useState(mockCostumes);

  const filteredCostumes = useMemo(() => {
    return costumes.filter((costume) => {
      const matchesSearch =
        costume.characterName
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        costume.franchiseName
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        costume.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFranchise =
        selectedFranchise === "All" || costume.franchise === selectedFranchise;
      const matchesStatus =
        selectedStatus === "All" ||
        (selectedStatus === "Available" && costume.status === "available") ||
        (selectedStatus === "Rented" && costume.status === "rented") ||
        (selectedStatus === "Maintenance" && costume.status === "maintenance");

      return matchesSearch && matchesFranchise && matchesStatus;
    });
  }, [costumes, searchQuery, selectedFranchise, selectedStatus]);

  const handleWishlist = (costumeId) => {
    setCostumes(
      costumes.map((costume) =>
        costume.id === costumeId
          ? { ...costume, isWishlisted: !costume.isWishlisted }
          : costume,
      ),
    );
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "available":
        return "var(--success)";
      case "rented":
        return "var(--accent-3)";
      case "maintenance":
        return "var(--warning)";
      default:
        return "var(--text-secondary)";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "available":
        return "Available";
      case "rented":
        return "Rented";
      case "maintenance":
        return "Maintenance";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] pt-20 pb-24 md:pb-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1
            className="text-4xl md:text-5xl font-bold mb-3"
            style={{
              background: "var(--hero-gradient)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Browse Costumes
          </h1>
          <p className="text-lg text-[var(--text-secondary)]">
            Rent high-quality cosplay costumes from verified creators
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--text-secondary)]" />
            <Input
              type="text"
              placeholder="Search by character or franchise..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 py-6 text-base border-[var(--border)] focus:ring-[var(--primary)]"
            />
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Franchise Filter */}
            <div className="flex items-center gap-2 flex-wrap">
              {franchiseCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedFranchise(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    selectedFranchise === category
                      ? "text-white"
                      : "bg-[var(--surface)] text-[var(--text-secondary)] hover:bg-[var(--surface-light)]"
                  }`}
                  style={
                    selectedFranchise === category
                      ? { background: "var(--button-primary)" }
                      : {}
                  }
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-[var(--surface)] text-[var(--text-primary)] border border-[var(--border)] hover:bg-[var(--surface-light)] transition-all duration-200 cursor-pointer"
            >
              {costumeStatuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-sm text-[var(--text-secondary)]">
            {filteredCostumes.length} costume
            {filteredCostumes.length !== 1 ? "s" : ""} found
          </p>
        </div>

        {/* Costumes Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCostumes.map((costume) => (
            <Card
              key={costume.id}
              className="border-[var(--border)] hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
            >
              {/* Costume Image */}
              <div className="relative h-80 overflow-hidden">
                <img
                  src={costume.images[0]}
                  alt={costume.characterName}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-semibold text-white"
                    style={{ backgroundColor: getStatusColor(costume.status) }}
                  >
                    {getStatusText(costume.status)}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleWishlist(costume.id);
                    }}
                    className="p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-200 transform hover:scale-110"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        costume.isWishlisted
                          ? "fill-[var(--error)] text-[var(--error)]"
                          : "text-[var(--text-secondary)]"
                      }`}
                    />
                  </button>
                </div>
                {costume.status === "rented" && costume.rentedUntil && (
                  <div className="absolute bottom-3 left-3 right-3 bg-black/70 backdrop-blur-sm rounded-lg p-2">
                    <p className="text-xs text-white text-center">
                      Available from {costume.rentedUntil}
                    </p>
                  </div>
                )}
              </div>

              <CardContent className="p-4">
                {/* Costume Details */}
                <div className="mb-3">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="text-lg font-bold text-[var(--text-primary)] line-clamp-1 group-hover:text-[var(--primary)] transition-colors">
                      {costume.characterName}
                    </h3>
                    <div className="flex items-center text-xs text-[var(--warning)] ml-2">
                      <Star className="w-3 h-3 mr-1 fill-current" />
                      <span className="font-semibold">{costume.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] mb-2">
                    {costume.franchiseName}
                  </p>
                  <div className="flex items-center text-xs text-[var(--text-secondary)]">
                    <MapPin className="w-3 h-3 mr-1" />
                    <span>{costume.location}</span>
                  </div>
                </div>

                {/* Owner Info */}
                <div className="flex items-center space-x-2 mb-3 pb-3 border-b border-[var(--border)]">
                  <img
                    src={costume.owner.avatar}
                    alt={costume.owner.name}
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="text-xs text-[var(--text-secondary)]">
                    {costume.owner.name}
                  </span>
                  {costume.owner.verified && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--success)]/10 text-[var(--success)] font-medium">
                      ✓ Verified
                    </span>
                  )}
                </div>

                {/* Price and Stats */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[var(--text-secondary)]">
                      Per Day
                    </span>
                    <span className="text-lg font-bold text-[var(--primary)]">
                      {formatPrice(costume.pricePerDay)}
                    </span>
                  </div>
                  <div className="text-xs text-[var(--text-secondary)]">
                    Min. {costume.minRentalDays} day
                    {costume.minRentalDays > 1 ? "s" : ""} • Deposit{" "}
                    {formatPrice(costume.deposit)}
                  </div>
                  <Button
                    size="sm"
                    className="w-full rounded-lg text-white mt-2"
                    style={{ background: "var(--button-primary)" }}
                    disabled={costume.status !== "available"}
                  >
                    {costume.status === "available"
                      ? "View Details"
                      : "Not Available"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredCostumes.length === 0 && (
          <div className="text-center py-20">
            <Heart className="w-16 h-16 mx-auto mb-4 text-[var(--text-tertiary)]" />
            <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
              No costumes found
            </h3>
            <p className="text-[var(--text-secondary)]">
              Try adjusting your filters or search query
            </p>
          </div>
        )}
      </div>

      {/* Floating Add Costume Button */}
      <button
        className="fixed bottom-24 md:bottom-8 right-6 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl text-white transform hover:scale-110 transition-all duration-300 z-40"
        style={{ background: "var(--button-primary)" }}
        aria-label="Add costume"
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
};

export default Costumes;
