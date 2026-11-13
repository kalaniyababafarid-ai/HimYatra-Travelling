import { ArrowUpRight, Check, MapPin, Star, Calendar, Users, Sparkles } from 'lucide-react';
import { ALL_PACKAGES, formatPrice, DESTINATIONS_BY_STATE } from '../data/travelData';
import { setActiveCategory, setActiveStateFilter } from '../store/travelStore';

function PackageBentoCard({ item, currency, tall = false, onSelect }) {
  return (
    <article
      onClick={() => onSelect(item)}
      className={`group relative overflow-hidden rounded-3xl bg-slate-100 shadow-sm cursor-pointer transition-all duration-300 hover:shadow-xl ${
        tall ? 'h-[380px] sm:h-[460px] lg:h-[536px]' : 'h-[240px] sm:h-[256px]'
      }`}
    >
      <img
        src={item.image}
        alt={item.name}
        decoding="async"
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />

      {/* Top Left Badge */}
      <div className="absolute left-4 top-4 flex items-center gap-2">
        <span className="rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold text-[#16181D] shadow-xs">
          {item.badge}
        </span>
      </div>

      {/* Top Right Quick Arrow */}
      <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#16181D] opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
        <ArrowUpRight className="h-4 w-4" />
      </div>

      {/* High-Contrast Bottom Overlay (Matching Reference) */}
      <div className="glass-card-overlay absolute inset-x-3 bottom-3 rounded-2xl p-4 text-white border border-white/15">
        <div className="flex items-end justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-[11px] text-sky-200 font-semibold mb-1">
              <span className="rounded-md bg-white/20 px-2 py-0.5">{item.state}</span>
              <span>•</span>
              <span>{item.duration}</span>
            </div>
            <h3 className="truncate text-base sm:text-lg font-bold text-white">
              {item.name}
            </h3>
            <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-white/90">
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-sky-200 shrink-0" />
                <span className="truncate">{item.location}</span>
              </span>
              <span className="inline-flex items-center gap-1">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                <span className="font-semibold">{item.rating}</span>
                <span className="text-white/75">({item.reviews})</span>
              </span>
            </div>
          </div>

          <div className="shrink-0 text-right whitespace-nowrap">
            <span className="block text-[11px] text-white/70 line-through">
              {formatPrice(item.originalPriceInr, currency)}
            </span>
            <p className="text-base sm:text-lg font-extrabold text-white">
              {formatPrice(item.priceInr, currency)}
              <span className="text-xs font-normal text-white/80">/{item.unit}</span>
            </p>
            <span className="inline-block mt-1 text-[11px] font-semibold text-sky-200 group-hover:underline">
              Send Inquiry →
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function TopHotelsSection({ travelState, onSelectPackage }) {
  const activeCat = travelState.activeCategory || 'Tour Packages';
  const activeState = travelState.activeStateFilter || 'All';
  const currency = travelState.currency || 'INR';

  const categories = ['Tour Packages', 'Hotels & Stays', 'Cab & Volvo', 'Yatra & Treks'];
  const stateTabs = ['All', 'Himachal Pradesh', 'Uttarakhand'];

  // Filter items by category & state
  const filteredPackages = ALL_PACKAGES.filter((p) => {
    const matchCategory = activeCat === 'Tour Packages' ? true : p.category === activeCat;
    const matchState = activeState === 'All' ? true : p.state === activeState;
    return matchCategory && matchState;
  });

  const displayList = filteredPackages.length > 0 ? filteredPackages : ALL_PACKAGES;
  const isBentoMode = displayList.length >= 3;

  return (
    <section id="packages-section" className="mx-auto max-w-7xl px-4 pt-12 pb-16 sm:px-6 lg:px-8 lg:pt-16">
      {/* Search Notification Banner when user clicks Search in Vue Widget */}
      {travelState.searchQueryActive && travelState.lastSearchSummary && (
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/80 px-5 py-3.5 text-sm text-emerald-950">
          <div className="flex items-center gap-2.5">
            <Sparkles className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>
              Showing curated mountain itineraries for:{' '}
              <span className="font-bold">{travelState.lastSearchSummary}</span>
            </span>
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
            Local Himachal Pricing
          </span>
        </div>
      )}

      {/* Eyebrow Badge & State Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#16181D]">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#1D1F23] text-white">
            <Check className="h-3 w-3" />
          </span>
          <span>Top-Rated Tours &amp; Stays For You</span>
        </div>

        {/* State Tabs: All / Himachal / Uttarakhand */}
        <div className="inline-flex max-w-full items-center gap-1 overflow-x-auto rounded-full bg-slate-100 p-1">
          {stateTabs.map((state) => (
            <button
              key={state}
              type="button"
              onClick={() => setActiveStateFilter(state)}
              className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-semibold transition cursor-pointer ${
                activeState === state
                  ? 'bg-[#1D1F23] text-white shadow-xs'
                  : 'text-slate-600 hover:text-[#16181D]'
              }`}
            >
              {state}
            </button>
          ))}
        </div>
      </div>

      {/* Section Title + Category Filters + Explore More CTA */}
      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-[#16181D] sm:text-4xl">
            {activeState === 'All'
              ? 'Top-Rated Mountain Packages For You'
              : `Curated ${activeState} Packages`}
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Local drivers, verified boutique stays, and dedicated 24/7 on-ground mountain coordinators.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <a
            href="#calculator"
            className="rounded-full border border-slate-300 px-5 py-2.5 text-xs font-semibold text-[#16181D] hover:bg-slate-50 transition"
          >
            Explore more
          </a>
          <a
            href="#calculator"
            aria-label="Open mountain trip calculator"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#24272C] text-white hover:bg-[#141619] transition"
          >
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* Secondary Category Pills */}
      <div className="mt-6 flex flex-wrap items-center gap-1.5">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition cursor-pointer ${
              activeCat === cat
                ? 'bg-slate-900 text-white font-semibold'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Asymmetric Bento Grid matching Reference Layout */}
      {isBentoMode ? (
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <PackageBentoCard
              item={displayList[0]}
              currency={currency}
              tall
              onSelect={onSelectPackage}
            />
          </div>
          <div className="flex flex-col gap-6 lg:col-span-6">
            <PackageBentoCard
              item={displayList[1]}
              currency={currency}
              onSelect={onSelectPackage}
            />
            {displayList[2] && (
              <PackageBentoCard
                item={displayList[2]}
                currency={currency}
                onSelect={onSelectPackage}
              />
            )}
          </div>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {displayList.map((item) => (
            <PackageBentoCard
              key={item.id}
              item={item}
              currency={currency}
              onSelect={onSelectPackage}
            />
          ))}
        </div>
      )}

      {/* Extra 4th Item Strip (Auli & Chopta / Alpine Meadow) */}
      {displayList[3] && (
        <div
          onClick={() => onSelectPackage(displayList[3])}
          className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-3xl border border-slate-200/80 bg-[#F8FBFD] p-4 sm:p-5 cursor-pointer hover:border-slate-300 hover:shadow-md transition"
        >
          <div className="flex items-center gap-4">
            <img
              src={displayList[3].image}
              alt={displayList[3].name}
              className="h-20 w-28 rounded-2xl object-cover shrink-0"
            />
            <div>
              <span className="inline-block rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800">
                {displayList[3].badge}
              </span>
              <h3 className="mt-1 text-base sm:text-lg font-bold text-[#16181D]">
                {displayList[3].name}
              </h3>
              <p className="text-xs text-slate-600">
                {displayList[3].location} • {displayList[3].duration} • {displayList[3].rating} ★ ({displayList[3].reviews})
              </p>
            </div>
          </div>

          <div className="flex w-full sm:w-auto shrink-0 items-center justify-between sm:justify-end gap-4">
            <div className="text-left sm:text-right whitespace-nowrap">
              <span className="block text-xs text-slate-400 line-through">
                {formatPrice(displayList[3].originalPriceInr, currency)}
              </span>
              <span className="text-xl font-extrabold text-[#16181D]">
                {formatPrice(displayList[3].priceInr, currency)}
                <span className="text-xs font-normal text-slate-500">/{displayList[3].unit}</span>
              </span>
            </div>
            <button
              type="button"
              className="whitespace-nowrap shrink-0 rounded-full bg-[#1D1F23] px-5 py-2.5 text-xs font-semibold text-white hover:bg-[#2E3239] cursor-pointer"
            >
              Send Inquiry
            </button>
          </div>
        </div>
      )}

      {/* Popular Mountain Destinations Showcase Grid */}
      <div id="destinations" className="mt-16 pt-10 border-t border-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Top Himachal &amp; Uttarakhand Circuits
            </span>
            <h3 className="mt-1 text-2xl font-bold text-[#16181D]">
              Explore Iconic Locations in Both States
            </h3>
          </div>
          <p className="text-xs text-slate-500">Regular daily departures from Delhi, Chandigarh &amp; Haridwar</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Himachal Destinations */}
          <div className="rounded-3xl bg-[#F6FAFC] border border-slate-200/80 p-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
              <h4 className="text-base font-bold text-[#16181D]">Himachal Pradesh</h4>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                6 Circuits
              </span>
            </div>
            <div className="space-y-2.5">
              {DESTINATIONS_BY_STATE['Himachal Pradesh'].map((d) => (
                <div
                  key={d.name}
                  onClick={() =>
                    onSelectPackage({
                      name: `${d.name} Tour (${d.tag})`,
                      location: `${d.name}, Himachal Pradesh`,
                      priceDisplay: `Starting ${formatPrice(d.startingInr, currency)}/person`,
                      state: 'Himachal Pradesh',
                    })
                  }
                  className="flex items-center justify-between p-3 rounded-2xl bg-white hover:bg-slate-50 cursor-pointer border border-slate-100 transition shadow-xs"
                >
                  <div>
                    <p className="text-sm font-bold text-[#16181D]">{d.name}</p>
                    <p className="text-xs text-slate-500">{d.tag} • Alt. {d.altitude}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-semibold text-emerald-800">
                      From {formatPrice(d.startingInr, currency)}
                    </p>
                    <span className="text-[10px] text-slate-400">Send Inquiry →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Uttarakhand Destinations */}
          <div className="rounded-3xl bg-[#F6FAFC] border border-slate-200/80 p-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
              <h4 className="text-base font-bold text-[#16181D]">Uttarakhand</h4>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                6 Circuits
              </span>
            </div>
            <div className="space-y-2.5">
              {DESTINATIONS_BY_STATE['Uttarakhand'].map((d) => (
                <div
                  key={d.name}
                  onClick={() =>
                    onSelectPackage({
                      name: `${d.name} Tour (${d.tag})`,
                      location: `${d.name}, Uttarakhand`,
                      priceDisplay: `Starting ${formatPrice(d.startingInr, currency)}/person`,
                      state: 'Uttarakhand',
                    })
                  }
                  className="flex items-center justify-between p-3 rounded-2xl bg-white hover:bg-slate-50 cursor-pointer border border-slate-100 transition shadow-xs"
                >
                  <div>
                    <p className="text-sm font-bold text-[#16181D]">{d.name}</p>
                    <p className="text-xs text-slate-500">{d.tag} • Alt. {d.altitude}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-semibold text-emerald-800">
                      From {formatPrice(d.startingInr, currency)}
                    </p>
                    <span className="text-[10px] text-slate-400">Send Inquiry →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
