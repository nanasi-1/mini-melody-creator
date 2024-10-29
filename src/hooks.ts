import { useEffect, useState } from "react"
import * as Tone from "tone"
import { MelodyData } from "./types"

export const useSynth = () => {
  const [synth, setSynth] = useState<Tone.Synth | null>(null)

  useEffect(() => {
    const synth = new Tone.Synth().toDestination()
    setSynth(synth)
  }, [])

  return synth
}

export const useMelody = () => {
  const [melody, setMelody] = useState<MelodyData>([])
  const updateMelody = () => {
    setMelody([...melody])
  }
  return { melody, updateMelody }
}
