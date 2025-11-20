import { createClient } from '@supabase/supabase-js'

// 从环境变量获取 Supabase 信息（后续会配置）
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)