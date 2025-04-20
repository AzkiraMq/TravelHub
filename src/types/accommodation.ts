export interface Accommodation {
  id: string;
  title: string;
  description: string;
  type: string; // e.g., 'villa', 'apartment', 'hotel', 'homestay'
  location: {
    address: string;
    city: string;
    state?: string;
    country: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  price: number;
  currency: string;
  features: string[];
  amenities: string[];
  maxGuests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  images: string[];
  hostId: string;
  rating?: number;
  reviewCount?: number;
  availability?: {
    startDate: string; // ISO date string
    endDate: string; // ISO date string
    unavailableDates?: string[]; // ISO date strings
  };
  policies?: {
    checkInTime: string; // e.g., '14:00'
    checkOutTime: string; // e.g., '11:00'
    cancellationPolicy: string;
    houseRules: string[];
  };
  status: "draft" | "published" | "archived";
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface AccommodationFormData {
  title: string;
  description: string;
  type: string;
  location: {
    address: string;
    city: string;
    state?: string;
    country: string;
  };
  price: number;
  currency: string;
  features: string[];
  amenities: string[];
  maxGuests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  images: string[];
  availability?: {
    startDate: string;
    endDate: string;
    unavailableDates?: string[];
  };
  policies?: {
    checkInTime: string;
    checkOutTime: string;
    cancellationPolicy: string;
    houseRules: string[];
  };
}

export interface BookingData {
  id: string;
  accommodationId: string;
  userId: string;
  checkInDate: string; // ISO date string
  checkOutDate: string; // ISO date string
  guestCount: number;
  totalPrice: number;
  currency: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  paymentStatus: "pending" | "paid" | "refunded";
  specialRequests?: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}
