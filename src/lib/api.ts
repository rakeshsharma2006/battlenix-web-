import type {
  PublicTournamentsResponse,
  PublicTournamentDetailResponse,
  PublicTournamentListItem,
  PublicTournamentDetail,
} from "./tournaments";

const DEFAULT_API_URL = "https://battlenix-backend-production.up.railway.app";

export function getApiBaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_API_URL?.trim() || DEFAULT_API_URL;
  return url.replace(/\/+$/, "");
}

export type FetchTournamentsOptions = {
  game?: "BGMI" | "FREE_FIRE";
  status?: string;
  page?: number;
  limit?: number;
};

export async function fetchPublicTournaments(
  options: FetchTournamentsOptions = {},
): Promise<{ tournaments: PublicTournamentListItem[]; total: number; error: string | null }> {
  const baseUrl = getApiBaseUrl();
  const params = new URLSearchParams();

  if (options.game) params.set("game", options.game);
  if (options.status) params.set("status", options.status);
  if (options.page) params.set("page", String(options.page));
  params.set("limit", String(options.limit ?? 50));

  const endpoint = `${baseUrl}/public/tournaments?${params.toString()}`;

  try {
    const res = await fetch(endpoint, {
      next: { revalidate: 30 },
      headers: {
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      return {
        tournaments: [],
        total: 0,
        error: `Server responded with status ${res.status}`,
      };
    }

    const json: PublicTournamentsResponse = await res.json();
    if (json.success && Array.isArray(json.data)) {
      return {
        tournaments: json.data,
        total: json.pagination?.total ?? json.data.length,
        error: null,
      };
    }

    return {
      tournaments: [],
      total: 0,
      error: "Unexpected response structure from server",
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Network error";
    return {
      tournaments: [],
      total: 0,
      error: message,
    };
  }
}

export async function fetchPublicTournamentById(
  id: string,
): Promise<{ tournament: PublicTournamentDetail | null; status: number; error: string | null }> {
  // Validate MongoDB ObjectId 24 hex chars
  if (!id || !/^[0-9a-fA-F]{24}$/.test(id)) {
    return { tournament: null, status: 400, error: "Invalid tournament ID" };
  }

  const baseUrl = getApiBaseUrl();
  const endpoint = `${baseUrl}/public/tournaments/${id}`;

  try {
    const res = await fetch(endpoint, {
      next: { revalidate: 30 },
      headers: {
        Accept: "application/json",
      },
    });

    if (res.status === 404) {
      return { tournament: null, status: 404, error: "Tournament not found" };
    }

    if (!res.ok) {
      return {
        tournament: null,
        status: res.status,
        error: `Server responded with status ${res.status}`,
      };
    }

    const json: PublicTournamentDetailResponse = await res.json();
    if (json.success && json.data) {
      return {
        tournament: json.data,
        status: 200,
        error: null,
      };
    }

    return {
      tournament: null,
      status: 500,
      error: "Unexpected response structure from server",
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Network error";
    return {
      tournament: null,
      status: 0,
      error: message,
    };
  }
}
