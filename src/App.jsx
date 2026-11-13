import { useEffect, useState, useCallback } from 'react';
import HeroSection from './components/HeroSection';
import TopHotelsSection from './components/TopHotelsSection';
import ServicesAndTeamSection from './components/ServicesAndTeamSection';
import BookingModal from './components/BookingModal';
import Footer from './components/Footer';
import VueIsland from './components/VueIsland';
import SavingsCalculator from './vue/SavingsCalculator.vue';
import { subscribeTravelState, travelState } from './store/travelStore';

export default function App() {
  const [sharedState, setSharedState] = useState({ ...travelState });
  const [modalItem, setModalItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeTravelState((next) => {
      setSharedState(next);
    });
    return unsubscribe;
  }, []);

  const handleOpenBooking = useCallback((item = null) => {
    setModalItem(item);
    setModalOpen(true);
  }, []);

  const handleSearchComplete = useCallback(() => {
    const el = document.getElementById('packages-section') || document.getElementById('hotels-section');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#16181D]">
      {/* Hero + Navbar + Vue 3 Floating Search Widget */}
      <HeroSection
        currency={sharedState.currency}
        onBookNow={handleOpenBooking}
        onSearchComplete={handleSearchComplete}
      />

      {/* Top-Rated Hotels & Category Bento Grid (Reference Layout) */}
      <TopHotelsSection
        travelState={sharedState}
        onSelectPackage={handleOpenBooking}
      />

      {/* Services We Offer (50% OFF) & Dubai Concierge Team */}
      <ServicesAndTeamSection onBookNow={handleOpenBooking} />

      {/* Interactive Vue 3 50% Off Package Builder & Live Calculator */}
      <VueIsland
        component={SavingsCalculator}
        props={{
          onBookCustom: (customPackage) => handleOpenBooking(customPackage),
        }}
      />

      {/* Footer & Direct Dubai Contact */}
      <Footer onBookNow={handleOpenBooking} />

      {/* Interactive Reservation & WhatsApp Modal */}
      {modalOpen && (
        <BookingModal
          selectedItem={modalItem}
          currency={sharedState.currency}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}
