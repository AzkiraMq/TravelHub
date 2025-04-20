import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Star, MapPin } from "lucide-react";

interface ListingCardProps {
  id?: string;
  title?: string;
  location?: string;
  price?: number;
  currency?: string;
  rating?: number;
  reviewCount?: number;
  imageUrl?: string;
  type?: "accommodation" | "experience" | "guide";
  features?: string[];
  available?: boolean;
  onFavorite?: (id: string) => void;
  onClick?: (id: string) => void;
}

const ListingCard = ({
  id = "1",
  title = "Beautiful Beach Villa",
  location = "Bali, Indonesia",
  price = 120,
  currency = "USD",
  rating = 4.8,
  reviewCount = 24,
  imageUrl = "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
  type = "accommodation",
  features = ["2 Bedrooms", "Pool", "Ocean View"],
  available = true,
  onFavorite = () => {},
  onClick = () => {},
}: ListingCardProps) => {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFavorite(id);
  };

  const handleCardClick = () => {
    onClick(id);
  };

  const typeLabel = {
    accommodation: "Stay",
    experience: "Experience",
    guide: "Local Guide",
  }[type];

  const priceLabel = {
    accommodation: "night",
    experience: "person",
    guide: "day",
  }[type];

  return (
    <Card
      className="w-full max-w-[350px] overflow-hidden transition-all duration-300 hover:shadow-lg bg-white cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="relative">
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full"
          onClick={handleFavoriteClick}
        >
          <Heart className="h-5 w-5 text-gray-600 hover:text-red-500" />
        </Button>
        <Badge
          variant="secondary"
          className="absolute top-2 left-2 bg-white/80 text-gray-800"
        >
          {typeLabel}
        </Badge>
        {!available && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Badge variant="destructive" className="text-sm font-medium">
              Not Available
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-lg line-clamp-1">{title}</h3>
            <div className="flex items-center text-sm text-gray-500 mt-1">
              <MapPin className="h-3.5 w-3.5 mr-1" />
              <span className="line-clamp-1">{location}</span>
            </div>
          </div>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-500 mr-1" />
            <span className="text-sm font-medium">{rating}</span>
            <span className="text-xs text-gray-500 ml-1">({reviewCount})</span>
          </div>
        </div>

        <div className="mt-3">
          <div className="flex flex-wrap gap-1">
            {features.map((feature, index) => (
              <Badge
                key={index}
                variant="outline"
                className="text-xs bg-gray-50"
              >
                {feature}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div>
          <span className="font-semibold text-lg">
            {currency} {price}
          </span>
          <span className="text-sm text-gray-500">/{priceLabel}</span>
        </div>
        <Button size="sm" className="rounded-full hover:bg-primary/90">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ListingCard;
