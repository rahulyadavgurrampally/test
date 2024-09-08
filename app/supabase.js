import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qzxwepdpvgqpttshphxc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6eHdlcGRwdmdxcHR0c2hwaHhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA1OTQ5MzgsImV4cCI6MjAzNjE3MDkzOH0.VALWAIerAjjG9Aj_SjHC0Smk_KfpegKFrMEeC_0SWZk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
