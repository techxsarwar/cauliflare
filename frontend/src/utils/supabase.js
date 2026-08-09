import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://psfxeflpqvesqynrpbit.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_YjPNdpaGyUWMlt_pLtorgA_jINw1Ibg';

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false
  }
});

/**
 * Helper to safely sync API keys with Supabase
 */
export async function syncApiKeysWithSupabase(userId, keys) {
  if (!userId || !keys) return;
  try {
    const { error } = await supabase
      .from('user_api_keys')
      .upsert({
        user_id: userId,
        keys: keys,
        updated_at: new Date().toISOString()
      }, { onConflict: 'user_id' });
    if (error) {
      console.warn('Supabase sync info:', error.message);
    }
  } catch (err) {
    // Non-blocking fallback
  }
}

/**
 * Helper to load API keys from Supabase
 */
export async function loadApiKeysFromSupabase(userId) {
  if (!userId) return null;
  try {
    const { data, error } = await supabase
      .from('user_api_keys')
      .select('keys')
      .eq('user_id', userId)
      .single();
    if (error) return null;
    return data?.keys || null;
  } catch (err) {
    return null;
  }
}

/**
 * Helper to save user settings in Supabase
 */
export async function syncSettingsWithSupabase(userId, settings) {
  if (!userId || !settings) return;
  try {
    const { error } = await supabase
      .from('user_settings')
      .upsert({
        user_id: userId,
        settings: settings,
        updated_at: new Date().toISOString()
      }, { onConflict: 'user_id' });
    if (error) console.warn('Supabase settings info:', error.message);
  } catch (err) {}
}
