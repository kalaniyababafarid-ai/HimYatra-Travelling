import { Mail, MapPin, MessageCircle, Phone, ArrowUpRight, Mountain } from 'lucide-react';
import { BUSINESS_INFO, buildWhatsAppUrl, DESTINATIONS_BY_STATE } from '../data/travelData';

export default function Footer({ onBookNow }) {
  return (
    <footer id="contact" className="border-t border-slate-200 bg-[#F7FAFC] pt-14 pb-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Brand Summary */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1D1F23] text-white shadow-sm">
                <Mountain className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold text-[#16181D]">{BUSINESS_INFO.name}</span>
            </div>

            <p className="max-w-sm text-sm leading-relaxed text-slate-600">
              Himachal-based tour specialists offering custom holiday packages, verified cedar chalets, experienced hill chauffeurs, and 24/7 on-ground assistance for Indian travelers.
            </p>

            <div className="flex flex-wrap gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => onBookNow(null)}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#1D1F23] px-5 py-2.5 text-xs font-semibold text-white hover:bg-[#2E3239] transition cursor-pointer"
              >
                <span>Send Inquiry</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
              <a
                href={buildWhatsAppUrl(`Namaste ${BUSINESS_INFO.name}! I want to plan a Himachal / Uttarakhand tour.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500 px-5 py-2.5 text-xs font-bold text-slate-950 hover:bg-emerald-400 transition"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                <span>WhatsApp Tour Desk</span>
              </a>
            </div>
          </div>

          {/* Himachal Destinations */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Himachal Pradesh</h4>
            <ul className="space-y-2 text-xs sm:text-sm font-medium text-slate-700">
              {DESTINATIONS_BY_STATE['Himachal Pradesh'].map((d) => (
                <li key={d.name}>
                  <a href="#destinations" className="hover:text-[#16181D] transition-colors">
                    {d.name} <span className="text-slate-400 text-xs">({d.tag})</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Uttarakhand Destinations */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Uttarakhand</h4>
            <ul className="space-y-2 text-xs sm:text-sm font-medium text-slate-700">
              {DESTINATIONS_BY_STATE['Uttarakhand'].map((d) => (
                <li key={d.name}>
                  <a href="#destinations" className="hover:text-[#16181D] transition-colors">
                    {d.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Local Offices & Contact */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Local Offices &amp; Desk</h4>
            <div className="space-y-3 text-xs sm:text-sm text-slate-700">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-[#16181D] mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-[#16181D]">Head Office:</p>
                  <p className="text-slate-600">{BUSINESS_INFO.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-emerald-700 mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-[#16181D]">Uttarakhand Desk:</p>
                  <p className="text-slate-600">{BUSINESS_INFO.regionalOffice}</p>
                </div>
              </div>
              <a
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                className="flex items-center gap-2.5 hover:text-[#16181D] font-medium"
              >
                <Phone className="h-4 w-4 text-[#16181D] shrink-0" />
                <span>Call: {BUSINESS_INFO.phone}</span>
              </a>
              <a
                href={buildWhatsAppUrl(`Namaste ${BUSINESS_INFO.name}!`)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 hover:text-emerald-800 font-medium"
              >
                <MessageCircle className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>WhatsApp: {BUSINESS_INFO.phone}</span>
              </a>
              <a
                href={`mailto:${BUSINESS_INFO.email}`}
                className="flex items-center gap-2.5 hover:text-[#16181D] font-medium"
              >
                <Mail className="h-4 w-4 text-[#16181D] shrink-0" />
                <span>Email: {BUSINESS_INFO.email}</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200 pt-6 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {BUSINESS_INFO.name} • {BUSINESS_INFO.location}. All rights reserved.</p>
          <p>Built with React &amp; Vue.js • Curated Packages for Indian Travelers</p>
        </div>
      </div>

      {/* Floating WhatsApp Quick Action */}
      <a
        href={buildWhatsAppUrl(`Namaste ${BUSINESS_INFO.name}! I would like to plan a trip to Himachal / Uttarakhand.`)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with HimYatra on WhatsApp"
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-3 text-xs font-bold text-slate-950 shadow-xl hover:bg-emerald-400 hover:scale-105 transition"
      >
        <MessageCircle className="h-4 w-4" />
        <span className="hidden sm:inline">WhatsApp Concierge</span>
      </a>
    </footer>
  );
}
