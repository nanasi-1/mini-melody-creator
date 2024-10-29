import CreateSound from "./components/CreateSound";
import Melody from "./components/Melody";
import { useMelody, useSynth } from "./hooks";
import * as Tone from 'tone'
import { Sound } from "./types";

function App() {
  const synth = useSynth()
  const { melody, updateMelody } = useMelody()

  if (!synth) return <p>Loading...</p>

  const playByIndex = async (index: number) => {
    if (!synth) return
    await Tone.start()
    const slicedMelody = melody.slice(index)

    let allTime = Tone.now()
    slicedMelody.forEach(({ note, duration }) => {
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
      <h1>ミニメロ - Mini Melody Creator</h1>
      <p>かんたんに使えるミニ作曲アプリ</p> {/* ←さすがにセルフツッコミいれたくなってきた */}
      <div>
        <button onClick={() => playByIndex(0)}>play</button>
        <button onClick={pause}>pause</button>
      </div>
      <Melody melody={melody} updateMelody={updateMelody} playByIndex={playByIndex}/>
      <CreateSound pushSound={pushSound} />
    </>
  )
}

export default App
