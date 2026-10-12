export type BackendTournamentStatus =
  | "REGISTRATION_OPEN"
  | "REGISTRATION_CLOSED"
  | "ONGOING"
  | "COMPLETED"
  | "CANCELLED"
  | "DRAFT";

export type PublicGame = "BGMI" | "FREE_FIRE";

export type PublicTournamentListItem = {
  id: string;
  title: string;
  game: string; // e.g. "BGMI", "FREE_FIRE"
  mode: string; // e.g. "Squad", "Solo", "Duo"
  banner: string | null;
  entryFee: number;
  prizePool: number;
  registeredCount: number;
  maxTeams: number;
  registrationStart: string | null;
  registrationEnd: string | null;
  tournamentStart: string | null;
  status: BackendTournamentStatus;
};

export type PublicTournamentStage = {
  id: string;
  name: string;
  order: number;
  status: string; // "ACTIVE" | "PENDING" | "COMPLETED"
  startTime: string | null;
  teamsAdvancing: number;
};

export type PublicPrizeBreakdownItem = {
  position: number;
  amount: number;
  recipientType: string;
};

export type PublicTournamentDetail = {
  id: string;
  title: string;
  game: string;
  mode: string;
  description: string | null;
  banner: string | null;
  entryFee: number;
  prizePool: number;
  registeredCount: number;
  maxTeams: number;
  registrationStart: string | null;
  registrationEnd: string | null;
  tournamentStart: string | null;
  status: BackendTournamentStatus;
  stages: PublicTournamentStage[];
  prizeBreakdown: PublicPrizeBreakdownItem[] | null;
  rulesSummary: string | null;
};

export type PublicTournamentsResponse = {
  success: boolean;
  data: PublicTournamentListItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
  };
};

export type PublicTournamentDetailResponse = {
  success: boolean;
  data: PublicTournamentDetail;
};

export type GameFilterValue = "ALL" | "BGMI" | "FREE_FIRE";

export type UIStatus = {
  label: string;
  badgeClass: string;
  dotColor?: string;
};

export function normalizeGameLabel(game: string): "BGMI" | "Free Fire" | string {
  const upper = (game || "").toUpperCase().trim();
  if (upper === "BGMI") return "BGMI";
  if (upper === "FREE_FIRE" || upper === "FREE FIRE" || upper === "FREEFIRE") return "Free Fire";
  return game;
}

export function formatCurrencyINR(amount: number | null | undefined): string {
  if (amount === null || amount === undefined || Number.isNaN(amount)) return "₹0";
  return `₹${Number(amount).toLocaleString("en-IN")}`;
}

export function getStatusDisplay(status: string): UIStatus {
  switch (status) {
    case "REGISTRATION_OPEN":
      return {
        label: "REGISTRATION OPEN",
        badgeClass: "border-[#e5484d]/40 bg-[#0b0b0d]/90 text-[#ff777b]",
        dotColor: "#e5484d",
      };
    case "REGISTRATION_CLOSED":
      return {
        label: "REGISTRATION CLOSED",
        badgeClass: "border-amber-500/30 bg-[#0b0b0d]/90 text-amber-300",
      };
    case "ONGOING":
      return {
        label: "LIVE",
        badgeClass: "border-[#39c47c]/40 bg-[#0b0b0d]/90 text-[#39c47c]",
        dotColor: "#39c47c",
      };
    case "COMPLETED":
      return {
        label: "COMPLETED",
        badgeClass: "border-white/15 bg-[#0b0b0d]/90 text-[#a1a1aa]",
      };
    case "CANCELLED":
      return {
        label: "CANCELLED",
        badgeClass: "border-red-900/40 bg-[#0b0b0d]/90 text-red-400",
      };
    default:
      return {
        label: status ? status.replace(/_/g, " ") : "UPCOMING",
        badgeClass: "border-white/10 bg-[#0b0b0d]/90 text-[#d4d4d8]",
      };
  }
}

export type PublicMatchStanding = {
  rank: number;
  teamId: string;
  teamName: string;
  teamTag: string | null;
  teamLogo: string | null;
  kills: number;
  placementPoints: number;
  totalPoints: number;
};

export type PublicMatchDetail = {
  id: string;
  tournamentId: string;
  tournamentTitle: string;
  game: string;
  mode: string;
  stageNumber: number;
  stageName: string;
  groupNumber: number;
  groupName: string;
  matchNumber: number;
  map: string;
  scheduledAt: string | null;
  status: string; // 'SCHEDULED' | 'CHECKIN' | 'LIVE' | 'COMPLETED' | 'CANCELLED'
  isCompleted: boolean;
  standings: PublicMatchStanding[];
};

export type PublicMatchDetailResponse = {
  success: boolean;
  data: PublicMatchDetail;
};

export type PublicTournamentMatchSummary = {
  _id: string;
  tournamentId: string;
  groupId: string;
  stageNumber: number;
  matchNumber: number;
  map: string;
  scheduledAt: string;
  status: string;
  roomPublished: boolean;
  publishedAt: string | null;
};

export function getMatchStatusDisplay(status: string): UIStatus {
  switch (status?.toUpperCase()) {
    case "LIVE":
      return {
        label: "LIVE MATCH",
        badgeClass: "border-[#39c47c]/40 bg-[#0b0b0d]/90 text-[#39c47c]",
        dotColor: "#39c47c",
      };
    case "CHECKIN":
      return {
        label: "CHECK-IN OPEN",
        badgeClass: "border-amber-500/30 bg-[#0b0b0d]/90 text-amber-300",
        dotColor: "#f59e0b",
      };
    case "COMPLETED":
      return {
        label: "COMPLETED",
        badgeClass: "border-white/15 bg-[#0b0b0d]/90 text-[#a1a1aa]",
      };
    case "CANCELLED":
      return {
        label: "CANCELLED",
        badgeClass: "border-red-900/40 bg-[#0b0b0d]/90 text-red-400",
      };
    case "SCHEDULED":
    default:
      return {
        label: "SCHEDULED",
        badgeClass: "border-white/15 bg-[#0b0b0d]/90 text-[#d4d4d8]",
      };
  }
}

