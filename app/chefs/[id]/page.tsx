import React from "react";

import { ChefProfilePageClient } from "@/components/chef-profile/chef-profile-page-client";

interface PageParams {
  id: string;
}

export default async function Page({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { id } = await params;

  return <ChefProfilePageClient id={id} />;
}
