import { cookies } from "next/headers";
import { User } from "@/types/user";
import { readUserProfile } from "@/lib/data/userProfileStore";

export async function getSessionUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("auth-token")?.value;

  if (!sessionToken) {
    return null;
  }

  try {
    // Read the latest user data from JSON file
    const profile = readUserProfile();
    return {
      id: profile.id,
      name: profile.name,
      email: profile.email,
      avatarUrl: profile.avatarUrl,
      username: profile.username,
    };
  } catch (error) {
    console.error("Error getting session user:", error);
    return null;
  }
}
