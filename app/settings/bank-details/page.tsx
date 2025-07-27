"use client";

import React, { useState } from "react";

import { FormField } from "@/components/ui/form-field";

const BankAccountForm: React.FC = () => {
  const [formData, setFormData] = useState({
    billingAddress: "",
    city: "",
    postcode: "",
    bank: "",
    accountNumber: "",
    accountNumberIban: "",
    sortCode: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-[#FBFBFB] w-full">
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex flex-col items-center w-full">
          <div className="w-full max-w-4xl">
            <section className="flex flex-col items-stretch mt-6">
              <h1 className="text-black text-2xl font-semibold leading-none">
                Bank account
              </h1>
              <div className="border shadow-[0px_4px_30px_0px_rgba(0,0,0,0.03)] flex flex-col items-stretch bg-white mt-[21px] pt-[29px] rounded-[15px] border-solid border-[#E7E7E7] max-md:max-w-full">
                <form onSubmit={handleSubmit} className="ml-[17px] mr-[18px]">
                  <fieldset className="border-0 p-0 m-0">
                    <legend className="sr-only">
                      Bank Account Information
                    </legend>

                    <div className="w-full max-md:max-w-full">
                      <FormField
                        label="Billing Address"
                        value={formData.billingAddress}
                        onChange={handleInputChange}
                        placeholder="Enter address"
                        required
                      />
                    </div>

                    <div className="w-full mt-6 max-md:max-w-full">
                      <FormField
                        label="City"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="Enter city"
                        required
                      />
                    </div>

                    <div className="w-full mt-6 max-md:max-w-full">
                      <FormField
                        label="Postcode"
                        value={formData.postcode}
                        onChange={handleInputChange}
                        placeholder="Enter postcode"
                        required
                      />
                    </div>

                    <div className="w-full mt-6 max-md:max-w-full">
                      <FormField
                        label="Bank"
                        value={formData.bank}
                        onChange={handleInputChange}
                        placeholder="Select Bank"
                        required
                        type="select"
                        options={[
                          { value: "hsbc", label: "HSBC" },
                          { value: "barclays", label: "Barclays" },
                          { value: "lloyds", label: "Lloyds" },
                          { value: "natwest", label: "NatWest" },
                          { value: "santander", label: "Santander" },
                        ]}
                      />
                    </div>

                    <div className="w-full mt-6 max-md:max-w-full">
                      <FormField
                        label="Account number"
                        value={formData.accountNumber}
                        onChange={handleInputChange}
                        placeholder="Enter account number"
                        required
                      />
                    </div>

                    <div className="w-full mt-6 max-md:max-w-full">
                      <FormField
                        label="Account number or IBAN"
                        value={formData.accountNumberIban}
                        onChange={handleInputChange}
                        placeholder="Enter account number or IBAN"
                        required
                      />
                    </div>

                    <div className="w-full mt-6 max-md:max-w-full">
                      <FormField
                        label="Sort code OR SWIFT/BIC code"
                        value={formData.sortCode}
                        onChange={handleInputChange}
                        placeholder="Enter sort code OR SWIFT/BIC code"
                        required
                      />
                    </div>
                  </fieldset>
                  <div className="justify-center items-center flex w-full flex-col overflow-hidden text-base text-white font-semibold bg-white border-t-[#CFCFCE] border-t border-solid py-7 max-md:max-w-full">
                    <button
                      type="submit"
                      className="justify-center items-center border shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] flex w-[422px] max-w-full gap-2 overflow-hidden bg-[#FCC01C] ml-[11px] px-7 py-3 rounded-lg border-solid border-[#FCC01C] max-md:px-5"
                    >
                      <span className="text-white self-stretch my-auto">
                        Save changes
                      </span>
                    </button>
                  </div>
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
