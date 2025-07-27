import { useState, useEffect } from "react";

interface GeolocationCoordinates {
  latitude: number | null;
  longitude: number | null;
  error: string | null;
  isLoading: boolean;
}

export const useGeolocation = (): GeolocationCoordinates => {
  const [coordinates, setCoordinates] = useState<GeolocationCoordinates>({
    latitude: null,
    longitude: null,
    error: null,
    isLoading: true,
  });

  useEffect(() => {
    // Check if geolocation is supported by the browser
    if (!navigator.geolocation) {
      setCoordinates((prev) => ({
        ...prev,
        error: "Geolocation is not supported by your browser",
        isLoading: false,
      }));

      return;
    }

    // Success callback
    const handleSuccess = (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;

      setCoordinates({
        latitude,
        longitude,
        error: null,
        isLoading: false,
      });

      // Store in localStorage
      localStorage.setItem(
        "userLocation",
        JSON.stringify({ latitude, longitude }),
      );
    };

    // Error callback
    const handleError = (error: GeolocationPositionError) => {
      let errorMessage = "Unable to retrieve your location";

      switch (error.code) {
        case error.PERMISSION_DENIED:
          errorMessage = "Please enable location services to use this feature";
          break;
        case error.POSITION_UNAVAILABLE:
          errorMessage = "Location information is unavailable";
          break;
        case error.TIMEOUT:
          errorMessage = "The request to get user location timed out";
          break;
      }

      setCoordinates((prev) => ({
        ...prev,
        error: errorMessage,
        isLoading: false,
      }));
    };

    // Request location
    navigator.geolocation.getCurrentPosition(handleSuccess, handleError, {
      enableHighAccuracy: true,
      timeout: 10000, // 10 seconds
      maximumAge: 0, // Force fresh location
    });

    // Cleanup function
    return () => {
      // Any cleanup if needed
    };
  }, []);

  return coordinates;
};
