import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Search, MapPin, Calendar, Users, Globe } from "lucide-react";
import ListingCard from "./ListingCard";

const HomePage = () => {
  const navigate = useNavigate();
  const [searchTab, setSearchTab] = useState("accommodations");
  const [searchValues, setSearchValues] = useState({
    location: "",
    dates: "",
    guests: "",
  });

  const handleSearchChange = (field: string, value: string) => {
    setSearchValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSearch = () => {
    // Navigate to search page with query parameters
    navigate(
      `/search?type=${searchTab}&location=${encodeURIComponent(searchValues.location)}&dates=${encodeURIComponent(searchValues.dates)}&guests=${encodeURIComponent(searchValues.guests)}`,
    );
  };

  // Sample featured listings
  const featuredListings = [
    {
      id: "1",
      title: "Beachfront Villa with Pool",
      type: "accommodation",
      price: 120,
      currency: "USD",
      rating: 4.8,
      reviewCount: 124,
      location: "Bali, Indonesia",
      imageUrl:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
      features: ["Pool", "Ocean View", "WiFi"],
      available: true,
    },
    {
      id: "2",
      title: "Traditional Cooking Class",
      type: "experience",
      price: 45,
      currency: "USD",
      rating: 4.9,
      reviewCount: 87,
      location: "Yogyakarta, Indonesia",
      imageUrl:
        "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80",
      features: ["Food Included", "3 Hours", "Small Group"],
      available: true,
    },
    {
      id: "3",
      title: "Expert Local Guide - Budi",
      type: "guide",
      price: 80,
      currency: "USD",
      rating: 5.0,
      reviewCount: 56,
      location: "Jakarta, Indonesia",
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=guide1",
      features: ["English", "History Expert", "Private Tours"],
      available: true,
    },
  ];

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=1200&q=80"
            alt="Indonesia landscape"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Navigation */}
        <div className="relative">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Globe className="h-8 w-8 text-white mr-2" />
                <span className="text-white text-2xl font-bold">TravelHub</span>
              </div>
              <div className="hidden md:flex items-center space-x-6 text-white">
                <Link to="/" className="hover:text-primary-foreground">
                  Home
                </Link>
                <Link to="/search" className="hover:text-primary-foreground">
                  Explore
                </Link>
                <Link to="/guides" className="hover:text-primary-foreground">
                  Local Guides
                </Link>
                <Link to="/about" className="hover:text-primary-foreground">
                  About Us
                </Link>
              </div>
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  className="text-white border-white hover:bg-white/20 hover:text-white"
                  asChild
                >
                  <Link to="/login">Sign In</Link>
                </Button>
                <Button className="bg-primary hover:bg-primary/90" asChild>
                  <Link to="/register">Register</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Discover Indonesia with Local Experts
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Find accommodations, unique experiences, and connect with local
              guides for an authentic travel experience.
            </p>

            {/* Search Box */}
            <div className="bg-white rounded-lg p-4 shadow-lg">
              <Tabs
                defaultValue="accommodations"
                className="mb-4"
                onValueChange={(value) => setSearchTab(value)}
              >
                <TabsList className="grid grid-cols-3">
                  <TabsTrigger value="accommodations">
                    Accommodations
                  </TabsTrigger>
                  <TabsTrigger value="experiences">Experiences</TabsTrigger>
                  <TabsTrigger value="guides">Local Guides</TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="flex items-center border rounded-md px-3 py-2">
                    <MapPin className="h-5 w-5 text-muted-foreground mr-2" />
                    <Input
                      type="text"
                      placeholder="Where are you going?"
                      className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
                      value={searchValues.location}
                      onChange={(e) =>
                        handleSearchChange("location", e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center border rounded-md px-3 py-2">
                    <Calendar className="h-5 w-5 text-muted-foreground mr-2" />
                    <Input
                      type="text"
                      placeholder="When?"
                      className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
                      value={searchValues.dates}
                      onChange={(e) =>
                        handleSearchChange("dates", e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center border rounded-md px-3 py-2">
                    <Users className="h-5 w-5 text-muted-foreground mr-2" />
                    <Input
                      type="text"
                      placeholder="Guests"
                      className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
                      value={searchValues.guests}
                      onChange={(e) =>
                        handleSearchChange("guests", e.target.value)
                      }
                    />
                  </div>
                </div>
                <Button
                  className="md:w-auto w-full"
                  size="lg"
                  onClick={handleSearch}
                >
                  <Search className="h-4 w-4 mr-2" /> Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Listings */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8">Featured Listings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredListings.map((listing) => (
            <ListingCard
              key={listing.id}
              id={listing.id}
              title={listing.title}
              location={listing.location}
              price={listing.price}
              currency={listing.currency}
              rating={listing.rating}
              reviewCount={listing.reviewCount}
              imageUrl={listing.imageUrl}
              type={listing.type}
              features={listing.features}
              available={listing.available}
            />
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <Button variant="outline" size="lg" asChild>
            <Link to="/search">View All Listings</Link>
          </Button>
        </div>
      </div>

      {/* Become a Guide Section */}
      <div className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-4">Become a Local Guide</h2>
              <p className="text-lg mb-6">
                Share your local knowledge and earn by helping travelers
                discover the best of your region. Register as a guide or travel
                agency on our platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link to="/guide-registration">Register as Guide</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/create-experience">List an Experience</Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=800&q=80"
                alt="Local guide"
                className="rounded-lg shadow-lg w-full h-[300px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Popular Destinations */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8">Popular Destinations</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              name: "Bali",
              image:
                "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&q=80",
            },
            {
              name: "Jakarta",
              image:
                "https://images.unsplash.com/photo-1555899434-94d1368aa7af?w=400&q=80",
            },
            {
              name: "Yogyakarta",
              image:
                "https://images.unsplash.com/photo-1584810359583-96fc3448beaa?w=400&q=80",
            },
            {
              name: "Lombok",
              image:
                "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=400&q=80",
            },
          ].map((destination, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-lg"
            >
              <img
                src={destination.image}
                alt={destination.name}
                className="w-full h-[200px] object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 flex items-end p-4">
                <h3 className="text-white text-xl font-bold">
                  {destination.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Globe className="h-6 w-6 mr-2" />
                <span className="text-xl font-bold">TravelHub</span>
              </div>
              <p className="text-gray-400">
                Connecting travelers with authentic local experiences across
                Indonesia.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Explore</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/accommodations"
                    className="text-gray-400 hover:text-white"
                  >
                    Accommodations
                  </Link>
                </li>
                <li>
                  <Link
                    to="/experiences"
                    className="text-gray-400 hover:text-white"
                  >
                    Experiences
                  </Link>
                </li>
                <li>
                  <Link to="/guides" className="text-gray-400 hover:text-white">
                    Local Guides
                  </Link>
                </li>
                <li>
                  <Link
                    to="/destinations"
                    className="text-gray-400 hover:text-white"
                  >
                    Destinations
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/about" className="text-gray-400 hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/careers"
                    className="text-gray-400 hover:text-white"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-gray-400 hover:text-white"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/press" className="text-gray-400 hover:text-white">
                    Press
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/help" className="text-gray-400 hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-gray-400 hover:text-white">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy"
                    className="text-gray-400 hover:text-white"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/trust" className="text-gray-400 hover:text-white">
                    Trust & Safety
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2023 TravelHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
