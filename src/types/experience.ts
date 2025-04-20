export interface Experience {
  id: string;
  title: string;
  description: string;
  type: string; // e.g., 'tour', 'activity', 'workshop', 'adventure'
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
  duration: {
    length: number;
    unit: "minutes" | "hours" | "days";
  };
  groupSize: {
    min: number;
    max: number;
  };
  included: string[];
  excluded: string[];
  requirements: string[];
  images: string[];
  guideId: string;
  rating?: number;
  reviewCount?: number;
  availability?: {
    schedule: {
      dayOfWeek: number; // 0-6, where 0 is Sunday
      startTime: string; // e.g., '09:00'
      endTime: string; // e.g., '12:00'
    }[];
    customDates?: {
      date: string; // ISO date string
      startTime: string;
      endTime: string;
    }[];
    unavailableDates?: string[]; // ISO date strings
  };
  languages: string[];
  status: "draft" | "published" | "archived";
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface ExperienceFormData {
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
  duration: {
    length: number;
    unit: "minutes" | "hours" | "days";
  };
  groupSize: {
    min: number;
    max: number;
  };
  included: string[];
  excluded: string[];
  requirements: string[];
  images: string[];
  languages: string[];
  availability?: {
    schedule: {
      dayOfWeek: number;
      startTime: string;
      endTime: string;
    }[];
    customDates?: {
      date: string;
      startTime: string;
      endTime: string;
    }[];
  };
}
