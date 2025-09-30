import React, { useEffect, useState } from "react";

import { ProgressIndicator } from "./progress-indicator";
import { BudgetSection } from "./budget-section";
import { BudgetForm } from "./budget-form";
import { ActionButtons } from "./action-buttons";

import { ChefCard } from "@/components/cart/chef-card";
import { getCurrencySymbol } from "@/lib/utils/currency";
import { useAuthStore } from "@/lib/store/auth-store";

interface BudgetStepProps {
  onBack: () => void;
  onNext: (data: {
    budget: number;
    budgetType: "flexible" | "fixed" | null;
  }) => void;
  menu: any;
  guestCount: number;
  isCustomBooking?: boolean;
  initialBudget?: number;
  initialBudgetType?: "flexible" | "fixed" | "Flexible" | "Fixed" | null;
}

const BudgetStep: React.FC<BudgetStepProps> = ({
  onBack,
  onNext,
  menu,
  guestCount,
  isCustomBooking = false,
  initialBudget = 0,
  initialBudgetType = null,
}) => {
  const [budget, setBudget] = useState(initialBudget ?? 0);
  const [budgetType, setBudgetType] = useState<"flexible" | "fixed" | null>(
    initialBudgetType
      ? (String(initialBudgetType).toLowerCase() as "flexible" | "fixed")
      : null,
  );

  // Keep local state in sync with parent-provided initial values
  useEffect(() => {
    setBudget(initialBudget ?? 0);
  }, [initialBudget]);

  useEffect(() => {
    if (initialBudgetType) {
      setBudgetType(
        String(initialBudgetType).toLowerCase() as "flexible" | "fixed",
      );
    } else {
      setBudgetType(null);
    }
  }, [initialBudgetType]);

  const progressSteps = [
    { label: "Event Details", completed: true },
    { label: "Budget", completed: false, inProgress: true },
    { label: "Message", completed: false },
  ];

  const handleBudgetChange = (newBudget: number) => {
    setBudget(newBudget);
  };

  const handleBudgetTypeChange = (
    type: "flexible" | "fixed" | "Flexible" | "Fixed",
  ) => {
    // Convert to lowercase for internal state consistency
    const lowerType = type.toLowerCase() as "flexible" | "fixed";

    setBudgetType(lowerType);
  };

  const isContinueDisabled = !budgetType;
  const user = useAuthStore((s) => s.user);

  const currencySymbol = getCurrencySymbol({
    currency:
      user?.currency ||
      menu?.chef?.chef_details?.currency ||
      menu?.chef?.currency,
    country:
      user?.country ||
      menu?.chef?.chef_details?.country ||
      menu?.chef?.country ||
      "United Kingdom",
  });

  return (
    <div className="flex justify-center items-start p-6">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Header Section */}
        <div className="px-6 pt-6 pb-4 border-b border-gray-100">
          {!isCustomBooking && (
            <header className="mb-6">
              <h1 className="text-2xl font-semibold text-gray-900 truncate">
                {menu?.chef?.first_name && menu?.chef?.last_name
                  ? `${menu.chef.first_name} ${menu.chef.last_name}`
                  : "Chef"}
              </h1>
            </header>
          )}
          <div className="mb-6">
            <ProgressIndicator steps={progressSteps} />
          </div>
        </div>

        {/* Chef Card Section */}
        {!isCustomBooking && (
          <div className="px-6 py-4 border-b border-gray-100">
            <ChefCard
              chefName={
                menu?.chef?.first_name && menu?.chef?.last_name
                  ? `${menu.chef.first_name} ${menu.chef.last_name}`
                  : "Chef"
              }
              dishName={menu?.name || "Menu"}
              imageUrl={
                menu?.images && menu.images.length > 0 && menu.images[0].image
                  ? menu.images[0].image
                  : "/menus/menu1.png"
              }
              location={menu?.chef?.city || "Unknown"}
              locationIconUrl="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/6a979250a7b2e8fadafb588f6b48331c3ddaeb05?placeholderIfAbsent=true"
              rating={
                menu?.chef?.average_rating
                  ? menu.chef.average_rating.toFixed(1)
                  : "-"
              }
              ratingIconUrl="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/95ff912f680fb9cb0b65a4e92d4e4a21883cc4f2?placeholderIfAbsent=true"
              reviewCount={
                menu?.chef?.num_reviews
                  ? `(${menu.chef.num_reviews} Reviews)`
                  : "(0 Reviews)"
              }
            />
          </div>
        )}

        {/* Content Section */}
        <section className="p-6 space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900">Budget</h2>

          {!isCustomBooking && (
            <div>
              <BudgetSection
                chefName={
                  menu?.chef?.first_name && menu?.chef?.last_name
                    ? `${menu.chef.first_name} ${menu.chef.last_name}`
                    : menu?.chef?.name || "Chef"
                }
                minBudgetPerPerson={
                  menu?.chef?.chef_details?.min_budget_per_person || 0
                }
                guestCount={guestCount}
                totalPrice={
                  (menu?.chef?.chef_details?.min_budget_per_person || 0) *
                  (guestCount || 0)
                }
                menu={menu}
              />
            </div>
          )}

          <div>
            <BudgetForm
              defaultBudget={budget}
              onBudgetChange={handleBudgetChange}
              onBudgetTypeChange={handleBudgetTypeChange}
              currencySymbol={currencySymbol}
              defaultBudgetType={budgetType}
            />
          </div>

          <div className="pt-4 border-t border-gray-200">
            <ActionButtons
              onBack={onBack}
              onContinue={() => onNext({ budget, budgetType })}
              continueDisabled={isContinueDisabled}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default BudgetStep;
