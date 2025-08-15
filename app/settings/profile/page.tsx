"use client";

import ProfileForm from "@/components/settings/profile-form";
import { useAuthStore } from "@/lib/store/auth-store";

export default function ProfilePage() {
  const userType = useAuthStore((state) => state.userType);

  // Convert the user type from the store to match our form's expected format
  const formUserType = userType === "chef" ? "chef" : "host";

  return <ProfileForm userType={formUserType} />;
}
