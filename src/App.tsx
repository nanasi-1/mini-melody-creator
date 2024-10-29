import CreateSound from "./components/CreateSound";
import Melody from "./components/Melody";
import { useMelody, useSynth } from "./hooks";
import * as Tone from 'tone'
import { Sound } from "./types";
import UpdateBpm from "./components/UpdateBpm";
import DownloadFile from "./components/DownloadFile";

function App() {
  const { synth, recorder } = useSynth()
  const { melody, updateMelody } = useMelody()

  if (!synth || !recorder) return <p>Loading...</p>

  const playByIndex = async (index: number): Promise<any> => { // TODO あとで修正
    if (!synth) return
    await Tone.start()
    const slicedMelody = melody.slice(index)
    
    const now = Tone.now()
    let allTime = 0
    slicedMelody.forEach(({ note, duration }) => {
      synth.triggerAttackRelease(note, duration, allTime + now)
      allTime += Tone.Time(duration).toSeconds()
    })

    return allTime
  }

  const pause = () => {
    synth.triggerRelease()
  }

  const pushSound = (sound: Sound) => {
    melody.push(sound)
    updateMelody()
  }

  const reset = () => {
    if(!confirm('メロディーを全て削除しますか？')) return
    melody.splice(0, melody.length)
    localStorage.removeItem('mini-melody-creator')
    updateMelody()
  }

  return (
    <>
      <div className="title">
        <h1>ミニメロ - Mini Melody Creator</h1>
        <p>かんたんに使えるミニ作曲アプリ</p> {/* ←さすがにセルフツッコミいれたくなってきた */}
      </div>
      <div className="melody-controls">
        <button onClick={() => playByIndex(0)}>再生</button>
        <button onClick={pause}>停止</button>
      </div>
      <Melody melody={melody} updateMelody={updateMelody} playByIndex={playByIndex}/>
      <CreateSound pushSound={pushSound} initKey={melody.length}/>
      <div>
        <h3>メニュー</h3>
        <ul className="menu-list">
          <li><UpdateBpm /></li>
          <li><DownloadFile recorder={recorder} play={() => playByIndex(0)} pause={pause}/></li>
          <li><button onClick={reset}>全て削除</button></li>
        </ul>
      </div>
    </>
  )
}

export default App
