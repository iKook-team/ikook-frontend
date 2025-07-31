import React from 'react';

export function TrustedOrganizationsSection() {
  return (
    <section className="bg-white py-16 px-6 lg:px-16">
      <div className="max-w-7xl mx-auto text-center">
        <div className="text-center mb-12">
          <div className="relative">
            <div className="absolute top-0 left-[15%] right-[15%] h-0.5 bg-gray-200" />
            <div className="absolute bottom-0 left-[15%] right-[15%] h-0.5 bg-gray-200" />
            <h2 className="text-3xl lg:text-4xl font-medium text-[#323335] py-4 bg-white inline-block px-8">
              Trusted by huge Organizations
            </h2>
          </div>
        </div>
        
        <div className="mb-8">
          <img 
            src="https://api.builder.io/api/v1/image/assets/TEMP/de695800d6cc284f210f5caeec5f42030caf90bf?width=1666"
            alt="Partner organizations logos"
            className="mx-auto max-w-4xl w-full h-auto"
          />
        </div>
        
        <p className="text-xl text-ikook-secondary max-w-4xl mx-auto">
          and individuals for Private dining, Corporate, Small and Large events
        </p>
      </div>
    </section>
  );
}
