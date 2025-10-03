"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AlertCircle, Loader2 } from "lucide-react";

import { useGeolocation } from "@/hooks/useGeolocation";
import { Button } from "@/components/ui/button";
import { JoinForm } from "@/components/auth/join-form";

const Index: React.FC = () => {
  const router = useRouter();
  const { error, isLoading, retry } = useGeolocation();
  const [showError, setShowError] = useState(false);
  const searchParams = useSearchParams();

  const initialRole = useMemo(() => {
    const role = (searchParams?.get("role") || "").toLowerCase();

    if (role === "chef") return "chef" as const;
    if (role === "host") return "host" as const;

    return null;
  }, [searchParams]);

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
    retry(); // Use the retry function from the hook
  };

  // If we're still loading, show a loading state
  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-[#FBFBFB] px-2 sm:px-4">
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
    const errorLower = error?.toLowerCase() || "";
    const isPermissionDenied = errorLower.includes("permission denied") || 
                                errorLower.includes("blocked") ||
                                errorLower.includes("denied");
    
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-[#FBFBFB] p-4 px-2 sm:px-4">
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
          
          {isPermissionDenied && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-gray-700">
              <p className="font-semibold mb-2">How to enable location:</p>
              <ol className="list-decimal list-inside space-y-1 text-xs">
                <li>Click the lock icon (🔒) or info icon (ⓘ) in your browser&apos;s address bar</li>
                <li>Find &quot;Location&quot; permissions and set it to &quot;Allow&quot;</li>
                <li>Click &quot;Try Again&quot; above</li>
              </ol>
            </div>
          )}
          
          <div className="text-xs text-gray-400 text-center mt-6">
            <p>Make sure location services are enabled on your device.</p>
            <p>
              If the issue persists, try using a different browser or contact support.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen relative bg-[#FBFBFB] px-2 sm:px-4 md:px-6 lg:px-8">
      <main className="relative">
        <JoinForm initialSelectedUserType={initialRole} />
      </main>
    </div>
  );
};

export default Index;
