
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://riugbkxxqlwalilyogze.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpdWdia3h4cWx3YWxpbHlvZ3plIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgzMzQ2NTcsImV4cCI6MjA2MzkxMDY1N30.BwZCghxRCQhEktufhvdeB9AvSb3v8_EwYhSZ_k4nf4Y'

export const supabase = createClient(supabaseUrl, supabaseKey)
