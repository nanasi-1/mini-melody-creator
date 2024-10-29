import CreateSound from "./components/CreateSound";
import Melody from "./components/Melody";
import { useMelody, useSynth } from "./hooks";
import * as Tone from 'tone'
import { Sound } from "./types";

function App() {
  const synth = useSynth()
  const { melody, updateMelody } = useMelody()

  if (!synth) return <p>Loading...</p>

  const playSound = () => {
    if (!synth) return
    melody.forEach(({note, duration}, i) => {
      const time = Tone.now() + i * Tone.Time(duration).toSeconds()
      synth.triggerAttackRelease(note, duration, time)
    })
    Tone.start()
  }

  const pushSound = (sound: Sound) => {
    melody.push(sound)
    updateMelody()
  }

  return (
    <>
      <h1>Hello World!</h1>
      <button onClick={playSound}>play</button>
      <Melody melody={melody} updateMelody={updateMelody}/>
      <CreateSound pushSound={pushSound}/>
    </>
  )
}

export default App
