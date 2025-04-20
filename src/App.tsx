import { Suspense, lazy } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Home from "./components/home";
import routes from "tempo-routes";

// Lazy load components for better performance
const LoginForm = lazy(() => import("./components/auth/LoginForm"));
const RegisterForm = lazy(() => import("./components/auth/RegisterForm"));
const GuideRegistration = lazy(() => import("./components/GuideRegistration"));
const ListingDetail = lazy(() => import("./components/ListingDetail"));
const SearchResults = lazy(() => import("./components/SearchResults"));
const BookingConfirmation = lazy(
  () => import("./components/accommodations/BookingConfirmation"),
);
const ExperienceListingForm = lazy(
  () => import("./components/experiences/ExperienceListingForm"),
);

function App() {
  return (
    <AuthProvider>
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen">
            <p className="text-lg">Loading...</p>
          </div>
        }
      >
        <>
          {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/guide-registration" element={<GuideRegistration />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/listing/:id" element={<ListingDetail />} />
            <Route
              path="/booking-confirmation"
              element={<BookingConfirmation />}
            />
            <Route
              path="/create-experience"
              element={<ExperienceListingForm />}
            />
            {/* Add more routes as needed */}
          </Routes>
        </>
      </Suspense>
    </AuthProvider>
  );
}

export default App;
