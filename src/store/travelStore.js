import { reactive } from 'vue';

// Shared reactive store powered by Vue's reactivity engine and subscribed to by React components
export const travelState = reactive({
  currency: 'INR',
  activeCategory: 'Tour Packages',
  activeStateFilter: 'All',
  tripScope: 'Both States',
  fromLocation: 'New Delhi / Chandigarh',
  toLocation: 'Manali • Spiti • Rishikesh',
  travelDate: '2026-12-20',
  travelers: '2 Travelers • Couple',
  searchQueryActive: false,
  lastSearchSummary: '',
});

const listeners = new Set();

export function subscribeTravelState(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function notifyStateChange() {
  listeners.forEach((fn) => fn({ ...travelState }));
}

export function setCurrency(currency) {
  travelState.currency = currency;
  notifyStateChange();
}

export function setActiveCategory(category) {
  travelState.activeCategory = category;
  notifyStateChange();
}

export function setActiveStateFilter(stateName) {
  travelState.activeStateFilter = stateName;
  notifyStateChange();
}

export function triggerSearch(payload) {
  Object.assign(travelState, payload, { searchQueryActive: true });
  notifyStateChange();
}
