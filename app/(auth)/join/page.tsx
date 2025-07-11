"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, Loader2 } from "lucide-react";

import { useGeolocation } from "@/hooks/useGeolocation";
import { Button } from "@/components/ui/button";
import { JoinForm } from "@/components/auth/join-form";

const Index: React.FC = () => {
  const router = useRouter();
  const { error, isLoading } = useGeolocation();
  const [showError, setShowError] = useState(false);

  // Check if we have location or an error after loading
  useEffect(() => {
    if (!isLoading) {
      if (error) {
        setShowError(true);
      }
    }
  }, [isLoading, error]);

  const handleRetry = () => {
    setShowError(false);
    window.location.reload(); // Force a reload to retry geolocation
  };

  // If we're still loading, show a loading state
  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-[#FBFBFB]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-[#FCC01C]" />
          <p className="text-gray-700 text-lg font-medium">
            Getting your location...
          </p>
          <p className="text-gray-500 text-sm max-w-md text-center">
            We need your location to provide the best experience. Please enable
            location services in your browser settings.
          </p>
        </div>
      </div>
    );
  }

  // If there was an error getting location
  if (showError) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-[#FBFBFB] p-4">
        <div className="max-w-md w-full space-y-6">
          <div className="text-center space-y-2">
            <AlertCircle className="h-12 w-12 mx-auto text-red-500" />
            <h2 className="text-2xl font-bold text-gray-900">
              Location Required
            </h2>
            <p className="text-gray-600">
              {error || "We could not determine your location."}
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Location access is required to continue with signup.
            </p>
          </div>
          
          <div className="space-y-3">
            <Button
              className="w-full bg-[#FCC01C] hover:bg-[#E6AC19] text-white"
              onClick={handleRetry}
            >
              Try Again
            </Button>
            <Button
              className="w-full"
              onClick={() => router.push("/")}
              variant="outline"
            >
              Back to Home
            </Button>
          </div>
          <div className="text-xs text-gray-400 text-center mt-6">
            <p>Make sure to allow location access in your browser settings.</p>
            <p>If the issue persists, try refreshing the page or using a different browser.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen relative bg-[#FBFBFB] max-md:w-full max-md:max-w-screen-lg max-md:h-auto max-md:min-h-screen">
      <main className="relative">
        <JoinForm />
      </main>
    </div>
  );
};

export default Index;
