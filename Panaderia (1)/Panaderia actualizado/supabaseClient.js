// Cliente Supabase (ESM desde CDN) — permite uso directo en el navegador sin bundler
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 'https://amvzwgxfsqawhearhouv.supabase.co'
const supabaseKey = 'sb_publishable_Igk-dQ-D3-beIHs6YCf3iw_rpwrn84M'

export const supabase = createClient(supabaseUrl, supabaseKey)
