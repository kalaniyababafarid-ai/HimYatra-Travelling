import { ArrowUpRight, MapPin, Phone, Sparkles, Compass } from 'lucide-react';
import Navbar from './Navbar';
import VueIsland from './VueIsland';
import BookingSearchWidget from '../vue/BookingSearchWidget.vue';
import { BUSINESS_INFO, getImageUrl } from '../data/travelData';

export default function HeroSection({ currency, onBookNow, onSearchComplete }) {
  return (
    <section id="home" className="relative pb-10 sm:pb-14">
      {/* Sky-Blue + Sunlit Luxury Himalayan Chalet Backdrop (Exact Hotello / Reference Structure) */}
      <div className="relative overflow-hidden bg-[#CBE5EE] pb-32 sm:pb-40 lg:pb-44">
        {/* Background Image positioned like Hotello reference */}
        <img
          src={getImageUrl('images/himachal-hero.jpg')}
          alt="Himalayan luxury timber and glass mountain resort in Himachal Pradesh"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = getImageUrl('images/himachal-hero.jpg');
          }}
          className="absolute inset-0 h-full w-full object-cover object-center lg:object-right opacity-95"
        />
        {/* Left-to-right sky-blue gradient ensuring crisp dark typography legibility */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(100deg, rgba(203,229,238,0.97) 0%, rgba(203,229,238,0.92) 38%, rgba(203,229,238,0.50) 65%, rgba(203,229,238,0.12) 100%)',
          }}
        />
        {/* Mobile top-to-bottom soft readability wash */}
        <div
          className="absolute inset-0 lg:hidden"
          style={{
            background:
              'linear-gradient(180deg, rgba(208,232,240,0.95) 0%, rgba(208,232,240,0.80) 55%, rgba(208,232,240,0.35) 100%)',
          }}
        />

        {/* Top Header */}
        <Navbar currency={currency} onBookNow={onBookNow} />

        {/* Hero Copy (Matching Reference Layout) */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 pt-6 sm:px-6 sm:pt-12 lg:px-8 lg:pt-14">
          <div className="max-w-xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-3.5 py-1.5 text-xs font-semibold text-[#16181D] shadow-xs border border-white">
              <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
              <span>Himachal &amp; Uttarakhand Destination Specialists</span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-[#16181D] sm:text-5xl lg:text-[54px] lg:leading-[1.08]">
              Find Your Perfect Mountain Stay, Anywhere, Anytime
            </h1>

            <p className="mt-4 max-w-md text-sm leading-relaxed text-[#2C363F] sm:text-base">
              Discover verified cedar chalets, snow-view resorts, private cabs, and curated itineraries across Himachal Pradesh &amp; Uttarakhand crafted specifically for Indian travelers.
            </p>

            {/* Primary CTA Pair matching reference ("Explore more" pill + circular arrow) */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href="#packages-section"
                className="inline-flex items-center rounded-full bg-[#24272C] px-7 py-3.5 text-sm font-semibold text-white shadow-md hover:bg-[#141619] transition"
              >
                Explore packages
              </a>
              <a
                href="#packages-section"
                aria-label="Explore packages and destinations"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#16181D] shadow-md hover:scale-105 transition"
              >
                <ArrowUpRight className="h-5 w-5" />
              </a>

              <div className="hidden sm:flex items-center gap-4 pl-3 text-xs font-semibold text-[#242F38]">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" /> Based in {BUSINESS_INFO.location}
                </span>
                <a href={`tel:${BUSINESS_INFO.phoneRaw}`} className="inline-flex items-center gap-1 hover:underline">
                  <Phone className="h-3.5 w-3.5" /> {BUSINESS_INFO.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlapping Floating Vue 3 Search Widget */}
      <div className="-mt-22 sm:-mt-24 lg:-mt-26">
        <VueIsland
          component={BookingSearchWidget}
          props={{ onSearchComplete }}
        />
      </div>
    </section>
  );
}
