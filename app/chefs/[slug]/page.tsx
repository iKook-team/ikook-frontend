import React from "react";

import { ChefProfilePageClient } from "@/components/chef-profile/chef-profile-page-client";

interface PageParams {
  slug: string;
}

export default async function Page({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { slug } = await params;

  return <ChefProfilePageClient id={slug} />;
}
