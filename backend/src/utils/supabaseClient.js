// backend/src/utils/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // use SERVICE ROLE KEY for uploads
);

export default supabase;
