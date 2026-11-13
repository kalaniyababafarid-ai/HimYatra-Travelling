<script setup>
import { computed, ref } from 'vue';
import {
  Mountain,
  BedDouble,
  CarFront,
  Compass,
  ArrowLeftRight,
  CalendarDays,
  Users,
  Search,
  MapPin,
  Sparkles,
} from 'lucide-vue-next';
import {
  travelState,
  setActiveCategory,
  setActiveStateFilter,
  triggerSearch,
} from '../store/travelStore';

const props = defineProps({
  onSearchComplete: {
    type: Function,
    default: null,
  },
});

const tabs = [
  { id: 'Tour Packages', label: 'Tour Packages', icon: Mountain },
  { id: 'Hotels & Stays', label: 'Hotels & Stays', icon: BedDouble },
  { id: 'Cab & Volvo', label: 'Cab & Volvo', icon: CarFront },
  { id: 'Yatra & Treks', label: 'Yatra & Treks', icon: Compass },
];

const stateOptions = ['Himachal Pradesh', 'Uttarakhand', 'Both States'];

const selectedState = ref(travelState.tripScope || 'Both States');
const fromVal = ref(travelState.fromLocation || 'Delhi NCR / Chandigarh');
const toVal = ref(travelState.toLocation || 'Manali • Solang • Atal Tunnel');
const dateVal = ref(travelState.travelDate || '2026-12-20');
const travelersVal = ref(travelState.travelers || '2 Travelers • Couple');

const destinationSuggestions = computed(() => {
  if (selectedState.value === 'Himachal Pradesh') {
    return [
      'Manali • Solang • Atal Tunnel',
      'Spiti Valley • Kaza • Chandratal',
      'Shimla • Kufri • Mashobra',
      'Kasol • Tosh • Parvati Valley',
      'Bir Billing • Dharamshala',
    ];
  }
  if (selectedState.value === 'Uttarakhand') {
    return [
      'Rishikesh • Mussoorie • Dehradun',
      'Nainital • Bhimtal • Jim Corbett',
      'Auli • Joshimath • Chopta',
      'Kedarnath • Badrinath (Do Dham)',
      'Valley of Flowers • Hemkund',
    ];
  }
  return [
    'Manali • Solang • Atal Tunnel',
    'Rishikesh • Mussoorie • Nainital',
    'Spiti Valley Expedition',
    'Auli Snow & Chopta Meadows',
    'Shimla • Kufri Heritage',
  ];
});

function selectTab(tabId) {
  setActiveCategory(tabId);
  if (tabId === 'Tour Packages') {
    toVal.value = 'Manali • Solang • Atal Tunnel';
  } else if (tabId === 'Hotels & Stays') {
    toVal.value = 'Old Manali & Mashobra Pine Chalets';
  } else if (tabId === 'Cab & Volvo') {
    toVal.value = 'Delhi ↔ Manali / Rishikesh Innova Crysta';
  } else {
    toVal.value = 'Kedarnath • Badrinath Yatra';
  }
}

function onStateChange(stateName) {
  selectedState.value = stateName;
  setActiveStateFilter(stateName === 'Both States' ? 'All' : stateName);
  toVal.value = destinationSuggestions.value[0];
}

function swapLocations() {
  const temp = fromVal.value;
  fromVal.value = toVal.value;
  toVal.value = temp;
}

function handleSearch() {
  triggerSearch({
    activeCategory: travelState.activeCategory,
    tripScope: selectedState.value,
    activeStateFilter: selectedState.value === 'Both States' ? 'All' : selectedState.value,
    fromLocation: fromVal.value,
    toLocation: toVal.value,
    travelDate: dateVal.value,
    travelers: travelersVal.value,
    lastSearchSummary: `${selectedState.value} • ${fromVal.value} → ${toVal.value} (${travelersVal.value})`,
  });

  if (props.onSearchComplete) {
    props.onSearchComplete(travelState.activeCategory);
  } else {
    const target = document.getElementById('packages-section');
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
</script>

<template>
  <div class="relative z-20 mx-auto w-full max-w-5xl px-4 sm:px-6">
    <!-- Top Category Tabs (Hotello / Reference Style) -->
    <div class="inline-flex flex-wrap items-end rounded-t-2xl bg-white/95 p-1.5 shadow-sm">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        type="button"
        @click="selectTab(tab.id)"
        :class="[
          'flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer',
          travelState.activeCategory === tab.id
            ? 'bg-[#1D1F23] text-white shadow-sm'
            : 'text-[#4A5058] hover:bg-slate-100 hover:text-[#1D1F23]',
        ]"
      >
        <component :is="tab.icon" class="h-4 w-4 shrink-0" />
        <span>{{ tab.label }}</span>
      </button>
    </div>

    <!-- Floating White Search Card -->
    <form
      @submit.prevent="handleSearch"
      class="floating-widget-shadow rounded-b-3xl rounded-tr-3xl bg-white p-4 sm:p-6 border border-slate-100"
    >
      <!-- State Region Radio Selector & Badge -->
      <div class="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div class="flex flex-wrap items-center gap-4 sm:gap-6">
          <label
            v-for="state in stateOptions"
            :key="state"
            class="flex items-center gap-2 text-xs sm:text-sm font-medium text-[#2A2E35] cursor-pointer select-none"
          >
            <input
              type="radio"
              name="stateScope"
              :value="state"
              :checked="selectedState === state"
              @change="onStateChange(state)"
              class="h-3.5 w-3.5 accent-[#1D1F23] cursor-pointer"
            />
            <span>{{ state }}</span>
          </label>
        </div>
        <span
          class="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-[11px] font-bold tracking-wide text-emerald-800"
        >
          <Sparkles class="h-3 w-3 text-emerald-600" />
          LOCAL HIMACHAL BASE • BEST LOCAL RATES
        </span>
      </div>

      <!-- Inputs Row -->
      <div class="grid grid-cols-1 gap-3 md:grid-cols-12 md:items-stretch">
        <!-- From + Swap + To Destination -->
        <div class="relative grid grid-cols-1 gap-3 sm:grid-cols-2 md:col-span-6">
          <div class="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 focus-within:border-[#1D1F23] transition">
            <MapPin class="h-4 w-4 shrink-0 text-[#5B626B]" />
            <div class="min-w-0 flex-1">
              <p class="text-[11px] font-medium text-slate-400">Departure City (Hub)</p>
              <input
                v-model="fromVal"
                type="text"
                class="w-full bg-transparent text-sm font-semibold text-[#16181D] outline-none placeholder:text-slate-300"
                placeholder="Delhi, Chandigarh, Mumbai..."
              />
            </div>
          </div>

          <!-- Swap Button -->
          <button
            type="button"
            @click="swapLocations"
            aria-label="Swap departure and destination"
            class="hidden sm:flex absolute left-1/2 top-1/2 z-10 h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-[#1D1F23] shadow-sm hover:bg-slate-50 active:scale-95 transition cursor-pointer"
          >
            <ArrowLeftRight class="h-3.5 w-3.5" />
          </button>

          <div class="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 focus-within:border-[#1D1F23] transition">
            <Mountain class="h-4 w-4 shrink-0 text-[#5B626B]" />
            <div class="min-w-0 flex-1">
              <p class="text-[11px] font-medium text-slate-400">Destination / Circuit</p>
              <input
                v-model="toVal"
                list="destination-list"
                type="text"
                class="w-full bg-transparent text-sm font-semibold text-[#16181D] outline-none placeholder:text-slate-300"
                placeholder="Manali, Spiti, Rishikesh..."
              />
              <datalist id="destination-list">
                <option v-for="d in destinationSuggestions" :key="d" :value="d" />
              </datalist>
            </div>
          </div>
        </div>

        <!-- Travel Date -->
        <div class="md:col-span-2 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3.5 py-3 focus-within:border-[#1D1F23] transition">
          <CalendarDays class="h-4 w-4 shrink-0 text-[#5B626B]" />
          <div class="min-w-0 flex-1">
            <p class="text-[11px] font-medium text-slate-400">Travel Date</p>
            <input
              v-model="dateVal"
              type="date"
              class="w-full bg-transparent text-xs sm:text-sm font-semibold text-[#16181D] outline-none cursor-pointer"
            />
          </div>
        </div>

        <!-- Travelers & Party -->
        <div class="md:col-span-3 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3.5 py-3 focus-within:border-[#1D1F23] transition">
          <Users class="h-4 w-4 shrink-0 text-[#5B626B]" />
          <div class="min-w-0 flex-1">
            <p class="text-[11px] font-medium text-slate-400">Travelers &amp; Party</p>
            <select
              v-model="travelersVal"
              class="w-full bg-transparent text-xs sm:text-sm font-semibold text-[#16181D] outline-none cursor-pointer"
            >
              <option>1 Traveler • Solo Explorer</option>
              <option>2 Travelers • Couple</option>
              <option>4 Travelers • Family Holiday</option>
              <option>6–10 Travelers • Friends Group</option>
              <option>Senior Citizens • Yatra Special</option>
            </select>
          </div>
        </div>

        <!-- Search CTA Button -->
        <div class="md:col-span-1 flex">
          <button
            type="submit"
            aria-label="Search tour packages"
            class="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#1D1F23] px-4 py-3.5 text-white shadow-md hover:bg-[#2F333A] active:scale-[0.98] transition cursor-pointer"
          >
            <Search class="h-5 w-5" />
            <span class="text-sm font-semibold md:hidden">Search Mountain Packages</span>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
