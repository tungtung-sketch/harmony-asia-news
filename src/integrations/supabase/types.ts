export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      article_content: {
        Row: {
          article_id: string
          content: string
          id: string
          language: Database["public"]["Enums"]["language_code"]
          meta_description: string | null
          subtitle: string | null
          tags: string[] | null
          title: string
        }
        Insert: {
          article_id: string
          content: string
          id?: string
          language: Database["public"]["Enums"]["language_code"]
          meta_description?: string | null
          subtitle?: string | null
          tags?: string[] | null
          title: string
        }
        Update: {
          article_id?: string
          content?: string
          id?: string
          language?: Database["public"]["Enums"]["language_code"]
          meta_description?: string | null
          subtitle?: string | null
          tags?: string[] | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "article_content_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
        ]
      }
      article_views: {
        Row: {
          article_id: string | null
          id: string
          role_name: string | null
          user_id: string | null
          viewed_at: string
        }
        Insert: {
          article_id?: string | null
          id?: string
          role_name?: string | null
          user_id?: string | null
          viewed_at?: string
        }
        Update: {
          article_id?: string | null
          id?: string
          role_name?: string | null
          user_id?: string | null
          viewed_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "article_views_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
        ]
      }
      articles: {
        Row: {
          access_level: Database["public"]["Enums"]["access_level"]
          author_id: string | null
          category_id: string | null
          content_type: Database["public"]["Enums"]["content_type"]
          created_at: string
          featured_image_url: string | null
          id: string
          is_premium: boolean
          preview_paragraphs: number
          published_at: string | null
          slug: string
          status: Database["public"]["Enums"]["content_status"]
          updated_at: string
        }
        Insert: {
          access_level?: Database["public"]["Enums"]["access_level"]
          author_id?: string | null
          category_id?: string | null
          content_type: Database["public"]["Enums"]["content_type"]
          created_at?: string
          featured_image_url?: string | null
          id?: string
          is_premium?: boolean
          preview_paragraphs?: number
          published_at?: string | null
          slug: string
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
        }
        Update: {
          access_level?: Database["public"]["Enums"]["access_level"]
          author_id?: string | null
          category_id?: string | null
          content_type?: Database["public"]["Enums"]["content_type"]
          created_at?: string
          featured_image_url?: string | null
          id?: string
          is_premium?: boolean
          preview_paragraphs?: number
          published_at?: string | null
          slug?: string
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "articles_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      bookmarks: {
        Row: {
          article_language: string | null
          article_slug: string
          article_title: string
          article_url: string | null
          category: string | null
          created_at: string | null
          id: string
          thumbnail_url: string | null
          user_id: string
        }
        Insert: {
          article_language?: string | null
          article_slug: string
          article_title: string
          article_url?: string | null
          category?: string | null
          created_at?: string | null
          id?: string
          thumbnail_url?: string | null
          user_id: string
        }
        Update: {
          article_language?: string | null
          article_slug?: string
          article_title?: string
          article_url?: string | null
          category?: string | null
          created_at?: string | null
          id?: string
          thumbnail_url?: string | null
          user_id?: string
        }
        Relationships: []
      }
      categories: {
        Row: {
          content_type: Database["public"]["Enums"]["content_type"]
          created_at: string
          description_en: string | null
          description_ja: string | null
          description_th: string | null
          id: string
          name_en: string
          name_ja: string | null
          name_th: string | null
          slug: string
        }
        Insert: {
          content_type: Database["public"]["Enums"]["content_type"]
          created_at?: string
          description_en?: string | null
          description_ja?: string | null
          description_th?: string | null
          id?: string
          name_en: string
          name_ja?: string | null
          name_th?: string | null
          slug: string
        }
        Update: {
          content_type?: Database["public"]["Enums"]["content_type"]
          created_at?: string
          description_en?: string | null
          description_ja?: string | null
          description_th?: string | null
          id?: string
          name_en?: string
          name_ja?: string | null
          name_th?: string | null
          slug?: string
        }
        Relationships: []
      }
      newsletter_subscribers: {
        Row: {
          email: string
          id: string
          is_active: boolean
          preferred_language: Database["public"]["Enums"]["language_code"]
          subscribed_at: string
        }
        Insert: {
          email: string
          id?: string
          is_active?: boolean
          preferred_language?: Database["public"]["Enums"]["language_code"]
          subscribed_at?: string
        }
        Update: {
          email?: string
          id?: string
          is_active?: boolean
          preferred_language?: Database["public"]["Enums"]["language_code"]
          subscribed_at?: string
        }
        Relationships: []
      }
      plans: {
        Row: {
          created_at: string
          description: string | null
          features: Json | null
          id: string
          is_active: boolean
          name: string
          price_monthly: number | null
          price_yearly: number | null
          slug: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          features?: Json | null
          id?: string
          is_active?: boolean
          name: string
          price_monthly?: number | null
          price_yearly?: number | null
          slug: string
        }
        Update: {
          created_at?: string
          description?: string | null
          features?: Json | null
          id?: string
          is_active?: boolean
          name?: string
          price_monthly?: number | null
          price_yearly?: number | null
          slug?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          company: string | null
          country: string | null
          created_at: string
          email: string
          full_name: string | null
          id: string
          industry: string | null
          position: string | null
          preferred_language: Database["public"]["Enums"]["language_code"]
          purpose: string | null
          role: Database["public"]["Enums"]["user_role"]
          role_id: string | null
          stripe_customer_id: string | null
          subscription_plan: string | null
          theme: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          company?: string | null
          country?: string | null
          created_at?: string
          email: string
          full_name?: string | null
          id?: string
          industry?: string | null
          position?: string | null
          preferred_language?: Database["public"]["Enums"]["language_code"]
          purpose?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          role_id?: string | null
          stripe_customer_id?: string | null
          subscription_plan?: string | null
          theme?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          company?: string | null
          country?: string | null
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          industry?: string | null
          position?: string | null
          preferred_language?: Database["public"]["Enums"]["language_code"]
          purpose?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          role_id?: string | null
          stripe_customer_id?: string | null
          subscription_plan?: string | null
          theme?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
      reading_history: {
        Row: {
          article_slug: string
          article_title: string
          article_url: string
          category: string | null
          id: string
          language: string
          read_at: string
          thumbnail_url: string | null
          user_id: string
        }
        Insert: {
          article_slug: string
          article_title: string
          article_url: string
          category?: string | null
          id?: string
          language?: string
          read_at?: string
          thumbnail_url?: string | null
          user_id: string
        }
        Update: {
          article_slug?: string
          article_title?: string
          article_url?: string
          category?: string | null
          id?: string
          language?: string
          read_at?: string
          thumbnail_url?: string | null
          user_id?: string
        }
        Relationships: []
      }
      role_article_rules: {
        Row: {
          access_level: Database["public"]["Enums"]["access_level"]
          can_comment: boolean
          can_download_pdf: boolean
          can_view_full: boolean
          created_at: string
          id: string
          role_id: string
        }
        Insert: {
          access_level: Database["public"]["Enums"]["access_level"]
          can_comment?: boolean
          can_download_pdf?: boolean
          can_view_full?: boolean
          created_at?: string
          id?: string
          role_id: string
        }
        Update: {
          access_level?: Database["public"]["Enums"]["access_level"]
          can_comment?: boolean
          can_download_pdf?: boolean
          can_view_full?: boolean
          created_at?: string
          id?: string
          role_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "role_article_rules_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
      roles: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          created_at: string
          current_period_end: string | null
          id: string
          is_active: boolean
          start_date: string | null
          status: string | null
          stripe_customer_id: string | null
          stripe_price_id: string | null
          stripe_subscription_id: string | null
          subscription_end_date: string | null
          tier: Database["public"]["Enums"]["subscription_tier"]
          trial_end_date: string | null
          trial_start_date: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          current_period_end?: string | null
          id?: string
          is_active?: boolean
          start_date?: string | null
          status?: string | null
          stripe_customer_id?: string | null
          stripe_price_id?: string | null
          stripe_subscription_id?: string | null
          subscription_end_date?: string | null
          tier?: Database["public"]["Enums"]["subscription_tier"]
          trial_end_date?: string | null
          trial_start_date?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          current_period_end?: string | null
          id?: string
          is_active?: boolean
          start_date?: string | null
          status?: string | null
          stripe_customer_id?: string | null
          stripe_price_id?: string | null
          stripe_subscription_id?: string | null
          subscription_end_date?: string | null
          tier?: Database["public"]["Enums"]["subscription_tier"]
          trial_end_date?: string | null
          trial_start_date?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_view_full_article: {
        Args: {
          article_access_level: Database["public"]["Enums"]["access_level"]
          user_email: string
          user_subscription_tier: string
        }
        Returns: boolean
      }
      get_user_role: {
        Args: { user_email: string; user_subscription_tier?: string }
        Returns: string
      }
      is_admin_user: { Args: never; Returns: boolean }
      is_editor_or_admin: { Args: never; Returns: boolean }
    }
    Enums: {
      access_level: "free" | "basic" | "premium" | "admin_only"
      content_status: "draft" | "published" | "archived"
      content_type: "news" | "analysis" | "thailand_101"
      language_code: "en" | "ja" | "th"
      subscription_tier: "free_trial" | "starter" | "business" | "enterprise"
      user_role: "reader" | "editor" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      access_level: ["free", "basic", "premium", "admin_only"],
      content_status: ["draft", "published", "archived"],
      content_type: ["news", "analysis", "thailand_101"],
      language_code: ["en", "ja", "th"],
      subscription_tier: ["free_trial", "starter", "business", "enterprise"],
      user_role: ["reader", "editor", "admin"],
    },
  },
} as const
