import { useState } from "react";
import { Sound } from "../types";
import SelectSoundForm, { OnChangeFunc } from "./SelectSoundForm";

const defaultSound = {
  noteLetter: 'C',
  noteOctave: 4,
  duration: 4
} as const

export default function CreateSound({ pushSound }: {
  pushSound: (sound: Sound) => void
}) {
  const [count, setCount] = useState(0)

  const create: OnChangeFunc = ({ note, duration }) => {
    const sound = { key: count, note, duration }
    pushSound(sound)
    setCount(count + 1)
  }

  return (
    <div>
      <h3>音を追加</h3>
      <SelectSoundForm onChange={create} buttonText="追加" defaultSound={defaultSound}/>
    </div>
  )
}