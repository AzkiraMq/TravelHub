import React, { useState, useEffect } from "react";
import { MapIcon, ListIcon, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ListingCard from "./ListingCard";

interface SearchResultsProps {
  searchType?: "accommodations" | "experiences" | "guides";
  searchQuery?: string;
  filters?: any;
}

const SearchResults = ({
  searchType = "accommodations",
  searchQuery = "",
  filters = {},
}: SearchResultsProps) => {
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [priceRange, setPriceRange] = useState<number[]>([0, 1000]);
  const [sortBy, setSortBy] = useState("recommended");
  const [filterOpen, setFilterOpen] = useState(window.innerWidth >= 768);

  // Mock data for demonstration
  const mockResults = [
    {
      id: "1",
      title: "Beachfront Villa with Pool",
      type: "accommodation",
      price: 120,
      currency: "USD",
      rating: 4.8,
      reviews: 124,
      location: "Bali, Indonesia",
      image:
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
      reviews: 87,
      location: "Yogyakarta, Indonesia",
      image:
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
      reviews: 56,
      location: "Jakarta, Indonesia",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=guide1",
      features: ["English", "History Expert", "Private Tours"],
      available: true,
    },
    {
      id: "4",
      title: "Mountain Retreat Cabin",
      type: "accommodation",
      price: 95,
      currency: "USD",
      rating: 4.6,
      reviews: 72,
      location: "Bandung, Indonesia",
      image:
        "https://images.unsplash.com/photo-1518732714860-b62714ce0c59?w=800&q=80",
      features: ["Mountain View", "Fireplace", "Hiking Trails"],
      available: true,
    },
    {
      id: "5",
      title: "Sunrise Volcano Trek",
      type: "experience",
      price: 65,
      currency: "USD",
      rating: 4.7,
      reviews: 103,
      location: "Mount Bromo, Indonesia",
      image:
        "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?w=800&q=80",
      features: ["Transportation", "6 Hours", "Breakfast"],
      available: false,
    },
    {
      id: "6",
      title: "Certified Guide - Siti",
      type: "guide",
      price: 70,
      currency: "USD",
      rating: 4.9,
      reviews: 42,
      location: "Lombok, Indonesia",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=guide2",
      features: ["English", "Japanese", "Photography"],
      available: true,
    },
  ];

  // Filter results based on search type and price range
  const filteredResults = mockResults.filter((result) => {
    // Filter by type
    const typeMatch =
      searchType === "accommodations"
        ? result.type === "accommodation"
        : searchType === "experiences"
          ? result.type === "experience"
          : searchType === "guides"
            ? result.type === "guide"
            : true;

    // Filter by price range
    const priceMatch =
      result.price >= priceRange[0] && result.price <= priceRange[1];

    return typeMatch && priceMatch;
  });

  // Effect to close filter sidebar on larger screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && filterOpen) {
        setFilterOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [filterOpen]);

  const toggleFilterSidebar = () => {
    setFilterOpen(!filterOpen);
  };

  return (
    <div className="bg-background min-h-screen w-full">
      <div className="container mx-auto px-4 py-6">
        {/* Search header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              {searchQuery
                ? `Results for "${searchQuery}"`
                : `All ${searchType}`}
            </h1>
            <p className="text-muted-foreground">
              {filteredResults.length}{" "}
              {filteredResults.length === 1 ? "result" : "results"} found
            </p>
          </div>

          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recommended">Recommended</SelectItem>
                <SelectItem value="price_low">Price: Low to High</SelectItem>
                <SelectItem value="price_high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>

            <Tabs
              value={viewMode}
              onValueChange={(value) => setViewMode(value as "list" | "map")}
            >
              <TabsList>
                <TabsTrigger value="list">
                  <ListIcon className="h-4 w-4 mr-2" />
                  List
                </TabsTrigger>
                <TabsTrigger value="map">
                  <MapIcon className="h-4 w-4 mr-2" />
                  Map
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <Button
              variant="outline"
              size="sm"
              onClick={toggleFilterSidebar}
              className="md:hidden"
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters sidebar */}
          <div
            className={`${filterOpen ? "block" : "hidden"} md:block w-full md:w-64 shrink-0`}
          >
            <div className="bg-card rounded-lg border p-4 sticky top-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Filters</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setPriceRange([0, 1000]);
                  }}
                >
                  Reset
                </Button>
              </div>

              <div className="space-y-6">
                {/* Price Range */}
                <div>
                  <h3 className="font-medium mb-2">Price Range</h3>
                  <div className="mb-6">
                    <Slider
                      defaultValue={[0, 1000]}
                      max={1000}
                      step={10}
                      value={priceRange}
                      onValueChange={setPriceRange}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="border rounded-md px-3 py-1">
                      ${priceRange[0]}
                    </div>
                    <div className="border rounded-md px-3 py-1">
                      ${priceRange[1]}
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Rating */}
                <div>
                  <h3 className="font-medium mb-2">Rating</h3>
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center">
                        <Checkbox id={`rating-${rating}`} />
                        <Label htmlFor={`rating-${rating}`} className="ml-2">
                          {rating}+ Stars
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Features/Amenities */}
                <div>
                  <h3 className="font-medium mb-2">
                    {searchType === "accommodations"
                      ? "Amenities"
                      : searchType === "experiences"
                        ? "Features"
                        : "Specialties"}
                  </h3>
                  <div className="space-y-2">
                    {searchType === "accommodations" &&
                      [
                        "Pool",
                        "WiFi",
                        "Kitchen",
                        "Air Conditioning",
                        "Parking",
                      ].map((amenity) => (
                        <div key={amenity} className="flex items-center">
                          <Checkbox id={`amenity-${amenity}`} />
                          <Label
                            htmlFor={`amenity-${amenity}`}
                            className="ml-2"
                          >
                            {amenity}
                          </Label>
                        </div>
                      ))}

                    {searchType === "experiences" &&
                      [
                        "Transportation Included",
                        "Meals Included",
                        "Small Group",
                        "Private",
                        "Family Friendly",
                      ].map((feature) => (
                        <div key={feature} className="flex items-center">
                          <Checkbox id={`feature-${feature}`} />
                          <Label
                            htmlFor={`feature-${feature}`}
                            className="ml-2"
                          >
                            {feature}
                          </Label>
                        </div>
                      ))}

                    {searchType === "guides" &&
                      [
                        "English Speaking",
                        "Local Expert",
                        "Transportation",
                        "Photography",
                        "History",
                      ].map((specialty) => (
                        <div key={specialty} className="flex items-center">
                          <Checkbox id={`specialty-${specialty}`} />
                          <Label
                            htmlFor={`specialty-${specialty}`}
                            className="ml-2"
                          >
                            {specialty}
                          </Label>
                        </div>
                      ))}
                  </div>
                </div>

                <Separator />

                {/* Availability */}
                <div>
                  <h3 className="font-medium mb-2">Availability</h3>
                  <div className="flex items-center">
                    <Checkbox id="available-only" />
                    <Label htmlFor="available-only" className="ml-2">
                      Show available only
                    </Label>
                  </div>
                </div>

                <Button className="w-full mt-4 hover:bg-primary/90">
                  Apply Filters
                </Button>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="flex-1">
            <Tabs value={viewMode}>
              <TabsList className="hidden">
                {" "}
                {/* Hidden TabsList to maintain structure */}
                <TabsTrigger value="list">List</TabsTrigger>
                <TabsTrigger value="map">Map</TabsTrigger>
              </TabsList>
              <TabsContent value="list" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredResults.map((result) => (
                    <ListingCard
                      key={result.id}
                      id={result.id}
                      title={result.title}
                      type={
                        result.type as "accommodation" | "experience" | "guide"
                      }
                      price={result.price}
                      currency={result.currency}
                      rating={result.rating}
                      reviewCount={result.reviews}
                      imageUrl={result.image}
                      location={result.location}
                      features={result.features}
                      available={result.available}
                      onFavorite={(id) =>
                        console.log(`Added ${id} to favorites`)
                      }
                      onClick={(id) => console.log(`Viewing details for ${id}`)}
                    />
                  ))}
                </div>

                {filteredResults.length === 0 && (
                  <div className="text-center py-12">
                    <h3 className="text-lg font-medium mb-2">
                      No results found
                    </h3>
                    <p className="text-muted-foreground">
                      Try adjusting your filters or search terms
                    </p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="map" className="mt-0">
                <div className="bg-muted rounded-lg border h-[600px] flex items-center justify-center">
                  <div className="text-center">
                    <MapIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-medium mb-2">Map View</h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      Map integration would display all {filteredResults.length}{" "}
                      results geographically. Users could click on map markers
                      to view listing details.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
