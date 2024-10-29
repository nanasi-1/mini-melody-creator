import { useState } from "react";
import type { MelodyData, Sound } from "../types";
import SelectSoundForm, { OnChangeFunc } from "./SelectSoundForm";

function Sound({ sound, update }: {
  sound: Omit<Sound, "key">,
  update: (sound: Omit<Sound, "key">) => void
}) {
  const [formToggle, setFormToggle] = useState(false)

  const change: OnChangeFunc = (sound) => {
    update(sound)
    setFormToggle(false)
  }

  const defaultFormValue = {
    duration: sound.duration.toString().match(/-?\d+/)?.[0] ?? '4',
    noteLetter: sound.note.toString().match(/[A-Z#]/)?.[0] ?? 'C',
    noteOctave: sound.note.toString().match(/-?\d+/)?.[0] ?? '4'
  }

  return (
    <li>
      note: {sound.note} duration: {sound.duration.toString()}
      <button onClick={() => setFormToggle(!formToggle)}>
        {formToggle ? 'キャンセル' : '編集'}
      </button>
      {formToggle ?
        <SelectSoundForm onChange={change} buttonText="update" defaultSound={defaultFormValue} />
        : null}
    </li>
  )
}

export default function Melody({ melody, updateMelody }
  : { melody: MelodyData, updateMelody: () => void }
) {
  return (
    <ul>{
      melody.map(({ key, ...sound }, i) => {
        const updateSound = (sound: Omit<Sound, "key">) => {
          melody[i] = { ...sound, key }
          updateMelody()
        }

        return (
          <Sound key={key} sound={sound} update={updateSound} />
        )
      })
    }</ul>
  )
}
