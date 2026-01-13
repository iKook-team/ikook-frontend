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
                    Terms of
                    <span className="ml-3 relative inline-block">
                      <span className="absolute bottom-1 md:bottom-2 left-0 w-full h-3 md:h-4 bg-[#FCC01C] z-[2]" />
                      <span className="relative z-[3]">Service</span>
                    </span>
                  </h1>
                  <div className="text-[#323335] text-base font-medium mt-4">Last updated July 5th, 2024</div>
                  <div className="text-[#323335] text-xl font-medium mt-[40px] max-md:max-w-full max-md:mt-6 space-y-6">
                    <p>AGREEMENT TO OUR LEGAL TERMS</p>
                    <p>
                      We are iKooK ("we", "us", or "our"), a company registered in the United Kingdom at 27 Old Gloucester St, London WC1N 3AX. We operate the website https://ikook.co.uk (the "Site"), the mobile application iKooK (the "App"), as well as any other related products and services that refer or link to these legal terms (the "Legal Terms") (collectively, the "Services").
                    </p>
                    <p>
                      You can contact us by phone at 02045207041, email at info@ikook.co.uk, or by mail to 27 Old Gloucester St, London WC1N 3AX, United Kingdom.
                    </p>
                    <p>
                      These Legal Terms constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you"), and iKooK, concerning your access to and use of the Services. You agree that by accessing the Services, you have read, understood, and agreed to be bound by all of these Legal Terms. IF YOU DO NOT AGREE WITH ALL OF THESE LEGAL TERMS, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SERVICES AND YOU MUST DISCONTINUE USE IMMEDIATELY.
                    </p>
                    <p>
                      We will provide you with prior notice of any scheduled changes to the Services you are using. The modified Legal Terms will become effective upon posting or notifying you by support@ikook.co.uk, as stated in the email message. By continuing to use the Services after the effective date of any changes, you agree to be bound by the modified terms.
                    </p>
                    <p>
                      The Services are intended for users who are at least 18 years old. Persons under the age of 18 are not permitted to use or register for the Services.
                    </p>
                    <p>We recommend that you print a copy of these Legal Terms for your records.</p>
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
            title="1. OUR SERVICES"
            content={`The information provided when using the Services is not intended for distribution to or use by any person or entity in any jurisdiction or country where such distribution or use would be contrary to law or regulation or which would subject us to any registration requirement within such jurisdiction or country. Accordingly, those persons who choose to access the Services from other locations do so on their own initiative and are solely responsible for compliance with local laws, if and to the extent local laws are applicable.

The Services are not tailored to comply with industry-specific regulations (Health Insurance Portability and Accountability Act (HIPAA), Federal Information Security Management Act (FISMA), etc.), so if your interactions would be subjected to such laws, you may not use the Services. You may not use the Services in a way that would violate the Gramm-Leach-Bliley Act (GLBA).`}
          />

          <TermsSection
            icon="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/46879fb71c24dda91dbc6f90019fdf30d029d52d?placeholderIfAbsent=true"
            title="2. INTELLECTUAL PROPERTY RIGHTS"
            content={`We are the owner or the licensee of all intellectual property rights in our Services, including all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics in the Services (collectively, the 'Content'), as well as the trademarks, service marks, and logos contained therein (the 'Marks').

Our Content and Marks are protected by copyright and trademark laws (and various other intellectual property rights and unfair competition laws) and treaties in the United States and around the world.

The Content and Marks are provided in or through the Services 'AS IS' for your personal, non-commercial use or internal business purpose only.

Your use of our Services

Subject to your compliance with these Legal Terms, including the 'PROHIBITED ACTIVITIES' section below, we grant you a non-exclusive, non-transferable, revocable licence to:
- access the Services; and
- download or print a copy of any portion of the Content to which you have properly gained access.
solely for your personal, non-commercial use or internal business purpose.

Except as set out in this section or elsewhere in our Legal Terms, no part of the Services and no Content or Marks may be copied, reproduced, aggregated, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted, distributed, sold, licensed, or otherwise exploited for any commercial purpose whatsoever, without our express prior written permission.

If you wish to make any use of the Services, Content, or Marks other than as set out in this section or elsewhere in our Legal Terms, please address your request to: info@ikook.co.uk. If we ever grant you the permission to post, reproduce, or publicly display any part of our Services or Content, you must identify us as the owners or licensors of the Services, Content, or Marks and ensure that any copyright or proprietary notice appears or is visible on posting, reproducing, or displaying our Content.

We reserve all rights not expressly granted to you in and to the Services, Content, and Marks.

Any breach of these Intellectual Property Rights will constitute a material breach of our Legal Terms and your right to use our Services will terminate immediately.

Your submissions and contributions

Please review this section and the 'PROHIBITED ACTIVITIES' section carefully prior to using our Services to understand the (a) rights you give us and (b) obligations you have when you post or upload any content through the Services.

Submissions: By directly sending us any question, comment, suggestion, idea, feedback, or other information about the Services ('Submissions'), you agree to assign to us all intellectual property rights in such Submission. You agree that we shall own this Submission and be entitled to its unrestricted use and dissemination for any lawful purpose, commercial or otherwise, without acknowledgment or compensation to you.

Contributions: The Services may invite you to chat, contribute to, or participate in blogs, message boards, online forums, and other functionality during which you may create, submit, post, display, transmit, publish, distribute, or broadcast content and materials to us or through the Services, including but not limited to text, writings, video, audio, photographs, music, graphics, comments, reviews, rating suggestions, personal information, or other material ('Contributions'). Any Submission that is publicly posted shall also be treated as a Contribution.

You understand that Contributions may be viewable by other users of the Services and possibly through third-party websites.

When you post Contributions, you grant us a licence (including use of your name, trademarks, and logos): By posting any Contributions, you grant us an unrestricted, unlimited, irrevocable, perpetual, non-exclusive, transferable, royalty-free, fully-paid, worldwide right, and licence to: use, copy, reproduce, distribute, sell, resell, publish, broadcast, retitle, store, publicly perform, publicly display, reformat, translate, excerpt (in whole or in part), and exploit your Contributions (including, without limitation, your image, name, and voice) for any purpose, commercial, advertising, or otherwise, to prepare derivative works of, or incorporate into other works, your Contributions, and to sublicence the licences granted in this section. Our use and distribution may occur in any media formats and through any media channels.

This licence includes our use of your name, company name, and franchise name, as applicable, and any of the trademarks, service marks, trade names, logos, and personal and commercial images you provide.

You are responsible for what you post or upload: By sending us Submissions and/or posting Contributions through any part of the Services or making Contributions accessible through the Services by linking your account through the Services to any of your social networking accounts, you:
- confirm that you have read and agree with our 'PROHIBITED ACTIVITIES' and will not post, send, publish, upload, or transmit through the Services any Submission nor post any Contribution that is illegal, harassing, hateful, harmful, defamatory, obscene, bullying, abusive, discriminatory, threatening to any person or group, sexually explicit, false, inaccurate, deceitful, or misleading;
- to the extent permissible by applicable law, waive any and all moral rights to any such Submission and/or Contribution; warrant that any such Submission and/or Contributions are original to you or that you have the necessary rights and licences to submit such Submissions and/or Contributions and that you have full authority to grant us the above-mentioned rights in relation to your Submissions and/or Contributions; and
- warrant and represent that your Submissions and/or Contributions do not constitute confidential information.

You are solely responsible for your Submissions and/or Contributions and you expressly agree to reimburse us for any and all losses that we may suffer because of your breach of (a) this section, (b) any third party’s intellectual property rights, or (c) applicable law.

We may remove or edit your Content: Although we have no obligation to monitor any Contributions, we shall have the right to remove or edit any Contributions at any time without notice if in our reasonable opinion we consider such Contributions harmful or in breach of these Legal Terms. If we remove or edit any such Contributions, we may also suspend or disable your account and report you to the authorities.

Copyright infringement

We respect the intellectual property rights of others. If you believe that any material available on or through the Services infringes upon any copyright you own or control, please immediately refer to the 'COPYRIGHT INFRINGEMENTS' section below.`}
          />

          <TermsSection
            icon="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/9146aeb49390c6bdc85435d8d817b8cbf4dbd8b3?placeholderIfAbsent=true"
            title="3. USER REPRESENTATIONS"
            content={`By using the Services, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information and promptly update such registration information as necessary; (3) you have the legal capacity and you agree to comply with these Legal Terms; (4) you are not a minor in the jurisdiction in which you reside; (5) you will not access the Services through automated or non-human means, whether through a bot, script or otherwise; (6) you will not use the Services for any illegal or unauthorised purpose; and (7) your use of the Services will not violate any applicable law or regulation.

If you provide any information that is untrue, inaccurate, not current, or incomplete, we have the right to suspend or terminate your account and refuse any and all current or future use of the Services (or any portion thereof).`}
          />

          <TermsSection
            icon="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/9146aeb49390c6bdc85435d8d817b8cbf4dbd8b3?placeholderIfAbsent=true"
            title="4. USER REGISTRATION"
            content={`You may be required to register to use the Services. You agree to keep your password confidential and will be responsible for all use of your account and password. We reserve the right to remove, reclaim, or change a username you select if we determine, in our sole discretion, that such username is inappropriate, obscene, or otherwise objectionable.`}
          />

          <TermsSection
            icon="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/46879fb71c24dda91dbc6f90019fdf30d029d52d?placeholderIfAbsent=true"
            title="5. PURCHASES AND PAYMENT"
            content={`We accept the following forms of payment:
- Visa
- Mastercard
- PayPal
- Bank Transfer

You agree to provide current, complete, and accurate purchase and account information for all purchases made via the Services. You further agree to promptly update account and payment information, including email address, payment method, and payment card expiration date, so that we can complete your transactions and contact you as needed. Sales tax will be added to the price of purchases as deemed required by us. We may change prices at any time. All payments shall be in US Dollars, Naira, Pounds, South African R, Euro, Canadian Dollar and others.

You agree to pay all charges at the prices then in effect for your purchases and any applicable shipping fees, and you authorise us to charge your chosen payment provider for any such amounts upon placing your order. We reserve the right to correct any errors or mistakes in pricing, even if we have already requested or received payment.

We reserve the right to refuse any order placed through the Services. We may, in our sole discretion, limit or cancel quantities purchased per person, per household, or per order. These restrictions may include orders placed by or under the same customer account, the same payment method, and/or orders that use the same billing or shipping address. We reserve the right to limit or prohibit orders that, in our sole judgement, appear to be placed by dealers, resellers, or distributors.`}
          />

          <TermsSection
            icon="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/46879fb71c24dda91dbc6f90019fdf30d029d52d?placeholderIfAbsent=true"
            title="6. POLICY"
            content={`All sales are final and no refund will be issued.`}
          />

          <TermsSection
            icon="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/9146aeb49390c6bdc85435d8d817b8cbf4dbd8b3?placeholderIfAbsent=true"
            title="7. PROHIBITED ACTIVITIES"
            content={`You may not access or use the Services for any purpose other than that for which we make the Services available. The Services may not be used in connection with any commercial endeavours except those that are specifically endorsed or approved by us.

As a user of the Services, you agree not to:
- Systematically retrieve data or other content from the Services to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us.
- Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account information such as user passwords.
- Circumvent, disable, or otherwise interfere with security-related features of the Services, including features that prevent or restrict the use or copying of any Content or enforce limitations on the use of the Services and/or the Content contained therein
- Disparage, tarnish, or otherwise harm, in our opinion, us and/or the Services.
- Use any information obtained from the Services in order to harass, abuse, or harm another person.
- Make improper use of our support services or submit false reports of abuse or misconduct.
- Use the Services in a manner inconsistent with any applicable laws or regulations.
- Engage in unauthorised framing of or linking to the Services.
- Upload or transmit (or attempt to upload or to transmit) viruses, Trojan horses, or other material, including excessive use of capital letters and spamming (continuous posting of repetitive text), that interferes with any party’s uninterrupted use and enjoyment of the Services or modifies, impairs, disrupts, alters, or interferes with the use, features, functions, operation, or maintenance of the Services.
- Engage in any automated use of the system, such as using scripts to send comments or messages, or using any data mining, robots, or similar data gathering and extraction tools.
- Delete the copyright or other proprietary rights notice from any Content.
- Attempt to impersonate another user or person or use the username of another user.
- Upload or transmit (or attempt to upload or to transmit) any material that acts as a passive or active information collection or transmission mechanism, including without limitation, clear graphics interchange formats ('gifs'), 1×1 pixels, web bugs, cookies, or other similar devices (sometimes referred to as 'spyware' or 'passive collection mechanisms' or 'pcms').
- Interfere with, disrupt, or create an undue burden on the Services or the networks or services connected to the Services.
- Harass, annoy, intimidate, or threaten any of our employees or agents engaged in providing any portion of the Services to you.
- Attempt to bypass any measures of the Services designed to prevent or restrict access to the Services, or any portion of the Services.
- Copy or adapt the Services' software, including but not limited to Flash, PHP, HTML, JavaScript, or other code.
- Except as permitted by applicable law, decipher, decompile, disassemble, or reverse engineer any of the software comprising or in any way making up a part of the Services.
- Except as may be the result of standard search engine or Internet browser usage, use, launch, develop, or distribute any automated system, including without limitation, any spider, robot, cheat utility, scraper, or offline reader that accesses the Services, or use or launch any unauthorised script or other software.
- Use a buying agent or purchasing agent to make purchases on the Services.
- Make any unauthorised use of the Services, including collecting usernames and/or email addresses of users by electronic or other means for the purpose of sending unsolicited email, or creating user accounts by automated means or under false pretences.
- Use the Services as part of any effort to compete with us or otherwise use the Services and/or the Content for any revenue-generating endeavour or commercial enterprise.
- Use the Services to advertise or offer to sell goods and services.`}
          />

          <TermsSection
            icon="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/9146aeb49390c6bdc85435d8d817b8cbf4dbd8b3?placeholderIfAbsent=true"
            title="8. USER GENERATED CONTRIBUTIONS"
            content={`The Services may invite you to chat, contribute to, or participate in blogs, message boards, online forums, and other functionality, and may provide you with the opportunity to create, submit, post, display, transmit, perform, publish, distribute, or broadcast content and materials to us or on the Services, including but not limited to text, writings, video, audio, photographs, graphics, comments, suggestions, or personal information or other material (collectively, 'Contributions'). Contributions may be viewable by other users of the Services and through third-party websites. As such, any Contributions you transmit may be treated as non-confidential and non-proprietary. When you create or make available any Contributions, you thereby represent and warrant that:
- The creation, distribution, transmission, public display, or performance, and the accessing, downloading, or copying of your Contributions do not and will not infringe the proprietary rights, including but not limited to the copyright, patent, trademark, trade secret, or moral rights of any third party.
- You are the creator and owner of or have the necessary licences, rights, consents, releases, and permissions to use and to authorise us, the Services, and other users of the Services to use your Contributions in any manner contemplated by the Services and these Legal Terms.
- You have the written consent, release, and/or permission of each and every identifiable individual person in your Contributions to use the name or likeness of each and every such identifiable individual person to enable inclusion and use of your Contributions in any manner contemplated by the Services and these Legal Terms.
- Your Contributions are not false, inaccurate, or misleading.
- Your Contributions are not unsolicited or unauthorised advertising, promotional materials, pyramid schemes, chain letters, spam, mass mailings, or other forms of solicitation.
- Your Contributions are not obscene, lewd, lascivious, filthy, violent, harassing, libellous, slanderous, or otherwise objectionable (as determined by us).
- Your Contributions do not ridicule, mock, disparage, intimidate, or abuse anyone.
- Your Contributions are not used to harass or threaten (in the legal sense of those terms) any other person and to promote violence against a specific person or class of people.
- Your Contributions do not violate any applicable law, regulation, or rule.
- Your Contributions do not violate the privacy or publicity rights of any third party.
- Your Contributions do not violate any applicable law concerning child pornography, or otherwise intended to protect the health or well-being of minors.
- Your Contributions do not include any offensive comments that are connected to race, national origin, gender, sexual preference, or physical handicap.
- Your Contributions do not otherwise violate, or link to material that violates, any provision of these Legal Terms, or any applicable law or regulation.

Any use of the Services in violation of the foregoing violates these Legal Terms and may result in, among other things, termination or suspension of your rights to use the Services.`}
          />

          <TermsSection
            icon="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/46879fb71c24dda91dbc6f90019fdf30d029d52d?placeholderIfAbsent=true"
            title="9. CONTRIBUTION LICENCE"
            content={`By posting your Contributions to any part of the Services or making Contributions accessible to the Services by linking your account from the Services to any of your social networking accounts, you automatically grant, and you represent and warrant that you have the right to grant, to us an unrestricted, unlimited, irrevocable, perpetual, non-exclusive, transferable, royalty-free, fully-paid, worldwide right, and licence to host, use, copy, reproduce, disclose, sell, resell, publish, broadcast, retitle, archive, store, cache, publicly perform, publicly display, reformat, translate, transmit, excerpt (in whole or in part), and distribute such Contributions (including, without limitation, your image and voice) for any purpose, commercial, advertising, or otherwise, and to prepare derivative works of, or incorporate into other works, such Contributions, and grant and authorise sublicences of the foregoing. The use and distribution may occur in any media formats and through any media channels.

This licence will apply to any form, media, or technology now known or hereafter developed, and includes our use of your name, company name, and franchise name, as applicable, and any of the trademarks, service marks, trade names, logos, and personal and commercial images you provide. You waive all moral rights in your Contributions, and you warrant that moral rights have not otherwise been asserted in your Contributions.

We do not assert any ownership over your Contributions. You retain full ownership of all of your Contributions and any intellectual property rights or other proprietary rights associated with your Contributions. We are not liable for any statements or representations in your Contributions provided by you in any area on the Services. You are solely responsible for your Contributions to the Services and you expressly agree to exonerate us from any and all responsibility and to refrain from any legal action against us regarding your Contributions.

We have the right, in our sole and absolute discretion, (1) to edit, redact, or otherwise change any Contributions; (2) to re-categorise any Contributions to place them in more appropriate locations on the Services; and (3) to pre-screen or delete any Contributions at any time and for any reason, without notice. We have no obligation to monitor your Contributions.`}
          />

          <TermsSection
            icon="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/9146aeb49390c6bdc85435d8d817b8cbf4dbd8b3?placeholderIfAbsent=true"
            title="10. GUIDELINES FOR REVIEWS"
            content={`We may provide you areas on the Services to leave reviews or ratings. When posting a review, you must comply with the following criteria: (1) you should have firsthand experience with the person/entity being reviewed; (2) your reviews should not contain offensive profanity, or abusive, racist, offensive, or hateful language; (3) your reviews should not contain discriminatory references based on religion, race, gender, national origin, age, marital status, sexual orientation, or disability; (4) your reviews should not contain references to illegal activity; (5) you should not be affiliated with competitors if posting negative reviews; (6) you should not make any conclusions as to the legality of conduct; (7) you may not post any false or misleading statements; and (8) you may not organise a campaign encouraging others to post reviews, whether positive or negative.

We may accept, reject, or remove reviews in our sole discretion. We have absolutely no obligation to screen reviews or to delete reviews, even if anyone considers reviews objectionable or inaccurate. Reviews are not endorsed by us, and do not necessarily represent our opinions or the views of any of our affiliates or partners. We do not assume liability for any review or for any claims, liabilities, or losses resulting from any review. By posting a review, you hereby grant to us a perpetual, non-exclusive, worldwide, royalty-free, fully paid, assignable, and sublicensable right and licence to reproduce, modify, translate, transmit by any means, display, perform, and/or distribute all content relating to review.`}
          />

          <TermsSection
            icon="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/9146aeb49390c6bdc85435d8d817b8cbf4dbd8b3?placeholderIfAbsent=true"
            title="11. MOBILE APPLICATION LICENCE"
            content={`Use Licence\n\nIf you access the Services via the App, then we grant you a revocable, non-exclusive, non-transferable, limited right to install and use the App on wireless electronic devices owned or controlled by you, and to access and use the App on such devices strictly in accordance with the terms and conditions of this mobile application licence contained in these Legal Terms. You shall not: (1) except as permitted by applicable law, decompile, reverse engineer, disassemble, attempt to derive the source code of, or decrypt the App; (2) make any modification, adaptation, improvement, enhancement, translation, or derivative work from the App; (3) violate any applicable laws, rules, or regulations in connection with your access or use of the App; (4) remove, alter, or obscure any proprietary notice (including any notice of copyright or trademark) posted by us or the licensors of the App; (5) use the App for any revenue-generating endeavour, commercial enterprise, or other purpose for which it is not designed or intended; (6) make the App available over a network or other environment permitting access or use by multiple devices or users at the same time; (7) use the App for creating a product, service, or software that is, directly or indirectly, competitive with or in any way a substitute for the App; (8) use the App to send automated queries to any website or to send any unsolicited commercial email; or (9) use any proprietary information or any of our interfaces or our other intellectual property in the design, development, manufacture, licensing, or distribution of any applications, accessories, or devices for use with the App.\n\nApple and Android Devices\n\nThe following terms apply when you use the App obtained from either the Apple Store or Google Play (each an 'App Distributor') to access the Services: (1) the licence granted to you for our App is limited to a non-transferable licence to use the application on a device that utilises the Apple iOS or Android operating systems, as applicable, and in accordance with the usage rules set forth in the applicable App Distributor’s terms of service; (2) we are responsible for providing any maintenance and support services with respect to the App as specified in the terms and conditions of this mobile application licence contained in these Legal Terms or as otherwise required under applicable law, and you acknowledge that each App Distributor has no obligation whatsoever to furnish any maintenance and support services with respect to the App; (3) in the event of any failure of the App to conform to any applicable warranty, you may notify the applicable App Distributor, and the App Distributor, in accordance with its terms and policies, may refund the purchase price, if any, paid for the App, and to the maximum extent permitted by applicable law, the App Distributor will have no other warranty obligation whatsoever with respect to the App; (4) you represent and warrant that (i) you are not located in a country that is subject to a US government embargo, or that has been designated by the US government as a 'terrorist supporting' country and (ii) you are not listed on any US government list of prohibited or restricted parties; (5) you must comply with applicable third-party terms of agreement when using the App, e.g. if you have a VoIP application, then you must not be in violation of their wireless data service agreement when using the App; and (6) you acknowledge and agree that the App Distributors are third-party beneficiaries of the terms and conditions in this mobile application licence contained in these Legal Terms, and that each App Distributor will have the right (and will be deemed to have accepted the right) to enforce the terms and conditions in this mobile application licence contained in these Legal Terms against you as a third-party beneficiary thereof.`}
          />

          <TermsSection
            icon="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/9146aeb49390c6bdc85435d8d817b8cbf4dbd8b3?placeholderIfAbsent=true"
            title="12. SOCIAL MEDIA"
            content={`As part of the functionality of the Services, you may link your account with online accounts you have with third-party service providers (each such account, a 'Third-Party Account') by either: (1) providing your Third-Party Account login information through the Services; or (2) allowing us to access your Third-Party Account, as is permitted under the applicable terms and conditions that govern your use of each Third-Party Account. You represent and warrant that you are entitled to disclose your Third-Party Account login information to us and/or grant us access to your Third-Party Account, without breach by you of any of the terms and conditions that govern your use of the applicable Third-Party Account, and without obligating us to pay any fees or making us subject to any usage limitations imposed by the third-party service provider of the Third-Party Account. By granting us access to any Third-Party Accounts, you understand that (1) we may access, make available, and store (if applicable) any content that you have provided to and stored in your Third-Party Account (the 'Social Network Content') so that it is available on and through the Services via your account, including without limitation any friend lists and (2) we may submit to and receive from your Third-Party Account additional information to the extent you are notified when you link your account with the Third-Party Account. Depending on the Third-Party Accounts you choose and subject to the privacy settings that you have set in such Third-Party Accounts, personally identifiable information that you post to your Third-Party Accounts may be available on and through your account on the Services. Please note that if a Third-Party Account or associated service becomes unavailable or our access to such Third-Party Account is terminated by the third-party service provider, then Social Network Content may no longer be available on and through the Services. You will have the ability to disable the connection between your account on the Services and your Third-Party Accounts at any time. PLEASE NOTE THAT YOUR RELATIONSHIP WITH THE THIRD-PARTY SERVICE PROVIDERS ASSOCIATED WITH YOUR THIRD-PARTY ACCOUNTS IS GOVERNED SOLELY BY YOUR AGREEMENT(S) WITH SUCH THIRD-PARTY SERVICE PROVIDERS. We make no effort to review any Social Network Content for any purpose, including but not limited to, for accuracy, legality, or non-infringement, and we are not responsible for any Social Network Content. You acknowledge and agree that we may access your email address book associated with a Third-Party Account and your contacts list stored on your mobile device or tablet computer solely for purposes of identifying and informing you of those contacts who have also registered to use the Services. You can deactivate the connection between the Services and your Third-Party Account by contacting us using the contact information below or through your account settings (if applicable). We will attempt to delete any information stored on our servers that was obtained through such Third-Party Account, except the username and profile picture that become associated with your account.`}
          />

          <TermsSection
            icon="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/9146aeb49390c6bdc85435d8d817b8cbf4dbd8b3?placeholderIfAbsent=true"
            title="13. THIRD-PARTY WEBSITES AND CONTENT"
            content={`The Services may contain (or you may be sent via the Site or App) links to other websites ('Third-Party Websites') as well as articles, photographs, text, graphics, pictures, designs, music, sound, video, information, applications, software, and other content or items belonging to or originating from third parties ('Third-Party Content'). Such Third-Party Websites and Third-Party Content are not investigated, monitored, or checked for accuracy, appropriateness, or completeness by us, and we are not responsible for any Third-Party Websites accessed through the Services or any Third-Party Content posted on, available through, or installed from the Services, including the content, accuracy, offensiveness, opinions, reliability, privacy practices, or other policies of or contained in the Third-Party Websites or the Third-Party Content. Inclusion of, linking to, or permitting the use or installation of any Third-Party Websites or any Third-Party Content does not imply approval or endorsement thereof by us. If you decide to leave the Services and access the Third-Party Websites or to use or install any Third-Party Content, you do so at your own risk, and you should be aware these Legal Terms no longer govern. You should review the applicable terms and policies, including privacy and data gathering practices, of any website to which you navigate from the Services or relating to any applications you use or install from the Services. Any purchases you make through Third-Party Websites will be through other websites and from other companies, and we take no responsibility whatsoever in relation to such purchases which are exclusively between you and the applicable third party. You agree and acknowledge that we do not endorse the products or services offered on Third-Party Websites and you shall hold us blameless from any harm caused by your purchase of such products or services. Additionally, you shall hold us blameless from any losses sustained by you or harm caused to you relating to or resulting in any way from any Third-Party Content or any contact with Third-Party Websites.`}
          />

          <TermsSection
            icon="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/46879fb71c24dda91dbc6f90019fdf30d029d52d?placeholderIfAbsent=true"
            title="14. SERVICES MANAGEMENT"
            content={`We reserve the right, but not the obligation, to: (1) monitor the Services for violations of these Legal Terms; (2) take appropriate legal action against anyone who, in our sole discretion, violates the law or these Legal Terms, including without limitation, reporting such user to law enforcement authorities; (3) in our sole discretion and without limitation, refuse, restrict access to, limit the availability of, or disable (to the extent technologically feasible) any of your Contributions or any portion thereof; (4) in our sole discretion and without limitation, notice, or liability, to remove from the Services or otherwise disable all files and content that are excessive in size or are in any way burdensome to our systems; and (5) otherwise manage the Services in a manner designed to protect our rights and property and to facilitate the proper functioning of the Services.`}
          />

          <TermsSection
            icon="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/46879fb71c24dda91dbc6f90019fdf30d029d52d?placeholderIfAbsent=true"
            title="15. PRIVACY POLICY"
            content={`We care about data privacy and security. Please review our Privacy Policy: https://ikook.co.uk/policy. By using the Services, you agree to be bound by our Privacy Policy, which is incorporated into these Legal Terms. Please be advised the Services are hosted in the United Kingdom, Nigeria, South Africa and Canada. If you access the Services from any other region of the world with laws or other requirements governing personal data collection, use, or disclosure that differ from applicable laws in the United Kingdom, Nigeria, South Africa and Canada, then through your continued use of the Services, you are transferring your data to the United Kingdom, Nigeria, South Africa and Canada, and you expressly consent to have your data transferred to and processed in the United Kingdom, Nigeria, South Africa and Canada.`}
          />

          <TermsSection
            icon="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/46879fb71c24dda91dbc6f90019fdf30d029d52d?placeholderIfAbsent=true"
            title="16. COPYRIGHT INFRINGEMENTS"
            content={`We respect the intellectual property rights of others. If you believe that any material available on or through the Services infringes upon any copyright you own or control, please immediately notify us using the contact information provided below (a 'Notification'). A copy of your Notification will be sent to the person who posted or stored the material addressed in the Notification. Please be advised that pursuant to applicable law you may be held liable for damages if you make material misrepresentations in a Notification. Thus, if you are not sure that material located on or linked to by the Services infringes your copyright, you should consider first contacting an attorney.`}
          />

          <TermsSection
            icon="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/46879fb71c24dda91dbc6f90019fdf30d029d52d?placeholderIfAbsent=true"
            title="17. TERM AND TERMINATION"
            content={`These Legal Terms shall remain in full force and effect while you use the Services. WITHOUT LIMITING ANY OTHER PROVISION OF THESE LEGAL TERMS, WE RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND WITHOUT NOTICE OR LIABILITY, DENY ACCESS TO AND USE OF THE SERVICES (INCLUDING BLOCKING CERTAIN IP ADDRESSES), TO ANY PERSON FOR ANY REASON OR FOR NO REASON, INCLUDING WITHOUT LIMITATION FOR BREACH OF ANY REPRESENTATION, WARRANTY, OR COVENANT CONTAINED IN THESE LEGAL TERMS OR OF ANY APPLICABLE LAW OR REGULATION. WE MAY TERMINATE YOUR USE OR PARTICIPATION IN THE SERVICES OR DELETE YOUR ACCOUNT AND ANY CONTENT OR INFORMATION THAT YOU POSTED AT ANY TIME, WITHOUT WARNING, IN OUR SOLE DISCRETION.

If we terminate or suspend your account for any reason, you are prohibited from registering and creating a new account under your name, a fake or borrowed name, or the name of any third party, even if you may be acting on behalf of the third party. In addition to terminating or suspending your account, we reserve the right to take appropriate legal action, including without limitation pursuing civil, criminal, and injunctive redress.`}
          />

          <TermsSection
            icon="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/46879fb71c24dda91dbc6f90019fdf30d029d52d?placeholderIfAbsent=true"
            title="18. MODIFICATIONS AND INTERRUPTIONS"
            content={`We reserve the right to change, modify, or remove the contents of the Services at any time or for any reason at our sole discretion without notice. However, we have no obligation to update any information on our Services. We also reserve the right to modify or discontinue all or part of the Services without notice at any time. We will not be liable to you or any third party for any modification, price change, suspension, or discontinuance of the Services.

We cannot guarantee the Services will be available at all times. We may experience hardware, software, or other problems or need to perform maintenance related to the Services, resulting in interruptions, delays, or errors. We reserve the right to change, revise, update, suspend, discontinue, or otherwise modify the Services at any time or for any reason without notice to you. You agree that we have no liability whatsoever for any loss, damage, or inconvenience caused by your inability to access or use the Services during any downtime or discontinuance of the Services. Nothing in these Legal Terms will be construed to obligate us to maintain and support the Services or to supply any corrections, updates, or releases in connection therewith.`}
          />

          <TermsSection
            icon="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/46879fb71c24dda91dbc6f90019fdf30d029d52d?placeholderIfAbsent=true"
            title="19. GOVERNING LAW"
            content={`These Legal Terms are governed by and interpreted following the laws of the United Kingdom, and the use of the United Nations Convention of Contracts for the International Sales of Goods is expressly excluded. If your habitual residence is in the EU, and you are a consumer, you additionally possess the protection provided to you by obligatory provisions of the law in your country to residence. iKooK and yourself both agree to submit to the non-exclusive jurisdiction of the courts of London, which means that you may make a claim to defend your consumer protection rights in regards to these Legal Terms in the United Kingdom, or in the EU country in which you reside.`}
          />

          <TermsSection
            icon="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/46879fb71c24dda91dbc6f90019fdf30d029d52d?placeholderIfAbsent=true"
            title="20. DISPUTE RESOLUTION"
            content={`Informal Negotiations

To expedite resolution and control the cost of any dispute, controversy, or claim related to these Legal Terms (each a 'Dispute' and collectively, the 'Disputes') brought by either you or us (individually, a 'Party' and collectively, the 'Parties'), the Parties agree to first attempt to negotiate any Dispute (except those Disputes expressly provided below) informally for at least thirty (30) days before initiating arbitration. Such informal negotiations commence upon written notice from one Party to the other Party.

Binding Arbitration

Any dispute arising from the relationships between the Parties to these Legal Terms shall be determined by one arbitrator who will be chosen in accordance with the Arbitration and Internal Rules of the European Court of Arbitration being part of the European Centre of Arbitration having its seat in Strasbourg, and which are in force at the time the application for arbitration is filed, and of which adoption of this clause constitutes acceptance. The seat of arbitration shall be the United Kingdom. The language of the proceedings shall be English. Applicable rules of substantive law shall be the law of the United Kingdom.

Restrictions

The Parties agree that any arbitration shall be limited to the Dispute between the Parties individually. To the full extent permitted by law, (a) no arbitration shall be joined with any other proceeding; (b) there is no right or authority for any Dispute to be arbitrated on a class-action basis or to utilise class action procedures; and (c) there is no right or authority for any Dispute to be brought in a purported representative capacity on behalf of the general public or any other persons.

Exceptions to Informal Negotiations and Arbitration

The Parties agree that the following Disputes are not subject to the above provisions concerning informal negotiations binding arbitration: (a) any Disputes seeking to enforce or protect, or concerning the validity of, any of the intellectual property rights of a Party; (b) any Dispute related to, or arising from, allegations of theft, piracy, invasion of privacy, or unauthorised use; and (c) any claim for injunctive relief. If this provision is found to be illegal or unenforceable, then neither Party will elect to arbitrate any Dispute falling within that portion of this provision found to be illegal or unenforceable and such Dispute shall be decided by a court of competent jurisdiction within the courts listed for jurisdiction above, and the Parties agree to submit to the personal jurisdiction of that court.`}
          />

          <TermsSection
            icon="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/46879fb71c24dda91dbc6f90019fdf30d029d52d?placeholderIfAbsent=true"
            title="21. CORRECTIONS"
            content={`There may be information on the Services that contains typographical errors, inaccuracies, or omissions, including descriptions, pricing, availability, and various other information. We reserve the right to correct any errors, inaccuracies, or omissions and to change or update the information on the Services at any time, without prior notice.`}
          />

          <TermsSection
            icon="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/d9faa0eaf9497f57c3f8798ed0896123d687dc2e?placeholderIfAbsent=true"
            title="22. DISCLAIMER"
            content={`THE SERVICES ARE PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE THAT YOUR USE OF THE SERVICES WILL BE AT YOUR SOLE RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE SERVICES AND YOUR USE THEREOF, INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE MAKE NO WARRANTIES OR REPRESENTATIONS ABOUT THE ACCURACY OR COMPLETENESS OF THE SERVICES' CONTENT OR THE CONTENT OF ANY WEBSITES OR MOBILE APPLICATIONS LINKED TO THE SERVICES AND WE WILL ASSUME NO LIABILITY OR RESPONSIBILITY FOR ANY (1) ERRORS, MISTAKES, OR INACCURACIES OF CONTENT AND MATERIALS, (2) PERSONAL INJURY OR PROPERTY DAMAGE, OF ANY NATURE WHATSOEVER, RESULTING FROM YOUR ACCESS TO AND USE OF THE SERVICES, (3) ANY UNAUTHORISED ACCESS TO OR USE OF OUR SECURE SERVERS AND/OR ANY AND ALL PERSONAL INFORMATION AND/OR FINANCIAL INFORMATION STORED THEREIN, (4) ANY INTERRUPTION OR CESSATION OF TRANSMISSION TO OR FROM THE SERVICES, (5) ANY BUGS, VIRUSES, TROJAN HORSES, OR THE LIKE WHICH MAY BE TRANSMITTED TO OR THROUGH THE SERVICES BY ANY THIRD PARTY, AND/OR (6) ANY ERRORS OR OMISSIONS IN ANY CONTENT AND MATERIALS OR FOR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF THE USE OF ANY CONTENT POSTED, TRANSMITTED, OR OTHERWISE MADE AVAILABLE VIA THE SERVICES. WE DO NOT WARRANT, ENDORSE, GUARANTEE, OR ASSUME RESPONSIBILITY FOR ANY PRODUCT OR SERVICE ADVERTISED OR OFFERED BY A THIRD PARTY THROUGH THE SERVICES, ANY HYPERLINKED WEBSITE, OR ANY WEBSITE OR MOBILE APPLICATION FEATURED IN ANY BANNER OR OTHER ADVERTISING, AND WE WILL NOT BE A PARTY TO OR IN ANY WAY BE RESPONSIBLE FOR MONITORING ANY TRANSACTION BETWEEN YOU AND ANY THIRD-PARTY PROVIDERS OF PRODUCTS OR SERVICES. AS WITH THE PURCHASE OF A PRODUCT OR SERVICE THROUGH ANY MEDIUM OR IN ANY ENVIRONMENT, YOU SHOULD USE YOUR BEST JUDGEMENT AND EXERCISE CAUTION WHERE APPROPRIATE.`}
          />

          <TermsSection
            icon="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/d9faa0eaf9497f57c3f8798ed0896123d687dc2e?placeholderIfAbsent=true"
            title="23. LIMITATIONS OF LIABILITY"
            content={`IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR USE OF THE SERVICES, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. NOTWITHSTANDING ANYTHING TO THE CONTRARY CONTAINED HEREIN, OUR LIABILITY TO YOU FOR ANY CAUSE WHATSOEVER AND REGARDLESS OF THE FORM OF THE ACTION, WILL AT ALL TIMES BE LIMITED TO THE LESSER OF THE AMOUNT PAID, IF ANY, BY YOU TO US DURING THE SIX (6) MONTH PERIOD PRIOR TO ANY CAUSE OF ACTION ARISING OR . CERTAIN US STATE LAWS AND INTERNATIONAL LAWS DO NOT ALLOW LIMITATIONS ON IMPLIED WARRANTIES OR THE EXCLUSION OR LIMITATION OF CERTAIN DAMAGES. IF THESE LAWS APPLY TO YOU, SOME OR ALL OF THE ABOVE DISCLAIMERS OR LIMITATIONS MAY NOT APPLY TO YOU, AND YOU MAY HAVE ADDITIONAL RIGHTS.`}
          />

          <TermsSection
            icon="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/d9faa0eaf9497f57c3f8798ed0896123d687dc2e?placeholderIfAbsent=true"
            title="24. INDEMNIFICATION"
            content={`You agree to defend, indemnify, and hold us harmless, including our subsidiaries, affiliates, and all of our respective officers, agents, partners, and employees, from and against any loss, damage, liability, claim, or demand, including reasonable attorneys’ fees and expenses, made by any third party due to or arising out of: (1) your Contributions; (2) use of the Services; (3) breach of these Legal Terms; (4) any breach of your representations and warranties set forth in these Legal Terms; (5) your violation of the rights of a third party, including but not limited to intellectual property rights; or (6) any overt harmful act toward any other user of the Services with whom you connected via the Services. Notwithstanding the foregoing, we reserve the right, at your expense, to assume the exclusive defence and control of any matter for which you are required to indemnify us, and you agree to cooperate, at your expense, with our defence of such claims. We will use reasonable efforts to notify you of any such claim, action, or proceeding which is subject to this indemnification upon becoming aware of it.`}
          />

          <TermsSection
            icon="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/d9faa0eaf9497f57c3f8798ed0896123d687dc2e?placeholderIfAbsent=true"
            title="25. USER DATA"
            content={`We will maintain certain data that you transmit to the Services for the purpose of managing the performance of the Services, as well as data relating to your use of the Services. Although we perform regular routine backups of data, you are solely responsible for all data that you transmit or that relates to any activity you have undertaken using the Services. You agree that we shall have no liability to you for any loss or corruption of any such data, and you hereby waive any right of action against us arising from any such loss or corruption of such data.`}
          />

          <TermsSection
            icon="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/d9faa0eaf9497f57c3f8798ed0896123d687dc2e?placeholderIfAbsent=true"
            title="26. ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES"
            content={`Visiting the Services, sending us emails, and completing online forms constitute electronic communications. You consent to receive electronic communications, and you agree that all agreements, notices, disclosures, and other communications we provide to you electronically, via email and on the Services, satisfy any legal requirement that such communication be in writing. YOU HEREBY AGREE TO THE USE OF ELECTRONIC SIGNATURES, CONTRACTS, ORDERS, AND OTHER RECORDS, AND TO ELECTRONIC DELIVERY OF NOTICES, POLICIES, AND RECORDS OF TRANSACTIONS INITIATED OR COMPLETED BY US OR VIA THE SERVICES. You hereby waive any rights or requirements under any statutes, regulations, rules, ordinances, or other laws in any jurisdiction which require an original signature or delivery or retention of non-electronic records, or to payments or the granting of credits by any means other than electronic means.`}
          />

          <TermsSection
            icon="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/d9faa0eaf9497f57c3f8798ed0896123d687dc2e?placeholderIfAbsent=true"
            title="27. SMS TEXT MESSAGING"
            content={`Opting Out

If at any time you wish to stop receiving SMS messages from us, simply reply to the text with "STOP.” You may receive an SMS message confirming your opt out.

Message and Data Rates

Please be aware that message and data rates may apply to any SMS messages sent or received. The rates are determined by your carrier and the specifics of your mobile plan.

Support

If you have any questions or need assistance regarding our SMS communications, please email us at info@ikook.co.uk or call at 02045207041.`}
          />

          <TermsSection
            icon="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/d9faa0eaf9497f57c3f8798ed0896123d687dc2e?placeholderIfAbsent=true"
            title="28. CALIFORNIA USERS AND RESIDENTS"
            content={`If any complaint with us is not satisfactorily resolved, you can contact the Complaint Assistance Unit of the Division of Consumer Services of the California Department of Consumer Affairs in writing at 1625 North Market Blvd., Suite N 112, Sacramento, California 95834 or by telephone at (800) 952-5210 or (916) 445-1254.`}
          />

          <TermsSection
            icon="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/d9faa0eaf9497f57c3f8798ed0896123d687dc2e?placeholderIfAbsent=true"
            title="29. MISCELLANEOUS"
            content={`These Legal Terms and any policies or operating rules posted by us on the Services or in respect to the Services constitute the entire agreement and understanding between you and us. Our failure to exercise or enforce any right or provision of these Legal Terms shall not operate as a waiver of such right or provision. These Legal Terms operate to the fullest extent permissible by law. We may assign any or all of our rights and obligations to others at any time. We shall not be responsible or liable for any loss, damage, delay, or failure to act caused by any cause beyond our reasonable control. If any provision or part of a provision of these Legal Terms is determined to be unlawful, void, or unenforceable, that provision or part of the provision is deemed severable from these Legal Terms and does not affect the validity and enforceability of any remaining provisions. There is no joint venture, partnership, employment or agency relationship created between you and us as a result of these Legal Terms or use of the Services. You agree that these Legal Terms will not be construed against us by virtue of having drafted them. You hereby waive any and all defences you may have based on the electronic form of these Legal Terms and the lack of signing by the parties hereto to execute these Legal Terms.`}
          />

          <TermsSection
            icon="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/46879fb71c24dda91dbc6f90019fdf30d029d52d?placeholderIfAbsent=true"
            title="30. SERVICES MANAGEMENT"
            content={`We reserve the right, but not the obligation, to: (1) monitor the Services for violations of these Legal Terms; (2) take appropriate legal action against anyone who, in our sole discretion, violates the law or these Legal Terms, including without limitation, reporting such user to law enforcement authorities; (3) in our sole discretion and without limitation, refuse, restrict access to, limit the availability of, or disable (to the extent technologically feasible) any of your Contributions or any portion thereof; (4) in our sole discretion and without limitation, notice, or liability, to remove from the Services or otherwise disable all files and content that are excessive in size or are in any way burdensome to our systems; and (5) otherwise manage the Services in a manner designed to protect our rights and property and to facilitate the proper functioning of the Services.`}
          />

          <TermsSection
            icon="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/46879fb71c24dda91dbc6f90019fdf30d029d52d?placeholderIfAbsent=true"
            title="31. CHEF TERM: CANCELLATIONS, BOOKING ISSUES, AND BOOKING MODIFICATIONS"
            content={`Cancellations and Booking Issues. As a principle, the determination of the amount paid to you in the event of a Guest cancellation hinges upon the applicable cancellation policy for that Booking. As a Chef on iKooK, you should refrain from cancelling on a Client without a valid reason in accordance with our Extenuating Circumstances Policy or relevant laws. Failure to adhere may lead to imposition of a cancellation fee and other repercussions. In instances where: (i) a Client encounters a Booking Issue (as defined by the Rebooking and Refund Policy), (ii) an Extenuating Circumstance arises, or (iii) a Booking is cancelled under these Terms, your payment will be adjusted by the amount refunded or provided to the Client by iKooK, along with any reasonable costs incurred due to the cancellation. Should a Client receive a refund subsequent to your payout, or if the refund amount and other costs exceed your payout, iKooK (via iKooK Payments) reserves the right to recover said amount from you, including through deduction from your future payouts. You acknowledge that iKooK’s Rebooking and Refund Policy, Extenuating Circumstances Policy, and these Terms supersede any cancellation policy you establish, provided they allow for Reservation cancellation and/or issuance of refunds to Clients. In circumstances where we anticipate providing a refund to a Client under these policies, we may delay the release of any payout for that Booking until a refund decision is reached. Should you host a culinary Experience, please be aware that the Experience Cancellation Policy, Experiences Client Refund Policy, and distinct cancellation fees and consequences are applicable to your Bookings. Refer to each Policy for comprehensive details regarding coverage and payout outcomes in various scenarios. You retain the right to appeal a decision by iKooK by reaching out to our customer service. Booking Modifications. Both Chefs and Clients are accountable for any Booking Modifications they consent to via the iKooK Platform or through direct iKooK customer service intervention, and agree to cover any additional amounts, fees, or taxes associated with a Booking Modification. Your Responsibilities. As an iKooK service provider, you are responsible for your actions and those of any individuals you invite to join or grant access to any culinary services or events. This includes: (i) Ensuring that the cooking space and related equipment are left in the condition they were in upon your arrival. (ii) Paying all reasonable claims for damages caused during the provision of your culinary services. (iii) Adhering to integrity, respecting others, and complying with applicable laws at all times during your engagements. If you provide services for a minor or cater an event involving minors, you must possess legal authorization to act on behalf of the minor and assume sole responsibility for their supervision.`}
          />

          <TermsSection
            icon="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/46879fb71c24dda91dbc6f90019fdf30d029d52d?placeholderIfAbsent=true"
            title="32. HOST TERM: CANCELLATIONS, BOOKING ISSUES, REFUNDS, AND BOOKING MODIFICATIONS"
            content={`Cancellations, Booking Issues, and Refunds. Typically, the refund amount upon Booking cancellation is governed by the applicable cancellation policy. However, certain situations may warrant precedence of other policies in determining the refund amount. If circumstances beyond your control necessitate Booking cancellation, you might qualify for a partial or full refund under our Extenuating Circumstances Policy. Should the Chef/Service Provider cancel or if you encounter an event Booking (as defined in our Rebooking and Refund Policy), you may be eligible for rebooking assistance or a partial or full refund as per our Rebooking and Refund Policy. Different policies are applicable to specific Listing categories; for instance, Experiences Booking are regulated by the Experiences Guest Refund Policy. Refer to each Additional Legal Term or Policy for comprehensive coverage details and applicable refund criteria in various scenarios. You retain the right to appeal a decision by iKooK by reaching out to our customer service. Booking Modifications. Both Chefs and Clients hold responsibility for any Booking Modifications agreed upon via the iKooK Platform or facilitated by direct iKooK customer service intervention ("Booking Modifications"). Furthermore, they agree to cover any additional amounts, fees, or taxes associated with any Booking Modification.`}
          />

          <TermsSection
            icon="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/46879fb71c24dda91dbc6f90019fdf30d029d52d?placeholderIfAbsent=true"
            title="33. FEES"
            content={`iKooK may impose fees (and relevant Taxes) on Chefs and Clients for utilising the iKooK Platform. All applicable fees are disclosed to Chefs prior to listing publication and to Clients before completing a booking. For further details regarding the application and calculation of service fees, please refer to our Service Fees page. Unless specified otherwise on the iKooK Platform, service fees are non-refundable.

1. Split the fee
To review the service fee for for the booking

2. Chef - only Fee
Vat charges

iKooK Service Fees
To facilitate the seamless operation of iKooK and to support services such as 24/7 customer assistance, we apply a service fee upon confirmation of a booking.

There are two distinct fee structures for culinary experiences: a split fee and a Chef-only fee.

1. Split Fee
This fee structure is prevalent and is divided between the Chef and the Host.

Chef Fee
This fee structure is prevalent and is divided between the Chef and the client. Most Chefs incur a 15% fee, although some may pay more, particularly those with listings in certain regions. This fee is computed based on the booking subtotal (inclusive of the booking charges and any additional charges imposed by the Chef, excluding the client service fee and taxes) and is automatically deducted from the Chef's payout.

To assess the service fee for a booking:
Click Earnings
Select the booking code
Under Payout, find the iKooK Service Fee

Host Fee:
Most client service fees are typically under 2.5% of the booking subtotal (inclusive of the service rate and any additional charges imposed by the Chef, excluding the client service fee and taxes). The client service fee fluctuates based on various factors and may vary in magnitude depending on the booking. For a day booking or more, the client service fee is reduced.

In cases where the client pays in a different currency from the one set by the Chef for their listing, we adjust our fees to reflect the value we offer to our clients. For such cross-currency bookings, the client service fee may encompass an additional amount, resulting in a total client service fee of up to 3% of the booking subtotal. The client service fee can be viewed during checkout before confirming the booking.

2. Chef-Only Fee
Under this structure, the entire fee is deducted from the Chef's payout. Typically, it ranges from 15%, although Chefs with Super Strict cancellation policies may incur higher fees, and fees for booking lasting more than a day or more may be lower. This fee is obligatory for traditional culinary hospitality listings—such as restaurant, hotel etc., as well as software-connected Chefs/Service Providers (unless the majority of their listings are in the USA, Canada, the Bahamas, Mexico, Argentina, Taiwan, or Uruguay).

VAT Charges:
Depending on the laws of the jurisdiction involved, we may be required to charge VAT on service fees. When applicable, VAT will be collected in addition to our service fees and remitted to the appropriate tax authorities. The amount of VAT charged will depend on the relevant tax regulations in the jurisdiction where the transaction takes place.`}
          />

          <TermsSection
            icon="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/46879fb71c24dda91dbc6f90019fdf30d029d52d?placeholderIfAbsent=true"
            title="34. CONTACT US"
            content={`In order to resolve a complaint regarding the Services or to receive further information regarding use of the Services, please contact us at:

iKooK
27 Old Gloucester St
London WC1N 3AX
United Kingdom
Phone: 02045207041
Email: info@ikook.co.uk`}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
