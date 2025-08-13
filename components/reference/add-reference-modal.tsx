"use client";

import React, { useState, useEffect } from "react";
import { showToast } from "@/lib/utils/toast";
import { FormField } from "@/components/ui/form-field";
import { referenceService, Reference } from "@/lib/api/references";

type ReferenceFormData = Omit<Reference, 'id' | 'created_at' | 'updated_at'>;

interface AddReferenceModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  referenceId?: number;
}

export const AddReferenceModal: React.FC<AddReferenceModalProps> = ({
  open,
  onClose,
  onSuccess,
  referenceId,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<ReferenceFormData>({
    full_name: "",
    occupation: "",
    address: "",
    phone_number: "",
    email: "",
    country: "Nigeria" // Default to Nigeria as per the API response
  });

  // Load reference data when in edit mode
  useEffect(() => {
    const loadReference = async () => {
      if (!referenceId) return;
      
      setIsLoading(true);
      try {
        // Get the list of references and find the one with matching ID
        const { results } = await referenceService.getReferences();
        const reference = results.find(ref => ref.id === referenceId);
        
        if (reference) {
          setFormData({
            full_name: reference.full_name,
            occupation: reference.occupation,
            address: reference.address,
            phone_number: reference.phone_number,
            email: reference.email,
            country: reference.country
          });
        } else {
          throw new Error('Reference not found');
        }
      } catch (error) {
        console.error('Error loading reference:', error);
        showToast.error('Failed to load reference data');
        onClose();
      } finally {
        setIsLoading(false);
      }
    };
    
    if (open) {
      if (referenceId) {
        loadReference();
      } else {
        // Reset form when opening in create mode
        setFormData({
          full_name: "",
          occupation: "",
          address: "",
          phone_number: "",
          email: "",
          country: "Nigeria"
        });
      }
    }
  }, [open, referenceId, onClose]);

  const handleInputChange = (field: keyof ReferenceFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic form validation
    if (!formData.full_name.trim() || !formData.occupation.trim() || 
        !formData.address.trim() || !formData.phone_number.trim() || 
        !formData.email.trim() || !formData.country.trim()) {
      showToast.error("Please fill in all required fields");
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showToast.error("Please enter a valid email address");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      if (referenceId) {
        await referenceService.updateReference(referenceId, formData);
        showToast.success("Reference updated successfully!");
      } else {
        await referenceService.createReference(formData);
        showToast.success("Reference added successfully!");
      }
      
      onClose();
      onSuccess();
    } catch (error: any) {
      const errorMessage = error.response?.data?.detail || 
        (referenceId ? "Failed to update reference." : "Failed to add reference.") + " Please try again.";
      showToast.error(errorMessage);
      console.error(`Error ${referenceId ? 'updating' : 'adding'} reference:`, error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!open && !isLoading) return null;
  
  const modalTitle = referenceId ? 'Edit Reference' : 'Add New Reference';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-md p-6 mx-4 bg-white rounded-lg shadow-xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">{modalTitle}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
            aria-label="Close modal"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  We'll send an email to your reference to confirm their details. Please ensure the email address is correct.
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <FormField
              required
              label="Full Name"
              placeholder="Enter full name"
              value={formData.full_name}
              onChange={(e) => handleInputChange("full_name", e.target.value)}
            />
            
            <FormField
              required
              label="Occupation"
              placeholder="Enter occupation"
              value={formData.occupation}
              onChange={(e) => handleInputChange("occupation", e.target.value)}
            />
            
            <FormField
              required
              label="Address"
              placeholder="Enter full address"
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
            />
            
            <FormField
              required
              label="Country"
              placeholder="Enter country"
              value={formData.country}
              onChange={(e) => handleInputChange("country", e.target.value)}
            />
            
            <FormField
              required
              label="Phone Number"
              placeholder="Enter phone number"
              value={formData.phone_number}
              onChange={(e) => handleInputChange("phone_number", e.target.value)}
              type="tel"
            />
            
            <FormField
              required
              label="Email Address"
              placeholder="Enter email address"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              type="email"
            />
            
            {/* Form Actions */}
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-[#FCC01C] border border-transparent rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
                disabled={isSubmitting || isLoading}
              >
                {isSubmitting ? 'Saving...' : 'Save Reference'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
