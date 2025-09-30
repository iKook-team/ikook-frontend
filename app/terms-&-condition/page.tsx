import React from "react";

import { Navigation } from "@/components/auth/Navigation";
import { Footer } from "@/components/footer/footer";
import TermsSection from "@/components/terms/terms-section";

const Index = () => {
  return (
    <div className="bg-white flex flex-col overflow-hidden items-stretch">
      <Navigation />

      <main className="flex w-full flex-col items-stretch mt-[110px] max-md:mt-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-20 md:mb-28 lg:mb-32">
          <div className="max-md:max-w-full">
            <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
              <div className="w-[71%] max-md:w-full max-md:ml-0">
                <div className="flex flex-col self-stretch items-stretch my-auto max-md:max-w-full max-md:mt-10">
                  <h1 className="text-[#323335] text-[70px] font-bold leading-none max-md:max-w-full max-md:text-[40px]">
                    Terms and
                    <span className="ml-3 relative inline-block">
                      <span className="absolute bottom-1 md:bottom-2 left-0 w-full h-3 md:h-4 bg-[#FCC01C] z-[2]" />
                      <span className="relative z-[3]">Conditions</span>
                    </span>
                  </h1>
                  <div className="text-[#323335] text-xl font-medium mt-[74px] max-md:max-w-full max-md:mt-10">
                    These Terms of Use govern your access to and use of our
                    website and application app. Please read these Terms of Use
                    carefully, and contact us if you have any questions.
                    <br />
                    Your use of our Website and App indicates that you have read
                    and accepted these Terms of Use and you warrant that you
                    have the legal capacity to accept these Terms of Use.
                    <br />
                    We are committed to protecting your privacy. Our privacy
                    policy is available at www.ikook.com. By agreeing to these
                    Terms of Use, you also agree to the terms in our privacy
                    policy.
                    <br />
                  </div>
                </div>
              </div>
              <div className="w-[29%] ml-5 max-md:w-full max-md:ml-0">
                <img
                  src="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/ffebbc8aad116168e80a6718b716bdef866a8682?placeholderIfAbsent=true"
                  className="aspect-[1] object-contain w-full max-md:mt-[33px]"
                  alt="Terms and conditions illustration"
                />
              </div>
            </div>
          </div>

          <TermsSection
            icon="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/46879fb71c24dda91dbc6f90019fdf30d029d52d?placeholderIfAbsent=true"
            title="Licence"
            content="1.1 We grant you a non-exclusive, royalty-free, revocable, worldwide, non-transferable right and licence to use our Website and App for your personal use by these Terms of Use."
          />

          <TermsSection
            icon="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/46879fb71c24dda91dbc6f90019fdf30d029d52d?placeholderIfAbsent=true"
            title="Our intellectual property rights"
            content="2.1 Our Website and App contain material that is owned by or licensed to us and is protected by international laws, including without limitation the trademarks, trade names, software, content, design, images, graphics, layout, appearance and look of our Website and App.
2.2 We own the copyright which subsists in all creative and literary works displayed on our Website and App.
2.3 As between you and us, we own all the intellectual property rights in our Website and App and nothing in these Terms of Use constitutes a transfer of the ownership of any intellectual property rights to you.
2.4 Your use of our Website and App does not grant you a licence or act as a right of use, of any of the intellectual property, whether registered or unregistered, displayed on our Website or App without the express written permission of the owner."
          />

          <TermsSection
            icon="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/9146aeb49390c6bdc85435d8d817b8cbf4dbd8b3?placeholderIfAbsent=true"
            title="Content"
            content="3.1 We allow you to post content on our Website and App (User Content). You are solely responsible for the User Content that you post on our Website and App.
3.2 When you add User Content to our Website and App, you:
(a) warrant that you have all necessary rights to post the User Content;
(b) grant us a perpetual, non-exclusive, royalty-free, irrevocable, worldwide and transferable right and licence to use the User Content in any way (including without limitation reproducing, changing and communicating the content to thepublic) and permit us to authorise any other person to do the same; and
(c) consent to any act or omission by us or authorised by us which would otherwise constitute an infringement of your moral rights, and if you add any User Content in which any third party has moral rights, you must ensure that the third party consents in the same manner."
          />

          <TermsSection
            icon="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/9146aeb49390c6bdc85435d8d817b8cbf4dbd8b3?placeholderIfAbsent=true"
            title="Prohibited conduct"
            content="4.1 You must not:
(a) use our Website or App for any activities, or post or transmit any material from our Website or App:
(i) unless you hold all necessary rights, licences and consents to do so;
(ii) that infringes the intellectual property or other rights of any person;
(iii) that would cause you or us to breach any law, regulation, rule, code or other legal obligation;
(iv) that defames, harasses, threatens, menaces or offends any person;
(v) that is or could reasonably be considered to be obscene, inappropriate, defamatory, disparaging, indecent, seditious, offensive, pornographic, threatening, abusive, liable to incite racial hatred, discriminatory,blasphemous, in breach of confidence or breach of privacy; or
(vi) that would bring us, or our Website or App, into disrepute;
(b) use our Website or App to transmit, distribute, post or submit any information concerning any other person or entity without their permission (including without limitation photographs, personal contact information or credit card details);
(c) use our Website or App to send unsolicited messages to other users;
(d) perform any acts which would damage, interfere with or inhibit the use of our Website and App;
(e) use or attempt to use any engines, software, tools, or other mechanisms (including without limitation browsers, spiders, robots, avatars or intelligent agents) to navigate or search our Website other than the commonly recognised search engine and agents and other generally available third party web browsers;
(f) attempt to decipher, decompile, disassemble or reverse engineer any of the code or software comprising in or in any way making up a part of our Website or App;
(g) engage in any screen scraping or data acquisition and consolidation;
(h) alter or modify, or attempt to alter or modify, any of the code or material on our Website or App;
(i) cause any of the material on our Website or App to be framed or embedded in another website;
(j) create derivative works from the contents of our Website or App; or advocate, encourage or assist any third party in doing any of the foregoing. 
(k) exchange, send phone numbers or an email address during your communication on our website or app
4.2 We reserve the right to amend or delete any User Content and to block you from our Website and App if we believe that there is a violation of these Terms of Use."
          />

          <TermsSection
            icon="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/9146aeb49390c6bdc85435d8d817b8cbf4dbd8b3?placeholderIfAbsent=true"
            title="Information"
            content="5.1 Any information made available on our Website or App, including any recommendations, statements and opinions contained on our Website or App whether published by us or any other user (Information), is for general information purposes only. The Information does not take into account your specific circumstances and any reliance you place on the Information is at your own risk.
5.2 Before acting on any Information, we recommend that you:
(a) consider whether it is appropriate for your circumstances;
(b) carry out your research; and
(c) seek professional advice where necessary."
          />

          <TermsSection
            icon="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/9146aeb49390c6bdc85435d8d817b8cbf4dbd8b3?placeholderIfAbsent=true"
            title="Third-party links"
            content="6.1 Our Website and App may contain links to third-party websites, advertisers, services, special offers or other events or activities that are not owned or controlled by us. We do not endorse, sponsor or approve any such third-party sites, information, materials, products or services.
6.2 If you access any third-party website, service or content via our Website or App, you do so at your own risk. We will have no liability arising from your use of or access to any third-party website, service or content."
          />

          <TermsSection
            icon="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/d9faa0eaf9497f57c3f8798ed0896123d687dc2e?placeholderIfAbsent=true"
            title="Accessibility"
            content="7.1 Whilst we take all reasonable steps to minimise any delays and interruptions to your use of our Website and App, we cannot warrant that our Website and App will be available at all times or at any given time.
7.2 We are not responsible for any delays or interruptions which affect your ability to use our Website or App.
7.3 We may, at any time and without notice, discontinue our Website or App, and we are not responsible for any loss, cost, damage or liability which may result from such discontinuance."
          />

          <TermsSection
            icon="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/d9faa0eaf9497f57c3f8798ed0896123d687dc2e?placeholderIfAbsent=true"
            title="Disclaimer"
            content="8.1 To the maximum extent permitted by law, our Website and App are provided to you without warranties, express or implied, including without limitation, implied warranties of merchantability and fitness for a particular purpose. We do not warrant that:
(a) the functions contained in any material in our Website or App or your access to our Website or App will be error-free;
(b) any defects on our Website or App will be corrected;
(c) our Website, App or server which stores and transmits material to you, are free of viruses or any other harmful components; or
(d) our Website or App will operate continuously or be available at any time.
8.2 You acknowledge and agree that we are not responsible for and will not accept liability for any User Content that you or any other user or third party posts or transmits using our Website or App. You understand and agree that you may be exposed to User Content that is inaccurate, inappropriate, defamatory, offensive or otherwise unsuited to your purpose.
8.3 To the maximum extent permitted by law:
(a) we make no representations or warranties (express or implied) about the completeness, accuracy, reliability, suitability or availability of any Information, images, products, services, or graphics published on our Website or App; and
(b) we exclude:
(i) all representations, guarantees, warranties or terms (whether express or implied) other than those expressly set out in these Terms of Use; and
(ii) all liability for any loss, damage, costs or expense, whether direct, indirect, incidental, special and/or consequential including loss of profits, suffered by you or any third party, or claims made against you or any third party which result from your use of our Website or App."
          />

          <TermsSection
            icon="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/d9faa0eaf9497f57c3f8798ed0896123d687dc2e?placeholderIfAbsent=true"
            title="Indemnity"
            content="9.1 You indemnify us for all claims, actions, suits, demands, damages, liabilities, costs or expenses (including legal costs and expenses) incurred or suffered by us and any of our officers, employees or agents, which arise out of or are connected to:
(a) your use or access to our Website or App;
(b) a breach of these Terms of Use by you; or
(c) any wilful, unlawful or negligent act or omission by you.
9.2 The indemnity under clause 9.1 will survive the termination of these Terms of Use."
          />

          <TermsSection
            icon="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/d9faa0eaf9497f57c3f8798ed0896123d687dc2e?placeholderIfAbsent=true"
            title="Breach"
            content="10.1 If you breach these Terms of Use, notwithstanding any other rights we may have, we may, without notice to you, deactivate your account and block you from our Website and App."
          />

          <TermsSection
            icon="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/d9faa0eaf9497f57c3f8798ed0896123d687dc2e?placeholderIfAbsent=true"
            title="Assignment"
            content="11.1 These Terms of Use, and any rights and licences granted to you under these Terms of Use, cannot be transferred or assigned by you to a third party. However, these Terms of Use may be assigned by us, at any time, without notice to you."
          />

          <TermsSection
            icon="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/d9faa0eaf9497f57c3f8798ed0896123d687dc2e?placeholderIfAbsent=true"
            title="Waiver"
            content="12.1 If we fail to exercise or delay in exercising the right, power or remedy, we do not waive the right, power or remedy.
12.2 If we do not act about a breach by you of these Terms of Use, this does not waive our right to act concerning that breach or subsequent or similar breaches."
          />

          <TermsSection
            icon="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/d9faa0eaf9497f57c3f8798ed0896123d687dc2e?placeholderIfAbsent=true"
            title="Enforceability"
            content="13.1 If any provision of these Terms of Use is found to be illegal, invalid or unenforceable by a court of law in respect of jurisdiction, then that provision will not apply in that jurisdiction and is deemed not to have been included in the Terms of Use in that jurisdiction. This will not affect the remainder of the remaining provisions."
          />

          <TermsSection
            icon="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/d9faa0eaf9497f57c3f8798ed0896123d687dc2e?placeholderIfAbsent=true"
            title="Governing law"
            content="14.1 These Terms of Use are governed by and construed by the law for the time being in force in the UK, Nigeria, Canada and you, by agreeing to these Terms of Use, are deemed to have submitted to the non-exclusive jurisdiction of the courts of the UK and courts of appeal from those courts.
14.2 Our Website and App may be accessible from outside of the UK, Nigeria and Canada. We make no representation that our Website or App complies with the laws (including intellectual property laws) of any country outside the UK, Nigeria and Canada. If you access our Website or App from the outside UK, Nigeria and Canada, you do so at your own risk and you are responsible for complying with the laws in the place where you access our Website or App."
          />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
