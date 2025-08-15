"use client";

import React, { useState, useEffect, useCallback } from "react";

import { ReferenceCard } from "./reference-card";

import { AddReferenceModal } from "@/components/reference/add-reference-modal";
import { showToast } from "@/lib/utils/toast";
import { referenceService, Reference } from "@/lib/api/references";

// Keep the reference icons for now to maintain the same visual style
const referenceIcons = [
  "https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/9b22f48483ac365f750c47187b4b785d78de7f32?placeholderIfAbsent=true",
  "https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/67b6c85ad514c14727bf2169065009ef296a277f?placeholderIfAbsent=true",
  "https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/206a266796e055895a7e63be976cd99d5fb0e4e4?placeholderIfAbsent=true",
  "https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/055d9588330482b5b4d790b45e25a75032cd7d81?placeholderIfAbsent=true",
];

export const ReferenceList: React.FC = () => {
  // State declarations
  const [references, setReferences] = useState<Reference[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReferenceId, setEditingReferenceId] = useState<
    number | undefined
  >(undefined);

  // Fetch references from API
  const fetchReferences = useCallback(async () => {
    try {
      setLoading(true);
      const response = await referenceService.getReferences();

      setReferences(response.results || []);
      setError(null);
    } catch (err) {
      const errorMessage = "Failed to load references";

      setError(errorMessage);
      console.error("Error fetching references:", err);
      showToast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  // Effects
  useEffect(() => {
    fetchReferences();
  }, []);

  // Event handlers
  const handleAddReference = () => {
    setEditingReferenceId(undefined);
    setIsModalOpen(true);
  };

  const handleEditReference = (id: number) => {
    setEditingReferenceId(id);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingReferenceId(undefined);
  };

  const handleReferenceAdded = () => {
    fetchReferences();
    showToast.success("Reference updated successfully!");
  };

  const handleDeleteReference = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this reference?")) {
      try {
        await referenceService.deleteReference(id);
        await fetchReferences();
        showToast.success("Reference deleted successfully");
      } catch (error) {
        console.error("Error deleting reference:", error);
        showToast.error("Failed to delete reference");
      }
    }
  };

  return (
    <section className="self-center flex w-[662px] max-w-full flex-col mt-[35px]">
      <h2 className="text-black text-2xl font-semibold leading-none">
        References
      </h2>
      <div className="self-stretch mt-6 max-md:max-w-full">
        {loading ? (
          <div className="text-center py-4">Loading references...</div>
        ) : error ? (
          <div className="text-red-500 text-center py-4">{error}</div>
        ) : !references || references.length === 0 ? (
          <div className="text-center py-4 text-gray-500">
            No references found
          </div>
        ) : (
          <div>
            {references.map((reference, index) => (
              <div key={reference.id} className="flex items-center gap-2">
                <ReferenceCard
                  icon={referenceIcons[index % referenceIcons.length]}
                  name={reference.full_name}
                  address={`${reference.address}, ${reference.country}`}
                  onEdit={() => handleEditReference(reference.id)}
                />
                <button
                  onClick={() => handleDeleteReference(reference.id)}
                  className="text-red-500 hover:text-red-700"
                  aria-label={`Delete ${reference.full_name}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <button
        onClick={handleAddReference}
        className="w-60 whitespace-nowrap justify-center items-center border shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] flex gap-2 overflow-hidden text-base text-white font-semibold bg-[#FCC01C] mt-16 px-20 py-3 rounded-lg border-solid border-[#FCC01C] max-md:mt-10 max-md:px-5"
      >
        <span className="text-white self-stretch my-auto">
          Add new reference
        </span>
      </button>

      <AddReferenceModal
        open={isModalOpen}
        onClose={handleModalClose}
        onSuccess={fetchReferences}
        referenceId={editingReferenceId}
      />
    </section>
  );
};
