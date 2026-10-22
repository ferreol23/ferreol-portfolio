/**
 * TypeScript description of the Supabase tables, so the editor can catch typos.
 * Matches the real tables in the "my-portfolio" Supabase project.
 */
export type Database = {
  public: {
    Tables: {
      reviews: {
        Row: {
          id: string;
          name: string;
          rating: number;
          comment: string;
          approved: boolean;
          created_at: string;
        };
        Insert: {
          name: string;
          rating: number;
          comment: string;
          approved: false; // visitors may only ever insert unapproved reviews
        };
        Update: never;
        Relationships: [];
      };
      visits: {
        Row: {
          id: string;
          page: string;
          country: string | null;
          created_at: string;
        };
        Insert: {
          page: string;
          country?: null;
        };
        Update: never;
        Relationships: [];
      };
      messages: {
        Row: {
          id: string;
          name: string;
          email: string;
          message: string;
          created_at: string;
        };
        Insert: {
          name: string;
          email: string;
          message: string;
        };
        Update: never;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

export type Review = Database["public"]["Tables"]["reviews"]["Row"];
