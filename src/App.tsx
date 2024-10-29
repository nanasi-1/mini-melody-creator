import CreateSound from "./components/CreateSound";
import Melody from "./components/Melody";
import { useMelody, useSynth } from "./hooks";
import * as Tone from 'tone'
import { Sound } from "./types";

function App() {
  const synth = useSynth()
  const { melody, updateMelody } = useMelody()

  if (!synth) return <p>Loading...</p>

  const play = async () => {
    if (!synth) return
    await Tone.start()

    let allTime = Tone.now()
    melody.forEach(({note, duration}) => {
      synth.triggerAttackRelease(note, duration, allTime)
      allTime += Tone.Time(duration).toSeconds()
    })
  }

  const pause = () => {
    synth.triggerRelease()
  }

  const pushSound = (sound: Sound) => {
    melody.push(sound)
    updateMelody()
  }

  return (
    <>
      <h1>Hello World!</h1>
      <button onClick={play}>play</button>
      <button onClick={pause}>pause</button>
      <Melody melody={melody} updateMelody={updateMelody}/>
      <CreateSound pushSound={pushSound}/>
    </>
  )
}

export default App
