import { useState } from 'react';
import { Mountain, Menu, X, Phone, MessageCircle } from 'lucide-react';
import { BUSINESS_INFO, buildWhatsAppUrl } from '../data/travelData';
import { setCurrency } from '../store/travelStore';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Tour Packages', href: '#packages-section' },
  { label: 'Destinations', href: '#destinations' },
  { label: 'Services', href: '#services' },
  { label: 'Cost Estimator', href: '#calculator' },
  { label: 'Local Team', href: '#team' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ currency, onBookNow }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleCurrency = () => {
    setCurrency(currency === 'INR' ? 'USD' : 'INR');
  };

  return (
    <header className="relative z-40 w-full">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Brand Logo matching Reference */}
        <a href="#home" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1D1F23] text-white shadow-sm group-hover:scale-105 transition">
            <Mountain className="h-5 w-5" />
          </div>
          <span className="text-lg sm:text-xl font-bold tracking-tight text-[#16181D]">
            {BUSINESS_INFO.name}
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#2A323A]">
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hover:text-[#16181D] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[#16181D] hover:after:w-full after:transition-all"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right Actions (Desktop) */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            type="button"
            onClick={toggleCurrency}
            title="Switch currency between INR and USD"
            className="flex items-center gap-1.5 rounded-full bg-white/85 border border-slate-200 px-3.5 py-2 text-xs font-semibold text-[#16181D] hover:bg-white transition cursor-pointer shadow-xs"
          >
            <span>{currency === 'INR' ? '🇮🇳 ₹ INR' : '🌐 $ USD'}</span>
          </button>

          <button
            type="button"
            onClick={() => onBookNow(null)}
            className="rounded-full bg-[#1D1F23] px-5 py-2.5 text-xs font-semibold text-white shadow-md hover:bg-[#2E3239] active:scale-[0.98] transition cursor-pointer"
          >
            Send Inquiry
          </button>
        </div>

        {/* Mobile Actions (Matching Reference Dark Circular Menu Button) */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            type="button"
            onClick={toggleCurrency}
            className="rounded-full bg-white px-3 py-1.5 text-xs font-bold text-[#16181D] border border-slate-200 shadow-xs cursor-pointer"
          >
            {currency}
          </button>
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1D1F23] text-white shadow-md cursor-pointer"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden absolute inset-x-4 top-18 z-50 rounded-3xl bg-white p-6 shadow-2xl border border-slate-100">
          <div className="flex flex-col space-y-3">
            {NAV_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-3 py-2.5 text-sm font-semibold text-[#16181D] hover:bg-slate-50"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="mt-5 border-t border-slate-100 pt-4 space-y-2.5">
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onBookNow(null);
              }}
              className="w-full rounded-full bg-[#1D1F23] py-3 text-sm font-semibold text-white cursor-pointer"
            >
              Send Inquiry
            </button>
            <div className="grid grid-cols-2 gap-2">
              <a
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                className="flex items-center justify-center gap-1.5 rounded-full border border-slate-200 py-2.5 text-xs font-semibold text-[#16181D]"
              >
                <Phone className="h-3.5 w-3.5" />
                <span>Call Concierge</span>
              </a>
              <a
                href={buildWhatsAppUrl('Namaste HimYatra! I want to plan a tour to Himachal & Uttarakhand.')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 rounded-full bg-emerald-500 py-2.5 text-xs font-bold text-slate-950"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
