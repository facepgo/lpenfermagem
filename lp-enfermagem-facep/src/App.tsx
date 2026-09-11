import { AudienceSection } from './components/AudienceSection';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { GallerySection } from './components/GallerySection';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { PricingSection } from './components/PricingSection';
import { PushNotification } from './components/PushNotification';
import { ScheduleSection } from './components/ScheduleSection';
import { TrustBar } from './components/TrustBar';
import { UnitsSection } from './components/UnitsSection';
import { WhatsAppButton } from './components/WhatsAppButton';

/**
 * `overflow-x: clip` no wrapper corta o transbordo horizontal sem criar um
 * contexto de rolagem — é o que mantém o cabeçalho realmente sticky.
 */
export default function App() {
  return (
    <div className="overflow-x-clip bg-background text-foreground">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-brand focus:px-5 focus:py-3 focus:text-sm focus:font-bold focus:text-white"
      >
        Pular para o conteúdo
      </a>

      <Header />

      <main id="conteudo">
        <HeroSection />
        <TrustBar />
        <AudienceSection />
        <ScheduleSection />
        <GallerySection />
        <PricingSection />
        <UnitsSection />
        <FinalCTA />
      </main>

      <Footer />
      <WhatsAppButton />
      <PushNotification />
    </div>
  );
}
