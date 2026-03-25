"use server";

interface ContributionDay {
  count: number;
  date: string;
  level: number;
}

interface ApiResponse {
  total: {
    [key: string]: number;
  };
  contributions: ContributionDay[];
}

export async function getGitHubContributions(username: string, year: number) {
  try {
    const response = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${username}?y=${year}`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
    );
    
    if (!response.ok) {
      throw new Error("Failed to fetch contribution data");
    }
    
    const result: ApiResponse = await response.json();
    return { data: result.contributions, error: null };
  } catch (err: any) {
    return { data: [], error: err.message };
  }
}
