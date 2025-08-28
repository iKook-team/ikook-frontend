"use client";

import ProfileForm from "@/components/settings/profile-form";
import { useAuthStore } from "@/lib/store/auth-store";
import BackButton from "@/components/common/BackButton";

export default function ProfilePage() {
  const userType = useAuthStore((state) => state.userType);

  // Convert the user type from the store to match our form's expected format
  const formUserType = userType === "chef" ? "chef" : "host";

  return (
    <div className="min-h-screen bg-[#FBFBFB] w-full">
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="w-full max-w-4xl mx-auto">
          <div className="mb-4">
            <BackButton fallback="/settings" />
          </div>
          <ProfileForm userType={formUserType} />
        </div>
      </main>
    </div>
  );
}
