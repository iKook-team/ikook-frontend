"use client";

import React, { useState, useEffect } from "react";
import { FormField } from "@/components/ui/form-field";
import { paymentsService } from "@/lib/api/payments";
import { showToast } from "@/lib/utils/toast";
import { useAuthStore } from "@/lib/store/auth-store";
import { useMarket } from "@/lib/market-context";
import BackButton from "@/components/common/BackButton";

interface Bank {
  id: number;
  name: string;
  slug: string;
  code: string;
  longcode: string;
  gateway: string | null;
  pay_with_bank: boolean;
  supports_transfer: boolean;
  active: boolean;
  country: string;
  currency: string;
  type: string;
  is_deleted: boolean;
  created_at: string;
  updated_at: string | null;
}

interface BankDetails {
  id?: number;
  bank_name: string;
  account_name: string;
  account_number: string;
  sort_code: string;
  billing_address: string;
  city: string;
  postal_code: string;
}

// Static UK bank list to avoid 500s (backend not implemented for UK)
const UK_BANKS: Bank[] = [
  { id: 1, name: "Barclays", slug: "barclays", code: "BARCGB22", longcode: "", gateway: null, pay_with_bank: false, supports_transfer: true, active: true, country: "United Kingdom", currency: "GBP", type: "uk", is_deleted: false, created_at: "", updated_at: null },
  { id: 2, name: "HSBC UK", slug: "hsbc-uk", code: "HBUKGB4B", longcode: "", gateway: null, pay_with_bank: false, supports_transfer: true, active: true, country: "United Kingdom", currency: "GBP", type: "uk", is_deleted: false, created_at: "", updated_at: null },
  { id: 3, name: "Lloyds Bank", slug: "lloyds", code: "LOYDGB2L", longcode: "", gateway: null, pay_with_bank: false, supports_transfer: true, active: true, country: "United Kingdom", currency: "GBP", type: "uk", is_deleted: false, created_at: "", updated_at: null },
  { id: 4, name: "NatWest", slug: "natwest", code: "NWBKGB2L", longcode: "", gateway: null, pay_with_bank: false, supports_transfer: true, active: true, country: "United Kingdom", currency: "GBP", type: "uk", is_deleted: false, created_at: "", updated_at: null },
  { id: 5, name: "Santander UK", slug: "santander-uk", code: "ABBYGB2L", longcode: "", gateway: null, pay_with_bank: false, supports_transfer: true, active: true, country: "United Kingdom", currency: "GBP", type: "uk", is_deleted: false, created_at: "", updated_at: null },
  { id: 6, name: "Nationwide Building Society", slug: "nationwide", code: "NWBKGB21", longcode: "", gateway: null, pay_with_bank: false, supports_transfer: true, active: true, country: "United Kingdom", currency: "GBP", type: "uk", is_deleted: false, created_at: "", updated_at: null },
  { id: 7, name: "TSB Bank", slug: "tsb", code: "TSBSGB2A", longcode: "", gateway: null, pay_with_bank: false, supports_transfer: true, active: true, country: "United Kingdom", currency: "GBP", type: "uk", is_deleted: false, created_at: "", updated_at: null },
  { id: 8, name: "Virgin Money", slug: "virgin-money", code: "CNRBGB2L", longcode: "", gateway: null, pay_with_bank: false, supports_transfer: true, active: true, country: "United Kingdom", currency: "GBP", type: "uk", is_deleted: false, created_at: "", updated_at: null },
  { id: 9, name: "The Co-operative Bank", slug: "co-operative-bank", code: "CPBKGB22", longcode: "", gateway: null, pay_with_bank: false, supports_transfer: true, active: true, country: "United Kingdom", currency: "GBP", type: "uk", is_deleted: false, created_at: "", updated_at: null },
  { id: 10, name: "Metro Bank", slug: "metro-bank", code: "MYMBGB2L", longcode: "", gateway: null, pay_with_bank: false, supports_transfer: true, active: true, country: "United Kingdom", currency: "GBP", type: "uk", is_deleted: false, created_at: "", updated_at: null },
  { id: 11, name: "Monzo Bank", slug: "monzo", code: "MONZGB2L", longcode: "", gateway: null, pay_with_bank: false, supports_transfer: true, active: true, country: "United Kingdom", currency: "GBP", type: "uk", is_deleted: false, created_at: "", updated_at: null },
  { id: 12, name: "Starling Bank", slug: "starling", code: "SRLGGB2L", longcode: "", gateway: null, pay_with_bank: false, supports_transfer: true, active: true, country: "United Kingdom", currency: "GBP", type: "uk", is_deleted: false, created_at: "", updated_at: null },
  { id: 13, name: "Chase UK", slug: "chase-uk", code: "CHASGB2L", longcode: "", gateway: null, pay_with_bank: false, supports_transfer: true, active: true, country: "United Kingdom", currency: "GBP", type: "uk", is_deleted: false, created_at: "", updated_at: null },
];

const BankAccountForm: React.FC = () => {
  const { user } = useAuthStore();
  const { market } = useMarket();
  const [banks, setBanks] = useState<Bank[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bankDetails, setBankDetails] = useState<BankDetails | null>(null);
  
  const [formData, setFormData] = useState({
    bank_name: "",
    account_name: "",
    account_number: "",
    sort_code: "",
    billing_address: "",
    city: "",
    postal_code: "",
  });

  // Fetch banks and user's bank details
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Fetch banks (skip API for UK market and use static list)
        if (market === "GB") {
          setBanks(UK_BANKS);
        } else {
          const banksResponse = await paymentsService.getBanks();
          if (banksResponse && Array.isArray(banksResponse.data)) {
            setBanks(banksResponse.data);
          } else {
            showToast.error("Invalid bank data received");
          }
        }

        // Fetch user's bank details if they exist
        if (user?.bank_details) {
          try {
            const details = await paymentsService.getBankDetails(user.bank_details);
            if (details?.data) {
              setBankDetails(details.data);
              // Pre-fill form with existing data
              setFormData({
                bank_name: details.data.bank_name,
                account_name: details.data.account_name,
                account_number: details.data.account_number,
                sort_code: details.data.sort_code,
                billing_address: details.data.billing_address,
                city: details.data.city,
                postal_code: details.data.postal_code,
              });
            }
          } catch (error) {
            console.error("Error fetching bank details:", error);
            showToast.error("Failed to load your bank details. Please try again.");
          }
        }
      } catch (error) {
        showToast.error("Failed to load data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user, market]);

  const handleInputChange = (field: keyof typeof formData) => 
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    };
    
  const getInputValue = (field: keyof typeof formData) => formData[field];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const bankData = {
        ...formData,
        // Get the bank name from the selected bank ID
        bank_name: banks.find(bank => bank.id.toString() === formData.bank_name)?.name || formData.bank_name,
      };

      let response;
      if (bankDetails?.id) {
        // Update existing bank details
        response = await paymentsService.updateBankDetails(bankDetails.id, bankData);
        showToast.success("Bank details updated successfully!");
      } else {
        // Create new bank details
        response = await paymentsService.createBankDetails(bankData);
        showToast.success("Bank details saved successfully!");
        // Update local state with the created bank details
        if (response?.data) {
          setBankDetails(response.data);
          // Update form data with the response to ensure we have all fields
          setFormData({
            bank_name: response.data.bank_name,
            account_name: response.data.account_name,
            account_number: response.data.account_number,
            sort_code: response.data.sort_code,
            billing_address: response.data.billing_address,
            city: response.data.city,
            postal_code: response.data.postal_code,
          });
        }
      }
    } catch (error: any) {
      console.error("Error saving bank details:", error);
      const errorMessage = error.response?.data?.message || "An error occurred while saving. Please try again.";
      showToast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FBFBFB] w-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FCC01C]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 w-full py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <BackButton fallback="/settings" />
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">
            {bankDetails ? 'Update Bank Account' : 'Add Bank Account'}
          </h1>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  label="Billing Address"
                  value={getInputValue('billing_address')}
                  onChange={handleInputChange('billing_address')}
                  placeholder="Enter address"
                  required
                  className="md:col-span-2"
                />
                
                <FormField
                  label="City"
                  value={getInputValue('city')}
                  onChange={handleInputChange('city')}
                  placeholder="Enter city"
                  required
                />
                
                <FormField
                  label="Postal Code"
                  value={getInputValue('postal_code')}
                  onChange={handleInputChange('postal_code')}
                  placeholder="Enter postal code"
                  required
                />
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bank <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={getInputValue('bank_name')}
                    onChange={(e) => setFormData(prev => ({ ...prev, bank_name: e.target.value }))}
                    disabled={isLoading || isSubmitting}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm py-2.5 px-3.5 border"
                    required
                  >
                    <option value="">Select a bank</option>
                    {Array.isArray(banks) &&
                      banks
                        .filter((bank) => bank.active)
                        .map((bank) => (
                          <option key={bank.id} value={bank.id.toString()}>
                            {bank.name}
                          </option>
                        ))}
                  </select>
                </div>
                
                <FormField
                  label="Account Name"
                  value={getInputValue('account_name')}
                  onChange={handleInputChange('account_name')}
                  placeholder="Enter account name"
                  required
                  className="md:col-span-2"
                />
                
                <FormField
                  label="Account Number"
                  value={getInputValue('account_number')}
                  onChange={handleInputChange('account_number')}
                  placeholder="Enter account number"
                  required
                />
                
                <FormField
                  label="Sort Code / SWIFT / BIC"
                  value={getInputValue('sort_code')}
                  onChange={handleInputChange('sort_code')}
                  placeholder="Enter sort code or SWIFT/BIC"
                  required
                />
              </div>
              
              <div className="pt-6 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto flex justify-center items-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-amber-500 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {bankDetails ? 'Updating...' : 'Saving...'}
                    </span>
                  ) : bankDetails ? 'Update Bank Details' : 'Save Bank Details'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BankAccountForm;
