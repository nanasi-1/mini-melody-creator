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

  useEffect(() => {
    if(melody.length > 0) return
    const storageMelodyJson = localStorage.getItem('mini-melody-creator')
    if(!storageMelodyJson) return
    setMelody(JSON.parse(storageMelodyJson))
  }, [])

  useEffect(() => {
    if(melody.length <= 0) return
    const jsonMelody = JSON.stringify(melody.map(({duration, note}) => ({ duration, note })))
    localStorage.setItem('mini-melody-creator', jsonMelody)
  },  [melody])

  return { melody, updateMelody }
}
