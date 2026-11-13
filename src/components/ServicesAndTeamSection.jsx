import { ArrowUpRight, CheckCircle2, MessageCircle, Phone, Shield, Star, Users, Award, Mountain } from 'lucide-react';
import { BUSINESS_INFO, SERVICES_LIST, TESTIMONIALS, buildWhatsAppUrl } from '../data/travelData';

export default function ServicesAndTeamSection({ onBookNow }) {
  return (
    <>
      {/* Services We Offer Section */}
      <section id="services" className="bg-[#F6FAFC] py-16 sm:py-22 border-y border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
            {/* Left Image Card */}
            <div className="lg:col-span-5">
              <div className="relative overflow-hidden rounded-[2rem] shadow-lg">
                <img
                  src="/images/rishikesh-nainital.jpg"
                  alt="Emerald lakefront resort in Nainital and Rishikesh by HimYatra"
                  className="h-[380px] sm:h-[460px] w-full object-cover"
                />
                <div className="glass-card-overlay absolute inset-x-4 bottom-4 rounded-2xl p-5 text-white border border-white/15">
                  <span className="inline-block rounded-full bg-emerald-500 px-3 py-1 text-[11px] font-bold text-slate-950">
                    DIRECT LOCAL HIMACHAL OPERATOR
                  </span>
                  <h3 className="mt-2 text-lg font-bold">
                    Himachal &amp; Uttarakhand Made Effortless
                  </h3>
                  <p className="mt-1 text-xs text-white/85">
                    From Mall Road Manali to Dehradun &amp; Rishikesh, travel with verified local mountain captains and zero hidden charges.
                  </p>
                </div>
              </div>
            </div>

            {/* Right 4 Service Pillars */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white border border-slate-200 px-3.5 py-1 text-xs font-semibold text-[#16181D]">
                  <Award className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Why Indian Travelers Choose Us</span>
                </span>
                <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-[#16181D]">
                  End-to-End Mountain Holidays with Local Expertise
                </h2>
                <p className="mt-2 text-sm sm:text-base text-slate-600">
                  Whether you are planning a winter snowfall holiday in Manali, an adrenaline-packed Spiti 4x4 expedition, or a family trip to Nainital &amp; Rishikesh, our local offices ensure seamless execution.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {SERVICES_LIST.map((srv) => (
                  <div
                    key={srv.id}
                    className="flex flex-col justify-between rounded-3xl bg-white p-6 border border-slate-200/70 shadow-xs hover:shadow-md transition"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-1 text-[11px] font-bold text-emerald-700">
                          {srv.badge}
                        </span>
                        <span className="text-[11px] font-medium text-slate-400">{srv.tag}</span>
                      </div>
                      <h3 className="mt-3 text-lg font-bold text-[#16181D]">{srv.title}</h3>
                      <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-slate-600">
                        {srv.summary}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        onBookNow({
                          name: srv.title,
                          location: `${BUSINESS_INFO.location} & Uttarakhand`,
                          priceDisplay: 'Tailored Package Rate',
                        })
                      }
                      className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-[#16181D] hover:text-emerald-700 transition cursor-pointer"
                    >
                      <span>Inquire Now</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Local Mountain Team Section */}
      <section id="team" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-22 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6 space-y-6 order-2 lg:order-1">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3.5 py-1 text-xs font-semibold text-[#16181D]">
              <Users className="h-3.5 w-3.5" />
              <span>Meet Our Himachal Travel Specialists</span>
            </span>

            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#16181D]">
              Local Pahadi Hospitality &amp; 24/7 On-Ground Support
            </h2>

            <p className="text-sm sm:text-base leading-relaxed text-slate-600">
              Headquartered right on <strong className="text-[#16181D]">{BUSINESS_INFO.address}</strong> with a regional support desk in Dehradun, our team comprises native mountain guides, experienced hill chauffeurs, and dedicated tour planners who know every weather update, road condition, and scenic spot.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-2">
              <div className="rounded-2xl border border-slate-200/80 p-4">
                <p className="text-2xl sm:text-3xl font-extrabold text-[#16181D]">100%</p>
                <p className="mt-1 text-xs text-slate-500">Local Mountain Team</p>
              </div>
              <div className="rounded-2xl border border-slate-200/80 p-4">
                <p className="text-2xl sm:text-3xl font-extrabold text-[#16181D]">18k+</p>
                <p className="mt-1 text-xs text-slate-500">Happy Travelers</p>
              </div>
              <div className="rounded-2xl border border-slate-200/80 p-4">
                <p className="text-2xl sm:text-3xl font-extrabold text-[#16181D]">24/7</p>
                <p className="mt-1 text-xs text-slate-500">Emergency Desk</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={buildWhatsAppUrl(`Namaste ${BUSINESS_INFO.name}! I would like to speak with your mountain travel specialist.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#1D1F23] px-6 py-3.5 text-sm font-semibold text-white hover:bg-[#2D3138] transition"
              >
                <MessageCircle className="h-4 w-4 text-emerald-400" />
                <span>Chat on WhatsApp ({BUSINESS_INFO.phone})</span>
              </a>
              <a
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-3.5 text-sm font-semibold text-[#16181D] hover:bg-slate-50 transition"
              >
                <Phone className="h-4 w-4" />
                <span>{BUSINESS_INFO.phone}</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="relative overflow-hidden rounded-[2rem] shadow-xl">
              <img
                src="/images/team-himachal.jpg"
                alt="HimYatra Tour Planners in Manali"
                className="h-[340px] sm:h-[440px] w-full object-cover"
              />
              <div className="absolute left-4 bottom-4 right-4 flex items-center justify-between rounded-2xl bg-white/95 p-4 shadow-md">
                <div>
                  <p className="text-sm font-bold text-[#16181D]">{BUSINESS_INFO.name} Manali Lounge</p>
                  <p className="text-xs text-slate-600">{BUSINESS_INFO.address}</p>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 shrink-0">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Mountain Desk Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Strip */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] bg-[#16181D] p-8 sm:p-12 text-white">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8AD3EB]">
                <Shield className="h-3.5 w-3.5" /> Verified Indian Traveler Reviews
              </span>
              <h2 className="mt-2 text-2xl sm:text-3xl font-bold">
                Trusted by Families, Couples &amp; Adventure Seekers
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400">4.9 / 5.0 Average Rating across 7,500+ mountain journeys</p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: t.rating }).map((_, idx) => (
                      <Star key={idx} className="h-4 w-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-slate-200">“{t.quote}”</p>
                </div>
                <div className="mt-6 border-t border-white/10 pt-3">
                  <p className="text-sm font-bold text-white">{t.name}</p>
                  <p className="text-xs text-slate-400">{t.origin}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
