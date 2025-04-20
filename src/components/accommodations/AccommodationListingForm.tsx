import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format, addDays, differenceInDays } from "date-fns";
import { useNavigate } from "react-router-dom";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { AccommodationFormData, BookingData } from "@/types/accommodation";
import { useAuth } from "@/contexts/AuthContext";

const accommodationTypes = [
  "Villa",
  "Apartment",
  "House",
  "Hotel Room",
  "Homestay",
  "Bungalow",
  "Resort",
  "Cottage",
];

const amenities = [
  "WiFi",
  "Air Conditioning",
  "Kitchen",
  "Pool",
  "Free Parking",
  "Washing Machine",
  "TV",
  "Workspace",
  "Hot Tub",
  "BBQ Grill",
];

const formSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters" }),
  description: z.string().min(20, {
    message: "Description must be at least 20 characters",
  }),
  type: z.string(),
  address: z.string().min(5, { message: "Address is required" }),
  city: z.string().min(2, { message: "City is required" }),
  country: z.string().min(2, { message: "Country is required" }),
  price: z.coerce
    .number()
    .positive({ message: "Price must be a positive number" }),
  currency: z.string(),
  maxGuests: z.coerce
    .number()
    .int()
    .positive({ message: "Number of guests must be positive" }),
  bedrooms: z.coerce
    .number()
    .int()
    .positive({ message: "Number of bedrooms must be positive" }),
  beds: z.coerce
    .number()
    .int()
    .positive({ message: "Number of beds must be positive" }),
  bathrooms: z.coerce
    .number()
    .int()
    .positive({ message: "Number of bathrooms must be positive" }),
  selectedAmenities: z.array(z.string()).optional(),
  dateRange: z
    .object({
      from: z.date().optional(),
      to: z.date().optional(),
    })
    .optional(),
});

const AccommodationListingForm = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      type: "",
      address: "",
      city: "",
      country: "",
      price: 0,
      currency: "USD",
      maxGuests: 1,
      bedrooms: 1,
      beds: 1,
      bathrooms: 1,
      selectedAmenities: [],
      dateRange: {
        from: undefined,
        to: undefined,
      },
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);

    try {
      // Convert form data to AccommodationFormData format
      const accommodationData: AccommodationFormData = {
        title: values.title,
        description: values.description,
        type: values.type,
        location: {
          address: values.address,
          city: values.city,
          country: values.country,
        },
        price: values.price,
        currency: values.currency,
        features: [],
        amenities: values.selectedAmenities || [],
        maxGuests: values.maxGuests,
        bedrooms: values.bedrooms,
        beds: values.beds,
        bathrooms: values.bathrooms,
        images: images,
        availability:
          values.dateRange?.from && values.dateRange?.to
            ? {
                startDate: values.dateRange.from.toISOString(),
                endDate: values.dateRange.to.toISOString(),
              }
            : undefined,
      };

      console.log("Accommodation data to submit:", accommodationData);
      // Here you would typically send this data to your backend API
      // For now, we'll simulate a successful API call

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Generate a mock booking ID
      const bookingId = `BK-${Math.floor(Math.random() * 10000)}`;

      // Calculate total price based on number of nights
      let totalPrice = values.price;
      if (values.dateRange?.from && values.dateRange?.to) {
        const nights = differenceInDays(
          values.dateRange.to,
          values.dateRange.from,
        );
        totalPrice = values.price * nights;
      }

      // Create a mock booking data object
      const bookingData: BookingData = {
        id: bookingId,
        accommodationId: `ACC-${Math.floor(Math.random() * 10000)}`,
        userId: user?.id || "guest-user",
        checkInDate:
          values.dateRange?.from?.toISOString() || new Date().toISOString(),
        checkOutDate:
          values.dateRange?.to?.toISOString() || new Date().toISOString(),
        guestCount: values.maxGuests,
        totalPrice: totalPrice,
        currency: values.currency,
        status: "confirmed",
        paymentStatus: "paid",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Navigate to the booking confirmation page with the booking data
      navigate("/booking-confirmation", { state: { bookingData } });
    } catch (error) {
      console.error("Error submitting accommodation listing:", error);
      // Handle error (show error message, etc.)
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    form.trigger().then((isValid) => {
      if (isValid) setStep(step + 1);
    });
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  // Mock function for image upload
  const handleImageUpload = () => {
    // In a real app, this would handle file uploads
    // For now, we'll just add a placeholder image
    setImages([
      ...images,
      `https://images.unsplash.com/photo-${Math.floor(
        Math.random() * 1000,
      )}?w=500&q=80`,
    ]);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>List Your Accommodation</CardTitle>
          <CardDescription>
            Fill out the details below to list your property on TravelHub
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {step === 1 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Basic Information</h2>
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Accommodation Title</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Beachfront Villa with Pool"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          A catchy title helps attract guests
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe your accommodation..."
                            className="min-h-32"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Provide a detailed description of your accommodation
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Accommodation Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select accommodation type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {accommodationTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Location</h2>
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Street address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input placeholder="City" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country</FormLabel>
                          <FormControl>
                            <Input placeholder="Country" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Details & Pricing</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Price per night</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="0" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="currency"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Currency</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select currency" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="USD">USD</SelectItem>
                              <SelectItem value="EUR">EUR</SelectItem>
                              <SelectItem value="GBP">GBP</SelectItem>
                              <SelectItem value="IDR">IDR</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="maxGuests"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Max Guests</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="1" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="bedrooms"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bedrooms</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="1" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="beds"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Beds</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="1" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="bathrooms"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bathrooms</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="1" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Amenities</h2>
                  <FormField
                    control={form.control}
                    name="selectedAmenities"
                    render={() => (
                      <FormItem>
                        <div className="grid grid-cols-2 gap-2">
                          {amenities.map((amenity) => (
                            <FormField
                              key={amenity}
                              control={form.control}
                              name="selectedAmenities"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={amenity}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(amenity)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([
                                                ...(field.value || []),
                                                amenity,
                                              ])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== amenity,
                                                ),
                                              );
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      {amenity}
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {step === 5 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Availability</h2>
                  <FormField
                    control={form.control}
                    name="dateRange"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Available Dates</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !field.value && "text-muted-foreground",
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {field.value?.from ? (
                                  field.value.to ? (
                                    <>
                                      {format(field.value.from, "PPP")} -{" "}
                                      {format(field.value.to, "PPP")}
                                    </>
                                  ) : (
                                    format(field.value.from, "PPP")
                                  )
                                ) : (
                                  <span>Select date range</span>
                                )}
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              initialFocus
                              mode="range"
                              defaultMonth={field.value?.from}
                              selected={field.value}
                              onSelect={field.onChange}
                              numberOfMonths={2}
                              disabled={(date) => date < new Date()}
                            />
                          </PopoverContent>
                        </Popover>
                        <FormDescription>
                          Select the date range when your accommodation will be
                          available for booking.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {step === 6 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Photos</h2>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleImageUpload}
                    >
                      Upload Images
                    </Button>
                    <p className="text-sm text-muted-foreground mt-2">
                      Upload high-quality images of your accommodation
                    </p>
                  </div>

                  {images.length > 0 && (
                    <div className="grid grid-cols-3 gap-4 mt-4">
                      {images.map((image, index) => (
                        <div
                          key={index}
                          className="relative aspect-square rounded-md overflow-hidden"
                        >
                          <img
                            src={image}
                            alt={`Accommodation ${index + 1}`}
                            className="object-cover w-full h-full"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute top-2 right-2"
                            onClick={() => {
                              setImages(images.filter((_, i) => i !== index));
                            }}
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div className="flex justify-between mt-8">
                {step > 1 && (
                  <Button type="button" variant="outline" onClick={prevStep}>
                    Previous
                  </Button>
                )}
                {step < 6 ? (
                  <Button type="button" onClick={nextStep}>
                    Next
                  </Button>
                ) : (
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Processing..." : "Submit Listing"}
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccommodationListingForm;
