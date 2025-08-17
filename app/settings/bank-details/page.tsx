"use client";

import React, { useState, useEffect } from "react";
import { FormField } from "@/components/ui/form-field";
import { paymentsService } from "@/lib/api/payments";
import { showToast } from "@/lib/utils/toast";
import { useAuthStore } from "@/lib/store/auth-store";

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

const BankAccountForm: React.FC = () => {
  const { user } = useAuthStore();
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
        
        // Fetch banks
        const banksResponse = await paymentsService.getBanks();
        if (banksResponse && Array.isArray(banksResponse.data)) {
          setBanks(banksResponse.data);
        } else {
          showToast.error("Invalid bank data received");
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
  }, [user]);

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
    <div className="min-h-screen bg-[#FBFBFB] w-full">
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex flex-col items-center w-full">
          <div className="w-full max-w-3xl">
            <section className="flex flex-col items-stretch mt-6">
              <h1 className="text-black text-2xl font-semibold leading-none">
                {bankDetails ? 'Update Bank Account' : 'Add Bank Account'}
              </h1>
              
              <div className="border shadow-[0px_4px_30px_0px_rgba(0,0,0,0.03)] flex flex-col items-stretch bg-white mt-[21px] pt-[29px] rounded-[15px] border-solid border-[#E7E7E7] max-md:max-w-full">
                <form onSubmit={handleSubmit} className="ml-[17px] mr-[18px]">
                  <fieldset className="border-0 p-0 m-0" disabled={isSubmitting}>
                    <legend className="sr-only">
                      Bank Account Information
                    </legend>

                    <div className="w-full max-md:max-w-full">
                      <FormField
                        label="Billing Address"
                        value={getInputValue('billing_address')}
                        onChange={handleInputChange('billing_address')}
                        placeholder="Enter address"
                        required
                      />
                    </div>

                    <div className="w-full mt-6 max-md:max-w-full">
                      <FormField
                        label="City"
                        value={getInputValue('city')}
                        onChange={handleInputChange('city')}
                        placeholder="Enter city"
                        required
                      />
                    </div>

                    <div className="w-full mt-6 max-md:max-w-full">
                      <FormField
                        label="Postal Code"
                        value={getInputValue('postal_code')}
                        onChange={handleInputChange('postal_code')}
                        placeholder="Enter postal code"
                        required
                      />
                    </div>

                    <div className="w-full mt-6 max-md:max-w-full">
                      <div className="w-full">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Bank <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={getInputValue('bank_name')}
                          onChange={(e) => setFormData(prev => ({ ...prev, bank_name: e.target.value }))}
                          disabled={isLoading || isSubmitting}
                          className="w-full border shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] bg-white px-3.5 py-2.5 rounded-lg border-solid border-[#CFCFCE] text-base font-normal leading-6 focus:outline-none focus:ring-2 focus:ring-[#FCC01C] focus:border-[#FCC01C] disabled:opacity-50"
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
                    </div>

                    <div className="w-full mt-6 max-md:max-w-full">
                      <FormField
                        label="Account Name"
                        value={getInputValue('account_name')}
                        onChange={handleInputChange('account_name')}
                        placeholder="Enter account name"
                        required
                      />
                    </div>

                    <div className="w-full mt-6 max-md:max-w-full">
                      <FormField
                        label="Account Number"
                        value={getInputValue('account_number')}
                        onChange={handleInputChange('account_number')}
                        placeholder="Enter account number"
                        required
                      />
                    </div>

                    <div className="w-full mt-6 max-md:max-w-full">
                      <FormField
                        label="Sort Code"
                        value={getInputValue('sort_code')}
                        onChange={handleInputChange('sort_code')}
                        placeholder="Enter sort code OR SWIFT/BIC code"
                        required
                      />
                    </div>

                    <div className="mt-8 py-6 border-t border-[#CFCFCE] w-full">
                      <div className="flex justify-center w-full">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="justify-center items-center border shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] flex w-[422px] max-w-full gap-2 overflow-hidden bg-[#FCC01C] px-7 py-3 rounded-lg border-solid border-[#FCC01C] max-md:px-5 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <span className="text-white self-stretch my-auto">
                            {isSubmitting ? (
                              <span className="flex items-center">
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                {bankDetails ? 'Updating...' : 'Saving...'}
                              </span>
                            ) : bankDetails ? 'Update Bank Details' : 'Save Bank Details'}
                          </span>
                        </button>
                      </div>
                    </div>
                  </fieldset>
                </form>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BankAccountForm;
