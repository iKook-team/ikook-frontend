"use client";

import React, { useEffect, useState } from "react";
import { ChefProfileCard } from "@/components/chef-profile/chef-profile-card";
import { ChefDetails } from "@/components/chef-profile/chef-details";
import { ReviewsSection } from "@/components/booking/reviews-section";
import { listingService } from "@/lib/api/listing";
import apiClient from "@/src/lib/axios";

type ChefProfile = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string | null;
  cover_photo: string | null;
  bio: string | null;
  city: string | null;
  country: string | null;
  is_verified: boolean;
  average_rating: number | null;
  num_reviews: number;
  cuisines: string[] | null;
  created_at: string;
  updated_at: string;
};

export const ChefProfilePageClient: React.FC<{ id: string }> = ({ id }) => {
  const [chef, setChef] = useState<ChefProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reviews, setReviews] = useState<Array<{ name: string; comment: string; date: string; avatar?: string | null }>>([]);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const payload = await listingService.getChefById(id);
        const data = (payload as any)?.data ?? payload;
        if (mounted) setChef(data as ChefProfile);
        // Fetch reviews for this chef id
        try {
          const resp = await apiClient.get("/reviews/", { params: { chef: id } });
          const results = (resp.data?.data?.results ?? resp.data?.results ?? []) as any[];
          const mapped = Array.isArray(results)
            ? results.map((r) => ({
                name: `${r?.reviewer?.first_name ?? ""} ${r?.reviewer?.last_name ?? ""}`.trim() || r?.reviewer?.email || "Anonymous",
                comment: r?.comment ?? "",
                date: r?.created_at ? new Date(r.created_at).toLocaleDateString() : "",
                avatar: r?.reviewer?.avatar ?? null,
              }))
            : [];
          if (mounted) setReviews(mapped);
        } catch (_e) {
          if (mounted) setReviews([]);
        }
      } catch (e) {
        if (mounted) setError("Failed to load chef profile.");
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center py-10 text-gray-500">
        Loading chef profile...
      </div>
    );
  }
  if (error) {
    return (
      <div className="w-full flex justify-center items-center py-10 text-red-500">
        {error}
      </div>
    );
  }
  if (!chef) return null;

  const name = `${chef.first_name ?? ""} ${chef.last_name ?? ""}`.trim() || "Chef";
  const cuisines = Array.isArray(chef.cuisines) ? chef.cuisines : [];
  const bio = (chef.bio && chef.bio.trim().length > 0) ? chef.bio : undefined;

  return (
    <div className="bg-white flex flex-col overflow-hidden items-stretch">
      <main className="self-center w-full max-w-[1117px] mt-[41px] max-md:max-w-full max-md:mt-10">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
          <div className="w-[36%] max-md:w-full max-md:ml-0">
            <ChefProfileCard
              name={name}
              city={chef.city}
              avatar={chef.avatar}
              averageRating={chef.average_rating}
              numReviews={chef.num_reviews}
            />
          </div>
          <div className="w-[64%] ml-5 max-md:w-full max-md:ml-0">
            <ChefDetails bio={bio} cuisines={cuisines} />
            <ReviewsSection />
          </div>
        </div>
      </main>
    </div>
  );
};
