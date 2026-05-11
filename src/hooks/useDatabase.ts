import { useState, useEffect, useCallback } from "react";
import { SiteContent, defaultContent } from "@/lib/types";
import {
  supabase,
  isSupabaseConfigured,
  getContentFromSupabase,
  saveContentToSupabase,
  loginAdminWithSupabase,
  getContentFromLocal,
  saveContentToLocal,
  loginAdminLocal,
  logoutAdminLocal,
  isAdminAuthenticatedLocal,
} from "@/lib/supabase";

// Check if using Supabase
const useSupabase = isSupabaseConfigured();

// Get content - tries Supabase first, falls back to localStorage
export async function getContent(): Promise<SiteContent> {
  if (useSupabase) {
    const supabaseContent = await getContentFromSupabase();
    if (supabaseContent) return supabaseContent;
  }
  return getContentFromLocal();
}

// Save content - tries Supabase first, falls back to localStorage
export async function saveContent(content: SiteContent): Promise<boolean> {
  if (useSupabase) {
    const saved = await saveContentToSupabase(content);
    if (saved) return true;
  }
  saveContentToLocal(content);
  return true;
}

// Reset content to default
export async function resetContent(): Promise<void> {
  if (useSupabase) {
    await saveContentToSupabase(defaultContent);
  }
  saveContentToLocal(defaultContent);
}

// Admin authentication
export async function loginAdmin(username: string, password: string): Promise<boolean> {
  if (useSupabase) {
    return await loginAdminWithSupabase(username, password);
  }
  return loginAdminLocal(username, password);
}

export function logoutAdmin(): void {
  logoutAdminLocal();
}

export function isAdminAuthenticated(): boolean {
  return isAdminAuthenticatedLocal();
}

// React hook for using content
export function useContent() {
  const [content, setContentState] = useState<SiteContent>(defaultContent);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;
    
    async function loadContent() {
      const data = await getContent();
      if (mounted) {
        setContentState(data);
        setIsLoaded(true);
      }
    }
    
    loadContent();
    
    return () => { mounted = false; };
  }, []);

  const setContent = useCallback(async (newContent: SiteContent | ((prev: SiteContent) => SiteContent)) => {
    setContentState((prev) => {
      const updated = typeof newContent === "function" ? newContent(prev) : newContent;
      // Save async without blocking UI
      saveContent(updated);
      return updated;
    });
  }, []);

  const updateField = useCallback(<K extends keyof SiteContent>(
    section: K,
    value: SiteContent[K]
  ) => {
    setContent((prev) => ({
      ...prev,
      [section]: value,
    }));
  }, [setContent]);

  return { content, setContent, updateField, isLoaded };
}

// React hook for admin auth
export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsAuthenticated(isAdminAuthenticated());
    setIsLoaded(true);
  }, []);

  const login = useCallback(async (username: string, password: string): Promise<boolean> => {
    const success = await loginAdmin(username, password);
    if (success) {
      setIsAuthenticated(true);
    }
    return success;
  }, []);

  const logout = useCallback(() => {
    logoutAdmin();
    setIsAuthenticated(false);
  }, []);

  return { isAuthenticated, isLoaded, login, logout };
}
