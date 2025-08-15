"use client";

import { useState, useEffect } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { Loader2 } from "lucide-react";

import { Button } from "../ui/button";

import { showToast } from "@/lib/utils/toast";

interface StripePaymentFormProps {
  clientSecret: string;
  setupIntentId: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export const StripePaymentForm: React.FC<StripePaymentFormProps> = ({
  clientSecret,
  setupIntentId,
  onSuccess,
  onCancel,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!stripe || !clientSecret) {
      return;
    }
  }, [stripe, clientSecret]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      // Confirm the setup intent
      const { error: stripeError, setupIntent } = await stripe.confirmSetup({
        elements,
        confirmParams: {
          return_url: window.location.origin + "/payment-cards",
        },
        redirect: "if_required",
      });

      if (stripeError) {
        throw new Error(stripeError.message || "Payment failed");
      }

      if (!setupIntent.payment_method) {
        throw new Error("No payment method available");
      }

      // Get the payment method ID from the setup intent
      const paymentMethodId = setupIntent.payment_method;

      if (!paymentMethodId) {
        throw new Error("No payment method available");
      }

      // For UK/Stripe flow, we don't need to verify with a reference
      // The setup is already complete at this point
      showToast.success("Payment method added successfully");
      onSuccess();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to add payment method";

      setError(errorMessage);
      showToast.error(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="border rounded-lg p-4">
        <PaymentElement
          options={{
            layout: "tabs",
            fields: {
              billingDetails: "auto",
            },
          }}
        />
      </div>

      {error && <div className="text-red-500 text-sm">{error}</div>}

      <div className="flex justify-end space-x-3 mt-6">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isProcessing}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={!stripe || isProcessing}>
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            "Save Card"
          )}
        </Button>
      </div>
    </form>
  );
};
