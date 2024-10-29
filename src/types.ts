import { Frequency, Time } from "tone/build/esm/core/type/Units"

export interface Sound {
  key: number,
  note: Frequency,
  duration: Time
}

export type MelodyData = Sound[]