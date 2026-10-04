export type TournamentStatus = "Registration Open" | "Upcoming" | "Ongoing" | "Completed";
export type TournamentGame = "BGMI" | "Free Fire";

export type Tournament = {
  slug: string;
  title: string;
  game: TournamentGame;
  mode: "Squad";
  map: string;
  date: string;
  registrationDeadline: string;
  prizePool: string;
  entryFee: string;
  registeredTeams: number;
  totalTeams: number;
  status: TournamentStatus;
  summary: string;
  rules: string[];
  stages: string[];
};

// DEMO DATA — replace with backend API in a later phase.
const demoTournaments: Tournament[] = [
  {
    slug: "demo-erangel-elite-cup",
    title: "Erangel Elite Cup",
    game: "BGMI",
    mode: "Squad",
    map: "Erangel",
    date: "2028-09-25T16:00:00.000Z",
    registrationDeadline: "2028-09-22T16:00:00.000Z",
    prizePool: "₹25,000",
    entryFee: "₹10",
    registeredTeams: 72,
    totalTeams: 100,
    status: "Registration Open",
    summary: "A sample BGMI squad tournament preview.",
    rules: ["Review the event rules shown in the app before registering.", "Roster and eligibility requirements are subject to the event details."],
    stages: ["Registration", "Groups", "Matches", "Final"],
  },
  {
    slug: "demo-miramar-showdown",
    title: "Miramar Showdown",
    game: "BGMI",
    mode: "Squad",
    map: "Miramar",
    date: "2028-10-04T16:00:00.000Z",
    registrationDeadline: "2028-10-01T16:00:00.000Z",
    prizePool: "₹10,000",
    entryFee: "₹5",
    registeredTeams: 18,
    totalTeams: 64,
    status: "Registration Open",
    summary: "A sample BGMI squad tournament preview.",
    rules: ["Review the event rules shown in the app before registering.", "Roster and eligibility requirements are subject to the event details."],
    stages: ["Registration", "Groups", "Matches", "Final"],
  },
  {
    slug: "demo-bermuda-rush",
    title: "Bermuda Rush",
    game: "Free Fire",
    mode: "Squad",
    map: "Bermuda",
    date: "2028-10-12T16:00:00.000Z",
    registrationDeadline: "2028-10-09T16:00:00.000Z",
    prizePool: "₹15,000",
    entryFee: "₹7",
    registeredTeams: 0,
    totalTeams: 48,
    status: "Upcoming",
    summary: "A sample Free Fire squad tournament preview.",
    rules: ["Review the event rules shown in the app before registering.", "Roster and eligibility requirements are subject to the event details."],
    stages: ["Registration", "Groups", "Matches", "Final"],
  },
  {
    slug: "demo-squad-series",
    title: "Squad Series",
    game: "BGMI",
    mode: "Squad",
    map: "Erangel",
    date: "2028-08-10T16:00:00.000Z",
    registrationDeadline: "2028-08-07T16:00:00.000Z",
    prizePool: "Sample details in app",
    entryFee: "Sample details in app",
    registeredTeams: 0,
    totalTeams: 64,
    status: "Ongoing",
    summary: "A sample tournament used to preview the ongoing filter.",
    rules: ["This sample does not represent a live tournament."],
    stages: ["Groups", "Matches", "Final"],
  },
  {
    slug: "demo-community-cup",
    title: "Community Cup",
    game: "Free Fire",
    mode: "Squad",
    map: "Purgatory",
    date: "2028-07-18T16:00:00.000Z",
    registrationDeadline: "2028-07-15T16:00:00.000Z",
    prizePool: "Sample details in app",
    entryFee: "Sample details in app",
    registeredTeams: 0,
    totalTeams: 32,
    status: "Completed",
    summary: "A sample tournament used to preview the completed filter.",
    rules: ["This sample does not represent a live tournament."],
    stages: ["Groups", "Matches", "Final"],
  },
];

export function getTournaments(): Tournament[] {
  return demoTournaments;
}
