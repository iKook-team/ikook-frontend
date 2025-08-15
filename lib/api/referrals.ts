import apiClient from "@/src/lib/axios";

export interface ReferralUser {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface ReferralItem {
  id: number;
  referee: ReferralUser;
  reward_amount: string;
  created_at: string;
  referral: number;
}

export interface ReferralListResponse {
  status: boolean;
  message: string;
  data: {
    count: number;
    next: number | null;
    previous: number | null;
    current: number;
    total: number;
    results: ReferralItem[];
  };
}

export interface ReferralRewardResponse {
  status: boolean;
  message: string;
  data: {
    referral_code: string;
    total_referrals: number;
    total_bonus: string | null;
  };
}

export const referralsService = {
  async getReferralList(): Promise<ReferralListResponse> {
    const { data } = await apiClient.get<ReferralListResponse>("/referrals/");

    return data;
  },

  async getReferralReward(): Promise<ReferralRewardResponse> {
    const { data } =
      await apiClient.get<ReferralRewardResponse>("/referrals/reward/");

    return data;
  },
};
