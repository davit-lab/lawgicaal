import { createClient } from "@supabase/supabase-js";
import { SiteContent, defaultContent } from "./types";

// Lovable Supabase integration - these env vars will be provided by Lovable
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

// Create client only if credentials exist
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Check if Supabase is configured
export const isSupabaseConfigured = () => !!supabase;

// Table name for site content
const CONTENT_TABLE = "site_content";
const ADMIN_TABLE = "admin_users";

// Get content from Supabase
export async function getContentFromSupabase(): Promise<SiteContent | null> {
  if (!supabase) return null;
  
  try {
    const { data, error } = await supabase
      .from(CONTENT_TABLE)
      .select("content")
      .eq("id", "main")
      .single();
    
    if (error) {
      console.error("Supabase error:", error);
      return null;
    }
    
    return data?.content ? { ...defaultContent, ...data.content } : null;
  } catch (err) {
    console.error("Failed to fetch from Supabase:", err);
    return null;
  }
}

// Save content to Supabase
export async function saveContentToSupabase(content: SiteContent): Promise<boolean> {
  if (!supabase) return false;
  
  try {
    const { error } = await supabase
      .from(CONTENT_TABLE)
      .upsert({ id: "main", content, updated_at: new Date().toISOString() });
    
    if (error) {
      console.error("Failed to save to Supabase:", error);
      return false;
    }
    
    return true;
  } catch (err) {
    console.error("Failed to save to Supabase:", err);
    return false;
  }
}

// Admin authentication with Supabase
export async function loginAdminWithSupabase(username: string, password: string): Promise<boolean> {
  if (!supabase) return false;
  
  try {
    const { data, error } = await supabase
      .from(ADMIN_TABLE)
      .select("*")
      .eq("username", username)
      .eq("password", password)
      .single();
    
    if (error || !data) return false;
    return true;
  } catch (err) {
    console.error("Admin login error:", err);
    return false;
  }
}

// Fallback to localStorage if Supabase is not configured
const STORAGE_KEY = "lawgicaal_site_content";
const ADMIN_KEY = "lawgicaal_admin_auth";

export function getContentFromLocal(): SiteContent {
  if (typeof window === "undefined") return defaultContent;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return defaultContent;
  try {
    return { ...defaultContent, ...JSON.parse(stored) };
  } catch {
    return defaultContent;
  }
}

export function saveContentToLocal(content: SiteContent): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
}

export function loginAdminLocal(username: string, password: string): boolean {
  if (username === "admin" && password === "admin123") {
    if (typeof window !== "undefined") {
      localStorage.setItem(ADMIN_KEY, "true");
    }
    return true;
  }
  return false;
}

export function logoutAdminLocal(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(ADMIN_KEY);
  }
}

export function isAdminAuthenticatedLocal(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(ADMIN_KEY) === "true";
}
