<script setup>
import { computed, ref } from 'vue';
import { Sparkles, Check, MessageCircle, ArrowUpRight, ShieldCheck, MapPin } from 'lucide-vue-next';
import { travelState } from '../store/travelStore';
import { formatPrice, buildWhatsAppUrl, BUSINESS_INFO } from '../data/travelData';

const props = defineProps({
  onBookCustom: {
    type: Function,
    default: null,
  },
});

const destinationRegion = ref('Himachal Pradesh');
const days = ref(5);
const travelers = ref(2);

const planModules = ref([
  { id: 'stay', name: 'Scenic Cedar Chalet / Lake Resort', perNightInr: 3200, perTripInr: 0, selected: true },
  { id: 'cab', name: 'Dedicated Private Cab (Innova/Sedan)', perNightInr: 2800, perTripInr: 0, selected: true },
  { id: 'meals', name: 'Himachali Breakfast & Dinner Buffet', perNightInr: 800, perTripInr: 0, selected: true },
  { id: 'adventure', name: 'Adventure Pass (Rafting/Paragliding/Atal Tunnel)', perNightInr: 0, perTripInr: 2500, selected: false },
]);

function toggleModule(item) {
  item.selected = !item.selected;
}

const standardTotalInr = computed(() => {
  return planModules.value.reduce((sum, m) => {
    if (!m.selected) return sum;
    const nightPart = m.perNightInr * (days.value - 1);
    const guestPart = m.perTripInr * travelers.value;
    return sum + nightPart + guestPart;
  }, 0);
});

// Direct Himachal local agency pricing (approx 20% direct saving vs aggregators)
const directPriceInr = computed(() => Math.round(standardTotalInr.value * 0.82));
const savingsInr = computed(() => standardTotalInr.value - directPriceInr.value);

const formattedStandard = computed(() => formatPrice(standardTotalInr.value, travelState.currency));
const formattedDirect = computed(() => formatPrice(directPriceInr.value, travelState.currency));
const formattedSavings = computed(() => formatPrice(savingsInr.value, travelState.currency));

const selectedNames = computed(() =>
  planModules.value.filter((m) => m.selected).map((m) => m.name)
);

const whatsappHref = computed(() => {
  const inclusions = selectedNames.value.length ? selectedNames.value.join(', ') : 'Custom Package';
  return buildWhatsAppUrl(
    `Hello ${BUSINESS_INFO.name}! I built a custom ${destinationRegion.value} package for ${days.value} Days & ${travelers.value} Guests. Inclusions: ${inclusions}. Estimated Local Rate: ${formattedDirect.value}. Please share an itinerary!`
  );
});

function openBookingModal() {
  if (props.onBookCustom) {
    props.onBookCustom({
      title: `Custom ${destinationRegion.value} Holiday (${days.value} Days • ${travelers.value} Guests)`,
      price: `${formattedDirect.value} total`,
      originalPrice: formattedStandard.value,
      details: selectedNames.value.join(', '),
      state: destinationRegion.value,
    });
  }
}
</script>

<template>
  <section id="calculator" class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
    <div class="rounded-[2rem] border border-slate-200/80 bg-gradient-to-br from-[#F4FAFC] via-white to-[#EEF7FA] p-6 sm:p-10 lg:p-12 shadow-sm">
      <div class="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
        <!-- Left Controls -->
        <div class="lg:col-span-7 space-y-6">
          <div class="inline-flex items-center gap-2 rounded-full bg-[#1D1F23] px-3.5 py-1.5 text-xs font-semibold text-white">
            <Sparkles class="h-3.5 w-3.5 text-[#8AD3EB]" />
            <span>Interactive Mountain Tour Cost Estimator</span>
          </div>

          <div>
            <h2 class="text-2xl sm:text-4xl font-bold tracking-tight text-[#16181D]">
              Customize Your Himachal &amp; Uttarakhand Journey
            </h2>
            <p class="mt-2 text-sm sm:text-base text-slate-600">
              Pick your destinations, duration, and inclusions. As a Himachal-based operator with regional hubs across Dehradun and Manali, we offer transparent direct pricing without portal commissions.
            </p>
          </div>

          <!-- Region Pills -->
          <div class="flex flex-wrap items-center gap-2">
            <span class="text-xs font-semibold text-slate-500 mr-1">Choose Region:</span>
            <button
              v-for="region in ['Himachal Pradesh', 'Uttarakhand', 'Himachal + Uttarakhand']"
              :key="region"
              type="button"
              @click="destinationRegion = region"
              :class="[
                'rounded-full px-4 py-1.5 text-xs font-semibold transition cursor-pointer',
                destinationRegion === region
                  ? 'bg-[#1D1F23] text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50',
              ]"
            >
              {{ region }}
            </button>
          </div>

          <!-- Sliders -->
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div class="rounded-2xl bg-white p-4 border border-slate-200/70">
              <div class="flex items-center justify-between text-sm font-semibold text-[#16181D]">
                <span>Duration</span>
                <span class="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-bold">{{ days }} Days</span>
              </div>
              <input
                v-model.number="days"
                type="range"
                min="3"
                max="12"
                class="mt-3 w-full accent-[#1D1F23] cursor-pointer"
              />
            </div>

            <div class="rounded-2xl bg-white p-4 border border-slate-200/70">
              <div class="flex items-center justify-between text-sm font-semibold text-[#16181D]">
                <span>Travelers</span>
                <span class="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-bold">{{ travelers }} Guests</span>
              </div>
              <input
                v-model.number="travelers"
                type="range"
                min="1"
                max="12"
                class="mt-3 w-full accent-[#1D1F23] cursor-pointer"
              />
            </div>
          </div>

          <!-- Inclusions Checkboxes -->
          <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button
              v-for="item in planModules"
              :key="item.id"
              type="button"
              @click="toggleModule(item)"
              :class="[
                'flex items-center justify-between rounded-2xl border p-4 text-left transition-all cursor-pointer',
                item.selected
                  ? 'border-[#1D1F23] bg-white shadow-sm'
                  : 'border-slate-200 bg-white/60 opacity-75 hover:opacity-100',
              ]"
            >
              <div>
                <p class="text-sm font-semibold text-[#16181D]">{{ item.name }}</p>
                <p class="text-xs text-emerald-700 font-semibold mt-0.5">Verified Mountain Vendor</p>
              </div>
              <span
                :class="[
                  'flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition',
                  item.selected ? 'border-[#1D1F23] bg-[#1D1F23] text-white' : 'border-slate-300 bg-white',
                ]"
              >
                <Check v-if="item.selected" class="h-3.5 w-3.5" />
              </span>
            </button>
          </div>
        </div>

        <!-- Right Live Estimate Card -->
        <div class="lg:col-span-5">
          <div class="rounded-3xl bg-[#16181D] p-6 sm:p-8 text-white shadow-xl">
            <div class="flex items-center justify-between border-b border-white/10 pb-4">
              <span class="text-xs uppercase tracking-widest text-slate-400">Direct Local Price</span>
              <span class="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-300">
                NO AGENT MIDDLEMEN
              </span>
            </div>

            <div class="mt-6 space-y-3">
              <div class="flex items-center justify-between text-sm text-slate-400">
                <span>Standard Portal Estimate</span>
                <span class="line-through">{{ formattedStandard }}</span>
              </div>
              <div class="flex items-center justify-between text-sm text-emerald-300 font-medium">
                <span>Direct Local Himachal Saving</span>
                <span>-{{ formattedSavings }}</span>
              </div>
            </div>

            <div class="mt-6 rounded-2xl bg-white/5 p-5 border border-white/10">
              <p class="text-xs text-slate-300">Estimated Total Package ({{ travelState.currency }})</p>
              <p class="mt-1 text-4xl font-extrabold tracking-tight text-white">
                {{ formattedDirect }}
              </p>
              <p class="mt-1 text-xs text-slate-400">
                Covers {{ days }} Days • {{ travelers }} Travelers • {{ destinationRegion }}
              </p>
            </div>

            <div class="mt-6 flex flex-col gap-3">
              <a
                :href="whatsappHref"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-5 py-3.5 text-sm font-bold text-slate-950 hover:bg-emerald-400 transition"
              >
                <MessageCircle class="h-4 w-4" />
                <span>Send Inquiry on WhatsApp</span>
              </a>
              <button
                type="button"
                @click="openBookingModal"
                class="flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white hover:bg-white/20 transition cursor-pointer"
              >
                <span>Send Inquiry</span>
                <ArrowUpRight class="h-4 w-4" />
              </button>
            </div>

            <div class="mt-5 flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck class="h-4 w-4 text-[#8AD3EB] shrink-0" />
              <span>Manali Head Office • Verified Drivers &amp; Hotels</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
