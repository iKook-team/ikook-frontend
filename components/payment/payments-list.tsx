"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { showToast } from "@/lib/utils/toast";

import { PaymentCard } from "./payment-card";
import { StripePaymentForm } from "./stripe-payment-form";
import Skeleton from "../ui/skeleton";
import { useAuthStore } from "@/lib/store/auth-store";
import {
  paymentCardsService,
  PaymentCard as APIPaymentCard,
} from "@/lib/api/payment-cards";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

const CARD_ICONS: Record<string, string> = {
  VISA: "https://api.builder.io/api/v1/image/assets/TEMP/0ec22a48944ef07eb754a2ae5fba8767bf7767a9?placeholderIfAbsent=true",
  Mastercard: "https://api.builder.io/api/v1/image/assets/TEMP/8e5c30b354596f0df1258f9a98b0228783ec3c1c?placeholderIfAbsent=true",
  Verve: "https://api.builder.io/api/v1/image/assets/TEMP/0bbcb836776468a8466ea81de21f70d7c581de4c?placeholderIfAbsent=true",
};

const DEFAULT_ICON = "https://api.builder.io/api/v1/image/assets/TEMP/8a6ed808e811837a68be25e7e097e2916e02a0e0?placeholderIfAbsent=true";

export const PaymentsList: React.FC = () => {
  const router = useRouter();
  const [cards, setCards] = useState<APIPaymentCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [showStripeForm, setShowStripeForm] = useState(false);
  const [stripeClientSecret, setStripeClientSecret] = useState('');
  const [setupIntentId, setSetupIntentId] = useState('');
  const [deletingCardId, setDeletingCardId] = useState<number | null>(null);

  const user = useAuthStore(state => state.user);
  
  const getUserCountry = (): string => {
    return user?.country || 'Nigeria';
  };

  const handleDeleteCard = async (cardId: number) => {
    try {
      setDeletingCardId(cardId);
      await paymentCardsService.deleteCard(cardId);
      showToast.success('Payment card deleted successfully');
      // Refresh the cards list
      const response = await paymentCardsService.getCards();
      setCards(response.data.results || []);
    } catch (error) {
      showToast.error('Failed to delete payment card. Please try again.');
    } finally {
      setDeletingCardId(null);
    }
  };

  // Load cards and check for pending payment verification
  useEffect(() => {
    const verifyPendingPayment = async () => {
      const pendingReference = sessionStorage.getItem('pendingPaymentReference');
      if (!pendingReference) return;
    
      try {
        if (!pendingReference) {
          throw new Error('No pending reference found');
        }
        setIsVerifying(true);
        await paymentCardsService.verifyCard(pendingReference);
        showToast.success('Payment card added successfully');
        // Refresh the cards list
        const response = await paymentCardsService.getCards();
        setCards(response.data.results || []);
      } catch (error) {
        showToast.error('Failed to verify payment. Please try again.');
      } finally {
        sessionStorage.removeItem('pendingPaymentReference');
        setIsVerifying(false);
      }
    };

    const loadCards = async () => {
      try {
        const response = await paymentCardsService.getCards();
        setCards(response.data.results || []);
      } catch (err) {
        showToast.error('Failed to load payment cards.');
      } finally {
        setLoading(false);
      }
    };

    // First load cards, then check for pending verification
    const init = async () => {
      await loadCards();
      await verifyPendingPayment();
    };
    
    init();
  }, []);

  const handleEditCard = (cardId: number) => {
    showToast.error('Editing card is not implemented yet.');
  };

  const handleAddNewCard = async () => {
    if (isAddingCard) return;
    setIsAddingCard(true);
    
    try {
      const country = getUserCountry();
      
      const response = await paymentCardsService.initializeCardSetup(country);
      
      // Handle different response structures and ensure proper types
      const checkoutUrl = ('checkout_url' in response 
        ? response.checkout_url 
        : response.data?.checkout_url) as string | undefined;
        
      // Ensure reference is a string before storing
      const reference = ('reference' in response 
        ? response.reference 
        : response.data?.reference) as string | undefined;
      
      // Store the reference in session storage if it's a non-empty string
      if (typeof reference === 'string' && reference.trim() !== '') {
        sessionStorage.setItem('pendingPaymentReference', reference);
      }

      // Handle Nigeria/South Africa flow
      if (country !== 'United Kingdom') {
        if (!checkoutUrl) {
          throw new Error('No checkout URL received from the server');
        }
        
        // Ensure we have a valid URL
        try {
          const url = new URL(checkoutUrl);
          window.location.replace(url.toString());
          
          // Fallback in case the redirect is blocked
          setTimeout(() => {
            console.log('Fallback redirect triggered');
            window.location.href = url.toString();
          }, 100);
          
          return;
        } catch (urlError) {
          console.error('Invalid checkout URL:', checkoutUrl, urlError);
          throw new Error('Invalid checkout URL received from the server');
        }
      }
      
      // Handle UK flow (Stripe Elements)
      if (country === 'United Kingdom') {
        const clientSecret = ('client_secret' in response 
          ? response.client_secret 
          : response.data?.client_secret) as string | undefined;
          
        const setupIntentId = ('setup_intent_id' in response
          ? response.setup_intent_id
          : response.data?.setup_intent_id) as string | undefined;
        
        if (clientSecret && setupIntentId) {
          if (typeof clientSecret === 'string') {
            setStripeClientSecret(clientSecret);
          } else {
            throw new Error('Invalid client secret received from the server');
          }
          
          if (typeof setupIntentId === 'string') {
            setSetupIntentId(setupIntentId);
          } else {
            throw new Error('Invalid setup intent ID received from the server');
          }
          
          setShowStripeForm(true);
          return;
        } else {
          throw new Error('Missing required payment data from the server');
        }
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      showToast.error(`Failed to add payment card: ${errorMessage}`);
    } finally {
      setIsAddingCard(false);
    }
  };

  if (loading || isVerifying) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500 mb-4"></div>
        <p className="text-gray-600">
          {isVerifying ? 'Verifying payment...' : 'Loading payment methods...'}
        </p>
      </div>
    );
  }

  return (
    <main className="self-center flex w-[662px] max-w-full flex-col mt-[35px]">
      <section>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-black text-2xl font-semibold leading-none">
            Payments
          </h1>
          {showStripeForm && (
            <button
              onClick={() => {
                setShowStripeForm(false);
                setIsAddingCard(false);
              }}
              className="text-sm text-gray-600 hover:text-gray-800"
            >
              Back to cards
            </button>
          )}
        </div>
        <div className="self-stretch mt-6 max-md:max-w-full">
          {!loading && cards.length === 0 && (
            <div className="text-gray-500">No payment cards found.</div>
          )}
          {showStripeForm ? (
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-lg font-medium mb-4">Add a new card</h2>
              <Elements 
                stripe={stripePromise} 
                options={{
                  clientSecret: stripeClientSecret,
                  appearance: {
                    theme: 'stripe',
                    variables: {
                      colorPrimary: '#FCC01C',
                      colorBackground: '#ffffff',
                      colorText: '#1a1a1a',
                    },
                  },
                }}
              >
                <StripePaymentForm
                  clientSecret={stripeClientSecret}
                  setupIntentId={setupIntentId}
                  onSuccess={async () => {
                    const response = await paymentCardsService.getCards();
                    setCards(response.data.results || []);
                    setShowStripeForm(false);
                    setIsAddingCard(false);
                  }}
                  onCancel={() => {
                    setShowStripeForm(false);
                    setIsAddingCard(false);
                  }}
                />
              </Elements>
            </div>
          ) : (
            !loading && cards.length > 0 && cards.map((card) => (
              <PaymentCard
                key={card.id}
                cardType={(card.card_type || '').trim() || 'Card'}
                cardNumber={`**** **** **** ${card.last4 || '****'}`}
                iconSrc={CARD_ICONS[(card.card_type || '').trim()] || DEFAULT_ICON}
                onEdit={() => handleEditCard(card.id)}
                onDelete={() => handleDeleteCard(card.id)}
                isDeleting={deletingCardId === card.id}
              />
            ))
          )}
        </div>
        <div className="mt-16 max-md:mt-10">
          <button
            onClick={handleAddNewCard}
            disabled={isAddingCard}
            className="justify-center items-center border shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] flex gap-2 overflow-hidden text-base text-white font-semibold bg-[#FCC01C] px-20 py-3 rounded-lg border-solid border-[#FCC01C] max-md:px-5 disabled:opacity-70 disabled:cursor-not-allowed w-full sm:w-auto"
          >
            {isAddingCard ? (
              <>
                <Skeleton className="w-5 h-5 rounded-full" />
                <span>Processing...</span>
              </>
            ) : (
              <span className="self-stretch my-auto">Add new card</span>
            )}
          </button>
        </div>
      </section>
    </main>
  );
};