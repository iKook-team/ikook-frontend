import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getBookingIntent, clearBookingIntent } from './booking-intent';
import { useAuthStore } from '@/lib/store/auth-store';

export function useBookingResume() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) return;

    const intent = getBookingIntent();
    if (!intent) return;

    // User is now authenticated and has a pending booking intent
    console.log('Resuming booking intent:', intent);

    // Clear the intent first to prevent loops
    clearBookingIntent();

    // Navigate back to the booking flow
    const resumeUrl = intent.returnUrl || '/explore';
    
    // Add a query param to indicate we're resuming
    const url = new URL(resumeUrl, window.location.origin);
    url.searchParams.set('resume', 'true');
    
    // Small delay to ensure auth state is fully settled
    setTimeout(() => {
      router.push(url.pathname + url.search);
    }, 100);

  }, [isAuthenticated, router]);
}

// Hook to check if we're resuming from login
export function useBookingResumeCheck() {
  const router = useRouter();
  
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const isResuming = urlParams.get('resume') === 'true';
    
    if (isResuming) {
      // Clean up the resume param from URL
      urlParams.delete('resume');
      const cleanUrl = window.location.pathname + 
        (urlParams.toString() ? '?' + urlParams.toString() : '');
      
      // Replace current URL without the resume param
      window.history.replaceState({}, '', cleanUrl);
      
      // Show a toast or notification that booking was resumed
      // This could be handled by the parent component
    }
  }, []);
}
