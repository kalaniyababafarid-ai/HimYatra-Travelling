import { useState } from 'react';
import { X, CheckCircle2, MessageCircle, Mail, Phone, MapPin, Mountain, Database, Loader2 } from 'lucide-react';
import { BUSINESS_INFO, buildWhatsAppUrl, formatPrice } from '../data/travelData';
import { submitInquiry } from '../services/inquiryService';

export default function BookingModal({ selectedItem, currency, onClose }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [departureCity, setDepartureCity] = useState('Delhi NCR');
  const [travelDate, setTravelDate] = useState('2026-12-20');
  const [guests, setGuests] = useState('2 Travelers (Couple)');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dbSaved, setDbSaved] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const itemTitle = selectedItem?.name || selectedItem?.title || 'Himachal & Uttarakhand Mountain Tour Package';
  const itemLocation = selectedItem?.location || `${BUSINESS_INFO.location} & Uttarakhand`;
  const itemPrice =
    selectedItem?.priceInr !== undefined
      ? `${formatPrice(selectedItem.priceInr, currency)}/${selectedItem.unit}`
      : selectedItem?.price || selectedItem?.priceDisplay || 'Direct Himachal Rate';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await submitInquiry({
        name,
        phone,
        email,
        departureCity,
        travelDate,
        guests,
        notes,
        tourName: itemTitle,
        priceDisplay: itemPrice,
        stateRegion: itemLocation,
      });
      setDbSaved(res?.savedToRemote || false);
    } catch (err) {
      console.warn('Inquiry submission fallback:', err);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
    }
  };

  const whatsappMessage = `Namaste ${BUSINESS_INFO.name}! I would like to reserve/inquire about: ${itemTitle} (${itemPrice}). Name: ${name || 'Traveler'}, Contact: ${phone || 'N/A'}, Departure Hub: ${departureCity}, Travel Date: ${travelDate}, Guests: ${guests}. Notes: ${notes || 'Please share detailed day-wise itinerary & inclusions.'}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>

        {!submitted ? (
          <>
            <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-bold text-emerald-800">
              {BUSINESS_INFO.name.toUpperCase()} • TOUR INQUIRY (ZERO TOKEN REQUIRED)
            </span>
            <h3 className="mt-3 text-xl sm:text-2xl font-bold text-[#16181D] pr-8">
              {itemTitle}
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              Indicative Price: <strong className="text-[#16181D]">{itemPrice}</strong> • {itemLocation} • <span className="text-emerald-700 font-semibold">No Advance Payment</span>
            </p>

            {selectedItem?.highlights && (
              <div className="mt-4 flex flex-wrap gap-1.5">
                {selectedItem.highlights.map((h) => (
                  <span
                    key={h}
                    className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-medium text-slate-700"
                  >
                    {h}
                  </span>
                ))}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Your Full Name</label>
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Amit Sharma"
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-[#1D1F23]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">WhatsApp / Phone</label>
                  <input
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 / 10-digit number"
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-[#1D1F23]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email ID</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@gmail.com"
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-[#1D1F23]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Departure City</label>
                  <select
                    value={departureCity}
                    onChange={(e) => setDepartureCity(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-[#1D1F23]"
                  >
                    <option>Delhi NCR (Majnu Ka Tilla / Airport)</option>
                    <option>Chandigarh (ISBT / Railway Station)</option>
                    <option>Haridwar / Rishikesh / Dehradun</option>
                    <option>Mumbai / Ahmedabad / Pune</option>
                    <option>Bengaluru / Hyderabad / Chennai</option>
                    <option>Kolkata / Other City</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Preferred Travel Date</label>
                  <input
                    type="date"
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-[#1D1F23]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Travelers &amp; Party</label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#1D1F23]"
                  >
                    <option>1 Traveler (Solo)</option>
                    <option>2 Travelers (Couple)</option>
                    <option>3–4 Travelers (Family)</option>
                    <option>5–8 Travelers (Friends Group)</option>
                    <option>9+ Travelers (Corporate / College)</option>
                    <option>Senior Citizens (Yatra Assistance)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Special Preferences / Custom Requests</label>
                <input
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Need Volvo tickets, snow cab, bonfire, vegetarian meals, etc."
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-[#1D1F23]"
                />
              </div>

              <div className="pt-2 flex flex-col gap-2.5">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center justify-center gap-2 w-full rounded-full bg-[#1D1F23] py-3.5 text-sm font-semibold text-white hover:bg-[#2F343B] disabled:opacity-75 transition cursor-pointer"
                >
                  {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                  <span>{isSubmitting ? 'Saving Inquiry...' : 'Send Inquiry'}</span>
                </button>
                <a
                  href={buildWhatsAppUrl(whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-emerald-500 py-3 text-sm font-bold text-slate-950 hover:bg-emerald-400 transition"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Send Inquiry via WhatsApp ({BUSINESS_INFO.phone})</span>
                </a>
              </div>
            </form>
          </>
        ) : (
          <div className="py-6 text-center space-y-4">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-bold text-[#16181D]">Inquiry Received!</h3>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
              <Database className="h-3.5 w-3.5 text-emerald-600" />
              <span>{dbSaved ? 'Saved in Supabase Backend' : 'Saved in Local Inquiry Queue'}</span>
            </div>
            <p className="text-sm text-slate-600 max-w-sm mx-auto">
              Namaste <strong>{name}</strong>! Your inquiry for <strong>{itemTitle}</strong> has been logged. Our Manali tour desk will reach out with a day-wise itinerary and quote.
            </p>

            <div className="flex flex-col gap-2.5 pt-2">
              <a
                href={buildWhatsAppUrl(whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-full bg-emerald-500 py-3.5 text-sm font-bold text-slate-950 hover:bg-emerald-400 transition"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Chat Instantly on WhatsApp</span>
              </a>
              <a
                href={`mailto:${BUSINESS_INFO.email}?subject=${encodeURIComponent(`Tour Inquiry: ${itemTitle}`)}&body=${encodeURIComponent(whatsappMessage)}`}
                className="flex items-center justify-center gap-2 rounded-full border border-slate-200 py-3 text-sm font-semibold text-[#16181D] hover:bg-slate-50 transition"
              >
                <Mail className="h-4 w-4" />
                <span>Email {BUSINESS_INFO.email}</span>
              </a>
            </div>
          </div>
        )}

        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 border-t border-slate-100 pt-4 text-[11px] text-slate-500">
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3 w-3" /> {BUSINESS_INFO.location}
          </span>
          <span className="inline-flex items-center gap-1">
            <Phone className="h-3 w-3" /> {BUSINESS_INFO.phone}
          </span>
          <span className="inline-flex items-center gap-1">
            <Mail className="h-3 w-3" /> {BUSINESS_INFO.email}
          </span>
        </div>
      </div>
    </div>
  );
}
