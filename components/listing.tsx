"use client";

import { MenuListing } from "./listings/menu";
import { ChefCard } from "./listings/chef";
import { ServiceListing } from "./listings/service";

type CardType = 'menu' | 'chef' | 'service';

interface ListingProps {
  selectedService?: string;
}

interface MenuItem {
  id: number;
  title: string;
  price: string;
  img: string;
  location: string;
}

interface ChefItem {
  id: number;
  name: string;
  location: string;
  rating: number;
  reviewCount: number;
  description: string;
  services: string[];
  mainImageUrl: string;
  profileImageUrl: string;
  isVerified?: boolean;
}

interface ServiceItem {
  id: number;
  title: string;
  description: string;
  price: string;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  location: string;
  services: string[];
  profileImageUrl: string;
  isVerified?: boolean;
}

// Define service to card type mapping
const getCardTypeForService = (serviceId: string): CardType => {
  const menuCardTypes = [
    "chef-at-home",
    "corporate-dining",
    "fine-dining",
    "large-event",
    "meal-delivery",
    "meal-prep",
  ];
  const serviceCardTypes = ["box-groceries", "cooking-class", "eating-coach"];

  if (serviceId === "chefs") return "chef";
  if (serviceCardTypes.includes(serviceId)) return "service";
  if (menuCardTypes.includes(serviceId)) return "menu";
  
  // Default to menu if no match
  return "menu";
};

export const Listing = ({ selectedService = "chef-at-home" }: ListingProps) => {
  const cardType = getCardTypeForService(selectedService);

  // Mock data - reduced to 2 items each as requested
  const menuItems: MenuItem[] = [
    {
      id: 1,
      title: "British Breakfast",
      price: "25",
      img: "https://images.unsplash.com/photo-1551024601-bc78ca9296a0?w=800&h=600&fit=crop&crop=center",
      location: "London",
    },
    {
      id: 2,
      title: "Italian Pasta",
      price: "22",
      img: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800&h=600&fit=crop&crop=center",
      location: "Manchester",
    },
    {
      id: 4,
      title: "Mexican",
      price: "20",
      img: "/menus/menu4.png",
      location: "London",
    },
    {
      id: 5,
      title: "Italian",
      price: "20",
      img: "/menus/menu1.png",
      location: "London",
    },
    {
      id: 6,
      title: "British",
      price: "20",
      img: "/menus/menu2.png",
      location: "London",
    },
    {
      id: 7,
      title: "African",
      price: "20",
      img: "/menus/menu3.png",
      location: "London",
    },
    {
      id: 8,
      title: "Italian",
      price: "20",
      img: "/menus/menu4.png",
      location: "London",
    },
  ];

  // Mock data for chefs
  const chefItems: ChefItem[] = [
    {
      id: 1,
      name: "John Smith",
      location: "London",
      rating: 4.8,
      reviewCount: 124,
      description: "Professional chef with 10+ years of experience in Italian cuisine. Specializes in homemade pasta and authentic Italian dishes.",
      services: ["Italian", "Pasta Making", "Fine Dining"],
      mainImageUrl: "https://images.unsplash.com/photo-1595475207225-4288f6ae566a?w=800&h=600&fit=crop&crop=center",
      profileImageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=center",
      isVerified: true
    },
    {
      id: 2,
      name: "Maria Garcia",
      location: "Manchester",
      rating: 4.9,
      reviewCount: 98,
      description: "Award-winning chef specializing in Spanish and Mediterranean cuisine with a modern twist.",
      services: ["Spanish", "Tapas", "Seafood"],
      mainImageUrl: "https://images.unsplash.com/photo-1541614107199-1cfdf4d421bf?w=800&h=600&fit=crop&crop=center",
      profileImageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=center",
    },
  ];

  // Mock data for services
  const serviceItems: ServiceItem[] = [
    {
      id: 1,
      title: "Private Chef Experience",
      description: "A luxurious dining experience at home with a personal chef preparing a customized menu just for you.",
      price: "150",
      imageUrl: "https://images.unsplash.com/photo-1504674900247-0877039348bf?w=800&h=600&fit=crop&crop=center",
      rating: 4.9,
      reviewCount: 87,
      location: "London",
      services: ["Private Dining", "Custom Menus", "Fine Dining"],
      profileImageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=center",
      isVerified: true
    },
    {
      id: 2,
      title: "Cooking Class",
      description: "Learn to cook authentic Italian dishes from a professional chef in a fun, interactive session.",
      price: "75",
      imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&h=600&fit=crop&crop=center",
      rating: 4.7,
      reviewCount: 64,
      location: "Manchester",
      services: ["Italian Cuisine", "Hands-on Cooking", "Group Classes"],
      profileImageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=center"
    },
  ];

  const renderContent = (): JSX.Element => {
    switch (cardType) {
      case 'menu':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {menuItems.map((menu) => (
              <div key={menu.id} className="w-full">
                <MenuListing
                  id={menu.id}
                  img={menu.img}
                  location={menu.location}
                  price={menu.price}
                  title={menu.title}
                />
              </div>
            ))}
          </div>
        );
      case 'chef':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {chefItems.map((chef) => (
              <div key={chef.id} className="w-full">
                <ChefCard
                  description={chef.description}
                  isVerified={chef.isVerified}
                  location={chef.location}
                  mainImageUrl={chef.mainImageUrl}
                  name={chef.name}
                  profileImageUrl={chef.profileImageUrl}
                  rating={chef.rating}
                  reviewCount={chef.reviewCount}
                  services={chef.services}
                />
              </div>
            ))}
          </div>
        );
      case 'service':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {serviceItems.map((service) => (
              <div key={service.id} className="w-full">
                <ServiceListing
                  description={service.description}
                  isVerified={service.isVerified}
                  location={service.location}
                  mainImageUrl={service.imageUrl}
                  name={service.title}
                  profileImageUrl={service.profileImageUrl}
                  rating={service.rating}
                  reviewCount={service.reviewCount}
                  services={service.services}
                  price={service.price}
                  title={service.title}
                />
              </div>
            ))}
          </div>
        );
      default:
        return <div>No content available</div>;
    }
  };

  return (
    <div className="w-full px-12 max-md:px-6 max-sm:px-4 py-8">
      <div className="w-full max-w-[1440px] mx-auto">
        <div className="flex flex-col gap-8 w-full">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};
