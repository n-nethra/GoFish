export type SleepSchedule = "morning" | "night";
export type Cleanliness = "clean" | "messy";
export type NoiseLevel = "quiet" | "moderate" | "loud";

export interface UserPreferences {
  sleepSchedule: SleepSchedule;
  cleanliness: Cleanliness;
  noiseLevel: NoiseLevel;
  smoking: boolean;
  pets: boolean;
}