
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://pfyerxzcaczrpqwebmun.supabase.co";
const supabasePublishableKey = "sb_publishable_0wxnlmtq2W-JUlyeZLvAog_kD-ICru9";

export const supabase = createClient(
  supabaseUrl,
  supabasePublishableKey
);
