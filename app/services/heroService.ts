import { HeroProfile } from "../types/hero/hero";

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

export const heroService = {
  async getMyHero(): Promise<HeroProfile> {
    try {
      const response = await fetch(`${apiUrl}/api/hero`, {
        method: 'GET',
        credentials: 'include', 
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (err: any) {
      console.error(err.message);
      throw err;
    }
  }
};