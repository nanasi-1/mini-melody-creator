import { useEffect, useState } from "react"
import * as Tone from "tone"
import { MelodyData } from "./types"

export const useSynth = () => {
  const [synth, setSynth] = useState<Tone.Synth | null>(null)
  const [recorder, setRecorder] = useState<Tone.Recorder | null>(null)

  useEffect(() => {
    const recorder = new Tone.Recorder()
    const synth = new Tone.Synth().toDestination().connect(recorder)
    setSynth(synth)
    setRecorder(recorder)
  }, [])

  return { synth, recorder }
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

    const raw: MelodyData = JSON.parse(storageMelodyJson)
    setMelody(raw.map((sound, key) => ({...sound, key})))
  }, [])

  useEffect(() => {
    if(melody.length <= 0) return
    const jsonMelody = JSON.stringify(melody.map(({duration, note}) => ({ duration, note })))
    localStorage.setItem('mini-melody-creator', jsonMelody)
  },  [melody])

  return { melody, updateMelody }
}
