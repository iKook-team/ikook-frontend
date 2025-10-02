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
    const isSecure = typeof window !== "undefined" && window.isSecureContext;
    if (!isSecure) {
      setCoordinates({
        latitude: null,
        longitude: null,
        error:
          "Location requires HTTPS or localhost. Please use a secure connection.",
        isLoading: false,
      });

      return;
    }

    // Check if geolocation is supported by the browser
    if (!navigator.geolocation) {
      setCoordinates((prev) => ({
        ...prev,
        error: "Geolocation is not supported by your browser",
        isLoading: false,
      }));

      return;
    }

    const readCached = () => {
      try {
        const raw = localStorage.getItem("userLocation");
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        if (
          parsed &&
          typeof parsed.latitude === "number" &&
          typeof parsed.longitude === "number"
        ) {
          return parsed as { latitude: number; longitude: number };
        }
      } catch {}
      return null;
    };

    const persist = (lat: number, lng: number) => {
      try {
        localStorage.setItem(
          "userLocation",
          JSON.stringify({ latitude: lat, longitude: lng }),
        );
      } catch {}
    };

    const attemptGetPosition = (
      options: PositionOptions,
    ): Promise<GeolocationPosition> =>
      new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
      });

    const mapError = (err: GeolocationPositionError): string => {
      switch (err.code) {
        case err.PERMISSION_DENIED:
          return "Location permission denied. Check browser site settings.";
        case err.POSITION_UNAVAILABLE:
          return "Location unavailable. Turn on device location services and try again.";
        case err.TIMEOUT:
          return "Location request timed out. Try moving to an open area or enabling high accuracy.";
        default:
          return "Unable to retrieve your location.";
      }
    };

    const checkPermission = async (): Promise<PermissionState | null> => {
      try {
        const perm: any = await (navigator as any).permissions?.query({
          name: "geolocation",
        });
        return perm?.state ?? null;
      } catch {
        return null;
      }
    };

    const run = async () => {
      // If explicit denied, surface guidance early
      const state = await checkPermission();
      if (state === "denied") {
        setCoordinates({
          latitude: null,
          longitude: null,
          error:
            "Location is blocked. In your browser settings, allow Location for this site and retry.",
          isLoading: false,
        });

        return;
      }

      // 1) First attempt: allow cached positions, lower accuracy, longer timeout
      try {
        const pos = await attemptGetPosition({
          enableHighAccuracy: false,
          timeout: 20000,
          maximumAge: 300000, // up to 5 minutes old
        });
        const { latitude, longitude } = pos.coords;
        persist(latitude, longitude);
        setCoordinates({ latitude, longitude, error: null, isLoading: false });

        return;
      } catch (e: any) {
        // continue to fallback
      }

      // 2) Retry: require fresh/high accuracy with longer timeout
      try {
        const pos = await attemptGetPosition({
          enableHighAccuracy: true,
          timeout: 30000,
          maximumAge: 0,
        });
        const { latitude, longitude } = pos.coords;
        persist(latitude, longitude);
        setCoordinates({ latitude, longitude, error: null, isLoading: false });

        return;
      } catch (err: any) {
        // 3) Fallback to cached location if available
        const cached = readCached();
        if (cached) {
          setCoordinates({
            latitude: cached.latitude,
            longitude: cached.longitude,
            error:
              "Using last known location. Enable high accuracy for better results.",
            isLoading: false,
          });

          return;
        }

        setCoordinates({
          latitude: null,
          longitude: null,
          error: mapError(err),
          isLoading: false,
        });
      }
    };

    run();
    // Cleanup function
    return () => {
      // no-op
    };
  }, []);

  return coordinates;
}
