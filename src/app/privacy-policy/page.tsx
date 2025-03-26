"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Shield, Lock, FileText, Eye } from "lucide-react";

export default function PrivacyPolicyPage() {
  const sections = [
    {
      id: "introduction",
      title: "Introduction",
      content: "At Best Buy Auto Prestige, we respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services. Please read this Privacy Policy carefully. By accessing or using our services, you acknowledge that you have read and understand this Privacy Policy."
    },
    {
      id: "information-we-collect",
      title: "Information We Collect",
      content: "We collect several types of information from and about users of our website, including: Personal information such as name, email address, phone number, postal address, and other identifiers when you create an account, request information, or purchase a vehicle; Vehicle information when you search for, save, or inquire about vehicles; Payment and financing information when you engage in a transaction; Technical information such as IP address, browser type, device information, and usage data; and Information you provide when you communicate with us, such as inquiries, feedback, and survey responses."
    },
    {
      id: "how-we-collect",
      title: "How We Collect Information",
      content: "We collect information directly from you when you provide it to us through forms, account registration, or communications with us. We also collect information automatically when you visit our website through cookies, web beacons, and similar technologies. This might include information about your browsing behavior, device information, and preferences. Additionally, we may receive information about you from third parties, such as credit reporting agencies, financial institutions, or other business partners."
    },
    {
      id: "how-we-use",
      title: "How We Use Your Information",
      content: "We use the information we collect to provide, maintain, and improve our services; process transactions and send related information; respond to your inquiries and provide customer support; send promotional communications about our products and services; administer contests, promotions, or surveys; protect the security and integrity of our services; comply with legal obligations; and for any other purpose with your consent. We may combine information we collect about you with information from other sources to enhance our ability to serve you."
    },
    {
      id: "disclosure",
      title: "Disclosure of Your Information",
      content: "We may disclose your personal information to: our subsidiaries and affiliates; contractors, service providers, and other third parties who support our business operations; a buyer or successor in the event of a merger, restructuring, or sale of assets; third parties to market their products or services to you if you have consented to these disclosures; fulfill the purpose for which you provide it; comply with any court order, law, or legal process; enforce our Terms of Service; or protect the rights, property, or safety of our business, customers, or others."
    },
    {
      id: "choices",
      title: "Your Choices",
      content: "You can review and change your personal information by logging into your account and visiting your account profile page. You can opt-out of receiving promotional communications from us by following the unsubscribe instructions provided in those communications. You can also set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies. If you disable or refuse cookies, please note that some parts of our website may become inaccessible or not function properly."
    },
    {
      id: "data-security",
      title: "Data Security",
      content: "We have implemented measures designed to secure your personal information from accidental loss and from unauthorized access, use, alteration, and disclosure. All information you provide to us is stored on secure servers behind firewalls. Any payment transactions will be encrypted using SSL technology. Unfortunately, the transmission of information via the internet is not completely secure. Although we do our best to protect your personal information, we cannot guarantee the security of your personal information transmitted to our website."
    },
    {
      id: "childrens-privacy",
      title: "Children's Privacy",
      content: "Our website is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe we may have collected information about your child, please contact us immediately so we can remove that information."
    },
    {
      id: "third-party-links",
      title: "Third-Party Links",
      content: "Our website may include links to third-party websites, plug-ins, and applications. Clicking on those links or enabling those connections may allow third parties to collect or share data about you. We do not control these third-party websites and are not responsible for their privacy statements. When you leave our website, we encourage you to read the privacy policy of every website you visit."
    },
    {
      id: "california-rights",
      title: "California Privacy Rights",
      content: "If you are a California resident, you have the right to request information regarding the disclosure of your personal information to third parties for their direct marketing purposes. You can make such a request once a year. In your request, please attest that you are a California resident and provide a current California address for your response. You may also have additional rights under the California Consumer Privacy Act (CCPA), including the right to know what personal information we collect, the right to delete personal information, and the right to opt-out of the sale of personal information."
    },
    {
      id: "international",
      title: "International Users",
      content: "Our website is operated in the United States. If you are located outside of the United States, please be aware that information we collect will be transferred to, processed, and stored in the United States. The data protection laws in the United States may differ from those of the country in which you are located. By using our website or providing us with any information, you consent to this transfer, processing, and storage of your information in the United States."
    },
    {
      id: "changes",
      title: "Changes to Our Privacy Policy",
      content: "We may update our Privacy Policy from time to time. If we make material changes to how we treat our users' personal information, we will post the new Privacy Policy on this page and notify you through a notice on the website home page or via email. The date the Privacy Policy was last revised will be identified at the top of the page. You are responsible for periodically visiting our website and this Privacy Policy to check for any changes."
    },
    {
      id: "contact",
      title: "Contact Information",
      content: "If you have any questions or concerns about this Privacy Policy, please contact us at privacy@bestbuyautoprestige.com or through our Contact page."
    }
  ];

  const lastUpdated = "January 1, 2023";

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-10"
            >
              <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-3">
                <Link href="/" className="hover:underline">Home</Link>
                <span>/</span>
                <span>Privacy Policy</span>
              </div>
              
              <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
              <p className="text-lg text-muted-foreground mb-8">
                Best Buy Auto Prestige is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or use our services.
              </p>
              
              <div className="flex items-center space-x-6 mb-8">
                <div className="flex items-center text-sm text-muted-foreground">
                  <FileText className="h-4 w-4 mr-1" />
                  <span>Last Updated: {lastUpdated}</span>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <a href="#" onClick={() => window.print()}>
                    Print Policy
                  </a>
                </Button>
              </div>
              
              <Separator className="my-8" />
            </motion.div>
            
            {/* Table of Contents */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-10"
            >
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-4">Table of Contents</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {sections.map((section, index) => (
                    <li key={index}>
                      <a 
                        href={`#${section.id}`}
                        className="flex items-center hover:text-primary transition-colors"
                      >
                        <ArrowRight className="h-4 w-4 mr-2" />
                        <span>{section.title}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
            
            {/* Privacy Content */}
            <div className="space-y-12">
              {sections.map((section, index) => (
                <motion.div
                  id={section.id}
                  key={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="scroll-mt-28"
                >
                  <h2 className="text-2xl font-bold mb-4">
                    {index + 1}. {section.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {section.content}
                  </p>
                  {index < sections.length - 1 && <Separator className="mt-12" />}
                </motion.div>
              ))}
            </div>
            
            {/* Footer CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mt-16 bg-muted/30 rounded-lg p-8 text-center"
            >
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-3">Your Privacy Matters</h2>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                If you have any questions or concerns about our Privacy Policy or how we handle your personal information, please don't hesitate to contact us.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild>
                  <Link href="/contact">
                    Contact Us
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/terms-of-service">
                    Terms of Service
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 