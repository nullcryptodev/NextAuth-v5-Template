// Contains all code related to a user(s) in our database.

import { TABLES } from "./consts";

import { users } from "@/types/database.types";
import { supabase } from "@/utils/secrets";

/**
 * Input for finding or creating a user via OAuth
 */
interface FindOrCreateUserInput {
  email?: string | null;
  name?: string | null;
  image?: string | null;
  google_id: string;
}

/**
 * Standard return type
 */
type Result <T> = {
  data?: T;
  error?: string;
};

export const find_or_create_user = async (
  user: FindOrCreateUserInput
): Promise<Result<users>> => {
  if (!user.email) {
    return { error: "[ERROR] Could not detect user e-mail." };
  }

  try {
    let existing_user: users | null = null;

    /**
     * 1. Try find by google_id (PRIMARY identity)
     */
    const { data: user_by_google, error: google_error } = await supabase
      .from(TABLES.users)
      .select("*")
      .eq("google_id", user.google_id)
      .maybeSingle();

    if (google_error) {
      console.error("Error finding user by google_id:", google_error);
      return { error: "[ERROR] Could not find user." };
    }

    existing_user = user_by_google;

    /**
     * 2. Fallback: find by email (for legacy users / first OAuth link)
     */
    if (!existing_user) {
      const { data: user_by_email, error: email_error } = await supabase
        .from(TABLES.users)
        .select("*")
        .eq("email", user.email)
        .maybeSingle();

      if (email_error) {
        console.error("Error finding user by email:", email_error);
        return { error: "[ERROR] Could not find user." };
      }

      existing_user = user_by_email;

      /**
       * If found by email but missing google_id → link account
       */
      if (existing_user && !existing_user.google_id) {
        const { error: link_error } = await supabase
          .from(TABLES.users)
          .update({ google_id: user.google_id })
          .eq("id", existing_user.id);

        if (link_error) {
          console.error("Error linking google_id:", link_error);
          return { error: "[ERROR] Could not link account." };
        }

        existing_user.google_id = user.google_id;
      }
    }

    /**
     * 3. If user exists → update missing fields
     */
    if (existing_user) {
      const updates: Partial<users> = {};

      if (!existing_user.profile_image && user.image) {
        updates.profile_image = user.image;
      }

      if (!existing_user.name && user.name) {
        updates.name = user.name;
      }

      if (Object.keys(updates).length > 0) {
        const { error: update_error } = await supabase
          .from(TABLES.users)
          .update(updates)
          .eq("id", existing_user.id);

        if (update_error) {
          console.error("Error updating user:", update_error);
        }
      }

      return { data: existing_user };
    }

    /**
     * 4. Create new user
     * (Relies on DB UNIQUE constraints for safety)
     */
    const { data: new_user, error: insert_error } = await supabase
      .from(TABLES.users)
      .insert([
        {
          email: user.email,
          name: user.name ?? null,
          google_id: user.google_id,
          profile_image: user.image ?? null,
        },
      ])
      .select()
      .single();

    if (insert_error) {
      console.error("Error creating user:", insert_error);

      /**
       * Possible race condition fallback:
       * Try fetching again (user may have just been created)
       */
      const { data: retry_user } = await supabase
        .from(TABLES.users)
        .select("*")
        .eq("google_id", user.google_id)
        .maybeSingle();

      if (retry_user) {
        return { data: retry_user };
      }

      return { error: "[ERROR] Could not create user." };
    }

    return { data: new_user };
  } catch (err) {
    console.error("Unexpected error:", err);
    return { error: "[ERROR] Unexpected failure." };
  }
};

export const get_user_by_id = async (
  id: number
): Promise<Result<users>> => {
  const { data, error } = await supabase
    .from(TABLES.users)
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching user:", error);
    return { error: "[ERROR] Could not fetch user." };
  }

  return { data };
};
