import { useState } from "react";
import type { MelodyData, Sound } from "../types";
import SelectSoundForm, { OnChangeFunc } from "./SelectSoundForm";

function Sound({ sound, update, remove, play }: {
  sound: Omit<Sound, "key">,
  update: (sound: Omit<Sound, "key">) => void,
  remove: () => void,
  play: () => void
}) {
  const [formToggle, setFormToggle] = useState(false)

  const change: OnChangeFunc = (sound) => {
    update(sound)
    setFormToggle(false)
  }

  const defaultFormValue = {
    duration: sound.duration.toString().match(/-?\d+/)?.[0] ?? '4',
    noteLetter: sound.note.toString().match(/[A-Z#]+/)?.[0] ?? 'C',
    noteOctave: sound.note.toString().match(/-?\d+/)?.[0] ?? '4'
  }

  const checkAndRemove = () => {
    if (confirm(`${sound.note}を削除しますか？`)) remove()
  }

  return (
    <li className="sound">
      <span className="text">音程: {sound.note} 長さ: {sound.duration.toString()}</span>
      <span className="controls">
        <button onClick={() => setFormToggle(!formToggle)}>
          {formToggle ? 'キャンセル' : '編集'}
        </button>
        <button onClick={checkAndRemove}>削除</button>
        <button onClick={play}>ここから再生</button>
      </span>
      {formToggle ?
        <div className="update-form">
          <SelectSoundForm onChange={change} buttonText="更新" defaultSound={defaultFormValue} />
        </div>
        : null}
    </li>
  )
}

export default function Melody({ melody, updateMelody, playByIndex }: {
  melody: MelodyData,
  updateMelody: () => void,
  playByIndex: (index: number) => Promise<number>
}) {
  return (
    <ul className="melody">{
      melody.map(({ key, ...sound }, i) => {
        const updateSound = (sound: Omit<Sound, "key">) => {
          melody[i] = { ...sound, key }
          updateMelody()
        }

        const removeSound = () => {
          melody.splice(i, 1)
          updateMelody()
        }

        const play = () => {
          playByIndex(i)
        }

        return (
          <Sound key={key} sound={sound} update={updateSound} remove={removeSound} play={play} />
        )
      })
    }</ul>
  )
}
