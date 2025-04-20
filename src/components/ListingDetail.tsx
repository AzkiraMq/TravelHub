import { useState } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Calendar } from "./ui/calendar";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Avatar } from "./ui/avatar";

interface ListingDetailProps {
  id?: string;
  title?: string;
  description?: string;
  price?: number;
  location?: string;
  images?: string[];
  amenities?: string[];
  host?: {
    name: string;
    avatar: string;
    rating: number;
  };
  reviews?: {
    id: string;
    author: string;
    rating: number;
    comment: string;
    date: string;
  }[];
}

export function ListingDetail({
  id = "1",
  title = "Luxury Beachfront Villa",
  description = "Experience the ultimate beachfront luxury in this stunning villa with panoramic ocean views, private pool, and direct beach access.",
  price = 250,
  location = "Bali, Indonesia",
  images = [
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
  ],
  amenities = [
    "Wi-Fi",
    "Pool",
    "Kitchen",
    "Air conditioning",
    "Beach access",
    "Free parking",
  ],
  host = {
    name: "Sarah Johnson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    rating: 4.9,
  },
  reviews = [
    {
      id: "1",
      author: "John D.",
      rating: 5,
      comment:
        "Absolutely stunning property with incredible views. The host was very responsive and helpful.",
      date: "2023-05-15",
    },
    {
      id: "2",
      author: "Maria L.",
      rating: 4,
      comment:
        "Beautiful villa, great location. The only issue was the Wi-Fi was a bit slow at times.",
      date: "2023-04-22",
    },
  ],
}: ListingDetailProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length,
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Image Gallery */}
          <div className="relative rounded-lg overflow-hidden h-[400px] mb-6">
            <img
              src={images[currentImageIndex]}
              alt={`Listing image ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-between px-4">
              <Button
                variant="outline"
                size="icon"
                className="bg-white/80 hover:bg-white"
                onClick={prevImage}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-chevron-left"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="bg-white/80 hover:bg-white"
                onClick={nextImage}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-chevron-right"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </Button>
            </div>
            <div className="absolute bottom-4 right-4 bg-black/60 text-white px-2 py-1 rounded-md text-sm">
              {currentImageIndex + 1} / {images.length}
            </div>
          </div>

          {/* Listing Details */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">{title}</h1>
            <p className="text-gray-600 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-map-pin inline-block mr-1"
              >
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {location}
            </p>
            <p className="text-lg mb-4">{description}</p>
          </div>

          {/* Amenities */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Amenities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-check mr-2 text-green-500"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Reviews */}
          <Card>
            <CardHeader>
              <CardTitle>Reviews</CardTitle>
              <CardDescription>
                See what other guests have to say
              </CardDescription>
            </CardHeader>
            <CardContent>
              {reviews.map((review) => (
                <div key={review.id} className="mb-6">
                  <div className="flex items-center mb-2">
                    <div className="font-medium">{review.author}</div>
                    <div className="ml-auto text-sm text-gray-500">
                      {review.date}
                    </div>
                  </div>
                  <div className="flex items-center mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill={i < review.rating ? "currentColor" : "none"}
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`${i < review.rating ? "text-yellow-400" : "text-gray-300"} mr-1`}
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                  {review.id !== reviews[reviews.length - 1].id && (
                    <Separator className="mt-4" />
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Booking Card */}
        <div>
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle>
                ${price}{" "}
                <span className="text-base font-normal">per night</span>
              </CardTitle>
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill={i < Math.floor(host.rating) ? "currentColor" : "none"}
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`${i < Math.floor(host.rating) ? "text-yellow-400" : "text-gray-300"} mr-1`}
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
                <span className="ml-1">
                  {host.rating} · {reviews.length} reviews
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="dates">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="dates">Dates</TabsTrigger>
                  <TabsTrigger value="guests">Guests</TabsTrigger>
                </TabsList>
                <TabsContent value="dates" className="pt-4">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border mx-auto"
                  />
                </TabsContent>
                <TabsContent value="guests" className="pt-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Adults</span>
                      <div className="flex items-center">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-minus"
                          >
                            <path d="M5 12h14" />
                          </svg>
                        </Button>
                        <span className="mx-3">2</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-plus"
                          >
                            <path d="M5 12h14" />
                            <path d="M12 5v14" />
                          </svg>
                        </Button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Children</span>
                      <div className="flex items-center">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-minus"
                          >
                            <path d="M5 12h14" />
                          </svg>
                        </Button>
                        <span className="mx-3">0</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-plus"
                          >
                            <path d="M5 12h14" />
                            <path d="M12 5v14" />
                          </svg>
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex flex-col">
              <Button className="w-full mb-4">Book Now</Button>
              <div className="text-sm text-gray-500 text-center">
                You won't be charged yet
              </div>
              <div className="mt-4 space-y-2 w-full">
                <div className="flex justify-between">
                  <span>${price} x 5 nights</span>
                  <span>${price * 5}</span>
                </div>
                <div className="flex justify-between">
                  <span>Cleaning fee</span>
                  <span>$50</span>
                </div>
                <div className="flex justify-between">
                  <span>Service fee</span>
                  <span>$75</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${price * 5 + 50 + 75}</span>
                </div>
              </div>
            </CardFooter>
          </Card>

          {/* Host Info */}
          <Card className="mt-6">
            <CardHeader>
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-4">
                  <img src={host.avatar} alt={host.name} />
                </Avatar>
                <div>
                  <CardTitle className="text-lg">
                    Hosted by {host.name}
                  </CardTitle>
                  <CardDescription>Superhost · 5 years hosting</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                I love sharing my beautiful properties with travelers from
                around the world. I'm always available to help make your stay
                perfect!
              </p>
              <Button variant="outline" className="w-full">
                Contact Host
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default ListingDetail;
