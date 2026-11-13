import { supabase, isSupabaseConfigured } from '../lib/supabase';

const LOCAL_STORAGE_KEY = 'himyatra_offline_inquiries';

export async function submitInquiry(payload) {
  const record = {
    full_name: payload.name || 'Anonymous',
    phone: payload.phone || '',
    email: payload.email || '',
    departure_city: payload.departureCity || 'Delhi NCR',
    travel_date: payload.travelDate || null,
    travelers: payload.guests || '2 Travelers',
    notes: payload.notes || '',
    tour_name: payload.tourName || 'General Tour Inquiry',
    price_display: payload.priceDisplay || 'Direct Himachal Rate',
    state_region: payload.stateRegion || 'Himachal Pradesh & Uttarakhand',
    status: 'new',
    created_at: new Date().toISOString(),
  };

  // Always store a copy in local storage backup
  try {
    const existing = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
    existing.unshift({ ...record, local_id: `local_${Date.now()}` });
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existing.slice(0, 50)));
  } catch (err) {
    console.warn('Could not cache inquiry to localStorage:', err);
  }

  // If Supabase is configured, insert into the 'inquiries' table
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .insert([record])
        .select()
        .single();

      if (error) {
        console.error('Supabase insert error:', error);
        return {
          success: true,
          savedToRemote: false,
          error: error.message,
          data: record,
        };
      }

      return {
        success: true,
        savedToRemote: true,
        data,
      };
    } catch (err) {
      console.error('Network or database exception saving inquiry:', err);
      return {
        success: true,
        savedToRemote: false,
        error: err.message,
        data: record,
      };
    }
  }

  // If Supabase credentials are pending, return success with local-saved status
  return {
    success: true,
    savedToRemote: false,
    message: 'Saved to local inquiry queue. Ready to sync with Supabase backend.',
    data: record,
  };
}
