import React, { useState } from 'react';

import { ProgressIndicator } from './progress-indicator';
import { ChefCard } from "@/components/cart/chef-card";
import { BudgetSection } from './budget-section';
import { BudgetForm } from './budget-form';
import { ActionButtons } from './action-buttons';

interface BudgetStepProps {
  onBack: () => void;
  onNext: (data: { budget: number; budgetType: 'flexible' | 'fixed' | null }) => void;
  menu: any;
  guestCount: number;
}

const BudgetStep: React.FC<BudgetStepProps> = ({ onBack, onNext, menu, guestCount }) => {
  const [budget, setBudget] = useState(1500);
  const [budgetType, setBudgetType] = useState<'flexible' | 'fixed' | null>(null);

  const progressSteps = [
    { label: 'Event Details', completed: true },
    { label: 'Budget', completed: false, inProgress: true },
    { label: 'Message', completed: false }
  ];

  const budgetInfo = {
    chefName: 'Chef Titilayo',
    minBudgetPerPerson: 20,
    guestCount: 20,
    totalPrice: 1700
  };

  const handleBudgetChange = (newBudget: number) => {
    setBudget(newBudget);
  };

  const handleBudgetTypeChange = (type: 'flexible' | 'fixed') => {
    setBudgetType(type);
  };

  const isContinueDisabled = !budgetType;

  return (
      <main className="w-[655px] h-[852px] absolute left-[393px] top-[177px]">
        <div className="w-[654px] h-[814px] border shadow-[0px_4px_30px_0px_rgba(0,0,0,0.03)] absolute bg-white rounded-[15px] border-solid border-[#E7E7E7] left-px top-[38px]" />

        <header className="absolute left-0 top-0">
          <h1 className="text-black text-xl font-medium leading-[30px] w-[126px] h-[30px]">
            Chef Titilayo
          </h1>
        </header>

        <div className="absolute left-5 top-[69px]">
          <ProgressIndicator steps={progressSteps} />
        </div>

        <div className="absolute left-5 right-5 top-[132px] w-auto">
        <ChefCard
          chefName={menu?.chef?.first_name && menu?.chef?.last_name ? `${menu.chef.first_name} ${menu.chef.last_name}` : "Chef"}
          dishName={menu?.name || "Menu"}
          imageUrl={menu?.images && menu.images.length > 0 && menu.images[0].image ? menu.images[0].image : "/menus/menu1.png"}
          location={menu?.chef?.city || "Unknown"}
          locationIconUrl="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/6a979250a7b2e8fadafb588f6b48331c3ddaeb05?placeholderIfAbsent=true"
          rating={menu?.chef?.average_rating ? menu.chef.average_rating.toFixed(1) : "-"}
          ratingIconUrl="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/95ff912f680fb9cb0b65a4e92d4e4a21883cc4f2?placeholderIfAbsent=true"
          reviewCount={menu?.chef?.num_reviews ? `(${menu.chef.num_reviews} Reviews)` : "(0 Reviews)"}
        />
      </div>

        <div className="absolute left-5 top-[291px]">
          <svg width="613" height="1" viewBox="0 0 613 1" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M-0.00390625 0.5L613.003 0.5" stroke="#E7E7E7"></path>
          </svg>
        </div>

        <section className="absolute left-5 top-[307px]">
          <h2 className="text-black text-2xl font-medium leading-8 w-[87px] h-8 mb-[47px]">
            Budget
          </h2>

          <div className="mb-[23px]">
            <BudgetSection
              chefName={menu?.chef?.first_name && menu?.chef?.last_name ? `${menu.chef.first_name} ${menu.chef.last_name}` : "Chef"}
              minBudgetPerPerson={menu?.price_per_person || 0}
              guestCount={guestCount}
              totalPrice={menu?.price_per_person && guestCount ? (menu.price_per_person * guestCount) : 0}
              menu={menu}
            />
          </div>

          <div className="mb-[34px]">
            <BudgetForm
              defaultBudget={budget}
              onBudgetChange={handleBudgetChange}
              onBudgetTypeChange={handleBudgetTypeChange}
            />
          </div>
        </section>

        <div className="absolute left-5 top-[720px]">
          <svg width="613" height="2" viewBox="0 0 613 2" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 1L613.007 1" stroke="#E7E7E7"></path>
          </svg>
        </div>

        <div className="absolute left-[357px] top-[772px]">
          <ActionButtons
            onBack={onBack}
            onContinue={() => onNext({ budget, budgetType })}
            continueDisabled={isContinueDisabled}
          />
        </div>
      </main>
  );
};

export default BudgetStep;