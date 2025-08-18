"use client";

import React, { useEffect, useState } from "react";

import { useAuthStore } from "@/lib/store/auth-store";
import { TagSelector } from "@/components/ui/tag-selector";
import { authService } from "@/lib/api/auth";
import { handleApiError } from "@/lib/utils/toast";
import { showToast } from "@/lib/utils/toast";

type UserType = "chef" | "host";

interface ProfileFormProps {
  userType?: UserType;
}

interface FormDataState {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  phoneNumber: string;
  city: string;
  eventTypes: string[];
  cuisineTypes: string[];
  address: string;
  postalCode: string;
  briefProfile: string;
  avatar: string;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ userType = "chef" }) => {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const setChefFormData = useAuthStore((state) => state.setChefFormData);
  const chefFormData = useAuthStore((state) => state.chefFormData) || {};
  const [formData, setFormData] = useState<FormDataState>({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    email: "",
    phoneNumber: "",
    city: "",
    eventTypes: [],
    cuisineTypes: [],
    address: "",
    postalCode: "",
    briefProfile: "",
    avatar: "",
  });

  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Check file type
    if (!file.type.startsWith("image/")) {
      handleApiError(
        new Error("Please select a valid image file"),
        "Invalid file type",
      );

      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      handleApiError(
        new Error("Image size should be less than 5MB"),
        "File too large",
      );

      return;
    }

    // Create a preview URL
    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        avatar: reader.result as string,
      }));
      setAvatarFile(file);
    };
    reader.readAsDataURL(file);
  };

  // Format date from YYYY-MM-DD to a format suitable for input type="date"
  const formatDateForInput = (dateString: string): string => {
    if (!dateString) return "";
    const date = new Date(dateString);

    return date.toISOString().split("T")[0];
  };

  const handleInputChange = (
    field: keyof FormDataState,
    value: string | string[],
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const initialLoadRef = React.useRef(true);
  const prevChefFormDataRef = React.useRef(chefFormData);
  const prevUserRef = React.useRef(user);

  // Log user data when it changes
  useEffect(() => {
    console.log("User data from store:", user);
  }, [user]);

  // Load user data when component mounts or user changes
  useEffect(() => {
    // Only update if user data has changed or it's the initial load
    const userChanged = user !== prevUserRef.current;
    const chefFormDataChanged = chefFormData !== prevChefFormDataRef.current;

    if (
      user &&
      (initialLoadRef.current || userChanged || chefFormDataChanged)
    ) {
      // Only initialize fields that haven't been modified by the user
      setFormData((prevFormData) => {
        // Only update fields that are empty or being loaded for the first time
        const shouldUpdateField = (field: keyof FormDataState) =>
          initialLoadRef.current ||
          !prevFormData[field] ||
          (field === "dateOfBirth" && !prevFormData.dateOfBirth) ||
          (field === "briefProfile" && !prevFormData.briefProfile);

        // Create updated form data
        const updatedData: Partial<FormDataState> = {};

        // Only update fields that haven't been modified by the user
        if (shouldUpdateField("firstName"))
          updatedData.firstName = user.first_name || "";
        if (shouldUpdateField("lastName"))
          updatedData.lastName = user.last_name || "";
        if (shouldUpdateField("email")) updatedData.email = user.email || "";
        if (shouldUpdateField("phoneNumber"))
          updatedData.phoneNumber = user.phone_number || "";
        if (shouldUpdateField("avatar")) updatedData.avatar = user.avatar || "";

        // Handle bio and date_of_birth from user profile if available
        if (shouldUpdateField("briefProfile")) {
          updatedData.briefProfile = user.bio || "";
        }

        if (shouldUpdateField("dateOfBirth") && user.date_of_birth) {
          updatedData.dateOfBirth = formatDateForInput(user.date_of_birth);
        }

        // Only update if there are actual changes to prevent unnecessary re-renders
        const hasChanges = Object.keys(updatedData).some(
          (key) =>
            JSON.stringify(updatedData[key as keyof typeof updatedData]) !==
            JSON.stringify(prevFormData[key as keyof FormDataState]),
        );

        if (!hasChanges) return prevFormData;

        return {
          ...prevFormData,
          ...updatedData,
          // Always update these fields if they exist in chefFormData
          ...(userType === "chef" && chefFormData
            ? {
                ...(chefFormData.dateOfBirth && {
                  dateOfBirth: formatDateForInput(chefFormData.dateOfBirth),
                }),
                ...(chefFormData.city && { city: chefFormData.city }),
                ...(chefFormData.address && { address: chefFormData.address }),
                ...(chefFormData.postalCode && {
                  postalCode: chefFormData.postalCode,
                }),
                ...(chefFormData.briefProfile && {
                  briefProfile: chefFormData.briefProfile,
                }),
                ...(Array.isArray(chefFormData.eventTypes) && {
                  eventTypes: [...chefFormData.eventTypes],
                }),
                ...(Array.isArray(chefFormData.cuisineTypes) && {
                  cuisineTypes: [...chefFormData.cuisineTypes],
                }),
              }
            : {}),
        };
      });

      // Update refs after processing
      initialLoadRef.current = false;
      prevUserRef.current = user;
      prevChefFormDataRef.current = chefFormData;
    }
  }, [user, userType, chefFormData]); // formData is not in dependencies to prevent loops

  const [cuisines, setCuisines] = useState([
    "Italian",
    "African",
    "Chinese",
    "Pastries",
    "French",
    "English",
    "Spicy Mediterranean",
    "Pizza",
  ]);
  const [events, setEvents] = useState(["Naming", "Wedding", "Gathering"]);

  // City/State options based on country
  const getCitiesByCountry = (country: string) => {
    const citiesByCountry: Record<string, string[]> = {
      // Nigeria - States
      'Nigeria': [
        'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno', 
        'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe', 'Imo', 
        'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa', 
        'Niger', 'Ogun', 'Ondo', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
      ],
      // South Africa - Provinces
      'South Africa': [
        'Eastern Cape', 'Free State', 'Gauteng', 'Kwazulu Natal', 'Limpopo', 
        'Mpumalanga', 'North West', 'Northen Cape', 'Western Cape'
      ],
      // United Kingdom - Regions
      'United Kingdom': [
        'England', 'Scotland', 'Wales', 'Northern Ireland'
      ]
    };

    return citiesByCountry[country] || [];
  };

  const [cities, setCities] = useState<string[]>([]);
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);

  // Update cities when user's country changes
  useEffect(() => {
    if (user?.country) {
      const countryCities = getCitiesByCountry(user.country);
      setCities(countryCities);
    }
  }, [user?.country]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      showToast.error("User not found");

      return;
    }

    try {
      const formDataToSend = new FormData();

      // Append user data to FormData with correct field names for the backend
      formDataToSend.append("first_name", formData.firstName);
      formDataToSend.append("last_name", formData.lastName);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone_number", formData.phoneNumber);

      if (formData.dateOfBirth) {
        formDataToSend.append("date_of_birth", formData.dateOfBirth);
      }

      if (formData.briefProfile) {
        formDataToSend.append("bio", formData.briefProfile);
      }

      // Append avatar file if it exists
      if (avatarFile) {
        formDataToSend.append("avatar", avatarFile);
      }

      // Add chef-specific fields if user is a chef
      if (userType === "chef") {
        if (formData.city) formDataToSend.append("city", formData.city);
        if (formData.address)
          formDataToSend.append("address", formData.address);
        if (formData.postalCode)
          formDataToSend.append("postal_code", formData.postalCode);

        if (Array.isArray(formData.cuisineTypes)) {
          formData.cuisineTypes.forEach((cuisine) => {
            formDataToSend.append("cuisines", cuisine);
          });
        }

        if (Array.isArray(formData.eventTypes)) {
          formData.eventTypes.forEach((event) => {
            formDataToSend.append("events_available_for", event);
          });
        }
      }

      // Notification preferences are handled on the notifications page

      // Call the API to update the profile
      const updatedUser = await authService.updateProfile(
        user.id,
        formDataToSend,
        userType === "chef",
      );

      // Extract the user data from the API response
      const userData = updatedUser.data;

      // Update the user in the store
      setUser({
        ...user,
        ...userData, // Spread the updated user data from the API
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone_number: formData.phoneNumber,
        bio: formData.briefProfile,
        date_of_birth: formData.dateOfBirth,
        ...(userData.avatar && { avatar: userData.avatar }),
      });

      // If this is a chef, also update the chef form data
      if (userType === "chef") {
        setChefFormData({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          dateOfBirth: formData.dateOfBirth,
          city: formData.city,
          address: formData.address,
          postalCode: formData.postalCode,
          briefProfile: formData.briefProfile,
          eventTypes: formData.eventTypes,
          cuisineTypes: formData.cuisineTypes,
        });
      }

      // Show success message
      showToast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      handleApiError(error, "Failed to update profile");
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBFB] w-full">
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex flex-col items-center w-full">
          <div className="w-full lg:max-w-[654px]">
            <section className="flex flex-col items-stretch">
              <h1 className="text-black text-2xl font-semibold leading-none mb-6">
                Profile
              </h1>
              <div className="border shadow-[0px_4px_30px_0px_rgba(0,0,0,0.03)] flex flex-col items-stretch bg-white mt-[21px] pt-[51px] rounded-[15px] border-solid border-[#E7E7E7] max-md:max-w-full">
                <div className="relative self-center group">
                  <img
                    src={
                      formData.avatar ||
                      "https://api.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/d24d7622a56614065632b782fba246a7847b6d19?placeholderIfAbsent=true"
                    }
                    alt="Profile avatar"
                    className="aspect-[1] object-cover w-20 h-20 rounded-full border-2 border-white shadow-md"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-50 rounded-full">
                    <span className="text-white text-xs text-center">
                      Change Photo
                    </span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={(e) => handleAvatarChange(e)}
                  />
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="ml-[17px] mr-[18px] mt-16 max-md:max-w-full max-md:mr-2.5 max-md:mt-10"
                >
                  <div className="w-full max-md:max-w-full">
                    <div className="w-full max-md:max-w-full">
                      <div className="w-full max-md:max-w-full">
                        <label className="text-[#3F3E3D] text-sm font-medium leading-none">
                          First Name
                        </label>
                        <div className="items-center border shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] flex w-full gap-2 overflow-hidden text-base text-[#6F6E6D] font-normal bg-white mt-1.5 px-3.5 py-2.5 rounded-lg border-solid border-[#CFCFCE] max-md:max-w-full">
                          <input
                            type="text"
                            value={formData.firstName}
                            onChange={(e) =>
                              handleInputChange("firstName", e.target.value)
                            }
                            className="self-stretch flex min-w-60 w-full items-center gap-2 flex-1 shrink basis-[0%] my-auto max-md:max-w-full bg-transparent border-none outline-none text-[#6F6E6D]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-full mt-4 max-md:max-w-full">
                    <div className="w-full max-md:max-w-full">
                      <div className="w-full max-md:max-w-full">
                        <label className="text-[#3F3E3D] text-sm font-medium leading-none">
                          Last Name
                        </label>
                        <div className="items-center border shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] flex w-full gap-2 overflow-hidden text-base text-[#6F6E6D] font-normal bg-white mt-1.5 px-3.5 py-2.5 rounded-lg border-solid border-[#CFCFCE] max-md:max-w-full">
                          <input
                            type="text"
                            value={formData.lastName}
                            onChange={(e) =>
                              handleInputChange("lastName", e.target.value)
                            }
                            className="self-stretch flex min-w-60 w-full items-center gap-2 flex-1 shrink basis-[0%] my-auto max-md:max-w-full bg-transparent border-none outline-none text-[#6F6E6D]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-full mt-4 max-md:max-w-full">
                    <div className="w-full max-md:max-w-full">
                      <div className="w-full max-md:max-w-full">
                        <label className="text-[#3F3E3D] text-sm font-medium leading-none">
                          Date of Birth
                        </label>
                        <div className="relative items-center border shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] flex w-full gap-2 overflow-hidden text-base text-[#6F6E6D] font-normal whitespace-nowrap flex-wrap bg-white mt-1.5 px-3.5 py-2.5 rounded-lg border-solid border-[#CFCFCE] max-md:max-w-full">
                          <input
                            type="date"
                            value={formData.dateOfBirth}
                            onChange={(e) =>
                              handleInputChange("dateOfBirth", e.target.value)
                            }
                            className="self-stretch flex min-w-60 items-center gap-2 flex-1 shrink basis-[0%] my-auto max-md:max-w-full bg-transparent border-none outline-none text-[#6F6E6D] pr-8 [&::-webkit-calendar-picker-indicator]:hidden"
                            max={new Date().toISOString().split("T")[0]} // Prevent future dates
                            id="dateOfBirth"
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-1"
                            onClick={() =>
                              (
                                document.getElementById(
                                  "dateOfBirth",
                                ) as HTMLInputElement
                              )?.showPicker?.()
                            }
                          >
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12 2.66675H3.99998C2.52722 2.66675 1.33331 3.86066 1.33331 5.33341V12.0001C1.33331 13.4728 2.52722 14.6667 3.99998 14.6667H12C13.4727 14.6667 14.6666 13.4728 14.6666 12.0001V5.33341C14.6666 3.86066 13.4727 2.66675 12 2.66675Z"
                                stroke="#6F6E6D"
                                strokeWidth="1.33333"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M5.33331 1.33337V4.00004"
                                stroke="#6F6E6D"
                                strokeWidth="1.33333"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M10.6667 1.33337V4.00004"
                                stroke="#6F6E6D"
                                strokeWidth="1.33333"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M1.33331 6.66675H14.6666"
                                stroke="#6F6E6D"
                                strokeWidth="1.33333"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-full mt-4 max-md:max-w-full">
                    <div className="w-full max-md:max-w-full">
                      <div className="w-full max-md:max-w-full">
                        <label className="text-[#3F3E3D] text-sm font-medium leading-none">
                          Email Address
                        </label>
                        <div className="items-center border shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] flex w-full gap-2 overflow-hidden text-base text-[#6F6E6D] font-normal whitespace-nowrap bg-white mt-1.5 px-3.5 py-2.5 rounded-lg border-solid border-[#CFCFCE] max-md:max-w-full">
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                              handleInputChange("email", e.target.value)
                            }
                            className="self-stretch flex min-w-60 w-full items-center gap-2 flex-1 shrink basis-[0%] my-auto max-md:max-w-full bg-transparent border-none outline-none text-[#6F6E6D]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-full mt-4 max-md:max-w-full">
                    <div className="w-full max-md:max-w-full">
                      <div className="w-full max-md:max-w-full">
                        <label className="text-[#3F3E3D] text-sm font-medium leading-none">
                          Phone Number
                        </label>
                        <div className="items-center border shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] flex w-full gap-2 overflow-hidden text-base text-[#6F6E6D] font-normal bg-white mt-1.5 px-3.5 py-2.5 rounded-lg border-solid border-[#CFCFCE] max-md:max-w-full">
                          <input
                            type="tel"
                            value={formData.phoneNumber}
                            onChange={(e) =>
                              handleInputChange("phoneNumber", e.target.value)
                            }
                            className="self-stretch flex min-w-60 w-full items-center gap-2 flex-1 shrink basis-[0%] my-auto max-md:max-w-full bg-transparent border-none outline-none text-[#6F6E6D]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {userType === "chef" && (
                    <>
                      <div className="w-full whitespace-nowrap mt-4 max-md:max-w-full">
                        <div className="w-full max-md:max-w-full">
                          <div className="w-full max-md:max-w-full">
                            <label id="city-label" className="text-[#3F3E3D] text-sm font-medium leading-none">
                              City/State
                            </label>
                            <div className="relative w-full">
                              <button 
                                type="button"
                                aria-haspopup="listbox"
                                aria-expanded={isCityDropdownOpen}
                                aria-labelledby="city-label"
                                className="items-center border shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] flex w-full gap-2 overflow-hidden text-base text-[#0F0E0C] font-normal bg-white mt-1.5 px-3.5 py-2.5 rounded-lg border-solid border-[#CFCFCE] cursor-pointer text-left"
                                onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    setIsCityDropdownOpen(!isCityDropdownOpen);
                                  } else if (e.key === 'Escape' && isCityDropdownOpen) {
                                    e.preventDefault();
                                    setIsCityDropdownOpen(false);
                                  }
                                }}
                              >
                                <input
                                  type="text"
                                  value={formData.city}
                                  readOnly
                                  className="self-stretch flex min-w-60 items-center gap-2 flex-1 shrink basis-[0%] my-auto bg-transparent border-none outline-none text-[#0F0E0C] cursor-pointer"
                                  placeholder="Select city/state"
                                />
                                <img
                                  src="https://api.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/6fbc6bc48ccc3247e1e891a2d67fecfd2cde1c7c?placeholderIfAbsent=true"
                                  alt="Dropdown arrow"
                                  className={`aspect-[1] object-contain w-4 self-stretch shrink-0 my-auto transition-transform ${isCityDropdownOpen ? 'rotate-180' : ''}`}
                                />
                              </button>
                              {isCityDropdownOpen && (
                                <div 
                                  role="listbox"
                                  aria-labelledby="city-label"
                                  className="absolute z-10 w-full mt-1 bg-white border border-solid border-[#CFCFCE] rounded-lg shadow-lg max-h-60 overflow-y-auto"
                                >
                                  {cities.length > 0 ? (
                                    cities.map((city, index) => (
                                      <div
                                        key={city}
                                        role="option"
                                        aria-selected={formData.city === city}
                                        tabIndex={0}
                                        className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${formData.city === city ? 'bg-amber-100' : ''}`}
                                        onClick={() => {
                                          handleInputChange("city", city);
                                          setIsCityDropdownOpen(false);
                                        }}
                                        onKeyDown={(e) => {
                                          if (e.key === 'Enter' || e.key === ' ') {
                                            e.preventDefault();
                                            handleInputChange("city", city);
                                            setIsCityDropdownOpen(false);
                                          } else if (e.key === 'Escape') {
                                            e.preventDefault();
                                            setIsCityDropdownOpen(false);
                                          }
                                        }}
                                      >
                                        {city}
                                      </div>
                                    ))
                                  ) : (
                                    <div className="px-4 py-2 text-gray-500">
                                      No cities available for {user?.country || 'selected country'}
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="w-full mt-4 max-md:max-w-full">
                        <div className="w-full max-md:max-full">
                          <div className="w-full max-md:max-w-full">
                            <label className="text-[#3F3E3D] text-sm font-medium leading-none">
                              Your Address
                            </label>
                            <div className="items-center border shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] flex w-full gap-2 overflow-hidden text-base text-[#6F6E6D] font-normal bg-white mt-1.5 px-3.5 py-2.5 rounded-lg border-solid border-[#CFCFCE] max-md:max-w-full">
                              <input
                                type="text"
                                value={formData.address}
                                onChange={(e) =>
                                  handleInputChange("address", e.target.value)
                                }
                                className="self-stretch flex min-w-60 w-full items-center gap-2 flex-1 shrink basis-[0%] my-auto max-md:max-w-full bg-transparent border-none outline-none text-[#6F6E6D]"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="w-full mt-4 max-md:max-w-full">
                        <div className="w-full max-md:max-w-full">
                          <div className="w-full max-md:max-w-full">
                            <label className="text-[#3F3E3D] text-sm font-medium leading-none">
                              Postal Code
                            </label>
                            <div className="items-center border shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] flex w-full gap-2 overflow-hidden text-base text-[#6F6E6D] font-normal bg-white mt-1.5 px-3.5 py-2.5 rounded-lg border-solid border-[#CFCFCE] max-md:max-w-full">
                              <input
                                type="text"
                                value={formData.postalCode}
                                onChange={(e) =>
                                  handleInputChange(
                                    "postalCode",
                                    e.target.value,
                                  )
                                }
                                className="self-stretch flex min-w-60 w-full items-center gap-2 flex-1 shrink basis-[0%] my-auto max-md:max-w-full bg-transparent border-none outline-none text-[#6F6E6D]"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  <div className="w-full mt-4 max-md:max-w-full">
                    <div className="w-full max-md:max-w-full">
                      <div className="w-full max-md:max-w-full">
                        <label className="text-[#3F3E3D] text-sm font-medium leading-none">
                          Brief Profile
                        </label>
                        <div className="items-center border shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] flex w-full gap-2 overflow-hidden text-base text-[#6F6E6D] font-normal bg-white mt-1.5 px-3.5 py-2.5 rounded-lg border-solid border-[#CFCFCE] max-md:max-w-full">
                          <input
                            value={formData.briefProfile}
                            onChange={(e) =>
                              handleInputChange("briefProfile", e.target.value)
                            }
                            className="self-stretch flex min-w-60 w-full items-center gap-2 flex-1 shrink basis-[0%] my-auto max-md:max-w-full bg-transparent border-none outline-none text-[#6F6E6D] resize-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {userType === "chef" && (
                    <>
                      <TagSelector
                        className="w-full mt-5"
                        label="Event type"
                        selectedTags={formData.eventTypes}
                        tags={events}
                        onTagsChange={(newTags) => handleInputChange("eventTypes", newTags)}
                      />

                      <TagSelector
                        className="w-full mt-5"
                        label="Cuisines type"
                        selectedTags={formData.cuisineTypes}
                        tags={cuisines}
                        onTagsChange={(newTags) => handleInputChange("cuisineTypes", newTags)}
                      />
                    </>
                  )}

                  <div className="justify-center items-center flex w-full flex-col overflow-hidden text-base text-white font-semibold bg-white mt-[59px] px-[66px] py-7 border-t-[#CFCFCE] border-t border-solid max-md:max-w-full max-md:mt-10 max-md:px-5">
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

export default ProfileForm;
