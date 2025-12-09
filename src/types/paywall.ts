// Paywall Types for WaLens

export type AccessLevel = 'free' | 'basic' | 'premium' | 'admin_only';

export type RoleName = 'GUEST' | 'BASIC' | 'PREMIUM' | 'ADMIN';

export interface Role {
  id: string;
  name: RoleName;
  description: string | null;
  created_at: string;
}

export interface Plan {
  id: string;
  name: string;
  slug: string;
  price_monthly: number;
  price_yearly: number;
  description: string | null;
  features: string[];
  is_active: boolean;
  created_at: string;
}

export interface RoleArticleRule {
  id: string;
  role_id: string;
  access_level: AccessLevel;
  can_view_full: boolean;
  can_comment: boolean;
  can_download_pdf: boolean;
  created_at: string;
}

export interface ArticleAccess {
  canViewPreview: boolean;
  canViewFull: boolean;
  canComment: boolean;
  canDownloadPdf: boolean;
  reason: AccessReason;
  userRole: RoleName;
}

export type AccessReason = 
  | 'FULL_ACCESS'
  | 'ADMIN_OVERRIDE'
  | 'GUEST_PREVIEW_ONLY'
  | 'UPGRADE_TO_BASIC'
  | 'UPGRADE_TO_PREMIUM'
  | 'ADMIN_ONLY_CONTENT'
  | 'FREE_CONTENT';

export interface UserAccessContext {
  isLoggedIn: boolean;
  email: string | null;
  role: RoleName;
  subscriptionTier: string | null;
  isAdmin: boolean;
}

// For sheet news articles
export interface SheetArticleAccess {
  accessLevel: AccessLevel;
  previewParagraphs: number;
}

// Admin email constant
export const ADMIN_EMAIL = 'tungtungtutungtung@gmail.com';
