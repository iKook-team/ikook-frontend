
import React, { useState } from 'react';

interface MenuItem {
  id: string;
  name: string;
  checked: boolean;
}

export const QuotePreview: React.FC = () => {
  const [starterItems, setStarterItems] = useState<MenuItem[]>([
    { id: '1', name: 'Mediterranean Chicken Kebab with Garlic Sauce', checked: false },
    { id: '2', name: 'Roasted Red Pepper Greek Yoghurt Hummus', checked: false }
  ]);

  const [mainItems, setMainItems] = useState<MenuItem[]>([
    { id: '3', name: 'Mackerel with Lemon Olive Oil and Tomatoes', checked: false }
  ]);

  const [dessertItems, setDessertItems] = useState<MenuItem[]>([
    { id: '4', name: 'Mackerel with Lemon Olive Oil and Tomatoes', checked: false }
  ]);

  const handleItemToggle = (
    items: MenuItem[],
    setItems: React.Dispatch<React.SetStateAction<MenuItem[]>>,
    id: string
  ) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const handleSendQuote = () => {
    const selectedItems = [
      ...starterItems.filter(item => item.checked),
      ...mainItems.filter(item => item.checked),
      ...dessertItems.filter(item => item.checked)
    ];
    console.log('Sending quote with items:', selectedItems);
  };

  const MenuSection: React.FC<{
    title: string;
    items: MenuItem[];
    onToggle: (id: string) => void;
  }> = ({ title, items, onToggle }) => (
    <div className="w-[390px] max-w-full mt-6">
      <div className="text-lg text-black font-medium leading-loose">
        <div>{title}</div>
      </div>
      <div className="mt-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-3 mt-3">
            <div className="self-stretch flex items-center justify-center w-5 my-auto">
              <button
                onClick={() => onToggle(item.id)}
                className="aspect-[1] object-contain w-5 self-stretch my-auto hover:opacity-70 transition-opacity"
              >
                <img
                  src="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/d04239e7bad5d3b68dcecde21f8d03a29f9bf978?placeholderIfAbsent=true"
                  className="w-full h-full"
                  alt={item.checked ? "Checked" : "Unchecked"}
                />
              </button>
            </div>
            <div className="text-[#3F3E3D] text-base font-normal self-stretch my-auto">
              {item.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="grow mt-6 max-md:mt-10 max-md:max-w-full">
      
      <div className="flex flex-col justify-center px-2.5 py-3 w-full bg-white rounded-md border-solid shadow-2xl border-[0.639px] border-neutral-200 max-md:max-w-full">
        <div className="flex gap-4 items-start">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/9f5b325159a2a4814c8c96c3a0659ce4ebd41156?placeholderIfAbsent=true"
            className="object-contain shrink-0 aspect-[1.12] w-[113px]"
            alt="Braised Chicken"
          />
          <div className="flex flex-col min-w-60 w-[339px]">
            <h2 className="text-lg font-semibold leading-7 text-zinc-800">
              Braised Chicken With Lemon and Olives
            </h2>
            <div className="flex gap-2 items-center self-start px-2 py-1 mt-1 text-xs text-black bg-amber-100 rounded-md">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/a9da32595396357c135403f4072880ce67d7078f?placeholderIfAbsent=true"
                className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
                alt="Chef"
              />
              <span className="self-stretch my-auto">Chloe Esther</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex min-h-[335px] flex-col bg-[#FFFCF5] ml-2.5 mt-6 pt-2.5 pb-[25px] px-2.5 rounded-md max-md:max-w-full">
        <MenuSection
          title="Starter x2"
          items={starterItems}
          onToggle={(id) => handleItemToggle(starterItems, setStarterItems, id)}
        />
        
        <MenuSection
          title="Main x1"
          items={mainItems}
          onToggle={(id) => handleItemToggle(mainItems, setMainItems, id)}
        />
        
        <MenuSection
          title="Desert x1"
          items={dessertItems}
          onToggle={(id) => handleItemToggle(dessertItems, setDessertItems, id)}
        />
      </div>

      <div className="flex w-full flex-col items-stretch ml-2.5 mt-[30px] max-md:max-w-full max-md:mr-[9px]">
        <div className="flex flex-col text-sm text-black font-normal leading-none">
          <div className="flex items-center gap-2">
            <img
              src="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/3f07306ff168cdfbbc1ec048a31ae9cad545073c?placeholderIfAbsent=true"
              className="aspect-[1] object-contain w-4 self-stretch shrink-0 my-auto"
              alt="Date"
            />
            <div className="self-stretch my-auto">
              August 16, 2023
            </div>
          </div>
          <div className="self-stretch flex items-center gap-2 mt-6">
            <img
              src="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/1420f97bee27b190a8f78da5d687cc5ea7c2de9a?placeholderIfAbsent=true"
              className="aspect-[1] object-contain w-4 self-stretch shrink-0 my-auto"
              alt="Location"
            />
            <div className="self-stretch my-auto">
              67 Queens Road, London, EC03 4AR
            </div>
          </div>
          <div className="flex items-center gap-2 mt-6">
            <img
              src="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/70435404a95f8790c51695afdaf73c024aa768ca?placeholderIfAbsent=true"
              className="aspect-[1] object-contain w-4 self-stretch shrink-0 my-auto"
              alt="Guests"
            />
            <div className="self-stretch my-auto">
              10 Adults, 3 Teens, 6 Kids
            </div>
          </div>
        </div>
        
        <div className="text-[#323335] mt-7 max-md:max-w-full">
          <div className="text-base font-medium max-md:max-w-full">
            <div className="flex max-md:max-w-full">
              <div className="text-[#323335] w-[209px]">
                10 Guests * £20
              </div>
              <div className="text-[#323335] text-right w-[35px]">
                £56
              </div>
            </div>
            <div className="flex mt-3 max-md:max-w-full">
              <div className="text-[#323335] w-[209px]">
                Platform fee 2.5%
              </div>
              <div className="text-[#323335] text-right w-12">
                £20
              </div>
            </div>
          </div>
          <div className="text-lg font-semibold whitespace-nowrap leading-loose mt-6 max-md:max-w-full">
            <div className="flex max-md:max-w-full">
              <div className="text-[#323335] w-[209px]">
                TOTAL
              </div>
              <div className="text-[#323335] text-right">
                £1,435
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};