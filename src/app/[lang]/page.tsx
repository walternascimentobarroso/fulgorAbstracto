import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import ServicesSection from "../components/ServicesSection";
import BenefitsSection from "../components/BenefitsSection";
import ProcessSection from "../components/ProcessSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import { getDictionary, type Locale } from "../dictionaries";
import { siteUrl } from "../site";

type Props = {
  params: Promise<{ lang: string }>;
};

export default async function Home({ params }: Props) {
  const lang = (await params).lang as Locale;
  const dict = getDictionary(lang);
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Fulgor Abstracto",
    url: `${siteUrl}/${lang}`,
    description: dict.metadata.description,
    address: { "@type": "PostalAddress", addressCountry: "PT" },
  };

  return (
    <main className="relative flex min-h-screen flex-col overflow-x-clip bg-white dark:bg-ink-950">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[48rem] bg-gradient-to-b from-primary-100/70 to-transparent dark:from-primary-900/40"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-20 focus:rounded-sm focus:bg-white focus:px-4 focus:py-2 focus:text-zinc-900"
      >
        {dict.nav.skipToContent}
      </a>
      <Navbar lang={lang} dict={dict} />
      <div id="content" className="relative w-full max-w-6xl mt-16 mx-auto px-6">
        <HeroSection dict={dict.hero} />
        <ServicesSection dict={dict.services} />
        <BenefitsSection dict={dict.benefits} />
        <ProcessSection dict={dict.process} />
        <ContactSection dict={dict.contact} />
      </div>
      <Footer dict={dict.footer} />
    </main>
  );
}
