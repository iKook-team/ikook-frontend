import { ChefProfilePageClient } from "@/components/chef-profile/chef-profile-page-client";

import React from "react";

interface PageProps {
  params: { id: string };
}

export default function Page({ params }: PageProps) {
  return (
    <ChefProfilePageClient id={params.id} />
  );
}
