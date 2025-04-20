import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BookingData } from "@/types/accommodation";

const BookingConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state?.bookingData as BookingData;

  if (!bookingData) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-red-500">Booking Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p>No booking information found. Please try again.</p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => navigate("/")}>Return to Home</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(amount);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card className="border-green-200 shadow-lg">
        <CardHeader className="bg-green-50">
          <CardTitle className="text-center text-2xl text-green-700">
            Booking Confirmed!
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Booking Details</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="font-medium">Booking ID:</div>
              <div>{bookingData.id}</div>
              <div className="font-medium">Check-in Date:</div>
              <div>{formatDate(bookingData.checkInDate)}</div>
              <div className="font-medium">Check-out Date:</div>
              <div>{formatDate(bookingData.checkOutDate)}</div>
              <div className="font-medium">Number of Guests:</div>
              <div>{bookingData.guestCount}</div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Payment Information</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="font-medium">Total Amount:</div>
              <div className="font-semibold">
                {formatCurrency(bookingData.totalPrice, bookingData.currency)}
              </div>
              <div className="font-medium">Payment Status:</div>
              <div className="capitalize">{bookingData.paymentStatus}</div>
            </div>
          </div>

          {bookingData.specialRequests && (
            <>
              <Separator />
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Special Requests</h3>
                <p className="text-sm">{bookingData.specialRequests}</p>
              </div>
            </>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center bg-gray-50 py-6">
          <Button
            variant="outline"
            onClick={() => window.print()}
            className="w-full sm:w-auto"
          >
            Print Confirmation
          </Button>
          <Button onClick={() => navigate("/")} className="w-full sm:w-auto">
            Return to Home
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default BookingConfirmation;
